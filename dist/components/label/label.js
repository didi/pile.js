'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Created by yanshenshen on 17/10/19.
                                                                                                                                                                                                                             */


var propTypes = {
  type: _propTypes2.default.string
};
var defaultProps = {
  type: 'success' // 成功 ： success 、 警告 ： warning 、失败 ： fail
};

var Label = function Label(props) {
  var _classNames;

  var type = props.type,
      className = props.className,
      children = props.children,
      others = _objectWithoutProperties(props, ['type', 'className', 'children']);

  var cls = (0, _classnames2.default)((_classNames = {
    'jimu-lable': true
  }, _defineProperty(_classNames, 'jimu-lable-' + type, true), _defineProperty(_classNames, className, className), _classNames));
  return _react2.default.createElement(
    _button2.default,
    _extends({ size: 'small' }, others, { className: cls }),
    children
  );
};
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;
exports.default = Label;