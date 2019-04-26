/*!
 * @pile-ui/radio.js v2.0.5-alpha.0
 * (c) 2018-2019 peibiao <peibiao@didichuxing.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var shared = require('@pile-ui/shared');

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

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var inheritsLoose = _inheritsLoose;

var setStatic_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */

    return BaseComponent;
  };
};

var _default = setStatic;
exports.default = _default;
});

unwrapExports(setStatic_1);

var setDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _setStatic = interopRequireDefault(setStatic_1);

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic.default)('displayName', displayName);
};

var _default = setDisplayName;
exports.default = _default;
});

unwrapExports(setDisplayName_1);

var getDisplayName_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

var _default = getDisplayName;
exports.default = _default;
});

unwrapExports(getDisplayName_1);

var wrapDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _getDisplayName = interopRequireDefault(getDisplayName_1);

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + "(" + (0, _getDisplayName.default)(BaseComponent) + ")";
};

var _default = wrapDisplayName;
exports.default = _default;
});

unwrapExports(wrapDisplayName_1);

var mapValues_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var mapValues = function mapValues(obj, func) {
  var result = {};
  /* eslint-disable no-restricted-syntax */

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key);
    }
  }
  /* eslint-enable no-restricted-syntax */


  return result;
};

var _default = mapValues;
exports.default = _default;
});

unwrapExports(mapValues_1);

var withHandlers_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _inheritsLoose2 = interopRequireDefault(inheritsLoose);



var _setDisplayName = interopRequireDefault(setDisplayName_1);

var _wrapDisplayName = interopRequireDefault(wrapDisplayName_1);

var _mapValues = interopRequireDefault(mapValues_1);

/* eslint-disable no-console */
var withHandlers = function withHandlers(handlers) {
  return function (BaseComponent) {
    var factory = (0, React__default.createFactory)(BaseComponent);

    var WithHandlers =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(WithHandlers, _Component);

      function WithHandlers() {
        var _this;

        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }

        _this = _Component.call.apply(_Component, [this].concat(_args)) || this;
        _this.handlers = (0, _mapValues.default)(typeof handlers === 'function' ? handlers(_this.props) : handlers, function (createHandler) {
          return function () {
            var handler = createHandler(_this.props);

            if (process.env.NODE_ENV !== 'production' && typeof handler !== 'function') {
              console.error( // eslint-disable-line no-console
              'withHandlers(): Expected a map of higher-order functions. ' + 'Refer to the docs for more info.');
            }

            return handler.apply(void 0, arguments);
          };
        });
        return _this;
      }

      var _proto = WithHandlers.prototype;

      _proto.render = function render() {
        return factory((0, _extends2.default)({}, this.props, this.handlers));
      };

      return WithHandlers;
    }(React__default.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)((0, _wrapDisplayName.default)(BaseComponent, 'withHandlers'))(WithHandlers);
    }

    return WithHandlers;
  };
};

var _default = withHandlers;
exports.default = _default;
});

var _withHandlers = unwrapExports(withHandlers_1);

var compose_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  }, function (arg) {
    return arg;
  });
};

var _default = compose;
exports.default = _default;
});

var _compose = unwrapExports(compose_1);

var enhanced = _compose(_withHandlers({
  onItemClick: function onItemClick(props) {
    return function (value) {
      return function (event) {
        if (props.onClick) return props.onClick(event);
        if (props.disabled) return null;
        return props.onChange(value, event);
      };
    };
  }
}));
/* eslint-disable react/prop-types, no-param-reassign, react/no-unused-prop-types */


var Radio = function Radio(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      onItemClick = _ref.onItemClick,
      checked = _ref.checked,
      disabled = _ref.disabled,
      value = _ref.value,
      children = _ref.children,
      clsicon = _ref.clsicon,
      name = _ref.name,
      vertical = _ref.vertical;
  var cls = classNames((_classNames = {}, defineProperty(_classNames, "".concat(prefixCls, "-radio"), true), defineProperty(_classNames, "".concat(prefixCls, "-radio-vertical"), vertical), defineProperty(_classNames, className, className), _classNames));

  if (!clsicon) {
    if (checked) {
      var _classNames2;

      clsicon = classNames((_classNames2 = {}, defineProperty(_classNames2, "".concat(prefixCls, "-radio-icon"), true), defineProperty(_classNames2, "".concat(prefixCls, "-radio-checked"), true), defineProperty(_classNames2, "".concat(prefixCls, "-radio-vertical-icon"), vertical), defineProperty(_classNames2, "".concat(prefixCls, "-radio-disabled"), disabled), _classNames2));
    } else {
      var _classNames3;

      clsicon = classNames((_classNames3 = {}, defineProperty(_classNames3, "".concat(prefixCls, "-radio-icon"), true), defineProperty(_classNames3, "".concat(prefixCls, "-radio-no"), true), defineProperty(_classNames3, "".concat(prefixCls, "-radio-vertical-icon"), vertical), defineProperty(_classNames3, "".concat(prefixCls, "-radio-disabled-no"), disabled), _classNames3));
    }
  }

  return React.createElement("div", {
    className: cls
  }, React.createElement("label", {
    className: "".concat(prefixCls, "-radio-label"),
    htmlFor: "".concat(prefixCls, "-radio-").concat(value),
    onClick: onItemClick(value)
  }, React.createElement("input", {
    className: "".concat(prefixCls, "-radio-label-input"),
    value: value,
    defaultChecked: checked,
    type: "radio",
    name: name
  }), React.createElement("span", {
    id: "".concat(prefixCls, "-radio-").concat(value),
    className: clsicon
  }), React.createElement("span", {
    className: "".concat(prefixCls, "-radio-text")
  }, children)));
};

Radio.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  vertical: PropTypes.bool
};
Radio.defaultProps = {
  disabled: false,
  checked: false,
  onChange: function onChange() {},
  value: '',
  vertical: false
};
var enhance = shared.compose(shared.sizeProperty([shared.sizes.SMALL, shared.sizes.LARGE]), shared.prefixClsProperty);
var Radio$1 = enhanced(enhance(Radio));

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

var withState_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _extends3 = interopRequireDefault(_extends_1);

var _inheritsLoose2 = interopRequireDefault(inheritsLoose);



var _setDisplayName = interopRequireDefault(setDisplayName_1);

var _wrapDisplayName = interopRequireDefault(wrapDisplayName_1);

var withState = function withState(stateName, stateUpdaterName, initialState) {
  return function (BaseComponent) {
    var factory = (0, React__default.createFactory)(BaseComponent);

    var WithState =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(WithState, _Component);

      function WithState() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.state = {
          stateValue: typeof initialState === 'function' ? initialState(_this.props) : initialState
        };

        _this.updateStateValue = function (updateFn, callback) {
          return _this.setState(function (_ref) {
            var stateValue = _ref.stateValue;
            return {
              stateValue: typeof updateFn === 'function' ? updateFn(stateValue) : updateFn
            };
          }, callback);
        };

        return _this;
      }

      var _proto = WithState.prototype;

      _proto.render = function render() {
        var _extends2;

        return factory((0, _extends3.default)({}, this.props, (_extends2 = {}, _extends2[stateName] = this.state.stateValue, _extends2[stateUpdaterName] = this.updateStateValue, _extends2)));
      };

      return WithState;
    }(React__default.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)((0, _wrapDisplayName.default)(BaseComponent, 'withState'))(WithState);
    }

    return WithState;
  };
};

var _default = withState;
exports.default = _default;
});

var _withState = unwrapExports(withState_1);

var enhanced$1 = _compose(_withState('selectedValue', 'updateValue', function (props) {
  return props.defaultValue;
}), _withHandlers({
  onClick: function onClick(props) {
    return function (item) {
      return function (event) {
        if (props.disabled || item.disabled) return null;
        props.updateValue(item.value);
        return props.onChange(item.value, event);
      };
    };
  }
}));

var RadioGroup = enhanced$1(function (_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      onClick = _ref.onClick,
      options = _ref.options,
      selectedValue = _ref.selectedValue,
      disabled = _ref.disabled,
      children = _ref.children,
      onChange = _ref.onChange,
      name = _ref.name,
      vertical = _ref.vertical;
  var cls = classNames((_classNames = {}, defineProperty(_classNames, "".concat(prefixCls, "-radio-group"), true), defineProperty(_classNames, className, className), _classNames));
  /* eslint-disable no-param-reassign, no-unused-expressions */

  options && options.forEach(function (item) {
    if (item.value === selectedValue) {
      var _classNames2;

      item.clsicon = classNames((_classNames2 = {}, defineProperty(_classNames2, "".concat(prefixCls, "-radio-icon"), true), defineProperty(_classNames2, "".concat(prefixCls, "-radio-checked"), true), defineProperty(_classNames2, "".concat(prefixCls, "-radio-vertical-icon"), vertical), defineProperty(_classNames2, "".concat(prefixCls, "-radio-disabled"), disabled || item.disabled), _classNames2));
    } else {
      var _classNames3;

      item.clsicon = classNames((_classNames3 = {}, defineProperty(_classNames3, "".concat(prefixCls, "-radio-icon"), true), defineProperty(_classNames3, "".concat(prefixCls, "-radio-no"), true), defineProperty(_classNames3, "".concat(prefixCls, "-radio-vertical-icon"), vertical), defineProperty(_classNames3, "".concat(prefixCls, "-radio-disabled-no"), disabled || item.disabled), _classNames3));
    }
  });
  return React.createElement("div", {
    className: cls
  }, options && options.map(function (item, index) {
    return React.createElement(Radio$1, _extends_1({}, item, {
      /* eslint-disable react/no-array-index-key */
      key: "".concat(item.value).concat(index),
      onClick: onClick(item),
      onChange: onChange,
      name: name,
      vertical: vertical,
      checked: item.value === selectedValue
    }), item.label);
  }), !options && React.Children.map(children, function (child) {
    return React.cloneElement(child, objectSpread({}, child.props, {
      onClick: onClick(child.props),
      onChange: onChange,
      name: name,
      checked: child.props.value === selectedValue
    }));
  }));
});
RadioGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,

  /* eslint-disable react/forbid-prop-types */
  options: PropTypes.array
};
RadioGroup.defaultProps = {
  disabled: false,
  onChange: function onChange() {}
};
var enhance$1 = shared.compose(shared.sizeProperty([shared.sizes.SMALL, shared.sizes.LARGE]), shared.prefixClsProperty);
var RadioGroup$1 = enhance$1(RadioGroup);

Radio$1.RadioGroup = RadioGroup$1;

module.exports = Radio$1;
//# sourceMappingURL=radio.js.map
