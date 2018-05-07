/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import Mask from '../mask';

class FadeIn extends React.Component {
  static setPos(props) {
    const { direction, align } = props;
    let posInP;
    let posOutP;
    if (direction === 'bottom' || direction === 'right') {
      posInP = '0';
      posOutP = '100%';
    } else {
      posInP = '0';
      posOutP = '-100%';
    }
    const alignPos = align === 0 ? '-50%' : 0;
    const pos = {
      posInP,
      posOutP,
      alignPos,
    };
    return pos;
  }

  static defaultProps = {
    closeBtnText: '确定',
    show: false,
    direction: 'bottom', // 滑动方向 bottom , top , left ,right
    closeShow: true, // 关闭按钮是否展示
    height: 'auto', // 高度  "100%" 、"300px"
    width: '100%', // 宽度  "100%" 、"300px"
    transparent: false, // 背景是否透明
    closeBack() {}, // 关闭时的回调
    showBack() {}, // 展开时的回调
    align: 1, // 0:水平或者垂直居中，1 ：左对齐或者顶部对齐，2右对齐或者底部对齐
  };

  constructor(props) {
    super(props);
    this.state = {
      maskHidden: true,
    };
    this.wrapFadeIn = this.wrapFadeIn.bind(this);
    this.wrapFadeOut = this.wrapFadeOut.bind(this);
    this.closeTips = this.closeTips.bind(this);
  }

  componentDidMount() {
    FadeIn.setPos(this.props);
    this.setStyle(this.props);
    if (this.props.show) {
      this.wrapFadeIn(FadeIn.setPos(this.props), this.props.direction);
    } else {
      this.wrapFadeOut(FadeIn.setPos(this.props), this.props.direction);
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.height !== this.props.height || nextprops.width !== this.props.width ||
      nextprops.direction !== this.props.direction || nextprops.align !== this.props.align) {
      this.setStyle(nextprops);
    }
    if (nextprops.show) {
      this.wrapFadeIn(FadeIn.setPos(nextprops), nextprops.direction);
    } else {
      this.wrapFadeOut(FadeIn.setPos(nextprops), nextprops.direction);
    }
  }

  setPosStyle(left, right, top, bottom) {
    const { wraplayout } = this;
    wraplayout.style.left = left;
    wraplayout.style.right = right;
    wraplayout.style.top = top;
    wraplayout.style.bottom = bottom;
  }

  setStyle(data) {
    const {
      height, width, direction, align,
    } = data;
    const { wraplayout } = this;
    wraplayout.style.height = height;
    wraplayout.style.width = width;
    wraplayout.style.display = 'block';
    if (direction === 'top') {
      if (align === 0) {
        this.setPosStyle('50%', 'auto', 0, 'auto');
      } else if (align === 1) {
        this.setPosStyle(0, 'auto', 0, 'auto');
      } else {
        this.setPosStyle('auto', 0, 0, 'auto');
      }
    } else if (direction === 'bottom') {
      if (align === 0) {
        this.setPosStyle('50%', 'auto', 'auto', 0);
      } else if (align === 1) {
        this.setPosStyle(0, 'auto', 'auto', 0);
      } else {
        this.setPosStyle('auto', 0, 'auto', 0);
      }
    } else if (direction === 'left') {
      if (align === 0) {
        this.setPosStyle(0, 'auto', '50%', 'auto');
      } else if (align === 1) {
        this.setPosStyle(0, 'auto', 0, 'auto');
      } else {
        this.setPosStyle(0, 'auto', 'auto', 0);
      }
    } else if (direction === 'right') {
      if (align === 0) {
        this.setPosStyle('auto', 0, '50%', 'auto');
      } else if (align === 1) {
        this.setPosStyle('auto', 0, 0, 'auto');
      } else {
        this.setPosStyle('auto', 0, 'auto', 0);
      }
    }
  }


  wrapFadeIn(pos, direction) {
    const { wraplayout } = this;
    if (direction === 'bottom' || direction === 'top') {
      wraplayout.style.webkitTransform = `translate(${pos.alignPos},${pos.posInP})`;
    }
    if (direction === 'left' || direction === 'right') {
      wraplayout.style.webkitTransform = `translate(${pos.posInP},${pos.alignPos})`;
    }
    this.setState({
      maskHidden: false,
    });
    this.props.showBack && this.props.showBack();
  }

  wrapFadeOut(pos, direction) {
    const { wraplayout } = this;
    if (direction === 'bottom' || direction === 'top') {
      wraplayout.style.webkitTransform = `translate(${pos.alignPos},${pos.posOutP})`;
    }
    if (direction === 'left' || direction === 'right') {
      wraplayout.style.webkitTransform = `translate(${pos.posOutP},${pos.alignPos})`;
    }
    this.setState({
      maskHidden: true,
    });
  }

  closeTips() {
    this.wrapFadeOut(FadeIn.setPos(this.props), this.props.direction);
    this.props.closeBack && this.props.closeBack();
  }

  render() {
    const {
      closeBtnText, children, closeShow, contentPadding, className, transparent, direction,
    } = this.props;
    const claName = classNames({
      'up-bd': contentPadding,
      'pile-up-content': !contentPadding,
    });
    const cls = classNames({
      'up-wrap': true,
      'pile-fade-wrap': true,
      [`pile-fade-${direction}`]: true,
      'pile-fade-top-show': !closeShow,
      [className]: className,
    });
    return (
      <div className={cls}>
        <Mask transparent={transparent} hidden={this.state.maskHidden} onClick={this.closeTips} />
        <div className="up-layout" ref={(t) => { this.wraplayout = t; }} >
          {closeShow ? (<span className="close-bnt" onClick={this.closeTips}>{closeBtnText}</span>) : null}
          <div className={claName}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default FadeIn;
