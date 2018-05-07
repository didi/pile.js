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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartCircle = (_temp = _class = function (_React$Component) {
  _inherits(ChartCircle, _React$Component);

  function ChartCircle() {
    _classCallCheck(this, ChartCircle);

    return _possibleConstructorReturn(this, (ChartCircle.__proto__ || Object.getPrototypeOf(ChartCircle)).apply(this, arguments));
  }

  _createClass(ChartCircle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var arcFill = void 0;
      var img = void 0;
      var _props = this.props,
          fill = _props.fill,
          size = _props.size,
          animation = _props.animation,
          el = _props.el,
          value = _props.value;

      var self = this;
      var ctx = document.getElementById(el).getContext('2d');

      if (!fill) {
        throw Error('The fill is not specified!');
      }

      if (fill.color) {
        arcFill = fill.color;
      }

      if (fill.gradient) {
        var gr = fill.gradient;

        if (gr.length === 1) {
          /* eslint-disable prefer-destructuring */
          arcFill = gr[0];
          /* eslint-enable  */
        } else if (gr.length > 1) {
          var ga = fill.gradientAngle || 0; // gradient direction angle; 0 by default
          var gd = fill.gradientDirection || [size / 2 * (1 - Math.cos(ga)), // x0
          size / 2 * (1 + Math.sin(ga)), // y0
          size / 2 * (1 + Math.cos(ga)), // x1
          size / 2 * (1 - Math.sin(ga))];

          var lg = ctx.createLinearGradient.apply(ctx, _toConsumableArray(gd));

          for (var i = 0; i < gr.length; i++) {
            var color = gr[i];
            var pos = i / (gr.length - 1);

            // if ($.isArray(color)) {
            //     pos = color[1];
            //     color = color[0];
            // }

            lg.addColorStop(pos, color);
          }

          arcFill = lg;
        }
      }

      if (fill.image) {
        if (fill.image instanceof Image) {
          img = fill.image;
        } else {
          img = new Image();
          img.src = fill.image;
        }
        if (img.complete) {
          setImageFill();
        } else {
          img.onload = setImageFill;
        }
      } else if (animation) {
        self.drawAnimated(ctx, arcFill);
      } else {
        self.drawFrame(value, ctx, arcFill);
      }

      function setImageFill() {
        var bg = document.getElementById(el);
        bg.width = size;
        bg.height = size;
        bg.getContext('2d').drawImage(img, 0, 0, size, size);
        arcFill = ctx.createPattern(bg, 'no-repeat');
        if (animation) {
          self.drawAnimated(ctx, arcFill);
        } else {
          self.drawFrame(value, ctx, arcFill);
        }
      }
    }
  }, {
    key: 'getThickness',
    value: function getThickness() {
      return Number(this.props.thickness) ? this.props.thickness : this.props.size / 14;
    }
  }, {
    key: 'drawFrame',
    value: function drawFrame(v, ctx, arcFill) {
      var size = this.props.size;

      ctx.clearRect(0, 0, size, size);
      this.drawEmptyArc(v, ctx);
      this.drawArc(v, ctx, arcFill);
    }
  }, {
    key: 'drawArc',
    value: function drawArc(v, ctx, arcFill) {
      // let ctx = this.ctx,
      //     r = this.radius,
      //     t = this.getThickness(),
      //     a = this.startAngle;
      var t = this.getThickness();
      var _props2 = this.props,
          startAngle = _props2.startAngle,
          radius = _props2.radius,
          size = _props2.size,
          final = _props2.final;

      var r = radius || size / 2;
      ctx.save();
      ctx.beginPath();

      // if (!this.reverse) {
      // ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
      // } else {
      ctx.arc(r, r, r - t / 2, startAngle - Math.PI * 2 * v, startAngle);
      // }


      ctx.lineWidth = t;
      ctx.lineCap = 'butt';
      ctx.strokeStyle = arcFill;
      ctx.stroke();
      ctx.restore();
      if (final === 'circle') {
        // console.log(r, r, r - t / 2, a - Math.PI * 2 * v, a)
        // console.log(Math.sin( a - Math.PI * 2 * v) * (r - t / 2) )
        // console.log(Math.cos( a - Math.PI * 2 * v) * (r - t / 2) )
        ctx.save();
        ctx.beginPath();
        var y = r + Math.sin(startAngle - Math.PI * 2 * v) * (r - t / 2);
        var x = r + Math.cos(startAngle - Math.PI * 2 * v) * (r - t / 2);
        ctx.arc(x, y, t / 2, 0, Math.PI * 2);
        ctx.fillStyle = arcFill;
        ctx.fill();
        ctx.restore();
      }
    }
  }, {
    key: 'drawEmptyArc',
    value: function drawEmptyArc(v, ctx) {
      var t = this.getThickness();
      var _props3 = this.props,
          startAngle = _props3.startAngle,
          emptyFill = _props3.emptyFill,
          radius = _props3.radius,
          size = _props3.size;

      var r = radius || size / 2;
      if (v < 1) {
        ctx.save();
        ctx.beginPath();

        // if (v <= 0) {
        //     ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
        // } else {
        // if (!this.reverse) {
        //     ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
        // } else {
        ctx.arc(r, r, r - t / 2, startAngle, startAngle - Math.PI * 2 * v);
        // }
        // }

        ctx.lineWidth = t;
        ctx.strokeStyle = emptyFill;
        ctx.stroke();
        ctx.restore();
      }
    }
  }, {
    key: 'timeout',
    value: function timeout(tempvalue, ctx, arcFill) {
      var self = this;
      var value = this.props.value;


      if (tempvalue < value) {
        self.drawFrame(tempvalue, ctx, arcFill);
        tempvalue += 0.01;
        setTimeout(function () {
          self.timeout(tempvalue, ctx, arcFill);
        }, 5);
      } else {
        self.drawFrame(value, ctx, arcFill);
      }
    }
  }, {
    key: 'drawAnimated',
    value: function drawAnimated(ctx, arcFill) {
      var tempvalue = 0;
      this.timeout(tempvalue, ctx, arcFill);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          size = _props4.size,
          el = _props4.el,
          canvas_width = _props4.canvas_width;


      return _react2.default.createElement('canvas', { id: el, height: size, width: canvas_width });
    }
  }]);

  return ChartCircle;
}(_react2.default.Component), _class.defaultProps = {
  // 值
  value: 0.0,
  // 容器的长度
  size: 100.0,
  // canvas的颜色
  fill: {
    gradient: ['#1ad5ff', '#1a7bff']
  },
  // 空白的颜色
  emptyFill: 'rgba(0, 0, 0, .1)',
  // 柱形图底端的形状
  final: 'circle',
  // 起始位置
  startAngle: -Math.PI / 2,
  // 宽度
  thickness: 'auto',
  // 动画效果
  animation: {
    duration: 1200,
    easing: 'circleProgressEasing'
  },
  // 容器
  el: null,
  ctx: null,
  arcFill: null
}, _temp);
exports.default = ChartCircle;