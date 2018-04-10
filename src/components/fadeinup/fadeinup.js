/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import Mask from '../mask';

class FadeInUp extends React.Component {
  static defaultProps = {
    closeBtnText: '确定',
    changeFun() {}, // 参数  true 展开 ，false 关闭
    show: true,
    closeShow: true,
    transparent: false, // 背景是否透明
    contentPadding: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      maskHidden: true,
    };

    this.wrapUp = this.wrapUp.bind(this);
    this.wrapDown = this.wrapDown.bind(this);
    this.closeTips = this.closeTips.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.wrapUp();
    } else {
      this.wrapDown();
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.show) {
      this.wrapUp();
    } else {
      this.wrapDown();
    }
  }

  wrapUp() {
    const { wraplayout } = this;
    wraplayout.style.transform = 'translate(0,0)';
    wraplayout.style.webkitTransform = 'translate(0,0)';
    this.setState({
      maskHidden: false,
    });
    this.props.showBack && this.props.showBack();
  }

  wrapDown() {
    const { wraplayout } = this;
    wraplayout.style.transform = 'translate(0,100%)';
    wraplayout.style.webkitTransform = 'translate(0,100%)';
    this.setState({
      maskHidden: true,
    });
  }

  closeTips() {
    this.wrapDown();
    const { changeFun } = this.props;
    changeFun && changeFun();
    this.props.closeBack && this.props.closeBack();
  }

  render() {
    const {
      closeBtnText, children, closeShow, contentPadding, transparent,
    } = this.props;
    const className = classNames({
      'up-bd': contentPadding,
      'jimu-up-content': !contentPadding,
    });
    const cls = classNames({
      'up-wrap': true,
      'jimu-fadein-wrap': true,
      'jimu-fadein-top-show': !closeShow,
      [className]: className,
    });

    return (
      <div className={cls}>
        <Mask hidden={this.state.maskHidden} transparent={transparent} onClick={this.closeTips} />
        <div className="up-layout" ref={(t) => { this.wraplayout = t; }}>
          {closeShow ? (<span className="close-bnt" onClick={this.closeTips}>{closeBtnText}</span>) : null}
          <div className={className}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default FadeInUp;
