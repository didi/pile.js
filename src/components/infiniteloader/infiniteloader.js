/**
 * Created by yanshenshen on 17/04/10.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Swipe from '../swipe/index';
import { getComponentLocale } from '../localeprovider/getLocale';
import Defaultlanguage from '../localeprovider/zh-CN';

const { Swipeable } = Swipe;

class InfiniteLoader extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    direction: PropTypes.string,
    onSwipingBack: PropTypes.func,
    onSwipedBack: PropTypes.func,
    disSwipe: PropTypes.bool,
    disAbled: PropTypes.bool,
    swipeSucc: PropTypes.bool,
    defaultbackground: PropTypes.string,
  };
  /* eslint-enable react/no-unused-prop-types */

  static defaultProps = {
    direction: 'top',
    onSwipingBack() {},
    onSwipedBack() {},
    disSwipe: false,
    disAbled: false,
    swipeSucc: false,
    height: '400px',
    defaultbackground: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isSwipeIng: true,
      degree: 120,
      isDegree: false,
    };

    this.SwipingUpBack = this.SwipingUpBack.bind(this);
    this.SwipingDownBack = this.SwipingDownBack.bind(this);
    this.SwipedBack = this.SwipedBack.bind(this);
  }

  componentDidMount() {
    this.initSetStyle(this.props);
  }

  componentWillReceiveProps(nextprops) {
    this.initSetStyle(nextprops);
  }

  initSetStyle(props) {
    const { conMain } = this;
    conMain.style.WebkitTransition = 'all 0.2s ease-in';
    // conMain.style.WebkitTransform = 'translate(0,0)';
    conMain.style.top = '0';
    this.setState({
      // isSwipeIng : true,
      swipeSucc: props.swipeSucc,
    });
  }

  // 当滑动的时候执行
  SwipingFun(posY) {
    const { onSwipingBack, disAbled } = this.props;
    const { isSwipeIng, degree } = this.state;

    if (disAbled) {
      return false;
    }

    if (!isSwipeIng) {
      this.setState({
        isSwipeIng: true,
        swipeSucc: false,
      });
    }

    if (Math.abs(posY) > degree) {
      this.setState({
        isDegree: true,
      });
    }

    if (onSwipingBack) {
      onSwipingBack();
    }
    return true;
  }

  SwipingUpBack(e, posY) {
    const { direction, disAbled } = this.props;
    const { conMain, SwipeNode } = this;
    /* eslint-disable react/no-find-dom-node */
    const listNode = ReactDOM.findDOMNode(conMain);
    const swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop;
    const documentH = ReactDOM.findDOMNode(SwipeNode).clientHeight;
    /* eslint-enable react/no-find-dom-node */
    if (disAbled) {
      return false;
    }

    if (direction === 'top' || documentH + swipeScrollTop < listNode.clientHeight) {
      return false;
    }

    e.preventDefault && e.preventDefault();

    conMain.style.WebkitTransition = 'none';
    // conMain.style.WebkitTransform = `translate(0,-${posY / 4}px)`;
    conMain.style.top = `-${posY / 4}px`;

    return this.SwipingFun(posY);
  }

  SwipingDownBack(e, posY) {
    const { direction, disAbled } = this.props;
    const { conMain, SwipeNode } = this;
    /* eslint-disable react/no-find-dom-node */
    const swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop;
    /* eslint-enable react/no-find-dom-node */

    if (disAbled) {
      return false;
    }

    if (direction !== 'top' || swipeScrollTop > 0) {
      return false;
    }

    e.preventDefault && e.preventDefault();

    conMain.style.WebkitTransition = 'none';
    // conMain.style.WebkitTransform = `translate(0,${posY / 4}px)`;
    conMain.style.top = `${posY / 4}px`;

    return this.SwipingFun(posY);
  }

  SwipedBack(e, posX, posY) {
    const {
      onSwipedBack, direction, disSwipe, disAbled,
    } = this.props;
    const { conMain, SwipeNode } = this;
    const { degree } = this.state;
    /* eslint-disable react/no-find-dom-node */
    const listNode = ReactDOM.findDOMNode(conMain);
    const swipeScrollTop = ReactDOM.findDOMNode(SwipeNode).scrollTop;
    const documentH = ReactDOM.findDOMNode(SwipeNode).clientHeight;
    /* eslint-enable react/no-find-dom-node */
    const newposY = Math.abs(posY);

    if (disAbled) {
      return false;
    }

    if (disSwipe || newposY < degree || (direction === 'top' && (swipeScrollTop > 0 || posY > 0))
    ) {
      conMain.style.WebkitTransition = 'all 0.2s ease-in';
      // conMain.style.WebkitTransform = 'translate(0,0)';
      conMain.style.top = '0';
      this.setState({
        isDegree: false,
      });

      return false;
    }
    if (disSwipe || newposY < degree || direction === 'bottom') {
      if (posY < 0 ||
        (documentH + swipeScrollTop < listNode.clientHeight) ||
        (documentH + swipeScrollTop > listNode.clientHeight &&
        listNode.clientHeight - documentH - swipeScrollTop >= 0)
      ) {
        conMain.style.WebkitTransition = 'all 0.2s ease-in';
        // conMain.style.WebkitTransform = 'translate(0,0)';
        conMain.style.top = '0';
        return false;
      }
    }
    conMain.style.WebkitTransition = 'all 0.2s ease-in';
    if (direction === 'top') {
      // conMain.style.WebkitTransform = 'translate(0,35px)';
      conMain.style.top = '35px';
    } else {
      // conMain.style.WebkitTransform = 'translate(0,-35px)';
      conMain.style.top = '-35px';
    }
    this.setState({
      isSwipeIng: false,
      swipeSucc: false,
      isDegree: false,
    });

    if (onSwipedBack) {
      onSwipedBack();
    }
    return true;
  }

  render() {
    const {
      className, children, direction, disSwipe, height, defaultbackground,
    } = this.props;
    const { isSwipeIng, swipeSucc, isDegree } = this.state;
    const cls = classNames({
      'pile-swipe-items': true,
      [className]: className,
    });

    const cls2 = classNames({
      'pile-pos-layout': true,
      'pile-pos-top': direction === 'top',
      'pile-pos-bottom': direction === 'bottom',
    });
    const locale = getComponentLocale(this.props, this.context, 'Infiniteloader', () => Defaultlanguage.Infiniteloader);
    const {
      dropDownRefreshText, dropUpRefreshText, loadMoreText,
      loosenRefreshText, loadedText, dataIsNewText, loadingText,
    } = locale;
    /* eslint-disable no-nested-ternary */
    return (
      <Swipeable
        ref={(t) => { this.SwipeNode = t; }}
        style={{ height }}
        className={cls}
        onSwipingUp={this.SwipingUpBack}
        onSwipingDown={this.SwipingDownBack}
        onSwiped={this.SwipedBack}
      >
        <div className="pile-swipe-por">
          <div ref={(t) => { this.conMain = t; }} className="pile-swipe-con" style={{ background: defaultbackground || 'transparent' }}>
            {children}
          </div>
          <div className={cls2}>
            {!disSwipe ?
               (isSwipeIng ?
                 (
                  isDegree ? <div className="swipeing">{direction === 'top' ? loosenRefreshText : loadMoreText}</div> : <div className="swipeing">{direction === 'top' ? dropDownRefreshText : dropUpRefreshText}</div>
                 )
                 :
                 (
                   <div className="swiped">
                     {swipeSucc ? loadedText : loadingText}
                   </div>
                 )
               )
               : (<div className="swipeing">{dataIsNewText}</div>)}
          </div>
        </div>
      </Swipeable>
    );
  }
}
InfiniteLoader.contextTypes = {
  pileLocale: PropTypes.object,
};

export default InfiniteLoader;
