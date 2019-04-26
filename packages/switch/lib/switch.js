/*!
 * @pile-ui/switch.js v2.0.5-alpha.0
 * (c) 2018-2019 xiejunda <xiejunda@didichuxing.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classnames = _interopDefault(require('classnames'));
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
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

var Switch =
/*#__PURE__*/
function (_React$Component) {
  inherits(Switch, _React$Component);

  function Switch(props) {
    var _this;

    classCallCheck(this, Switch);

    _this = possibleConstructorReturn(this, getPrototypeOf(Switch).call(this, props));
    var checked = props.checked,
        disabled = props.disabled;
    _this.onClick = _this.onClick.bind(assertThisInitialized(_this));
    _this.onKeyPress = _this.onKeyPress.bind(assertThisInitialized(_this));
    _this.state = {
      checked: !!checked,
      disabled: !!disabled
    };
    return _this;
  }
  /**
   * 将 CSS 长度单位减去相应数值并转换
   * 如 getMinusedSize(1) => 1px
   * 如 getMinusedSize(3, 1) => 2px
   * @param {*} size
   * @param {*} minusNum
   */


  createClass(Switch, [{
    key: "onClick",
    value: function onClick(e) {
      /* eslint-disable prefer-const */
      var _this$state = this.state,
          checked = _this$state.checked,
          disabled = _this$state.disabled;
      var onChange = this.props.onChange;

      if (disabled) {
        return;
      }

      checked = !checked;
      if (onChange) onChange(checked, e);
      /* eslint-enable prefer-const */

      this.setState({
        checked: checked
      });
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.onClick(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          checkedColor = _this$props.checkedColor,
          name = _this$props.name,
          color = _this$props.color,
          width = _this$props.width,
          height = _this$props.height;
      var _this$state2 = this.state,
          checked = _this$state2.checked,
          disabled = _this$state2.disabled;
      var transedWidth = Switch.getMinusedSize(width);
      var transedHeight = Switch.getMinusedSize(height);
      var minusedHeight = Switch.getMinusedSize(height, 2);
      var borderRadius = transedHeight;
      var divWrapCSS = classnames((_classnames = {}, defineProperty(_classnames, "".concat(prefixCls, "-switch--wrap"), true), defineProperty(_classnames, "isDisabled", disabled), _classnames));
      var divWrapStyle = {
        backgroundColor: checked ? checkedColor : color,
        width: transedWidth,
        height: transedHeight,
        borderRadius: borderRadius
      };
      var divInnerStyle = {
        width: minusedHeight,
        height: minusedHeight,
        borderRadius: minusedHeight,
        border: checked ? "1px solid ".concat(checkedColor) : "1px solid ".concat(color),
        left: !checked ? '1px' : '100%',
        marginLeft: !checked ? 0 : "-".concat(Switch.getMinusedSize(height, 1))
      };
      return React.createElement("div", {
        className: divWrapCSS,
        style: divWrapStyle,
        role: "switch",
        "aria-checked": checked,
        tabIndex: "0",
        onClick: this.onClick,
        onKeyPress: this.onKeyPress
      }, React.createElement("input", {
        type: "checkbox",
        name: name,
        value: checked
      }), React.createElement("div", {
        style: divInnerStyle
      }));
    }
  }], [{
    key: "getMinusedSize",
    value: function getMinusedSize(size) {
      var minusNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (typeof size === 'number') {
        return "".concat(size - minusNum, "px");
      }

      if (typeof size !== 'string') {
        return JSON.stringify(size);
      }

      var reg = /\d+/;
      var transedSize = size.replace(reg, function (matchNum) {
        return Number(matchNum) - minusNum;
      }); // 如果输入了非数字字符串，则直接 return

      if (!/^\d+$/.test(size)) {
        return transedSize;
      }

      return "".concat(transedSize, "px");
    }
  }]);

  return Switch;
}(React.Component);

Switch.defaultProps = {
  checked: false,
  disabled: false,
  name: '',
  color: '#ccc',
  checkedColor: '#343c5c',
  width: '50px',
  height: '30px',
  onChange: function onChange() {}
};
Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  checkedColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};
var index = shared.prefixClsProperty(Switch);

module.exports = index;
//# sourceMappingURL=switch.js.map
