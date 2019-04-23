import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Alert from './alert';

const defaultOpts = {
  showIcon: false,
  title: '提示',
  content: '内容',
  show: false,
  btnText: '确定',
  callBack() {},
};
let messageInstance;
const getMessageInstance = function createMessage(opts) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  function destroy() {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }
  const props = { ...defaultOpts, ...opts, children: opts.content };
  delete props.content;
  ReactDOM.render(<Alert {...props} />, div);
  return { destroy };
};
export default {
  show(opts) {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
    messageInstance = getMessageInstance({ ...opts, show: true });
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
