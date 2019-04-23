import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/fold/foldgutter.css';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  componentDidMount() {
    const { onChange, value } = this.props;

    this.cm = CodeMirror(this.editor, {
      mode: 'jsx',
      theme: 'solarized dark',
      keyMap: 'sublime',
      // viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false,
      extraKeys: {
        'Ctrl-Q': function (cm) {
          cm.foldCode(cm.getCursor());
        },
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    });

    this.cm.setValue(value);

    this.cm.on('changes', (cm) => {
      if (onChange) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          onChange(cm.getValue());
        }, 300);
      }
    });
  }

  onToggle(show) {
    this.setState({ show: !show });
  }

  render() {
    const { show } = this.state;

    const style = {
      visibility: show ? 'visible' : 'hidden',
      height: show ? 'auto' : 0,
    };

    return (
      <div className="pure-editor">
        <span className='pure-editor-btn' onClick={this.onToggle.bind(this, show)}>{show ? '隐藏代码' : '显示代码'}</span>
        <div style={style} ref={ref => (this.editor = ref)} />
      </div>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
