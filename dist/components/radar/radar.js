'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* yanshenshen 2017、5、9 */


// 时间选择组件

var propTypes = {
  width: _propTypes2.default.number,
  contentText: _propTypes2.default.string,
  contentBg: _propTypes2.default.string,
  contentWidth: _propTypes2.default.number,
  shadowWidth: _propTypes2.default.number,
  shadowBgColor: _propTypes2.default.string,
  contentFontSize: _propTypes2.default.string,
  contentColor: _propTypes2.default.string,
  lineBorderColor: _propTypes2.default.string,
  ladarStartBgColor: _propTypes2.default.string,
  ladarMidBgColor: _propTypes2.default.string,
  ladarEndBgColor: _propTypes2.default.string
};

var defaultProps = {
  width: 300, //
  contentText: '呼叫中',
  contentBg: '#1E96FA',
  contentWidth: 60,
  shadowWidth: 100,
  shadowBgColor: '#1E96FA',
  contentFontSize: '1.2rem',
  contentColor: '#fff',
  lineBorderColor: '#cee4f7',
  ladarStartBgColor: 'rgba(30, 150, 250, 0.3)',
  ladarMidBgColor: 'rgba(30, 150, 250, 0.1)',
  ladarEndBgColor: 'rgba(30, 150, 250, 0)'
};
var Radar = function Radar(props) {
  var contentText = props.contentText,
      width = props.width,
      contentBg = props.contentBg,
      contentWidth = props.contentWidth,
      contentFontSize = props.contentFontSize,
      contentColor = props.contentColor,
      lineBorderColor = props.lineBorderColor,
      shadowWidth = props.shadowWidth,
      shadowBgColor = props.shadowBgColor,
      ladarStartBgColor = props.ladarStartBgColor,
      ladarEndBgColor = props.ladarEndBgColor,
      ladarMidBgColor = props.ladarMidBgColor,
      others = _objectWithoutProperties(props, ['contentText', 'width', 'contentBg', 'contentWidth', 'contentFontSize', 'contentColor', 'lineBorderColor', 'shadowWidth', 'shadowBgColor', 'ladarStartBgColor', 'ladarEndBgColor', 'ladarMidBgColor']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'radar-layout', style: { width: width + 'px', height: width + 'px' } }, others),
    _react2.default.createElement('div', { className: 'out-line', style: { width: width * 0.9 + 'px', height: width * 0.9 + 'px' } }),
    _react2.default.createElement(
      'div',
      { className: 'radar-bd', style: { width: width * 0.8 + 'px', height: width * 0.8 + 'px' } },
      _react2.default.createElement('div', {
        className: 'radar-line line-01',
        style: {
          width: width * 0.8 + 'px', height: width * 0.8 + 'px', borderColor: '' + lineBorderColor, opacity: '1'
        }
      }),
      _react2.default.createElement('div', {
        className: 'radar-line line-02',
        style: {
          width: width * 0.6 + 'px', height: width * 0.6 + 'px', borderColor: '' + lineBorderColor, opacity: '.55'
        }
      }),
      _react2.default.createElement('div', {
        className: 'radar-line line-03',
        style: {
          width: width * 0.4 + 'px', height: width * 0.4 + 'px', borderColor: '' + lineBorderColor, opacity: '.4'
        }
      }),
      _react2.default.createElement(
        'div',
        {
          className: 'radar-content',
          style: {
            width: contentWidth + 'px', height: contentWidth + 'px', background: '' + contentBg, color: '' + contentColor, fontSize: '' + contentFontSize, lineHeight: contentWidth + 'px'
          }
        },
        contentText
      ),
      _react2.default.createElement(
        'div',
        { className: 'radar-dian-layout', style: { width: width * 0.8 + 'px', height: width * 0.8 + 'px' } },
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-01' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-02' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-03' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-04' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-05' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-06' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-07' }),
        _react2.default.createElement('b', { className: 'radar-dian radar-dian-08' })
      ),
      _react2.default.createElement('div', { className: 'radar-line' }),
      _react2.default.createElement('div', {
        className: 'radar-shadow',
        style: {
          width: shadowWidth + 'px', height: shadowWidth + 'px', background: '' + shadowBgColor, margin: ' -' + shadowWidth / 2 + 'px 0 0 -' + shadowWidth / 2 + 'px'
        }
      }),
      _react2.default.createElement(
        'div',
        { className: 'radar-sector radar-sector-1', style: { width: width * 0.8 + 'px', height: width * 0.8 + 'px', margin: '-' + width * 0.4 + 'px 0 0 -' + width * 0.4 + 'px' } },
        _react2.default.createElement(
          'div',
          { className: 'radar-sector-bg', style: { clip: 'rect(' + width * 0.4 + 'px,' + width * 0.4 + 'px,' + width * 0.8 + 'px,0px)', backgroundImage: 'linear-gradient(to right, ' + ladarStartBgColor + ' 0%, ' + ladarMidBgColor + ' 20%, ' + ladarEndBgColor + ' 100%)' } },
          _react2.default.createElement('b', { className: 'radar-sector-line1', style: { background: '' + contentBg } })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'radar-sector radar-sector-2', style: { width: width * 0.8 + 'px', height: width * 0.8 + 'px', margin: '-' + width * 0.4 + 'px 0 0 -' + width * 0.4 + 'px' } },
        _react2.default.createElement(
          'div',
          { className: 'radar-sector-bg', style: { clip: 'rect(' + width * 0.4 + 'px,' + width * 0.4 + 'px,' + width * 0.8 + 'px,0px)', backgroundImage: 'linear-gradient(to right, ' + ladarStartBgColor + ' 0%, ' + ladarMidBgColor + ' 20%, ' + ladarEndBgColor + ' 100%)' } },
          _react2.default.createElement('b', { className: 'radar-sector-line2', style: { background: '' + contentBg } })
        )
      ),
      _react2.default.createElement('div', { className: '' })
    )
  );
};
Radar.propTypes = propTypes;
Radar.defaultProps = defaultProps;
module.exports = Radar;