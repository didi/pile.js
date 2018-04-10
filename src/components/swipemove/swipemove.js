/**
 * Created by yanshenshen on 17/04/10.
 */

import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Swipe from '../swipe/index';

const { Swipeable } = Swipe;

class SwipeMove extends React.Component {
  static propTypes = {
    direction: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.number,
    degree: PropTypes.number,

  }

  static defaultProps = {
    direction: 'bottom', // 滑动方向 bottom , top , left ,right
    height: '100%', // 高度  "100%" 、"300px"
    width: '100%', // 宽度  "100%" 、"300px"
    degree: 80, // 滑动展示最小值
    align: 0, // 对齐方式 0: center、middle ，1:left 、top  2: right   bottom
    back: null, // 滑动后的回调函数
  }

  constructor(props) {
    super(props);
    this.swipingUp = this.swipingUp.bind(this);
    this.swipingDown = this.swipingDown.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
    this.swiped = this.swiped.bind(this);
  }

  componentDidMount() {
    this.initSetContentStyle(this.props);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.direction !== this.props.direction || nextprops.height !== this.props.height
     || nextprops.width !== this.props.width || nextprops.align !== this.props.align) {
      this.initSetContentStyle(nextprops);
    }
  }

  // 设置 内容位置以及展开状态
  setContState(pos, open) {
    const { touchContent } = this;
    const { direction, back } = this.props;
    // { oldPosY, oldPosX } = this.state,
    const self = this;
    touchContent.style.WebkitTransition = 'all 0.1s ease-in';

    if (direction === 'bottom') {
      touchContent.style.top = `${pos}px`;
    } else if (direction === 'top') {
      touchContent.style.bottom = `${pos}px`;
    } else if (direction === 'left') {
      touchContent.style.right = `${pos}px`;
    } else {
      touchContent.style.left = `${pos}px`;
    }

    setTimeout(() => {
      if (direction === 'bottom' || direction === 'top') {
        self.setState({
          open,
          oldPosY: pos,
        });
      } else {
        self.setState({
          open,
          oldPosX: pos,
        });
      }
    // self.refs.touchScroll.style.overflow = "auto"
    }, 30);

    back && back({ open });
  }


  swipingDown(e, posY) {
    const self = this;
    const { touchContent, touchScroll, touchMain } = this;
    /* eslint-disable react/no-find-dom-node */
    const touchScrollTop = ReactDOM.findDOMNode(touchScroll).scrollTop;
    const touchScrollHeight = ReactDOM.findDOMNode(touchScroll).clientHeight;
    const touchMainHeight = ReactDOM.findDOMNode(touchMain).clientHeight;
    /* eslint-enable react/no-find-dom-node */
    const {
      distance, postion, open, contentHeight,
    } = this.state;
    const { direction } = this.props;

    if (touchScrollTop + touchScrollHeight < touchMainHeight + 5 && direction !== 'bottom' && open || direction === 'left' || direction === 'right') {
      return;
    }

    if (touchScrollTop > 0 && direction === 'bottom' && open) {
      return;
    }

    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();

    if ((direction === 'bottom' && !open) || (direction === 'top' && open) || direction === 'left' || direction === 'right') { return; }
    touchContent.style.WebkitTransition = 'none';
    // this.refs.touchScroll.style.overflow = "hidden"
    // 弹层跟随坐标
    if (direction === 'bottom') {
      touchContent.style.top = `${postion + posY}px`;
    }

    if (direction === 'top') {
      const ContposY = posY > contentHeight ? contentHeight : posY;
      touchContent.style.bottom = `${distance - ContposY}px`;
    }

    setTimeout(() => {
      self.setState({
        oldPosY: posY,
      });
    }, 30);
  }

  swipingLeft(e, posX) {
    const self = this;
    const { touchContent } = this;
    const {
      distance, postion, open, contentWidth,
    } = this.state;
    const { direction } = this.props;

    if ((direction === 'left' && !open) || (direction === 'right' && open) || direction === 'bottom' || direction === 'up') { return; }
    touchContent.style.WebkitTransition = 'none';
    // 弹层跟随坐标
    if (direction === 'left') {
      touchContent.style.right = `${postion + posX}px`;
    }

    if (direction === 'right') {
      const ContposX = posX > contentWidth ? contentWidth : posX;
      touchContent.style.left = `${distance - ContposX}px`;
    }

    setTimeout(() => {
      self.setState({
        oldPosX: posX,
      });
    }, 30);
  }

  swipingRight(e, posX) {
    const self = this;
    const { touchContent } = this;
    const {
      distance, postion, open, contentWidth,
    } = this.state;
    const { direction } = this.props;

    if ((direction === 'right' && !open) || (direction === 'left' && open) || direction === 'bottom' || direction === 'up') { return; }

    touchContent.style.WebkitTransition = 'none';

    // 弹层跟随坐标
    if (direction === 'left') {
      const ContposX = posX > contentWidth ? contentWidth : posX;
      touchContent.style.right = `${distance - ContposX}px`;
    }

    if (direction === 'right') {
      touchContent.style.left = `${postion + posX}px`;
    }

    setTimeout(() => {
      self.setState({
        oldPosX: posX,
      });
    }, 30);
  }

  swipingUp(e, posY) {
    const self = this;
    const { touchContent, touchScroll, touchMain } = this;
    /* eslint-disable react/no-find-dom-node */
    const touchScrollTop = ReactDOM.findDOMNode(touchScroll).scrollTop;
    const touchScrollHeight = ReactDOM.findDOMNode(touchScroll).clientHeight;
    const touchMainHeight = ReactDOM.findDOMNode(touchMain).clientHeight;
    /* eslint-enable react/no-find-dom-node */
    const {
      distance, postion, open, contentHeight,
    } = this.state;
    const { direction } = this.props;

    if (touchScrollTop + touchScrollHeight < touchMainHeight && direction !== 'bottom') {
      return;
    }

    if ((direction === 'bottom' && open) || (direction === 'top' && !open) || direction === 'left' || direction === 'right') {
      return;
    }

    // 阻止window窗体滚动
    e.preventDefault && e.preventDefault();

    touchContent.style.WebkitTransition = 'none';
    // this.refs.touchScroll.style.overflow = "hidden"
    if (direction === 'bottom') {
      const ContposY = posY > contentHeight ? contentHeight : posY;
      touchContent.style.top = `${distance - ContposY}px`;
    }

    if (direction === 'top') {
      touchContent.style.bottom = `${postion + posY}px`;
    }

    setTimeout(() => {
      self.setState({
        oldPosY: posY,
      });
    }, 30);
  }


  initSetContentStyle(propsData) {
    const { touchContent } = this;
    const {
      height, width, direction, align,
    } = propsData;

    const windowW = document.documentElement ? document.documentElement.clientWidth
      : document.body.clientWidth;
    const windowH = document.documentElement ? document.documentElement.clientHeight
      : document.body.clientHeight;
    const mydistance = direction === 'bottom' || direction === 'top' ? windowH : windowW;
    let contentH;
    let conentW;

    // 设置容器高度
    if (height.indexOf('px') !== -1) {
      contentH = Number(height.split('px')[0]);
    } else {
      contentH = windowH;
    }

    // 设置容器宽度
    if (width.indexOf('px') !== -1) {
      conentW = Number(width.split('px')[0]);
    } else {
      conentW = windowW;
    }

    this.setState({
      distance: mydistance, // 模块高度
      postion: direction === 'bottom' || direction === 'top' ? (windowH - contentH) : (windowW - conentW), // 距离顶点位置
      open: false, // 是否弹层已展开
      contentHeight: contentH,
      contentWidth: conentW,
      oldPosY: 0,
      oldPosX: 0,
    });

    let alignCssText = '';

    if (direction === 'bottom' || direction === 'top') {
      switch (align) {
        case 0:
          alignCssText = 'transform:translate(-50%,0);-webkit-transform:translate(-50%,0);left:50%;';
          break;
        case 1:
          alignCssText = 'left:0;';
          break;
        case 2:
          alignCssText = 'right:0;';
          break;
        default:
          alignCssText = '';
          break;
      }
    }

    if (direction === 'left' || direction === 'right') {
      switch (align) {
        case 0:
          alignCssText = 'transform:translate(0,-50%);-webkit-transform:translate(0,-50%);top:50%;';
          break;
        case 1:
          alignCssText = 'top:0;';
          break;
        case 2:
          alignCssText = 'bottom:0;';
          break;
        default:
          alignCssText = '';
          break;
      }
    }

    touchContent.style.cssText = `width:${conentW}px;height:${contentH}px;${alignCssText}`;
    // 设置内容容器样式
    if (direction === 'bottom') {
      touchContent.style.top = `${mydistance}px`;
    }

    if (direction === 'top') {
      touchContent.style.bottom = `${mydistance}px`;
    }

    if (direction === 'left') {
      touchContent.style.right = `${mydistance}px`;
    }

    if (direction === 'right') {
      touchContent.style.left = `${mydistance}px`;
    }
  }


  swiped(e, posX, posY) {
    const { touchScroll, touchMain } = this;
    /* eslint-disable react/no-find-dom-node */
    const touchScrollTop = ReactDOM.findDOMNode(touchScroll).scrollTop;
    const touchScrollHeight = ReactDOM.findDOMNode(touchScroll).clientHeight;
    const touchMainHeight = ReactDOM.findDOMNode(touchMain).clientHeight;
    /* eslint-enable react/no-find-dom-node */
    const {
      open, postion, distance, oldPosY, oldPosX,
    } = this.state;
    const { direction, degree } = this.props;
    const posYabs = posY;
    const posXabs = Math.abs(posX);

    if (direction === 'bottom') {
      if (open) {
        // 关闭状态
        if (posYabs < oldPosY && touchScrollTop <= 0) {
          this.setContState(distance, false);
        } else {
          this.setContState(postion, true);
        }

      // if(posYabs > oldPosY){
      //   this.setContState(postion,true)
      // }
      } else if (posYabs > oldPosY) {
        this.setContState(postion, true);
      } else {
        this.setContState(distance, false);
      }
    }

    if (direction === 'top') {
      if (open) {
        // 关闭状态
        if (posYabs > oldPosY && touchScrollTop + touchScrollHeight >= touchMainHeight) {
          this.setContState(distance, false);
        } else {
          this.setContState(postion, true);
        }
      // if(posYabs < oldPosY){
      //   this.setContState(postion,true)
      // }
      } else if (posYabs < oldPosY) {
        this.setContState(postion, true);
      } else {
        this.setContState(distance, false);
      }
    }

    if (direction === 'left' || direction === 'right') {
      if (open) {
        // 关闭状态
        if (posXabs >= oldPosX && posXabs >= degree) {
          this.setContState(distance, false);
        } else {
          this.setContState(postion, true);
        }
      } else if (posXabs >= oldPosX && posXabs >= degree) {
        this.setContState(postion, true);
      } else {
        this.setContState(distance, false);
      }
    }
  }

  showEven() {
    this._show();
  }
  _show() {
    const { postion } = this.state;
    this.setContState(postion, true);
  }

  hideEven() {
    this._hide();
  }
  _hide() {
    const { distance } = this.state;
    this.setContState(distance, false);
  }

  render() {
    const { className, children, direction } = this.props;
    const cls = classNames({
      'jimu-swipemove': true,
      'jimu-bottom': direction === 'bottom',
      'jimu-top': direction === 'top',
      'jimu-left': direction === 'left',
      'jimu-right': direction === 'right',
      [className]: className,
    });
    return (
      <Swipeable
        className={cls}
        onSwipingUp={this.swipingUp}
        onSwipingDown={this.swipingDown}
        onSwipingLeft={this.swipingLeft}
        onSwipingRight={this.swipingRight}
        onSwiped={this.swiped}
      >
        <div className="touch-content" ref={(n) => { this.touchContent = n; }}>
          <div className="touch-layout">
            <span className="touch-icon" />
          </div>
          <div className="touch-scroll" ref={(n) => { this.touchScroll = n; }}>
            <div className="touch-main" ref={(n) => { this.touchMain = n; }}>
              {children}
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}

export default SwipeMove;
