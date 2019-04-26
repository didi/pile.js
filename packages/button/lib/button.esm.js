/*!
 * @pile-ui/button.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
import { createElement, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, sizeProperty, sizes, prefixClsProperty } from '@pile-ui/shared';
import { IfComponent } from '@pile-ui/condition';

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

var Button = function Button(_ref) {
  var _classNames;

  var children = _ref.children,
      className = _ref.className,
      prefixCls = _ref.prefixCls,
      size = _ref.size,
      type = _ref.type,
      icon = _ref.icon,
      loading = _ref.loading,
      nativeType = _ref.nativeType,
      block = _ref.block,
      href = _ref.href,
      circle = _ref.circle,
      props = objectWithoutProperties(_ref, ["children", "className", "prefixCls", "size", "type", "icon", "loading", "nativeType", "block", "href", "circle"]);

  var cls = classNames((_classNames = {}, defineProperty(_classNames, "".concat(prefixCls, "-button"), true), defineProperty(_classNames, "".concat(prefixCls, "-button--").concat(type), true), defineProperty(_classNames, className, className), defineProperty(_classNames, "is-".concat(size), size), defineProperty(_classNames, 'is-block', block), defineProperty(_classNames, 'is-disabled', props.disabled), defineProperty(_classNames, 'is-circle', circle), _classNames));
  var Component = href ? 'a' : 'button';
  var componentType = href ? {
    href: href
  } : {
    type: nativeType
  };
  var iconType = loading ? 'loading-snaker' : icon;
  var isIconType = typeof iconType === 'string';
  var iconCls = classNames(defineProperty({}, "".concat(prefixCls, "-button-icon"), true));
  var iconSelfCls = icon && icon.props && icon.props.className;
  return createElement(Component, _extends_1({}, componentType, {
    className: cls
  }, props), createElement(IfComponent, {
    when: isIconType
  }, function () {
    return createElement("i", {
      className: "".concat(prefixCls, "-icon-").concat(iconType, " ").concat(iconCls)
    });
  }), createElement(IfComponent, {
    when: !isIconType && icon !== null
  }, function () {
    var _classNames3;

    return cloneElement(icon, {
      className: classNames((_classNames3 = {}, defineProperty(_classNames3, iconSelfCls, iconSelfCls), defineProperty(_classNames3, iconCls, iconCls), _classNames3))
    });
  }), createElement("span", {
    className: "".concat(prefixCls, "-button-label")
  }, children));
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  type: PropTypes.oneOf(['primary', 'secondary', 'float']),
  nativeType: PropTypes.oneOf(['button', 'submit', 'reset']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loading: PropTypes.bool,
  href: PropTypes.string,
  circle: PropTypes.bool
};
Button.defaultProps = {
  children: null,
  type: 'secondary',
  nativeType: 'button',
  block: false,
  disabled: false,
  icon: null,
  loading: false,
  href: null,
  circle: false
};
var enhance = compose(sizeProperty([sizes.SMALL]), prefixClsProperty);
var Button$1 = enhance(Button);

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

var ButtonGroup = function ButtonGroup(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      children = _ref.children,
      block = _ref.block,
      divide = _ref.divide,
      borderColor = _ref.borderColor,
      props = objectWithoutProperties(_ref, ["prefixCls", "className", "children", "block", "divide", "borderColor"]);

  var cls = classNames((_classNames = {}, defineProperty(_classNames, "".concat(prefixCls, "-btn-group"), true), defineProperty(_classNames, 'is-divide', divide), defineProperty(_classNames, className, className), _classNames));
  return createElement("div", _extends_1({
    className: cls
  }, props), Children.map(children, function (child) {
    return cloneElement(child, {
      block: block,
      style: objectSpread({}, child.props.style, {
        borderColor: borderColor
      })
    });
  }));
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  block: PropTypes.bool,
  divide: PropTypes.bool,
  borderColor: PropTypes.string
};
ButtonGroup.defaultProps = {
  className: null,
  block: null,
  divide: false,
  borderColor: null
};
var enhance$1 = compose(sizeProperty([sizes.SMALL, sizes.LARGE]), prefixClsProperty);
var ButtonGroup$1 = enhance$1(ButtonGroup);

Button$1.ButtonGroup = ButtonGroup$1;

export default Button$1;
//# sourceMappingURL=button.esm.js.map
