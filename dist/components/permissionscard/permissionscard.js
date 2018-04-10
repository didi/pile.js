'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../label/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * yanshenshen 11/01/2017
                                                                                                                                                                                                                              */


var PermissionsCard = function PermissionsCard(props) {
  var className = props.className,
      titleHTML = props.titleHTML,
      labelTitle = props.labelTitle,
      labelType = props.labelType,
      messageHTML = props.messageHTML,
      iconHTML = props.iconHTML,
      others = _objectWithoutProperties(props, ['className', 'titleHTML', 'labelTitle', 'labelType', 'messageHTML', 'iconHTML']),
      cls = (0, _classnames2.default)(_defineProperty({
    'jimu-permissions-card': true,
    'jimu-permissions-aside-icon': iconHTML
  }, className, className)),
      Component = props.href ? 'a' : 'div';

  return _react2.default.createElement(
    Component,
    _extends({ className: cls }, others),
    _react2.default.createElement(
      'div',
      { className: 'jimu-permissions-icon' },
      iconHTML
    ),
    _react2.default.createElement(
      'div',
      { className: 'jimu-permissions-hd' },
      titleHTML && _react2.default.createElement(
        'div',
        { className: 'jimu-permissions-title' },
        titleHTML
      ),
      labelTitle && _react2.default.createElement(
        _index2.default,
        { type: labelType },
        labelTitle
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'jimu-permissions-message' },
      messageHTML
    )
  );
};
exports.default = PermissionsCard;