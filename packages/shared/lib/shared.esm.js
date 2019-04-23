/*!
 * @pile-ui/shared.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
import PropTypes from 'prop-types';
import { forwardRef, createElement, Component } from 'react';

var XTINY = 'xtiny';
var TINY = 'tiny';
var XSMALL = 'xsmall';
var SMALL = 'small';
var XLARGE = 'xlarge';
var LARGE = 'large';
var sizes = {
  XTINY: XTINY,
  TINY: TINY,
  XSMALL: XSMALL,
  SMALL: SMALL,
  XLARGE: XLARGE,
  LARGE: LARGE
};

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

var curry = function curry(fn) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 0) {
      throw Error('EMPTY INVOCATION');
    }

    if (args.length >= fn.length - optional) {
      return fn.apply(void 0, args);
    }

    return curry(fn.bind.apply(fn, [null].concat(args)), optional);
  };
};

/* eslint-disable no-param-reassign */

var sizeProperty = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = null;
  }

  Component.propTypes = objectSpread({}, Component.propTypes, {
    size: PropTypes.oneOf(sizes)
  });

  if (!Component.defaultProps) {
    Component.defaultProps = {};
  }

  Component.defaultProps.size = defaultSize;
  return Component;
}, 1);

/* eslint-disable no-param-reassign */

var prefixCls = curry(function (ns, Component) {
  if (!Component) {
    Component = ns;
    ns = 'pile';
  }

  Component.propTypes = objectSpread({}, Component.propTypes, {
    prefixCls: PropTypes.string
  });

  if (!Component.defaultProps) {
    Component.defaultProps = {};
  }

  Component.defaultProps.prefixCls = ns;
  return Component;
}, 1);

var compose2 = function compose2(f, g) {
  return function () {
    return f(g.apply(void 0, arguments));
  };
};

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(compose2);
};

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

/* eslint-disable no-param-reassign */

var refProperty = curry(function (Component$1) {
  var LogProps =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(LogProps, _React$Component);

    function LogProps() {
      classCallCheck(this, LogProps);

      return possibleConstructorReturn(this, getPrototypeOf(LogProps).apply(this, arguments));
    }

    createClass(LogProps, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            forwardedRef = _this$props.forwardedRef,
            rest = objectWithoutProperties(_this$props, ["forwardedRef"]);

        return createElement(Component$1, _extends_1({
          ref: forwardedRef
        }, rest));
      }
    }]);

    return LogProps;
  }(Component);

  function forwardRef$1(props, ref) {
    return createElement(LogProps, _extends_1({}, props, {
      forwardedRef: ref
    }));
  }

  var name = Component$1.displayName || Component$1.name;
  forwardRef$1.displayName = "logProps(".concat(name, ")");
  return forwardRef(forwardRef$1);
}, 1);

export { compose, compose2, prefixCls as prefixClsProperty, refProperty, sizeProperty, sizes };
//# sourceMappingURL=shared.esm.js.map
