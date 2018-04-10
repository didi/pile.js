'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/04/10.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ringloading = (_temp = _class = function (_React$Component) {
  _inherits(Ringloading, _React$Component);

  function Ringloading() {
    _classCallCheck(this, Ringloading);

    return _possibleConstructorReturn(this, (Ringloading.__proto__ || Object.getPrototypeOf(Ringloading)).apply(this, arguments));
  }

  _createClass(Ringloading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          border = _props.border,
          borderColor = _props.borderColor,
          contentColor = _props.contentColor,
          textSize = _props.textSize,
          contentBgColor = _props.contentBgColor,
          ringTimer = _props.ringTimer,
          ballShow = _props.ballShow,
          bottomRingBgColor = _props.bottomRingBgColor,
          ballBgColor = _props.ballBgColor,
          className = _props.className,
          others = _objectWithoutProperties(_props, ['width', 'border', 'borderColor', 'contentColor', 'textSize', 'contentBgColor', 'ringTimer', 'ballShow', 'bottomRingBgColor', 'ballBgColor', 'className']);

      var cls = (0, _classnames2.default)(_defineProperty({
        'ring-loading': true
      }, className, className));

      var ringWidth = width + border * 2;

      return _react2.default.createElement(
        'div',
        _extends({ className: cls }, others, { style: { width: ringWidth + 'px', height: ringWidth + 'px' } }),
        _react2.default.createElement('div', { className: 'bottom-ring-bg', style: { width: ringWidth + 'px', height: ringWidth + 'px', background: '' + bottomRingBgColor } }),
        _react2.default.createElement(
          'div',
          { className: 'ring-left', style: { width: ringWidth / 2 + 'px', height: ringWidth + 'px' } },
          _react2.default.createElement('div', {
            className: 'left-shadow',
            style: {
              width: ringWidth / 2 + 'px', height: ringWidth + 'px', borderRadius: ringWidth + 'px 0  0 ' + ringWidth + 'px', background: '' + borderColor, WebkitAnimationDuration: ringTimer / 1000 + 's'
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'ring-right', style: { width: ringWidth / 2 + 'px', height: ringWidth + 'px' } },
          _react2.default.createElement('div', {
            className: 'right-shadow',
            style: {
              width: ringWidth / 2 + 'px', height: ringWidth + 'px', borderRadius: '0 ' + ringWidth + 'px ' + ringWidth + 'px 0', background: '' + borderColor, WebkitAnimationDuration: ringTimer / 1000 + 's'
            }
          })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'progress',
            style: {
              width: width + 'px', height: width + 'px', lineHeight: width + 'px', color: '' + contentColor, fontSize: '' + textSize, backgroundColor: '' + contentBgColor
            }
          },
          this.props.text
        ),
        ballShow && _react2.default.createElement(
          'div',
          { className: 'ring-ball-circular', style: { WebkitAnimationDuration: ringTimer / 1000 / 2 + 's' } },
          _react2.default.createElement('span', { className: 'ring-ball', style: { background: '' + ballBgColor } })
        )
      );
    }
  }]);

  return Ringloading;
}(_react2.default.Component), _class.propTypes = {
  text: _propTypes2.default.string,
  width: _propTypes2.default.number,
  border: _propTypes2.default.number,
  borderColor: _propTypes2.default.string,
  contentColor: _propTypes2.default.string,
  ballBgColor: _propTypes2.default.string,
  textSize: _propTypes2.default.string,
  contentBgColor: _propTypes2.default.string,
  bottomRingBgColor: _propTypes2.default.string,
  ballShow: _propTypes2.default.bool,
  ringTimer: _propTypes2.default.number
}, _class.defaultProps = {
  text: 'loading...', // 圈内文字展示
  width: 200, // 圆直径
  border: 2, // 边框宽度
  borderColor: '#4a4c5b', // 边框颜色
  ballBgColor: '#ff8741', // 小球颜色
  contentColor: '#4a4c5b', // 内容颜色
  contentBgColor: '#fff', // 内容背景颜色
  textSize: '14px', // 字体大小
  ballShow: false,
  bottomRingBgColor: '',
  ringTimer: 2000
}, _temp);
exports.default = Ringloading;