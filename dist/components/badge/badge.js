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
                                                                                                                                                                                                                              * Created by yanshenshen on 17/10/19.
                                                                                                                                                                                                                             */


var Badge = function Badge(props) {
  var _classNames;

  var className = props.className,
      number = props.number,
      type = props.type,
      others = _objectWithoutProperties(props, ['className', 'number', 'type']);

  var cls = (0, _classnames2.default)((_classNames = {
    'jimu-badge': true,
    'jimu-badge-full': number
  }, _defineProperty(_classNames, 'jimu-badge-' + type, !number && type), _defineProperty(_classNames, className, className), _classNames));
  return _react2.default.createElement(
    'span',
    _extends({}, others, { className: cls }),
    number
  );
};
Badge.propTypes = {
  type: _propTypes2.default.string,
  number: _propTypes2.default.string
};
Badge.defaultProps = {
  type: 'small', // small ： 小于25pt/dp 切线外交点 、 middle ： 25-40pt/dp 切线中交点 、 big ： 大于40pt/dp 切线内交点
  number: ''
};

exports.default = Badge;