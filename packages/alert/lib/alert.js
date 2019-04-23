/*!
 * @pile-ui/alert.js v2.0.5-alpha.0
 * (c) 2018-2019 zhangzhipeng <zhangzhipeng@didichuxing.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var PropTypes = require('prop-types');
var reactTransitionGroup = require('react-transition-group');
var classNames = _interopDefault(require('classnames'));
var shared = require('@pile-ui/shared');
var ReactDOM = require('react-dom');

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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var Alert =
/*#__PURE__*/
function (_React$Component) {
  inherits(Alert, _React$Component);

  function Alert(props) {
    var _this;

    classCallCheck(this, Alert);

    _this = possibleConstructorReturn(this, getPrototypeOf(Alert).call(this, props));

    defineProperty(assertThisInitialized(_this), "callBackClose", function (e) {
      var callBack = _this.props.callBack;

      if (callBack) {
        callBack(e);
      }
    });

    defineProperty(assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        show: false
      });
    });

    defineProperty(assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        _this.onClose(e);
      }
    });

    _this.state = {
      show: false
    };
    return _this;
  }

  createClass(Alert, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var show = this.props.show;

      if (show) {
        setTimeout(function () {
          _this2.setState({
            show: true
          });
        }, 0);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var show = this.state.show;

      if (nextProps.show !== show) {
        setTimeout(function () {
          _this3.setState({
            show: true
          });
        }, 0);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.style.overflow = '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var typeIcon = 'success';
      var _this$props = this.props,
          showIcon = _this$props.showIcon,
          title = _this$props.title,
          children = _this$props.children,
          btnText = _this$props.btnText,
          type = _this$props.type;
      var show = this.state.show;
      var prefixCls = this.props.prefixCls;
      var iconCls = classNames(defineProperty({}, "".concat(prefixCls, "-alert-icon"), true));

      if (type === 'success') {
        typeIcon = 'check';
      } else {
        typeIcon = type;
      }

      return React.createElement(reactTransitionGroup.CSSTransition, {
        in: show,
        timeout: 200 // 动画时长
        ,
        classNames: "pile-alert-animate",
        unmountOnExit: true,
        onEnter: function onEnter() {
          document.body.style.overflow = 'hidden';
        },
        onExited: function onExited() {
          document.body.style.overflow = '';

          _this4.callBackClose();
        }
      }, React.createElement("div", {
        className: "pile-alert"
      }, React.createElement("div", {
        className: "pile-alert-mask"
      }), React.createElement("div", {
        className: "pile-alert-box"
      }, React.createElement("i", {
        className: "".concat(prefixCls, "-icon-").concat(typeIcon, " ").concat(iconCls),
        style: showIcon ? {
          display: 'block'
        } : {
          display: 'none'
        }
      }), React.createElement("div", {
        className: "pile-alert-title"
      }, title), children ? React.createElement("div", {
        className: "pile-alert-content"
      }, children) : null, React.createElement("div", {
        role: "button",
        tabIndex: 0,
        className: "d-btns pile-btn-alert",
        onClick: this.onClose,
        onKeyPress: this.onKeyPress
      }, React.createElement("span", {
        className: "btn-orange"
      }, btnText)))));
    }
  }]);

  return Alert;
}(React.Component);

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  show: PropTypes.bool,
  showIcon: PropTypes.bool,
  title: PropTypes.node,
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['success', 'warnning'])
};
Alert.defaultProps = {
  children: null,
  showIcon: false,
  title: '提示',
  show: false,
  btnText: '确定',
  type: 'success',
  onClick: function onClick() {}
};
var Alert$1 = shared.prefixClsProperty(Alert);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

var defaultOpts = {
  showIcon: false,
  title: '提示',
  content: '内容',
  show: false,
  btnText: '确定',
  callBack: function callBack() {}
};
var messageInstance;

var getMessageInstance = function createMessage(opts) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  function destroy() {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }

  var props = objectSpread({}, defaultOpts, opts, {
    children: opts.content
  });

  delete props.content;
  ReactDOM.render(React.createElement(Alert$1, props), div);
  return {
    destroy: destroy
  };
};

var alertBox = {
  show: function show(opts) {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = getMessageInstance(objectSpread({}, opts, {
      show: true
    }));
  },
  hide: function hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};

var index = Object.assign(Alert$1, alertBox);

module.exports = index;
//# sourceMappingURL=alert.js.map
