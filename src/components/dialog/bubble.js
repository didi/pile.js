/**
 * Created by zhaojie on 16/06/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Bubble extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    direction: PropTypes.string,
    show: PropTypes.bool,
    closeBtnShow: PropTypes.bool,
    top: PropTypes.string,
    left: PropTypes.string,
    closeBack: PropTypes.func,
  }
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    direction: 'left', // 方向
    show: true, // 是否展示
    closeBtnShow: true, // 是否需要关闭按钮
    top: '200px', // 弹层定位  top 值
    left: '200px', // 弹层定位  left 值
    closeBack: null, // 关闭按钮点击回调
    align: 0, // 0:水平或者垂直居中，1 ：左对齐或者顶部对齐，2右对齐或者底部对齐
  }

  constructor(props) {
    super(props);
    this.state = {
      bubbleShow: this.props.show,
      ...this.props,
    };
  }

  componentDidMount() {
    this.setStyle();
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops) {
      this.setState({
        bubbleShow: nextprops.show,
        top: nextprops.top,
        left: nextprops.left,
        align: nextprops.align,
        direction: nextprops.direction,
        closeBtnShow: nextprops.closeBtnShow,
      });

      const self = this;
      setTimeout(() => {
        self.setStyle();
      });
    }
  }

  setStyle() {
    const {
      direction, top, left, align,
    } = this.state;
    /* eslint-disable react/no-string-refs, react/no-find-dom-node */
    const { bubbleWrap } = this.refs;
    const bubbleDom = ReactDOM.findDOMNode(bubbleWrap);
    /* eslint-enable react/no-string-refs, react/no-find-dom-node */
    setTimeout(() => {
      const bubbleDomWidth = bubbleDom.clientWidth;
      const bubbleDomHeight = bubbleDom.clientHeight;
      let transX;
      let transY;

      if (direction === 'left' || direction === 'right') {
        transX = direction !== 'left' ? '5px' : `-${bubbleDomWidth + 5}px`;
        transY = `-${bubbleDomHeight / 2}px`;

        if (align === 1) {
          transY = '-25px';
        }
        if (align === 2) {
          transY = `-${bubbleDomHeight - 25}px`;
        }
      }

      if (direction === 'bottom' || direction === 'top') {
        transX = `-${bubbleDomWidth / 2}px`;
        transY = direction !== 'top' ? '5px' : `-${bubbleDomHeight + 5}px`;
        if (align === 1) {
          transX = '-25px';
        }
        if (align === 2) {
          transX = `-${bubbleDomWidth - 25}px`;
        }
      }
      bubbleWrap.style.webkitTransform = `translate(${transX},${transY})`;
    });

    bubbleWrap.style.top = top;
    bubbleWrap.style.left = left;
  }

  hiddenBubble() {
    this.setState({
      bubbleShow: false,
    });
    this.props.closeBack && this.props.closeBack();
  }

  render() {
    const {
      bubbleShow, className, closeBtnShow, direction, align,
    } = this.state;
    const cls = classNames({
      'jimu-bubble': true,
      [`jimu-bubble-${direction}`]: true,
      [`jimu-bubble-${align}`]: true,
      'jimu-bubble-close': closeBtnShow,
      [className]: className,
    });

    return (
      <div className={cls} ref="bubbleWrap" style={{ display: bubbleShow ? 'block' : 'none' }}>
        <div className="jimu-bubble-content" ref="bubbleCont">
          {this.props.children}
          {closeBtnShow && <span className="icon-del bubble-close" onClick={this.hiddenBubble.bind(this)} />}
        </div>
      </div>
    );
  }
}
