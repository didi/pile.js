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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartLine = (_temp = _class = function (_React$Component) {
  _inherits(ChartLine, _React$Component);

  function ChartLine() {
    _classCallCheck(this, ChartLine);

    return _possibleConstructorReturn(this, (ChartLine.__proto__ || Object.getPrototypeOf(ChartLine)).apply(this, arguments));
  }

  _createClass(ChartLine, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          width = _props.width,
          size = _props.size,
          final = _props.final,
          animation = _props.animation,
          el = _props.el;

      var calheight = void 0;
      var ctx = document.getElementById(el).getContext('2d');

      if (final === 'circle') {
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
    key: 'drawcal',
    value: function drawcal(ctx, calheight) {
      var _props2 = this.props,
          width = _props2.width,
          value = _props2.value,
          fill = _props2.fill,
          final = _props2.final,
          reverse = _props2.reverse,
          size = _props2.size;


      ctx.beginPath();
      if (reverse) {
        // 树状图
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
        if (final === 'circle') {
          if (fill.gradient) {
            ChartLine.drawfinal(ctx, width / 2, size - calheight * value, width / 2, fill.gradient[1]);
          } else {
            ChartLine.drawfinal(ctx, width / 2, size - calheight * value, width / 2, fill);
          }
        }
      } else {
        // 默认横行图
        ctx.clearRect(0, 0, size, width);

        if (fill.gradient) {
          /* 指定渐变区域 */
          var _grad = ctx.createLinearGradient(0, 0, size * value, 0);
          /* 指定几个颜色 */
          _grad.addColorStop(0, fill.gradient[0]);
          _grad.addColorStop(1, fill.gradient[1]);
          /* 将这个渐变设置为fillStyle */
          ctx.fillStyle = _grad;
        } else {
          ctx.fillStyle = fill;
        }
        /* 绘制矩形 */
        ctx.rect(0, 0, calheight * value, width);
        ctx.fill();
        if (final === 'circle') {
          if (fill.gradient) {
            ChartLine.drawfinal(ctx, calheight * value, width / 2, width / 2, fill.gradient[1]);
          } else {
            ChartLine.drawfinal(ctx, calheight * value, width / 2, width / 2, fill);
          }
        }
      }
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
      var self = this;

      if (tempheight < calheight) {
        self.drawcal(ctx, tempheight);
        tempheight += 1;
        setTimeout(function () {
          self.timeout(ctx, calheight, tempheight);
        }, 5);
      } else {
        self.drawcal(ctx, calheight);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          el = _props3.el,
          canvas_width = _props3.canvas_width,
          canvas_height = _props3.canvas_height;


      return _react2.default.createElement('canvas', { id: el, height: canvas_height, width: canvas_width });
    }
  }], [{
    key: 'drawfinal',
    value: function drawfinal(ctx, x, y, r, color) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.restore();
      ctx.fill();
    }

    // static propTypes = {
    //   onSwipeUp: PropTypes.func,
    //   onSwipeDown: PropTypes.func,
    //   onSwipeLeft: PropTypes.func,
    //   onSwipeRight: PropTypes.func,
    //   flickThreshold: PropTypes.number,
    //   swipeThreshold: PropTypes.number,
    // };

  }]);

  return ChartLine;
}(_react2.default.Component), _class.defaultProps = {
  // 值
  value: 0.0,
  // 容器的长度
  size: 100.0,
  // 容器的宽度
  width: 12,
  // 实际柱形图的高度（除掉底端的弧形）
  calheight: 100.0,
  // canvas的颜色
  fill: {
    gradient: ['#1ad5ff', '#1a7bff']
  },
  // 柱形图底端的形状
  final: 'circle',
  // 动画效果
  animation: {
    duration: 1200,
    easing: 'circleProgressEasing'
  },
  // 容器
  el: null
}, _temp);
exports.default = ChartLine;