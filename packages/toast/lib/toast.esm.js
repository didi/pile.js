/*!
 * @pile-ui/toast.js v2.0.5-alpha.0
 * (c) 2018-2019 wutaosusan <wutaosusan@didichuxing.com>
 * Released under the MIT License.
 */
import { createElement, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '@pile-ui/icon';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var ToastContent =
/*#__PURE__*/
function (_React$Component) {
  inherits(ToastContent, _React$Component);

  function ToastContent() {
    classCallCheck(this, ToastContent);

    return possibleConstructorReturn(this, getPrototypeOf(ToastContent).apply(this, arguments));
  }

  createClass(ToastContent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startCloseTimer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          duration = _this$props.duration,
          content = _this$props.content,
          iconType = _this$props.iconType;

      if (duration !== prevProps.duration || content !== prevProps.content || iconType !== prevProps.iconType) {
        this.restartCloseTimer();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearCloseTimer();
    }
  }, {
    key: "close",
    value: function close() {
      this.clearCloseTimer(); // 执行关闭操作

      var onAnimateLeave = this.props.onAnimateLeave;
      onAnimateLeave();
    }
  }, {
    key: "startCloseTimer",
    value: function startCloseTimer() {
      var _this = this;

      var duration = this.props.duration;

      if (duration) {
        this.closeTimer = setTimeout(function () {
          _this.close();
        }, duration * 1000);
      }
    }
  }, {
    key: "clearCloseTimer",
    value: function clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    }
  }, {
    key: "restartCloseTimer",
    value: function restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      /* eslint-disable */
      var _this$props2 = this.props,
          content = _this$props2.content,
          iconType = _this$props2.iconType;
      var type = '';

      switch (iconType) {
        case 'success':
          type = 'check-circle';
          break;

        case 'fail':
          type = 'error-circle';
          break;

        case 'load':
          type = 'loading';
          content = '加载中...';
          break;

        case 'warn':
          type = 'warnning-solid-circle';
          break;

        default:
          type = '';
      }

      return createElement("div", {
        className: "pile-toast"
      }, iconType && type ? createElement(Icon, {
        type: type,
        size: "large"
      }) : null, createElement("div", {
        className: "pile-toast-content",
        ref: function ref(t) {
          _this2.toastContent = t;
        }
      }, content));
    }
  }]);

  return ToastContent;
}(Component);

ToastContent.propTypes = {
  content: PropTypes.string,
  iconType: PropTypes.oneOf(['success', 'fail', 'load', 'warn', '']),
  duration: PropTypes.number,
  onAnimateLeave: PropTypes.func
};
ToastContent.defaultProps = {
  content: '',
  iconType: '',
  duration: 3,
  onAnimateLeave: null
};

var messageInstance;

var getMessageInstance = function createMessage(properties) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  function destroy() {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }

  ReactDOM.render(createElement(ToastContent, _extends_1({}, properties, {
    onAnimateLeave: destroy
  })), div);
  return {
    destroy: destroy
  };
};

var Toast = {
  show: function show(properties) {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = getMessageInstance(properties);
  },
  hide: function hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};

export default Toast;
//# sourceMappingURL=toast.esm.js.map
