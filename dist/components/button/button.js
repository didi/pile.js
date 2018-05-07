'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by jf on 15/10/27.
                                                                                                                                                                                                                              */

var Button = function Button(props) {
  var type = props.type,
      size = props.size,
      disabled = props.disabled,
      plain = props.plain,
      className = props.className,
      children = props.children,
      selected = props.selected,
      float = props.float,
      others = _objectWithoutProperties(props, ['type', 'size', 'disabled', 'plain', 'className', 'children', 'selected', 'float']);

  var Component = props.href ? 'a' : 'button';
  var cls = (0, _classnames2.default)(_defineProperty({
    pile_btn: true,
    'pile-button-type-float': float,
    pile_btn_highlight: type === 'highlight' && !plain,
    pile_btn_highlight_disable: type === 'highlight' && disabled,
    pile_btn_border: size === 'small',
    pile_btn_disable: disabled,
    pile_btn_selected: selected
  }, className, className));

  return _react2.default.createElement(
    Component,
    _extends({}, others, { className: cls }),
    children
  );
};

Button.propTypes = {
  disabled: _propTypes2.default.bool,
  float: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(['highlight', 'primary']),
  size: _propTypes2.default.oneOf(['small', 'normal'])
};

Button.defaultProps = {
  disabled: false,
  type: 'primary',
  size: 'normal',
  float: false,
  selected: false
};

exports.default = Button;