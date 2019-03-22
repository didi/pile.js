import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  withProps, withHandlers, lifecycle, compose,
} from 'recompose';
import { transform } from '@babel/standalone';
import trace from '../utils/trace';
import Editor from '../editor';

const random = base => Math.floor(Math.random(base) * base);

const enhance = compose(
  withProps(() => ({
    canvasId: random(100000),
  })),
  trace('canvas'),
  withHandlers({
    renderCode: props => (renderCode) => {
      import('../../../bundle').then((Pile) => { // ../../../src
        const args = ['React', 'ReactDOM'];
        const argv = [React, ReactDOM];

        Object.keys(Pile).forEach((key) => {
          args.push(key);
          argv.push(Pile[key]);
        });

        return {
          args,
          argv,
        };
      }).then(({ args, argv }) => {
        const isMulitInstance = renderCode.includes('ReactDom.render(');
        let codeTempl = `class Demo extends React.Component {
          ${renderCode}
        }

        ReactDOM.render(<Demo />, mountNode)
        `

        if (isMulitInstance) {
           codeTempl = `${renderCode}`
        }
        const { code } = transform(`
        const mountNode = document.getElementById('${props.canvasId}');

        ${codeTempl}
      `, {
          presets: ['es2015', 'react'],
          plugins: ['proposal-class-properties'],
        });

        args.push(code);
        /* eslint-disable no-new-func */
        new Function(...args)(...argv);
        /* eslint-enable no-new-func */
      }).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.renderCode(this.props.code);
    },
  }),
);


const Canvas = ({ canvasId, code, renderCode }) => (
  <div className="pure-canvas">
    <div id={canvasId} />
    <Editor value={code} onChange={newcode => renderCode(newcode)} />
  </div>
);

export default enhance(Canvas);
