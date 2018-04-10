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


var Message = function Message(props) {
  var children = props.children,
      others = _objectWithoutProperties(props, ["children"]);

  return _react2.default.createElement(
    "div",
    { className: "jimu_message" },
    _react2.default.createElement(
      "div",
      others,
      children
    )
  );
};

exports.default = Message;