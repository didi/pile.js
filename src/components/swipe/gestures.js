import React from 'react';
import PropTypes from 'prop-types';

class Gestures extends React.Component {
  static propTypes = {
    flickThreshold: PropTypes.number,
    swipeThreshold: PropTypes.number,
  };

  static defaultProps = {
    flickThreshold: 0.6,
    swipeThreshold: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      x: null,
      y: null,
      swiping: false,
      start: 0,
    };
  }

  _resetState() {
    this.setState({
      x: null, y: null, swiping: false, start: 0,
    });
  }

  _emitEvent(name, e) {
    if (this.props[name]) {
      this.props[name](e);
    }
  }

  _getGestureDetails(e) {
    const { clientX, clientY } = e.changedTouches[0];
    const deltaX = this.state.x - clientX;
    const deltaY = this.state.y - clientY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const duration = Date.now() - this.state.start;
    const velocity = Math.sqrt(absX * absX + absY * absY) / duration;
    const done = e.type === 'touchend';
    e.gesture = {
      deltaX, deltaY, absX, absY, velocity, duration, done,
    };
    return e;
  }

  _handleTouchStart = (e) => {
    this._emitEvent('onTouchStart', e);

    this.setState({
      start: Date.now(),
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      swiping: false,
    });
  }

  _handleTouchMove = (e) => {
    const ge = this._getGestureDetails(e);
    this._emitEvent('onTouchMove', ge);

    if (ge.gesture.absX > this.props.swipeThreshold &&
     ge.gesture.absY > this.props.swipeThreshold) {
      this._handleSwipeGesture(ge);
    }
  }

  _handleTouchCancel = (e) => {
    this._emitEvent('onTouchCancel', e);
    this._resetState();
  }

  _handleTouchEnd = (e) => {
    const ge = this._getGestureDetails(e);
    this._emitEvent('onTouchEnd', ge);

    if (this.state.swiping) {
      this._handleSwipeGesture(ge);
      return this._resetState();
    }
    if (ge.gesture.duration > 0) {
      this._handleTapGesture(ge);
    }
    this._resetState();
    return true;
  }

  _handleTapGesture(ge) {
    ge.type = 'tap';
    this._emitEvent('onTap', ge);
  }

  _handleSwipeGesture(ge) {
    const {
      deltaX, absX, deltaY, absY,
    } = ge.gesture;
    /* eslint-disable  no-nested-ternary */
    const direction = (absX > absY)
      ? deltaX < 0 ? 'Right' : 'Left'
      : deltaY < 0 ? 'Up' : 'Down';
    /* esline-enable  no-nested-ternary */

    this.setState({ swiping: true });

    ge.gesture.isFlick = ge.gesture.velocity > this.props.flickThreshold;
    ge.type = `swipe${direction.toLowerCase()}`;
    this._emitEvent(`onSwipe${direction}`, ge);
    ge.preventDefault();
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onTouchStart: this._handleTouchStart,
      onTouchMove: this._handleTouchMove,
      onTouchCancel: this._handleTouchCancel,
      onTouchEnd: this._handleTouchEnd,
    });
  }
}

export default Gestures;
