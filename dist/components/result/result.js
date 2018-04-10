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
                                                                                                                                                                                                                              * Created by yanshenshen on 17/10/24.
                                                                                                                                                                                                                              */


var propTypes = {
  message: _propTypes2.default.string,
  size: _propTypes2.default.string,
  title: _propTypes2.default.string
};
var defaultProps = {
  title: '',
  message: false,
  size: 'big'
};

var Result = function Result(props) {
  var _classNames;

  var title = props.title,
      message = props.message,
      className = props.className,
      iconHtml = props.iconHtml,
      size = props.size,
      others = _objectWithoutProperties(props, ['title', 'message', 'className', 'iconHtml', 'size']);

  var cls = (0, _classnames2.default)((_classNames = {
    'jimu-result': true
  }, _defineProperty(_classNames, 'jimu-result-size-' + size, true), _defineProperty(_classNames, className, className), _classNames));
  return _react2.default.createElement(
    'div',
    _extends({ className: cls }, others),
    _react2.default.createElement(
      'div',
      { className: 'jimu-result-aside' },
      _react2.default.createElement(
        'div',
        { className: 'jimu-result-icon' },
        iconHtml
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'jimu-result-article' },
      title && _react2.default.createElement(
        'div',
        { className: 'jimu-result-title' },
        title
      ),
      message && _react2.default.createElement(
        'div',
        { className: 'jimu-result-message' },
        message
      )
    )
  );
};

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;
exports.default = Result;