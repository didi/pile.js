"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Drawer = function Drawer(props) {
  var normalMsg = props.normalMsg,
      children = props.children,
      others = _objectWithoutProperties(props, ["normalMsg", "children"]);

  return _react2.default.createElement(
    "div",
    _extends({ className: "drawer" }, others),
    children && _react2.default.createElement(
      "div",
      null,
      children
    ),
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "p",
        null,
        normalMsg
      )
    )
  );
};

exports.default = Drawer;