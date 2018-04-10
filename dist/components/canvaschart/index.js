'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chartline = require('./chartline');

var _chartline2 = _interopRequireDefault(_chartline);

var _chartcircle = require('./chartcircle');

var _chartcircle2 = _interopRequireDefault(_chartcircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by zhaojiejane 2018.01.01.
 */

exports.default = {
  ChartLine: _chartline2.default,
  ChartCircle: _chartcircle2.default
};