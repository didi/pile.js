/*!
 * @pile-ui/field.js v2.0.5-alpha.0
 * (c) 2018-2019 renmaomin <renmaomin@126.com> (https://github.com/renmm)
 * Released under the MIT License.
 */
import { createElement } from 'react';
import { string, oneOfType, arrayOf, node, oneOf, func, bool } from 'prop-types';
import classNames from 'classnames';

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
  return createElement("div", {
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
  }, createElement("div", {
    className: labelCls
  }, children), createElement("div", {
    className: valueCls
  }, createElement("div", {
    className: wrapperCls
  }, value || placeholder)), createElement("div", {
    className: "".concat(prefixCls, "--extraAfter")
  }, extraAfter), arrow && createElement("div", {
    className: "".concat(prefixCls, "--icon pile-icon-arrow-right")
  }));
};

Field.propTypes = {
  prefixCls: string,
  children: oneOfType([arrayOf(node), node]),
  value: oneOfType([arrayOf(node), node]),
  placeholder: oneOfType([arrayOf(node), node]),
  align: oneOf(['left', 'right']),
  onClick: func,
  arrow: bool,
  extraAfter: oneOfType([arrayOf(node), node]),
  labelEllipsis: bool,
  valueEllipsis: bool
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
  return createElement("div", {
    className: cls
  }, title && createElement("div", {
    className: "".concat(prefixCls, "--title")
  }, title), children);
};

FieldSet.propTypes = {
  prefixCls: string,
  children: oneOfType([arrayOf(node), node]),
  title: oneOfType([arrayOf(node), node])
};
FieldSet.defaultProps = {
  prefixCls: 'pile-fieldset',
  children: null,
  title: ''
};

export { Field, FieldSet };
//# sourceMappingURL=field.esm.js.map
