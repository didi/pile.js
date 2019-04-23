/*!
 * @pile-ui/field.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var Field = function Field(_ref) {
  var _classNames, _classNames2, _classNames3, _classNames4;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      children = _ref.children,
      value = _ref.value,
      placeholder = _ref.placeholder,
      align = _ref.align,
      onClick = _ref.onClick,
      arrow = _ref.arrow,
      extraAfter = _ref.extraAfter,
      labelEllipsis = _ref.labelEllipsis,
      valueEllipsis = _ref.valueEllipsis;
  var cls = classNames((_classNames = {}, defineProperty(_classNames, prefixCls, true), defineProperty(_classNames, className, className), defineProperty(_classNames, 'is-clickable', !!onClick), _classNames));
  var labelCls = classNames((_classNames2 = {}, defineProperty(_classNames2, "".concat(prefixCls, "--label"), true), defineProperty(_classNames2, 'is-ellips', labelEllipsis), _classNames2));
  var valueCls = classNames((_classNames3 = {}, defineProperty(_classNames3, "".concat(prefixCls, "-value"), true), defineProperty(_classNames3, 'is-placeholder', !value), defineProperty(_classNames3, 'is-right', align === 'right'), _classNames3));
  var wrapperCls = classNames((_classNames4 = {}, defineProperty(_classNames4, "".concat(prefixCls, "-value--wrapper"), true), defineProperty(_classNames4, 'is-ellips', valueEllipsis), _classNames4));
  return React.createElement("div", {
    className: cls,
    role: "button",
    tabIndex: "0",
    onClick: onClick ? function (e) {
      return onClick(value, e);
    } : null,
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (onClick) onClick(value, e);
      }
    }
  }, React.createElement("div", {
    className: labelCls
  }, children), React.createElement("div", {
    className: valueCls
  }, React.createElement("div", {
    className: wrapperCls
  }, value || placeholder)), React.createElement("div", {
    className: "".concat(prefixCls, "--extraAfter")
  }, extraAfter), arrow && React.createElement("div", {
    className: "".concat(prefixCls, "--icon pile-icon-arrow-right")
  }));
};

Field.propTypes = {
  prefixCls: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  placeholder: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  align: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  arrow: PropTypes.bool,
  extraAfter: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  labelEllipsis: PropTypes.bool,
  valueEllipsis: PropTypes.bool
};
Field.defaultProps = {
  prefixCls: 'pile-field',
  children: null,
  value: null,
  placeholder: null,
  align: 'left',
  onClick: null,
  arrow: false,
  extraAfter: null,
  labelEllipsis: false,
  valueEllipsis: true
};

var FieldSet = function FieldSet(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      className = _ref.className,
      children = _ref.children,
      title = _ref.title;
  var cls = classNames((_classNames = {}, defineProperty(_classNames, prefixCls, true), defineProperty(_classNames, className, className), _classNames));
  return React.createElement("div", {
    className: cls
  }, title && React.createElement("div", {
    className: "".concat(prefixCls, "--title")
  }, title), children);
};

FieldSet.propTypes = {
  prefixCls: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
FieldSet.defaultProps = {
  prefixCls: 'pile-fieldset',
  children: null,
  title: ''
};

exports.Field = Field;
exports.FieldSet = FieldSet;
//# sourceMappingURL=field.js.map
