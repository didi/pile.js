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
                                                                                                                                                                                                                              * Created by yanshenshen on 17/10/20.
                                                                                                                                                                                                                             */


var propTypes = {
  activeIndex: _propTypes2.default.number // 默认索引
};
var defaultProps = {
  activeIndex: 1
};

var NavBar = function NavBar(props) {
  var className = props.className,
      activeIndex = props.activeIndex,
      children = props.children,
      others = _objectWithoutProperties(props, ['className', 'activeIndex', 'children']);

  var cls = (0, _classnames2.default)(_defineProperty({
    'pile-navbar': true
  }, className, className));
  return _react2.default.createElement(
    'div',
    _extends({}, others, { className: cls }),
    _react2.default.Children.map(children, function (child, i) {
      if (!child) {
        return null;
      }
      var itemsCls = (0, _classnames2.default)(_defineProperty({
        'pile-nav-items': true,
        'pile-nav-items-selected': i === activeIndex - 1
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: itemsCls, key: i },
        child
      );
    })
  );
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
exports.default = NavBar;