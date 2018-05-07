'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _guideTip = require('./guideTip');

var _guideTip2 = _interopRequireDefault(_guideTip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Tooltip: _tooltip2.default,
  GuideTooltip: _guideTip2.default
};