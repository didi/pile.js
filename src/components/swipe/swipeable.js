import React from 'react';
import PropTypes from 'prop-types';
// const Swipeable = React.createClass({
class Swipeable extends React.Component {
  static propTypes = {
    onSwiped: PropTypes.func,
    onSwiping: PropTypes.func,
    onSwipingUp: PropTypes.func,
    onSwipingRight: PropTypes.func,
    onSwipingDown: PropTypes.func,
    onSwipingLeft: PropTypes.func,
    onSwipedUp: PropTypes.func,
    onSwipedRight: PropTypes.func,
    onSwipedDown: PropTypes.func,
    onSwipedLeft: PropTypes.func,
    flickThreshold: PropTypes.number,
    delta: PropTypes.number,
    preventDefaultTouchmoveEvent: PropTypes.bool,
    nodeName: PropTypes.string,
  }

  static defaultProps = {
    flickThreshold: 0.6,
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    nodeName: 'div',
    onSwiped: null,
    onSwiping: null,
    onSwipingUp: null,
    onSwipingRight: null,
    onSwipingDown: null,
    onSwipingLeft: null,
    onSwipedUp: null,
    onSwipedRight: null,
    onSwipedDown: null,
    onSwipedLeft: null,
  }

  constructor(props) {
    super(props);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.state = {
      x: null,
      y: null,
      swiping: false,
      start: 0,
    };
  }

  calculatePos(e) {
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;

    const xd = this.state.x - x;
    const yd = this.state.y - y;

    const axd = Math.abs(xd);
    const ayd = Math.abs(yd);

    const time = Date.now() - this.state.start;
    const velocity = Math.sqrt(axd * axd + ayd * ayd) / time;

    return {
      deltaX: xd,
      deltaY: yd,
      absX: axd,
      absY: ayd,
      velocity,
    };
  }

  touchStart(e) {
    if (e.touches.length > 1) {
      return;
    }
    this.setState({
      start: Date.now(),
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      swiping: false,
    });
  }

  touchMove(e) {
    if (!this.state.x || !this.state.y || e.touches.length > 1) {
      return;
    }

    let cancelPageSwipe = false;
    const pos = this.calculatePos(e);

    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
      return;
    }

    if (this.props.onSwiping) {
      this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (this.props.onSwipingLeft || this.props.onSwipedLeft) {
          this.props.onSwipingLeft && this.props.onSwipingLeft(e, pos.absX);
          cancelPageSwipe = true;
        }
      } else if (this.props.onSwipingRight || this.props.onSwipedRight) {
        this.props.onSwipingRight && this.props.onSwipingRight(e, pos.absX);
        cancelPageSwipe = true;
      }
    } else if (pos.deltaY > 0) {
      if (this.props.onSwipingUp || this.props.onSwipedUp) {
        this.props.onSwipingUp && this.props.onSwipingUp(e, pos.absY);
        cancelPageSwipe = true;
      }
    } else if (this.props.onSwipingDown || this.props.onSwipedDown) {
      this.props.onSwipingDown && this.props.onSwipingDown(e, pos.absY);
      cancelPageSwipe = true;
    }

    this.setState({ swiping: true });

    if (cancelPageSwipe && this.props.preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
  }

  touchEnd(ev) {
    if (this.state.swiping) {
      const pos = this.calculatePos(ev);

      const isFlick = pos.velocity > this.props.flickThreshold;

      this.props.onSwiped && this.props.onSwiped(
        ev,
        pos.deltaX,
        pos.deltaY,
        isFlick,
      );

      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          this.props.onSwipedLeft && this.props.onSwipedLeft(ev, pos.deltaX, isFlick);
        } else {
          this.props.onSwipedRight && this.props.onSwipedRight(ev, pos.deltaX, isFlick);
        }
      } else if (pos.deltaY > 0) {
        this.props.onSwipedUp && this.props.onSwipedUp(ev, pos.deltaY, isFlick);
      } else {
        this.props.onSwipedDown && this.props.onSwipedDown(ev, pos.deltaY, isFlick);
      }
    }

    this.setState({
      x: null,
      y: null,
      swiping: false,
      start: 0,
    });
  }

  render() {
    const newProps = {
      ...this.props,
      onTouchStart: this.touchStart,
      onTouchMove: this.touchMove,
      onTouchEnd: this.touchEnd,
    };

    delete newProps.onSwiped;
    delete newProps.onSwiping;
    delete newProps.onSwipingUp;
    delete newProps.onSwipingRight;
    delete newProps.onSwipingDown;
    delete newProps.onSwipingLeft;
    delete newProps.onSwipedUp;
    delete newProps.onSwipedRight;
    delete newProps.onSwipedDown;
    delete newProps.onSwipedLeft;
    delete newProps.flickThreshold;
    delete newProps.delta;
    delete newProps.preventDefaultTouchmoveEvent;
    delete newProps.nodeName;
    delete newProps.children;

    return React.createElement(
      this.props.nodeName,
      newProps,
      this.props.children,
    );
  }
}

export default Swipeable;
