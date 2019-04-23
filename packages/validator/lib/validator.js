/*!
 * @pile-ui/validator.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var PropTypes = require('prop-types');
var classNames = _interopDefault(require('classnames'));

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

var ErrorMessage = function ErrorMessage(_ref) {
  var show = _ref.show,
      children = _ref.children;
  if (!show) return null;
  return React.createElement("div", {
    className: "pile-validator-error"
  }, children);
};

ErrorMessage.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
ErrorMessage.defaultProps = {
  show: true,
  children: null
};

var Rule =
/*#__PURE__*/
function () {
  function Rule(opts) {
    classCallCheck(this, Rule);

    this.type = opts.type;
    this.value = opts.value;
    this.message = opts.message;
    this.attrs = opts.attrs || {};
  }

  createClass(Rule, [{
    key: "checker",
    value: function checker(text) {
      this.text = text;
    }
  }, {
    key: "nativeAttrs",
    value: function nativeAttrs() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return objectSpread({}, this.attrs, attrs);
    }
  }]);

  return Rule;
}();

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

var types = ['phone', 'email', 'number'];

var InnerType =
/*#__PURE__*/
function (_Rule) {
  inherits(InnerType, _Rule);

  function InnerType(opts) {
    classCallCheck(this, InnerType);

    return possibleConstructorReturn(this, getPrototypeOf(InnerType).call(this, InnerType.init(opts)));
  }

  createClass(InnerType, [{
    key: "checker",
    value: function checker(text) {
      var value = this.value,
          message = this.message;
      var valid;

      switch (value) {
        case 'phone':
          valid = /^[01][0-9]{10}$/.test(text);
          break;

        case 'email':
          valid = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(text);
          break;

        case 'number':
          valid = /^\d+$/.test(text);
          break;

        default:
          valid = false;
      }

      return {
        valid: valid,
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      warning_1(types.indexOf(opts.type) !== -1, 'type 只能是 %s 中的值', types);
      var attrs = {};

      if (opts.type === 'phone') {
        attrs = {
          maxLength: 11,
          type: 'phone'
        };
      }

      return {
        type: 'innerType',
        value: opts.type,
        message: opts.message,
        attrs: attrs
      };
    }
  }]);

  return InnerType;
}(Rule);

var Length =
/*#__PURE__*/
function (_Rule) {
  inherits(Length, _Rule);

  function Length(opts) {
    classCallCheck(this, Length);

    return possibleConstructorReturn(this, getPrototypeOf(Length).call(this, Length.init(opts)));
  }

  createClass(Length, [{
    key: "checker",
    value: function checker(text) {
      var value = this.value,
          message = this.message;
      return {
        valid: text.length === value,
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      return {
        type: 'length',
        value: opts.length,
        message: opts.message
      };
    }
  }]);

  return Length;
}(Rule);

var toString = Object.prototype.toString;

var isRegExp = function isRegExp(regex) {
  return toString.call(regex) === '[object RegExp]';
};

var Pattern =
/*#__PURE__*/
function (_Rule) {
  inherits(Pattern, _Rule);

  function Pattern(opts) {
    classCallCheck(this, Pattern);

    return possibleConstructorReturn(this, getPrototypeOf(Pattern).call(this, Pattern.init(opts)));
  }

  createClass(Pattern, [{
    key: "checker",
    value: function checker(text) {
      var value = this.value,
          message = this.message;
      return {
        valid: value.test(text),
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      warning_1(isRegExp(opts.pattern), 'pattern %s 必须是正则表达式', opts.pattern);
      return {
        type: 'pattern',
        value: opts.pattern,
        message: opts.message
      };
    }
  }]);

  return Pattern;
}(Rule);

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var Range =
/*#__PURE__*/
function (_Rule) {
  inherits(Range, _Rule);

  function Range(opts) {
    classCallCheck(this, Range);

    return possibleConstructorReturn(this, getPrototypeOf(Range).call(this, Range.init(opts)));
  }

  createClass(Range, [{
    key: "checker",
    value: function checker(text) {
      var _this$value = slicedToArray(this.value, 2),
          min = _this$value[0],
          max = _this$value[1],
          message = this.message;

      return {
        valid: text.length >= min && text.length <= max,
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      var _opts$range = slicedToArray(opts.range, 2),
          _opts$range$ = _opts$range[0],
          min = _opts$range$ === void 0 ? 0 : _opts$range$,
          _opts$range$2 = _opts$range[1],
          max = _opts$range$2 === void 0 ? Number.MAX_SAFE_INTEGER : _opts$range$2;

      var attrs = {};
      warning_1(!Number.isNaN(min) || !Number.isNaN(max), 'min: %s，max: %s 不是number类似，请检查配置', min, max);
      warning_1(min <= max, 'min不能大于max，请检查 %s 配置', opts.range);

      if (max !== Number.MAX_SAFE_INTEGER) {
        attrs = {
          maxLength: max
        };
      }

      return {
        type: 'range',
        value: [min, max],
        message: opts.message,
        attrs: attrs
      };
    }
  }]);

  return Range;
}(Rule);

var Required =
/*#__PURE__*/
function (_Rule) {
  inherits(Required, _Rule);

  function Required(opts) {
    classCallCheck(this, Required);

    return possibleConstructorReturn(this, getPrototypeOf(Required).call(this, Required.init(opts)));
  }

  createClass(Required, [{
    key: "checker",
    value: function checker(text) {
      var value = this.value,
          message = this.message;
      var valid = true;

      if (value) {
        valid = text !== '';
      }

      return {
        valid: valid,
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      var required = opts.isRequired ? {
        required: 'required'
      } : {};
      return {
        type: 'required',
        value: opts.isRequired,
        message: opts.message,
        attrs: objectSpread({}, required)
      };
    }
  }]);

  return Required;
}(Rule);

var Validator =
/*#__PURE__*/
function (_Rule) {
  inherits(Validator, _Rule);

  function Validator(opts) {
    classCallCheck(this, Validator);

    return possibleConstructorReturn(this, getPrototypeOf(Validator).call(this, Validator.init(opts)));
  }

  createClass(Validator, [{
    key: "checker",
    value: function checker(text) {
      var value = this.value,
          message = this.message;
      return {
        valid: value(text),
        message: message
      };
    }
  }], [{
    key: "init",
    value: function init(opts) {
      warning_1(typeof opts.validator === 'function', 'validator 类似必须是function, %s  ', opts.validator);
      return {
        type: 'validator',
        value: opts.validator,
        message: opts.message
      };
    }
  }]);

  return Validator;
}(Rule);

var hasOwnProperty = Object.prototype.hasOwnProperty;
var createFactory = function createFactory(opts) {
  if (hasOwnProperty.call(opts, 'type')) {
    return new InnerType(opts);
  }

  if (hasOwnProperty.call(opts, 'isRequired')) {
    return new Required(opts);
  }

  if (hasOwnProperty.call(opts, 'range')) {
    return new Range(opts);
  }

  if (hasOwnProperty.call(opts, 'length')) {
    return new Length(opts);
  }

  if (hasOwnProperty.call(opts, 'pattern')) {
    return new Pattern(opts);
  }

  if (hasOwnProperty.call(opts, 'validator')) {
    return new Validator(opts);
  }

  return new Rule(opts);
};

var noop = function noop() {};
/* eslint-disable react/destructuring-assignment, no-underscore-dangle */


var Validator$1 =
/*#__PURE__*/
function (_React$Component) {
  inherits(Validator, _React$Component);

  function Validator() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, Validator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Validator)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "state", {
      showError: _this.props.showError,
      value: _this.props.initial,
      checker: _this.checker(_this.props.initial),
      nativeAttrs: _this._nativeAttrs()
    });

    defineProperty(assertThisInitialized(_this), "_setValue", function (updater) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var onChange = _this.props.onChange;

      _this.setState(typeof updater === 'function' ? function (state) {
        return {
          value: updater(state.value)
        };
      } : {
        value: updater
      }, function () {
        /* eslint-disable react/no-access-state-in-setstate */
        var checker = _this.checker(_this.state.value);
        /* eslint-enable react/no-access-state-in-setstate */


        checker.num = Math.random() * 1000;
        onChange(_this.state.value, checker);

        _this.setState({
          checker: checker
        });

        cb();
      });
    });

    return _this;
  }

  createClass(Validator, [{
    key: "checker",
    value: function checker(value) {
      var rules = this.props.rules;
      var currRule;
      var valid = rules.every(function (rule) {
        currRule = rule;
        return createFactory(rule).checker(value).valid;
      });
      return {
        valid: valid,
        message: valid ? '' : currRule.message
      };
    }
  }, {
    key: "_nativeAttrs",
    value: function _nativeAttrs() {
      var rules = this.props.rules;
      var nativeAttrs = rules.reduce(function (acc, rule) {
        return objectSpread({}, acc, createFactory(rule).nativeAttrs(rule.nativeAttrs));
      }, {});
      return nativeAttrs;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls;
      var _this$state = this.state,
          showError = _this$state.showError,
          value = _this$state.value,
          checker = _this$state.checker,
          nativeAttrs = _this$state.nativeAttrs;
      var wrapCls = classNames(defineProperty({}, "".concat(prefixCls, "-highlight"), showError));
      return React.createElement(React.Fragment, null, children(objectSpread({
        value: value,
        setValue: this._setValue,
        className: wrapCls
      }, nativeAttrs)), React.createElement(ErrorMessage, {
        show: showError
      }, checker.message));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.showError !== prevState.showError) {
        return {
          showError: nextProps.showError
        };
      }

      return null;
    }
  }]);

  return Validator;
}(React.Component);

Validator$1.propTypes = {
  showError: PropTypes.bool,
  children: PropTypes.func.isRequired,

  /* eslint-disable react/forbid-prop-types */
  rules: PropTypes.array,
  initial: PropTypes.any,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string
};
Validator$1.defaultProps = {
  showError: false,
  rules: [],
  initial: '',
  onChange: noop,
  prefixCls: 'pile-validator'
};

module.exports = Validator$1;
//# sourceMappingURL=validator.js.map
