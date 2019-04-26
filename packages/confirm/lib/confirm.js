/*!
 * @pile-ui/confirm.js v2.0.5-alpha.0
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

var Confirm =
/*#__PURE__*/
function (_React$Component) {
  inherits(Confirm, _React$Component);

  function Confirm(props) {
    var _this;

    classCallCheck(this, Confirm);

    _this = possibleConstructorReturn(this, getPrototypeOf(Confirm).call(this, props));

    defineProperty(assertThisInitialized(_this), "callBackClose", function (e) {
      var _this$props = _this.props,
          callBack = _this$props.callBack,
          cancelCallBack = _this$props.cancelCallBack;
      var isCancel = _this.state.isCancel;

      if (callBack && !isCancel) {
        callBack(e);
      }

      if (cancelCallBack && isCancel) {
        cancelCallBack(e);
      }
    });

    defineProperty(assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        show: false,
        isCancel: false
      });
    });

    defineProperty(assertThisInitialized(_this), "onCloseCancel", function () {
      _this.setState({
        show: false,
        isCancel: true
      });
    });

    defineProperty(assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        _this.onClose(e);
      }
    });

    defineProperty(assertThisInitialized(_this), "cancelOnKeyPress", function (e) {
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

  createClass(Confirm, [{
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
      var _this$props2 = this.props,
          showIcon = _this$props2.showIcon,
          title = _this$props2.title,
          children = _this$props2.children,
          btnText = _this$props2.btnText,
          type = _this$props2.type,
          cancelBtnText = _this$props2.cancelBtnText;
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
        classNames: "pile-confirm-animate",
        unmountOnExit: true,
        onEnter: function onEnter() {
          document.body.style.overflow = 'hidden';
        },
        onExited: function onExited() {
          document.body.style.overflow = '';

          _this4.callBackClose();
        }
      }, React.createElement("div", {
        className: "pile-confirm"
      }, React.createElement("div", {
        className: "pile-confirm-mask"
      }), React.createElement("div", {
        className: "pile-confirm-box"
      }, React.createElement("i", {
        className: "".concat(prefixCls, "-icon-").concat(typeIcon, " ").concat(iconCls),
        style: showIcon ? {
          display: 'block'
        } : {
          display: 'none'
        }
      }), React.createElement("div", {
        className: "pile-confirm-title"
      }, title), children ? React.createElement("div", {
        className: "pile-confirm-content"
      }, children) : null, React.createElement("div", {
        role: "button",
        tabIndex: 0,
        className: "d-btns pile-btn-confirm cancel-btn",
        onClick: this.onCloseCancel,
        onKeyPress: this.cancelOnKeyPress
      }, React.createElement("span", {
        className: "btn-cancle-gray"
      }, cancelBtnText || '取消')), React.createElement("div", {
        role: "button",
        tabIndex: 0,
        className: "d-btns pile-btn-confirm",
        onClick: this.onClose,
        onKeyPress: this.onKeyPress
      }, React.createElement("span", {
        className: "btn-orange"
      }, btnText || '确定')))));
    }
  }]);

  return Confirm;
}(React.Component);

Confirm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  show: PropTypes.bool,
  showIcon: PropTypes.bool,
  title: PropTypes.node,
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['success', 'warnning'])
};
Confirm.defaultProps = {
  children: null,
  showIcon: false,
  title: '提示',
  show: false,
  btnText: '确定',
  type: 'success',
  onClick: function onClick() {}
};
var Confirm$1 = shared.prefixClsProperty(Confirm);

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
  callBack: function callBack() {},
  cancelBtnText: '取消',
  cancelCallBack: function cancelCallBack() {}
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
  ReactDOM.render(React.createElement(Confirm$1, props), div);
  return {
    destroy: destroy
  };
};

var confirmBox = {
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

var index = Object.assign(Confirm$1, confirmBox);

module.exports = index;
//# sourceMappingURL=confirm.js.map
