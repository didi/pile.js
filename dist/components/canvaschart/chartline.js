'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by zhaojiejane on 18/01/01.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartLine = (_temp = _class = function (_React$Component) {
  _inherits(ChartLine, _React$Component);

  function ChartLine(props) {
    _classCallCheck(this, ChartLine);

    return _possibleConstructorReturn(this, (ChartLine.__proto__ || Object.getPrototypeOf(ChartLine)).call(this, props));
  }
  // static propTypes = {
  //   onSwipeUp: PropTypes.func,
  //   onSwipeDown: PropTypes.func,
  //   onSwipeLeft: PropTypes.func,
  //   onSwipeRight: PropTypes.func,
  //   flickThreshold: PropTypes.number,
  //   swipeThreshold: PropTypes.number,
  // };

  _createClass(ChartLine, [{
    key: 'drawcal',
    value: function drawcal(ctx, calheight) {
      var self = this,
          _props = this.props,
          width = _props.width,
          value = _props.value,
          fill = _props.fill,
          final = _props.final,
          reverse = _props.reverse,
          size = _props.size;

      ctx.beginPath();
      if (reverse) {
        //树状图
        ctx.clearRect(0, 0, width, size);
        if (fill.gradient) {
          /* 指定渐变区域 */
          var grad = ctx.createLinearGradient(0, size - calheight * value, 0, size);
          /* 指定几个颜色 */
          grad.addColorStop(0, fill.gradient[0]);
          grad.addColorStop(1, fill.gradient[1]);
          /* 将这个渐变设置为fillStyle */
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = fill;
        }
        /* 绘制矩形 */
        ctx.rect(0, size - calheight * value, width, size);
        ctx.fill();
        if (final == "circle") {
          if (fill.gradient) {
            this.drawfinal(ctx, width / 2, size - calheight * value, width / 2, fill.gradient[1]);
          } else {
            this.drawfinal(ctx, width / 2, size - calheight * value, width / 2, fill);
          }
        }
      } else {
        //默认横行图
        ctx.clearRect(0, 0, size, width);

        if (fill.gradient) {
          /* 指定渐变区域 */
          var grad = ctx.createLinearGradient(0, 0, size * value, 0);
          /* 指定几个颜色 */
          grad.addColorStop(0, fill.gradient[0]);
          grad.addColorStop(1, fill.gradient[1]);
          /* 将这个渐变设置为fillStyle */
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = fill;
        }
        /* 绘制矩形 */
        ctx.rect(0, 0, calheight * value, width);
        ctx.fill();
        if (final == "circle") {
          if (fill.gradient) {
            this.drawfinal(ctx, calheight * value, width / 2, width / 2, fill.gradient[1]);
          } else {
            this.drawfinal(ctx, calheight * value, width / 2, width / 2, fill);
          }
        }
      }
    }
  }, {
    key: 'drawfinal',
    value: function drawfinal(ctx, x, y, r, color) {
      var self = this;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.restore();
      ctx.fill();
    }
  }, {
    key: 'drawAnimated',
    value: function drawAnimated(ctx, calheight) {
      var tempheight = 0;
      this.timeout(ctx, calheight, tempheight);
    }
  }, {
    key: 'timeout',
    value: function timeout(ctx, calheight, tempheight) {
      var self = this,
          _props2 = this.props,
          width = _props2.width,
          value = _props2.value,
          fill = _props2.fill,
          final = _props2.final,
          reverse = _props2.reverse,
          size = _props2.size;

      if (tempheight < calheight) {
        self.drawcal(ctx, tempheight);
        tempheight++;
        setTimeout(function () {
          self.timeout(ctx, calheight, tempheight);
        }, 5);
      } else {
        self.drawcal(ctx, calheight);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props3 = this.props,
          fill = _props3.fill,
          width = _props3.width,
          size = _props3.size,
          final = _props3.final,
          animation = _props3.animation,
          el = _props3.el;

      var self = this,
          calheight = void 0,
          ctx = document.getElementById(el).getContext('2d');

      if (final == "circle") {
        calheight = size - width / 2;
      } else {
        calheight = size;
      }

      if (animation) {
        this.drawAnimated(ctx, calheight);
      } else {
        this.drawcal(ctx, calheight);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          value = _props4.value,
          size = _props4.size,
          width = _props4.width,
          calheight = _props4.calheight,
          fill = _props4.fill,
          final = _props4.final,
          animation = _props4.animation,
          el = _props4.el,
          ctx = _props4.ctx,
          canvas_width = _props4.canvas_width,
          canvas_height = _props4.canvas_height;


      return _react2.default.createElement('canvas', { id: el, height: canvas_height, width: canvas_width });
    }
  }]);

  return ChartLine;
}(_react2.default.Component), _class.defaultProps = {
  //值
  value: 0.0,
  //容器的长度
  size: 100.0,
  //容器的宽度
  width: 12,
  //实际柱形图的高度（除掉底端的弧形）
  calheight: 100.0,
  //canvas的颜色
  fill: {
    gradient: ['#1ad5ff', '#1a7bff']
  },
  //柱形图底端的形状
  final: "circle",
  //动画效果
  animation: {
    duration: 1200,
    easing: 'circleProgressEasing'
  },
  //容器
  el: null
}, _temp);
;

exports.default = ChartLine;