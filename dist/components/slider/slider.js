'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = (_temp = _class = function (_React$Component) {
  _inherits(Slider, _React$Component);

  /* eslint-disable react/no-unused-prop-types */
  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = {
      maxWidth: document.body.offsetWidth,
      everyWidth: 10
    };
    _this.eventMoveStart = _this.eventMoveStart.bind(_this);
    _this.eventMove = _this.eventMove.bind(_this);
    _this.eventMoveEnd = _this.eventMoveEnd.bind(_this);
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initDraw(this.props);
    }
  }, {
    key: 'setBgColor',
    value: function setBgColor(stage) {
      var _state = this.state,
          startR = _state.startR,
          startG = _state.startG,
          startB = _state.startB,
          stageR = _state.stageR,
          stageG = _state.stageG,
          stageB = _state.stageB;

      var nowR = parseInt(startR + stageR * stage, 10);
      var nowG = parseInt(startG + stageG * stage, 10);
      var nowB = parseInt(startB + stageB * stage, 10);

      return {
        r: nowR,
        g: nowG,
        b: nowB
      };
    }
  }, {
    key: 'stepBgColor',
    value: function stepBgColor(step) {
      var colorStageGroup = this.props.colorStageGroup;

      var len = colorStageGroup.length;

      for (var i = 0; i < len; i++) {
        if (len === 0) {
          if (colorStageGroup[i] >= step) {
            return 0;
          }
          return 1;
        }

        if (i === len - 1) {
          if (colorStageGroup[i] >= step) {
            return i;
          }
          return i + 1;
        }

        if (colorStageGroup[i] <= step && colorStageGroup[i + 1] > step) {
          return i;
        }
      }

      return 0;
    }
  }, {
    key: 'eventMoveStart',
    value: function eventMoveStart(e) {
      if (this.props.disabled) {
        return false;
      }
      // 阻止window窗体滚动
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      this.move(e);
      return true;
    }
  }, {
    key: 'eventMoveEnd',
    value: function eventMoveEnd() {
      var everyWidth = this.state.everyWidth;
      var sliderBnt = this.sliderBnt,
          lineLight = this.lineLight;

      var valueWidth = this.value * everyWidth;
      sliderBnt.style.left = valueWidth + 'px';
      lineLight.style.width = valueWidth + 'px';
    }
  }, {
    key: 'eventMove',
    value: function eventMove(e) {
      if (this.props.disabled) {
        return false;
      }
      // 阻止window窗体滚动
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      this.move(e);
      return true;
    }
  }, {
    key: 'initDraw',
    value: function initDraw(props) {
      var wrapLay = this.wrapLay,
          sliderBnt = this.sliderBnt,
          lineLight = this.lineLight;
      var max = props.max,
          min = props.min,
          defaultValue = props.defaultValue,
          disabled = props.disabled,
          isShading = props.isShading,
          colorGroup = props.colorGroup;

      var totle = max - min;
      var everyWidth = Number(wrapLay.clientWidth) / totle;
      // 设置初始背景颜色
      var startBgColor = colorGroup[0];
      var endBgColor = colorGroup[colorGroup.length - 1];
      var reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

      if (!reg.test(startBgColor) || !reg.test(endBgColor)) {
        throw new Error('颜色格式错误');
      }

      // 设置 开始和结束的 r g b 颜色的值
      var startR = void 0;
      var startG = void 0;
      var startB = void 0;
      var endR = void 0;
      var endG = void 0;
      var endB = void 0;

      if (startBgColor.length === 4) {
        startR = parseInt(startBgColor.substring(1, 2) + startBgColor.substring(1, 2), 16);
        startG = parseInt(startBgColor.substring(2, 3) + startBgColor.substring(2, 3), 16);
        startB = parseInt(startBgColor.substring(3, 4) + startBgColor.substring(3, 4), 16);
      } else {
        startR = parseInt(startBgColor.substring(1, 3), 16);
        startG = parseInt(startBgColor.substring(3, 5), 16);
        startB = parseInt(startBgColor.substring(5, 7), 16);
      }

      if (endBgColor.length === 4) {
        endR = parseInt(endBgColor.substring(1, 2) + endBgColor.substring(1, 2), 16);
        endG = parseInt(endBgColor.substring(2, 3) + endBgColor.substring(2, 3), 16);
        endB = parseInt(endBgColor.substring(3, 4) + endBgColor.substring(3, 4), 16);
      } else {
        endR = parseInt(endBgColor.substring(1, 3), 16);
        endG = parseInt(endBgColor.substring(3, 5), 16);
        endB = parseInt(endBgColor.substring(5, 7), 16);
      }

      var stageR = endR - startR;
      var stageG = endG - startG;
      var stageB = endB - startB;

      this.setState({
        maxWidth: wrapLay.clientWidth,
        everyWidth: everyWidth,
        offsetLeft: wrapLay.offsetLeft,
        startR: startR,
        startG: startG,
        startB: startB,
        // endR,
        // endG,
        // endB,
        stageR: stageR,
        stageG: stageG,
        stageB: stageB
      });

      // 设置初始位置
      sliderBnt.style.left = (defaultValue - min) * everyWidth + 'px';
      lineLight.style.width = (defaultValue - min) * everyWidth + 'px';

      // 设置初始颜色
      if (!disabled && isShading) {
        var nowR = parseInt(startR + stageR * defaultValue / totle, 10);
        var nowG = parseInt(startG + stageG * defaultValue / totle, 10);
        var nowB = parseInt(startB + stageB * defaultValue / totle, 10);
        lineLight.style.backgroundColor = 'rgb(' + nowR + ', ' + nowG + ', ' + nowB + ')';
      }

      // 设置阶段颜色值
      if (!disabled && !isShading) {
        lineLight.style.backgroundColor = colorGroup[this.stepBgColor(defaultValue)];
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      var _props = this.props,
          isShading = _props.isShading,
          colorGroup = _props.colorGroup,
          min = _props.min,
          onChangeBack = _props.onChangeBack,
          toFixed = _props.toFixed;
      var sliderBnt = this.sliderBnt,
          lineLight = this.lineLight;
      var _state2 = this.state,
          everyWidth = _state2.everyWidth,
          offsetLeft = _state2.offsetLeft;

      var pageX = e.touches[0].pageX - offsetLeft;

      pageX = pageX < 0 ? 0 : pageX;
      pageX = pageX > this.state.maxWidth ? this.state.maxWidth : pageX;
      var onvalue = void 0;
      if (toFixed <= 0) {
        onvalue = pageX < 50 ? Math.floor(pageX / everyWidth) + min : Math.ceil(pageX / everyWidth) + min;
      } else {
        onvalue = (pageX / everyWidth + min).toFixed(toFixed);
      }

      // const onvalue = pageX < 50 ? Math.floor(pageX / everyWidth) + min :
      //   Math.ceil(pageX / everyWidth) + min;
      // const onvalue = pageX < 50 ? (pageX / everyWidth) + min :
      //   (pageX / everyWidth) + min;

      sliderBnt.style.left = pageX + 'px';
      lineLight.style.width = pageX + 'px';
      this.value = onvalue;
      if (onChangeBack) {
        onChangeBack({
          value: onvalue
        });
      }
      if (isShading) {
        var newColor = this.setBgColor(pageX / this.state.maxWidth);
        lineLight.style.backgroundColor = 'rgb(' + newColor.r + ', ' + newColor.g + ', ' + newColor.b + ')';
      }
      // 设置阶段颜色值
      if (!isShading) {
        lineLight.style.backgroundColor = colorGroup[this.stepBgColor(onvalue)];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          disabled = _props2.disabled,
          className = _props2.className;

      var cls = (0, _classnames2.default)(_defineProperty({
        'pile-slider': true,
        'pile-disabled': disabled
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, ref: function ref(u) {
            _this2.wrapLay = u;
          } },
        this.props.children && _react2.default.createElement(
          'div',
          { className: 'brd' },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'line-layout', onTouchMove: this.eventMove, onTouchStart: this.eventMoveStart, onTouchEnd: this.eventMoveEnd },
          _react2.default.createElement('div', { className: 'line-bg' }),
          _react2.default.createElement('div', { className: 'line-light', ref: function ref(u) {
              _this2.lineLight = u;
            } }),
          _react2.default.createElement('div', { className: 'slider-bnt', ref: function ref(u) {
              _this2.sliderBnt = u;
            } })
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component), _class.propTypes = {
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  defaultValue: _propTypes2.default.number,
  toFixed: _propTypes2.default.number,
  onChangeBack: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  // colorStageGroup: PropTypes.array,
  isShading: _propTypes2.default.bool
  // colorGroup: PropTypes.array,
}, _class.defaultProps = {
  min: 0, // 最小值
  max: 10, // 最大值
  defaultValue: 0, // 设置初始取值
  toFixed: 0, // 取小数点后几位
  disabled: false, // 值为 true 时，滑块为禁用状态
  onChangeBack: function onChangeBack() {},
  // 会触发 onChange 事件，并把改变后的值作为参数传入
  colorStageGroup: [4], // 颜色阶级显示分介数值
  isShading: false, // 颜色是否缓动
  colorGroup: ['#108ee9', '#108ee9'] // 颜色阶级显示分介颜色值（数量要比colorStageGroup多一个）
}, _temp);
exports.default = Slider;