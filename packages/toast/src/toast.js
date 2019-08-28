import * as React from 'react';
import ReactDOM from 'react-dom';
import ToastContent from './toasContent';

let messageInstance;
const getMessageInstance = function createMessage(properties) {
  const div = document.createElement('div');

  document.body.appendChild(div);

  function destroy() {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
    messageInstance = null;
  }

  ReactDOM.render(
    <ToastContent {...properties} onAnimateLeave={destroy} />,
    div
  );

  return { destroy };
};

export default {
  show(properties) {
    if (messageInstance) {
      messageInstance.destroy();
    }

    messageInstance = getMessageInstance(properties);
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
    }
  },
};
