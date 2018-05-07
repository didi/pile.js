"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * zhangjingwei 03/20/2017
                                                                                                                                                                                                                              */


var Card = function Card(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === undefined ? null : _ref$children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react2.default.createElement(
    "div",
    { className: "pile_card" },
    _react2.default.createElement(
      "div",
      props,
      children
    )
  );
};

exports.default = Card;