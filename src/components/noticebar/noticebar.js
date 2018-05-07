/**
* Created by yanshenshen on 17/10/30.
*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class NoticeBar extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    closeIconShow: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    isShadowStyle: PropTypes.bool,
    speed: PropTypes.number,
    duration: PropTypes.number,
    closeBack: PropTypes.func,
  }

  static defaultProps = {
    show: true, // 是否展示
    closeIconShow: false, // 是否显示关闭按钮
    message: '', // 通告栏提示文本
    isShadowStyle: false, // 展示类型 false：通栏展示 ，true：白色背景带阴影的通栏
    iconHtml: '', // icon图标 html 结构
    speed: 3, // 速度
    rollingUp: false, // 是否开启上下翻滚
    closeBack() {}, // 关闭后的回调
    duration: 0.8, // 翻滚动画执行的时间
    scrollDuration: 3000, // 左右滚动停顿时常
    scrollDefaultLeft: 10, // 左右滚动时初始位置
  }

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
    this.hideClick = this.hideClick.bind(this);
  }


  componentDidMount() {
    const { rollingUp, message } = this.props;
    const { messageRoot, messageItemsRoot } = this;
    const msgWidth = messageRoot.clientWidth;
    const itemsWidth = messageItemsRoot.clientWidth;

    if (itemsWidth > msgWidth && !rollingUp) {
      this.latMove();
      return;
    }
    messageItemsRoot.style.left = '0px';
    if (rollingUp && typeof message === 'object') {
      this.rollMove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        show: nextProps.iconHide,
      });
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    this.rooltimer && clearTimeout(this.rooltimer);
    this.scrolltimer && clearTimeout(this.scrolltimer);
  }

  latMove() {
    const self = this;
    const { speed, scrollDuration, scrollDefaultLeft } = this.props;
    const { messageRoot, messageItemsRoot } = this;
    // msgWidth = messageRoot.clientWidth,
    const itemsWidth = messageItemsRoot.clientWidth - messageRoot.clientWidth;
    const mySpeed = speed > 10 ? 10 : speed;
    const initLeft = scrollDefaultLeft;
    this.itemsLeft = initLeft;
    this.timer = setInterval(() => {
      if (self.itemsLeft < -itemsWidth) {
        self.itemsLeft = initLeft;
        this.timer && clearInterval(this.timer);

        self.scrolltimer = setTimeout(() => {
          self.latMove();
        }, scrollDuration);

        return false;
      }
      self.itemsLeft -= 1;
      self.latMoving(self.itemsLeft);
      return true;
    }, 100 / mySpeed);
  }

  latMoving(left) {
    const { messageItemsRoot } = this;
    messageItemsRoot.style.left = `${left}px`;
  }

  rollMove() {
    const self = this;
    const { speed, message, duration } = this.props;
    const { messageItemsRoot } = this;
    const mySpeed = speed > 10 ? 10 : speed;
    // 如果子元素个数为一时 ，不滚动
    if (message.length <= 1) {
      return;
    }
    this.itemsCur = 0;
    this.timer = setInterval(() => {
      if (self.itemsCur >= message.length) {
        self.itemsCur = 0;
        messageItemsRoot.style.WebkitTransition = 'none';
        messageItemsRoot.style.top = '0px';
      }
      self.rooltimer && clearTimeout(self.rooltimer);
      self.rooltimer = setTimeout(() => {
        messageItemsRoot.style.WebkitTransition = `all ${duration}s ease-in`;
        self.itemsCur += 1;
        self.rollMoveing(self.itemsCur);
      }, 20);
    }, 1000 * (10 / mySpeed));
  }

  rollMoveing(idx) {
    const { messageItemsRoot, messageRoot } = this;
    messageItemsRoot.style.top = `-${idx * messageRoot.clientHeight}px`;
  }

  hideClick() {
    this.setState({
      show: false,
    });
    this.timer && clearInterval(this.timer);
    this.rooltimer && clearTimeout(this.rooltimer);
    this.scrolltimer && clearTimeout(this.scrolltimer);
    this.props.closeBack && this.props.closeBack();
  }

  messageHTML() {
    const { message } = this.props;
    if (typeof message === 'string') {
      return (<li>{message}</li>);
    }
    if (typeof message === 'object') {
      return message.map((re, idx) => (<li key={idx}>{re}</li>));
    }
    return null;
  }

  render() {
    const {
      closeIconShow, className, message, iconHtml, rollingUp, isShadowStyle,
    } = this.props;
    const { show } = this.state;
    const cls = classNames({
      'pile-noticebar': true,
      'pile-noticebar-layout-asideicon': iconHtml,
      'pile-noticebar-layout-iconhidden': !iconHtml,
      'pile-noticebar-layout-shadow': isShadowStyle,
      'pile-noticebar-layout-closehidden': !closeIconShow,
      'pile-noticebar-rollingup': rollingUp,
      [className]: className,
    });

    return (
      <div className={cls} style={{ display: show ? 'flex' : 'none' }}>
        {iconHtml && <div className="pile-noticebar-aside-icon">{iconHtml}</div>}
        <div className="pile-noticebar-msg" ref={(t) => { this.messageRoot = t; }}>
          <ul className="pile-noticebar-msg-items" ref={(t) => { this.messageItemsRoot = t; }} style={{ left: '1000px' }}>
            {this.messageHTML()}
            {rollingUp && message.length > 1 && typeof message === 'object' && <li key="-1">{message[0]}</li>}
          </ul>
        </div>
        {closeIconShow && <div className="pile-noticebar-icon-close" onClick={this.hideClick}><span className="icon-del" /></div>}
      </div>
    );
  }
}
export default NoticeBar;
