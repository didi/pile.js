/*!
 * @pile-ui/inputfiled.js v2.0.5-alpha.0
 * (c) 2018-2019 huangping <huangping@didichuxing.com>
 * Released under the MIT License.
 */
import { createElement, Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixClsProperty, refProperty } from '@pile-ui/shared';
import { IfComponent } from '@pile-ui/condition';
import Icon from '@pile-ui/icon';

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

var InputLabel = function InputLabel(_ref) {
  var prefixCls = _ref.prefixCls,
      labeltext = _ref.labeltext;
  var labelCls = classNames(defineProperty({}, "".concat(prefixCls, "-input-label"), true));
  return createElement("div", {
    className: labelCls
  }, labeltext);
};

InputLabel.propTypes = {
  labeltext: PropTypes.string
};
InputLabel.defaultProps = {
  labeltext: ''
};
var InputLabel$1 = prefixClsProperty(InputLabel);

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

var Value =
/*#__PURE__*/
function (_React$Component) {
  inherits(Value, _React$Component);

  function Value(props) {
    var _this;

    classCallCheck(this, Value);

    _this = possibleConstructorReturn(this, getPrototypeOf(Value).call(this, props));

    defineProperty(assertThisInitialized(_this), "set", function (e) {
      var ctrlValue = e.target.value;
      var inputType = _this.props.inputType;
      var preValue = _this.state.value;
      var tempValue = ctrlValue;

      switch (inputType) {
        case 'phone':
          tempValue = preValue.length === 11 && ctrlValue.length > 11 ? preValue : ctrlValue.replace(/\D/g, '').substring(0, 11);
          break;

        case 'number':
          tempValue = ctrlValue.replace(/\D/g, '');
          break;

        case 'text':
        case 'password':
        default:
          break;
      }

      _this.setState({
        value: tempValue
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(tempValue);
      }
    });

    defineProperty(assertThisInitialized(_this), "reset", function () {
      var defaultValue = _this.props.defaultValue;

      _this.setState({
        value: defaultValue
      });
    });

    defineProperty(assertThisInitialized(_this), "clear", function () {
      _this.setState({
        value: ''
      });
    });

    _this.state = {
      value: props.defaultValue || ''
    };
    return _this;
  }

  createClass(Value, [{
    key: "render",
    value: function render() {
      var value = this.state.value;
      var newProps = {
        set: this.set,
        clear: this.clear,
        reset: this.reset,
        value: value
      };
      var children = this.props.children;
      return children(newProps);
    }
  }]);

  return Value;
}(Component);

Value.propTypes = {
  defaultValue: PropTypes.string,
  inputType: PropTypes.string,
  children: PropTypes.func,
  onChange: PropTypes.func
};
Value.defaultProps = {
  defaultValue: '',
  inputType: '',
  children: function children() {},
  onChange: function onChange() {}
};

var Inputbody =
/*#__PURE__*/
function (_React$Component) {
  inherits(Inputbody, _React$Component);

  function Inputbody(props) {
    var _this;

    classCallCheck(this, Inputbody);

    _this = possibleConstructorReturn(this, getPrototypeOf(Inputbody).call(this, props));

    defineProperty(assertThisInitialized(_this), "focus", function () {
      _this.textInput.current.focus();
    });

    defineProperty(assertThisInitialized(_this), "onblur", function (e) {
      var value = e.target.value;
      var onBlur = _this.props.onBlur;

      if (onBlur) {
        onBlur(value);
      }
    });

    defineProperty(assertThisInitialized(_this), "onfocus", function (e) {
      var value = e.target.value;
      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(value);
      }
    });

    _this.textInput = createRef();
    return _this;
  }

  createClass(Inputbody, [{
    key: "render",
    value: function render() {
      return createElement("input", _extends_1({}, this.props, {
        ref: this.textInput,
        onBlur: this.onblur,
        onFocus: this.onfocus
      }));
    }
  }]);

  return Inputbody;
}(Component);

Inputbody.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};
Inputbody.defaultProps = {
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
};
var Inputbody$1 = refProperty(Inputbody);

/* eslint-disable no-shadow */

var InputContent =
/*#__PURE__*/
function (_React$Component) {
  inherits(InputContent, _React$Component);

  function InputContent(props) {
    var _this;

    classCallCheck(this, InputContent);

    _this = possibleConstructorReturn(this, getPrototypeOf(InputContent).call(this, props));

    defineProperty(assertThisInitialized(_this), "focus", function () {
      _this.textInput.current.focus();
    });

    defineProperty(assertThisInitialized(_this), "onBlur", function (value) {
      if (_this.textInput) {
        _this.debounceTimeout = window.setTimeout(function () {
          if (document.activeElement !== (_this.textInput && _this.textInput.textInput)) {
            _this.setState({
              focus: false
            });
          }
        }, 200);
        var onBlur = _this.props.onBlur;

        if (onBlur) {
          onBlur(value);
        }
      }
    });

    defineProperty(assertThisInitialized(_this), "onFocus", function (value) {
      if (_this.debounceTimeout) {
        clearTimeout(_this.debounceTimeout);
        _this.debounceTimeout = null;
      }

      _this.setState({
        focus: true
      });

      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(value);
      }
    });

    _this.state = {
      focus: props.autoFocus
    };
    _this.textInput = createRef();
    _this.debounceTimeout = null;
    return _this;
  }

  createClass(InputContent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.debounceTimeout) {
        window.clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames2,
          _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          clearable = _this$props.clearable,
          prefixCls = _this$props.prefixCls,
          disabled = _this$props.disabled,
          props = objectWithoutProperties(_this$props, ["value", "onChange", "onFocus", "onBlur", "clearable", "prefixCls", "disabled"]);

      var type = this.props.type;
      var focus = this.state.focus;
      var defaultProps = {
        defaultValue: value,
        inputType: type,
        onChange: onChange
      };
      var inputCls = classNames(defineProperty({}, "".concat(prefixCls, "-input-input"), true));
      var clearCls = classNames((_classNames2 = {}, defineProperty(_classNames2, "".concat(prefixCls, "-input-clear"), true), defineProperty(_classNames2, "".concat(prefixCls, "-input-fucos"), focus), _classNames2));
      return createElement(Value, defaultProps, function (_ref) {
        var value = _ref.value,
            set = _ref.set,
            clear = _ref.clear;
        var valueChange = {
          value: value,
          onChange: set
        };

        var getClear = function getClear() {
          _this2.focus();

          clear();
        };

        var onKeyPress = function onKeyPress(e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            getClear(e);
          }
        };

        return createElement(Fragment, null, createElement("div", {
          className: inputCls
        }, createElement(Inputbody$1, _extends_1({
          onBlur: _this2.onBlur,
          onFocus: _this2.onFocus
        }, props, valueChange, {
          ref: _this2.textInput
        }))), createElement(IfComponent, {
          when: clearable && !disabled && "".concat(value).length > 0
        }, function () {
          return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            createElement("div", {
              className: clearCls,
              onClick: getClear,
              onKeyPress: onKeyPress
            }, createElement(Icon, {
              type: "error-circle"
            }))
            /* eslint-enable jsx-a11y/no-static-element-interactions */

          );
        }));
      });
    }
  }]);

  return InputContent;
}(Component);

InputContent.propTypes = {
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  clearable: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string
};
InputContent.defaultProps = {
  type: 'text',
  clearable: false,
  autoFocus: false,
  disabled: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  value: ''
};
var InputContent$1 = prefixClsProperty(InputContent);

var InputFiled = function InputFiled(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      children = _ref.children,
      props = objectWithoutProperties(_ref, ["prefixCls", "className", "children"]);

  var wrapCls = classNames((_classNames = {}, defineProperty(_classNames, "".concat(prefixCls, "-input-item"), true), defineProperty(_classNames, className, className), _classNames));
  return createElement("div", {
    className: wrapCls
  }, createElement(InputLabel$1, {
    labeltext: children
  }), createElement(InputContent$1, props));
};

InputFiled.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};
InputFiled.defaultProps = {
  type: 'text',
  children: '',
  placeholder: '',
  clearable: false,
  autoFocus: false,
  disabled: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
};
var index = prefixClsProperty(InputFiled);

export default index;
//# sourceMappingURL=inputFiled.esm.js.map
