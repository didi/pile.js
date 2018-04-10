/**
 * Created by zhaojiejane on 18/01/01.
 */

import React from 'react';

class ChartCircle extends React.Component {
  static defaultProps = {
    // 值
    value: 0.0,
    // 容器的长度
    size: 100.0,
    // canvas的颜色
    fill: {
      gradient: ['#1ad5ff', '#1a7bff'],
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
      easing: 'circleProgressEasing',
    },
    // 容器
    el: null,
    ctx: null,
    arcFill: null,
  };

  componentDidMount() {
    let arcFill;
    let img;
    const {
      fill, size, animation, el, value,
    } = this.props;
    const self = this;
    const ctx = document.getElementById(el).getContext('2d');

    if (!fill) { throw Error('The fill is not specified!'); }

    if (fill.color) { arcFill = fill.color; }

    if (fill.gradient) {
      const gr = fill.gradient;

      if (gr.length === 1) {
        /* eslint-disable prefer-destructuring */
        arcFill = gr[0];
        /* eslint-enable  */
      } else if (gr.length > 1) {
        const ga = fill.gradientAngle || 0; // gradient direction angle; 0 by default
        const gd = fill.gradientDirection || [
          size / 2 * (1 - Math.cos(ga)), // x0
          size / 2 * (1 + Math.sin(ga)), // y0
          size / 2 * (1 + Math.cos(ga)), // x1
          size / 2 * (1 - Math.sin(ga)), // y1
        ];

        const lg = ctx.createLinearGradient(...gd);

        for (let i = 0; i < gr.length; i++) {
          const color = gr[i];
          const pos = i / (gr.length - 1);

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
      if (img.complete) { setImageFill(); } else { img.onload = setImageFill; }
    } else if (animation) {
      self.drawAnimated(ctx, arcFill);
    } else {
      self.drawFrame(value, ctx, arcFill);
    }

    function setImageFill() {
      const bg = document.getElementById(el);
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

  getThickness() {
    return Number(this.props.thickness) ? this.props.thickness : this.props.size / 14;
  }
  drawFrame(v, ctx, arcFill) {
    const { size } = this.props;
    ctx.clearRect(0, 0, size, size);
    this.drawEmptyArc(v, ctx);
    this.drawArc(v, ctx, arcFill);
  }
  drawArc(v, ctx, arcFill) {
    // let ctx = this.ctx,
    //     r = this.radius,
    //     t = this.getThickness(),
    //     a = this.startAngle;
    const t = this.getThickness();
    const {
      startAngle, radius, size, final,
    } = this.props;
    const r = radius || size / 2;
    ctx.save();
    ctx.beginPath();

    // if (!this.reverse) {
    // ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
    // } else {
    ctx.arc(r, r, r - (t / 2), startAngle - (Math.PI * 2 * v), startAngle);
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
      const y = r + Math.sin(startAngle - Math.PI * 2 * v) * (r - t / 2);
      const x = r + Math.cos(startAngle - Math.PI * 2 * v) * (r - t / 2);
      ctx.arc(x, y, t / 2, 0, Math.PI * 2);
      ctx.fillStyle = arcFill;
      ctx.fill();
      ctx.restore();
    }
  }
  drawEmptyArc(v, ctx) {
    const t = this.getThickness();
    const {
      startAngle, emptyFill, radius, size,
    } = this.props;
    const r = radius || size / 2;
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
  timeout(tempvalue, ctx, arcFill) {
    const self = this;
    const { value } = this.props;

    if (tempvalue < value) {
      self.drawFrame(tempvalue, ctx, arcFill);
      tempvalue += 0.01;
      setTimeout(() => {
        self.timeout(tempvalue, ctx, arcFill);
      }, 5);
    } else {
      self.drawFrame(value, ctx, arcFill);
    }
  }
  drawAnimated(ctx, arcFill) {
    const tempvalue = 0;
    this.timeout(tempvalue, ctx, arcFill);
  }


  render() {
    const {
      size, el, canvas_width,
    } = this.props;

    return (
      <canvas id={el} height={size} width={canvas_width} />
    );
  }
}

export default ChartCircle;
