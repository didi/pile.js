'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/06/19.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rule = (_temp = _class = function (_React$Component) {
  _inherits(Rule, _React$Component);

  function Rule(props) {
    _classCallCheck(this, Rule);

    var _this = _possibleConstructorReturn(this, (Rule.__proto__ || Object.getPrototypeOf(Rule)).call(this, props));

    _this.eventEnd = _this.eventEnd.bind(_this);
    _this.eventMove = _this.eventMove.bind(_this);
    _this.eventStart = _this.eventStart.bind(_this);
    return _this;
  }

  _createClass(Rule, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initDraw(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.initDraw(this.props)
      var stepLayClientWidth = this.stepLay.clientWidth;
      var stepTouch = this.stepTouch;

      this.stepLayClientWidth = stepLayClientWidth;
      stepTouch.style.left = this.setPosLf(this.state.defaultValue) + 'px';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.reapanint && !nextprops.reapanint) {
        this.initDraw(nextprops);
      }
    }

    // 根据当前数值获取卡尺容器left值

  }, {
    key: 'setPosLf',
    value: function setPosLf(value) {
      var _state = this.state,
          min = _state.min,
          unitAmount = _state.unitAmount,
          unitWidth = _state.unitWidth;

      var left = (value - min) / unitAmount * unitWidth - this.stepLayClientWidth / 2;
      // let  checkLeft = -left;
      return -left;
    }
  }, {
    key: 'setLineType',
    value: function setLineType(pol) {
      var _state2 = this.state,
          touchMin = _state2.touchMin,
          touchMax = _state2.touchMax,
          value = _state2.value;
      // 小于最小可以拖动值 添加样式 "disabled over-min"

      if (touchMin > pol) {
        return 'disabled over-min';
      }
      // 大于最大可以拖动值 添加样式 "disabled over-max"
      if (touchMax < pol) {
        return 'disabled over-max';
      }
      // 当前值大于可拖动范围值时 添加 "over"
      if (value >= pol) {
        return 'over';
      }
      return true;
    }
  }, {
    key: 'eventEnd',
    value: function eventEnd() {
      // back
      var endback = this.props.endback;
      var value = this.state.value;

      if (endback) {
        endback({
          value: value
        });
      }
    }
  }, {
    key: 'eventStart',
    value: function eventStart(e) {
      var disabled = this.props.disabled;
      var stepTouch = this.stepTouch;

      if (disabled) {
        return false;
      }
      // 开始拖动前   获取当前的 x轴坐标和 拖动按钮 left 值
      this.stepLeft = stepTouch.offsetLeft;
      this.startX = e.touches[0].pageX;
      return true;
    }
  }, {
    key: 'move',
    value: function move(e) {
      var _props = this.props,
          back = _props.back,
          fixed = _props.fixed;
      var _state3 = this.state,
          min = _state3.min,
          touchMin = _state3.touchMin,
          touchMax = _state3.touchMax,
          unitAmount = _state3.unitAmount,
          unitWidth = _state3.unitWidth;
      var stepTouch = this.stepTouch;

      var pageX = e.touches[0].pageX - this.startX + this.stepLeft; // 当前x轴坐标
      var onValue = (min + -((pageX - this.stepLayClientWidth / 2) * unitAmount) / unitWidth).toFixed(fixed); // 当前值
      var onLeft = pageX;

      if (onValue <= touchMin) {
        // 设置拖动最小值
        onValue = touchMin;
        onLeft = this.setPosLf(touchMin);
      } else if (onValue >= touchMax) {
        // 设置拖动最大值
        onValue = touchMax;
        onLeft = this.setPosLf(touchMax);
      } else {
        onLeft = pageX;
      }

      // 设置 stepTouch left 值
      stepTouch.style.left = onLeft + 'px';

      // back
      if (back) {
        back({
          value: onValue
        });
      }

      // 设置 state
      this.setState({
        value: onValue
      });
    }
  }, {
    key: 'eventMove',
    value: function eventMove(e) {
      if (this.props.disabled) {
        return false;
      }
      // 阻止window窗体滚动
      e.preventDefault && e.preventDefault();
      this.move(e);
      return true;
    }
  }, {
    key: 'initDraw',
    value: function initDraw(props) {
      var list = props.list,
          unitAmount = props.unitAmount,
          defaultValue = props.defaultValue,
          unitWidth = props.unitWidth,
          min = props.min,
          max = props.max,
          touchMin = props.touchMin,
          touchMax = props.touchMax,
          len = list.length,
          lenArr = Array(len).fill(0),
          lineArr = Array((max - min) / unitAmount + 1).fill(0);

      this.setState({
        list: list,
        // len,
        min: min,
        // max,
        // totle,
        lenArr: lenArr,
        lineArr: lineArr,
        defaultValue: defaultValue,
        unitWidth: unitWidth,
        unitAmount: unitAmount,
        touchMin: touchMin,
        touchMax: touchMax,
        value: defaultValue
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this,
          className = this.props.className,
          _state4 = this.state,
          list = _state4.list,
          lenArr = _state4.lenArr,
          lineArr = _state4.lineArr,
          min = _state4.min,
          unitWidth = _state4.unitWidth,
          unitAmount = _state4.unitAmount;

      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-slider': true,
        'jimu-step-slider': true
      }, className, className));
      // });

      return _react2.default.createElement(
        'div',
        {
          className: cls,
          onTouchEnd: this.eventEnd,
          onTouchMove: this.eventMove,
          onTouchStart: this.eventStart
        },
        _react2.default.createElement(
          'div',
          { className: 'jimu-slider-rule', ref: function ref(n) {
              _this2.wrapLay = n;
            } },
          _react2.default.createElement(
            'div',
            { className: 'line-layout' },
            _react2.default.createElement('div', { className: 'line-bg' }),
            _react2.default.createElement(
              'div',
              { className: 'line-light', ref: function ref(n) {
                  _this2.lineLight = n;
                } },
              _react2.default.createElement('span', { className: 'pole-btn' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'step-wrap', ref: function ref(n) {
              _this2.stepLay = n;
            } },
          _react2.default.createElement(
            'div',
            { className: 'step-touch', ref: function ref(n) {
                _this2.stepTouch = n;
              } },
            _react2.default.createElement(
              'ul',
              { className: 'step-line' },
              lineArr.map(function (re, idx) {
                return _react2.default.createElement('li', { key: idx, className: self.setLineType(idx * unitAmount + min), style: { left: unitWidth * idx + 'px' } });
              })
            ),
            _react2.default.createElement(
              'ul',
              { className: 'step-name' },
              lenArr.map(function (re, index) {
                return _react2.default.createElement(
                  'li',
                  { key: index, className: self.setLineType(list[index].value), style: { left: (Number(list[index].value) - min) / unitAmount * unitWidth + 'px' } },
                  _react2.default.createElement(
                    'span',
                    { className: 'step-title' },
                    list[index].name
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Rule;
}(_react2.default.Component), _class.propTypes = {
  list: _propTypes2.default.array,
  back: _propTypes2.default.func,
  endback: _propTypes2.default.func,
  defaultValue: _propTypes2.default.number,
  unitAmount: _propTypes2.default.number,
  unitWidth: _propTypes2.default.number,
  touchMin: _propTypes2.default.number,
  touchMax: _propTypes2.default.number,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  fixed: _propTypes2.default.number,
  reapanint: _propTypes2.default.bool
}, _class.defaultProps = {
  list: [{ name: '80', value: 80 }, { name: '90', value: 90 }, { name: '100', value: 100 }, { name: '110', value: 110 }, { name: '120', value: 120 }, { name: '130', value: 130 }, { name: '140', value: 140 }, { name: '150', value: 150 }, { name: '160', value: 160 }, { name: '170', value: 170 }, { name: '180', value: 180 }, { name: '190', value: 190 }, { name: '200', value: 200 }, { name: '210', value: 210 }, { name: '220', value: 220 }, { name: '230', value: 230 }, { name: '240', value: 240 }, { name: '250', value: 250 }], // list
  defaultValue: 170, // 设置初始取值
  reapanint: false,
  back: function back() {},
  // 回调函数
  endback: function endback() {},
  // 回调函数
  unitAmount: 5, // 每刻度值
  unitWidth: 20, // 每刻度间距
  touchMin: 90, // 可拖动最小值
  touchMax: 240, // 可拖动最大值
  min: 80, // 最小值
  max: 300, // 最大值
  fixed: 0 // 返回值最后取小数点后几位
}, _temp);
exports.default = Rule;