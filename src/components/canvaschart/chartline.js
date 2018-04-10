/**
 * Created by zhaojiejane on 18/01/01.
 */

import React from 'react';

class ChartLine extends React.Component {
  // static propTypes = {
  //   onSwipeUp: PropTypes.func,
  //   onSwipeDown: PropTypes.func,
  //   onSwipeLeft: PropTypes.func,
  //   onSwipeRight: PropTypes.func,
  //   flickThreshold: PropTypes.number,
  //   swipeThreshold: PropTypes.number,
  // };

  static defaultProps = {
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
      gradient: ['#1ad5ff', '#1a7bff'],
    },
    // 柱形图底端的形状
    final: 'circle',
    // 动画效果
    animation: {
      duration: 1200,
      easing: 'circleProgressEasing',
    },
    // 容器
    el: null,
  };

  static drawfinal(ctx, x, y, r, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.restore();
    ctx.fill();
  }

  componentDidMount() {
    const {
      width, size, final, animation, el,
    } = this.props;
    let calheight;
    const ctx = document.getElementById(el).getContext('2d');

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


  drawcal(ctx, calheight) {
    const {
      width, value, fill, final, reverse, size,
    } = this.props;

    ctx.beginPath();
    if (reverse) {
      // 树状图
      ctx.clearRect(0, 0, width, size);
      if (fill.gradient) {
        /* 指定渐变区域 */
        const grad = ctx.createLinearGradient(0, (size - calheight * value), 0, size);
        /* 指定几个颜色 */
        grad.addColorStop(0, fill.gradient[0]);
        grad.addColorStop(1, fill.gradient[1]);
        /* 将这个渐变设置为fillStyle */
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = fill;
      }
      /* 绘制矩形 */
      ctx.rect(0, (size - calheight * value), width, size);
      ctx.fill();
      if (final === 'circle') {
        if (fill.gradient) {
          this.drawfinal(ctx, width / 2, (size - calheight * value), width / 2, fill.gradient[1]);
        } else {
          this.drawfinal(ctx, width / 2, (size - calheight * value), width / 2, fill);
        }
      }
    } else {
      // 默认横行图
      ctx.clearRect(0, 0, size, width);

      if (fill.gradient) {
        /* 指定渐变区域 */
        const grad = ctx.createLinearGradient(0, 0, size * value, 0);
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
      if (final === 'circle') {
        if (fill.gradient) {
          this.drawfinal(ctx, calheight * value, width / 2, width / 2, fill.gradient[1]);
        } else {
          this.drawfinal(ctx, calheight * value, width / 2, width / 2, fill);
        }
      }
    }
  }

  drawAnimated(ctx, calheight) {
    const tempheight = 0;
    this.timeout(ctx, calheight, tempheight);
  }

  timeout(ctx, calheight, tempheight) {
    const self = this;

    if (tempheight < calheight) {
      self.drawcal(ctx, tempheight);
      tempheight += 1;
      setTimeout(() => {
        self.timeout(ctx, calheight, tempheight);
      }, 5);
    } else {
      self.drawcal(ctx, calheight);
    }
  }

  render() {
    const {
      el, canvas_width, canvas_height,
    } = this.props;

    return (
      <canvas id={el} height={canvas_height} width={canvas_width} />
    );
  }
}

export default ChartLine;
