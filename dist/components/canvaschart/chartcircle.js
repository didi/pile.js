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

var ChartCircle = (_temp = _class = function (_React$Component) {
    _inherits(ChartCircle, _React$Component);

    function ChartCircle(props) {
        _classCallCheck(this, ChartCircle);

        return _possibleConstructorReturn(this, (ChartCircle.__proto__ || Object.getPrototypeOf(ChartCircle)).call(this, props));
    }

    _createClass(ChartCircle, [{
        key: 'drawAnimated',
        value: function drawAnimated(ctx, arcFill) {
            var tempvalue = 0;
            this.timeout(tempvalue, ctx, arcFill);
        }
    }, {
        key: 'timeout',
        value: function timeout(tempvalue, ctx, arcFill) {
            var self = this,
                value = this.props.value;

            if (tempvalue < value) {
                self.drawFrame(tempvalue, ctx, arcFill);
                tempvalue = tempvalue + 0.01;
                setTimeout(function () {
                    self.timeout(tempvalue, ctx, arcFill);
                }, 5);
            } else {
                self.drawFrame(value, ctx, arcFill);
            }
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
            var t = this.getThickness(),
                _props = this.props,
                startAngle = _props.startAngle,
                emptyFill = _props.emptyFill,
                radius = _props.radius,
                size = _props.size,
                final = _props.final,
                r = radius || size / 2;
            ctx.save();
            ctx.beginPath();

            //if (!this.reverse) {
            // ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
            // } else {
            ctx.arc(r, r, r - t / 2, startAngle - Math.PI * 2 * v, startAngle);
            // }


            ctx.lineWidth = t;
            ctx.lineCap = 'butt';
            ctx.strokeStyle = arcFill;
            ctx.stroke();
            ctx.restore();
            if (final == "circle") {
                // console.log(r, r, r - t / 2, a - Math.PI * 2 * v, a)
                // console.log(Math.sin( a - Math.PI * 2 * v) * (r - t / 2) )
                // console.log(Math.cos( a - Math.PI * 2 * v) * (r - t / 2) )
                ctx.save();
                ctx.beginPath();
                var y = r + Math.sin(startAngle - Math.PI * 2 * v) * (r - t / 2),
                    x = r + Math.cos(startAngle - Math.PI * 2 * v) * (r - t / 2);
                ctx.arc(x, y, t / 2, 0, Math.PI * 2);
                ctx.fillStyle = arcFill;
                ctx.fill();
                ctx.restore();
            }
        }
    }, {
        key: 'drawEmptyArc',
        value: function drawEmptyArc(v, ctx) {
            var t = this.getThickness(),
                _props2 = this.props,
                startAngle = _props2.startAngle,
                emptyFill = _props2.emptyFill,
                radius = _props2.radius,
                size = _props2.size,
                r = radius || size / 2;
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
        key: 'getThickness',
        value: function getThickness() {
            return Number(this.props.thickness) ? this.props.thickness : this.props.size / 14;
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
                el = _props3.el,
                value = _props3.value;

            var self = this,
                ctx = document.getElementById(el).getContext('2d'),
                arcFill = void 0;

            if (!fill) throw Error("The fill is not specified!");

            if (fill.color) arcFill = fill.color;

            if (fill.gradient) {
                var gr = fill.gradient;

                if (gr.length == 1) {
                    arcFill = gr[0];
                } else if (gr.length > 1) {
                    var ga = fill.gradientAngle || 0,
                        // gradient direction angle; 0 by default
                    gd = fill.gradientDirection || [size / 2 * (1 - Math.cos(ga)), // x0
                    size / 2 * (1 + Math.sin(ga)), // y0
                    size / 2 * (1 + Math.cos(ga)), // x1
                    size / 2 * (1 - Math.sin(ga)) // y1
                    ];

                    var lg = ctx.createLinearGradient.apply(ctx, gd);

                    for (var i = 0; i < gr.length; i++) {
                        var color = gr[i],
                            pos = i / (gr.length - 1);

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
                var img;

                if (fill.image instanceof Image) {
                    img = fill.image;
                } else {
                    img = new Image();
                    img.src = fill.image;
                }
                if (img.complete) setImageFill();else img.onload = setImageFill;
            } else {
                if (animation) {
                    self.drawAnimated(ctx, arcFill);
                } else {
                    self.drawFrame(value, ctx, arcFill);
                }
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


            return _react2.default.createElement('canvas', { id: el, height: size, width: canvas_width });
        }
    }]);

    return ChartCircle;
}(_react2.default.Component), _class.defaultProps = {
    //值
    value: 0.0,
    //容器的长度
    size: 100.0,
    //canvas的颜色
    fill: {
        gradient: ['#1ad5ff', '#1a7bff']
    },
    //空白的颜色
    emptyFill: 'rgba(0, 0, 0, .1)',
    //柱形图底端的形状
    final: "circle",
    //起始位置
    startAngle: -Math.PI / 2,
    //宽度
    thickness: 'auto',
    //动画效果
    animation: {
        duration: 1200,
        easing: 'circleProgressEasing'
    },
    //容器
    el: null,
    ctx: null,
    arcFill: null
}, _temp);
;

exports.default = ChartCircle;