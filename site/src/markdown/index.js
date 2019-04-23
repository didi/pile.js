import { withProps, withHandlers, lifecycle, compose } from 'recompose';
import * as React from 'react';
import { render } from 'react-dom';
import * as PropTypes from 'prop-types';
import marked from 'marked';
import Canvas from './canvas';
import trace from '../utils/trace';

import './amblin-lite.css';

// const renderer = new marked.Renderer();
// // Override function
// renderer.heading = function (text, level) {
//   const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

//   return `
//           <h${level}>
//             <a name="${escapedText}" class="anchor" href="#${escapedText}">
//               <span class="pile-icon-information"></span>
//             </a>
//             ${text}
//           </h${level}>`;
// };
// http://es-static.xiaojukeji.com/static/web/activity/pile2.0/evm.jpg

const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  if (level == 1 && text.includes('{QR-code}')) {
    return `<div class='code-title'><h1>${
      text.split('{QR-code}')[0]
    } </h1><div class='code-pic' id='codePic'><span class='code-icon'></span><div class='codeCanvas' id='codeCanvas' ><canvas id="canvas" class='code-canvas'></canvas></div></div></div>`;
  }
  return `
    <h${level}>
      ${text}
    </h${level}>
  `;
};

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: true,
});

const enhance = compose(
  withProps(({ input }) => {
    const snippets = {};
    const newinput = marked(
      input.replace(/```jsx harmony\s?([^]+?)```/g, (match, p1, offset) => {
        const id = offset.toString(36);
        snippets[id] = React.createElement(Canvas, { code: p1 });

        return `<div id=${id}></div>`;
      })
    );

    return {
      html: newinput,
      snippets,
    };
  }),
  trace('markdown'),
  withHandlers({
    renderCanvas: props => () => {
      Object.entries(props.snippets).forEach(([id, snippet]) => {
        const container = document.getElementById(id);
        if (container instanceof HTMLElement) {
          render(snippet, container);
        }
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.renderCanvas();
    },
    componentDidUpdate() {
      this.props.renderCanvas();
    },
  })
);

const Markdown = ({ html }) => (
  <div
    id="wrapper"
    className="pure-markdown"
    /* eslint-disable react/no-danger */
    dangerouslySetInnerHTML={{
      __html: html,
    }}
    /* eslint-enable react/no-danger */
  />
);

Markdown.propTypes = {
  html: PropTypes.string.isRequired,
};

export default enhance(Markdown);
