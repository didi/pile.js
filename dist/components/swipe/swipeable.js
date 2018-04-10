'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const Swipeable = React.createClass({
var Swipeable = (_temp = _class = function (_React$Component) {
  _inherits(Swipeable, _React$Component);

  function Swipeable(props) {
    _classCallCheck(this, Swipeable);

    var _this = _possibleConstructorReturn(this, (Swipeable.__proto__ || Object.getPrototypeOf(Swipeable)).call(this, props));

    _this.touchStart = _this.touchStart.bind(_this);
    _this.touchMove = _this.touchMove.bind(_this);
    _this.touchEnd = _this.touchEnd.bind(_this);
    _this.state = {
      x: null,
      y: null,
      swiping: false,
      start: 0
    };
    return _this;
  }

  _createClass(Swipeable, [{
    key: 'calculatePos',
    value: function calculatePos(e) {
      var x = e.changedTouches[0].clientX;
      var y = e.changedTouches[0].clientY;

      var xd = this.state.x - x;
      var yd = this.state.y - y;

      var axd = Math.abs(xd);
      var ayd = Math.abs(yd);

      var time = Date.now() - this.state.start;
      var velocity = Math.sqrt(axd * axd + ayd * ayd) / time;

      return {
        deltaX: xd,
        deltaY: yd,
        absX: axd,
        absY: ayd,
        velocity: velocity
      };
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      if (e.touches.length > 1) {
        return;
      }
      this.setState({
        start: Date.now(),
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        swiping: false
      });
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      if (!this.state.x || !this.state.y || e.touches.length > 1) {
        return;
      }

      var cancelPageSwipe = false;
      var pos = this.calculatePos(e);

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
  }, {
    key: 'touchEnd',
    value: function touchEnd(ev) {
      if (this.state.swiping) {
        var pos = this.calculatePos(ev);

        var isFlick = pos.velocity > this.props.flickThreshold;

        this.props.onSwiped && this.props.onSwiped(ev, pos.deltaX, pos.deltaY, isFlick);

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
        start: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var newProps = _extends({}, this.props, {
        onTouchStart: this.touchStart,
        onTouchMove: this.touchMove,
        onTouchEnd: this.touchEnd
      });

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

      return _react2.default.createElement(this.props.nodeName, newProps, this.props.children);
    }
  }]);

  return Swipeable;
}(_react2.default.Component), _class.propTypes = {
  onSwiped: _propTypes2.default.func,
  onSwiping: _propTypes2.default.func,
  onSwipingUp: _propTypes2.default.func,
  onSwipingRight: _propTypes2.default.func,
  onSwipingDown: _propTypes2.default.func,
  onSwipingLeft: _propTypes2.default.func,
  onSwipedUp: _propTypes2.default.func,
  onSwipedRight: _propTypes2.default.func,
  onSwipedDown: _propTypes2.default.func,
  onSwipedLeft: _propTypes2.default.func,
  flickThreshold: _propTypes2.default.number,
  delta: _propTypes2.default.number,
  preventDefaultTouchmoveEvent: _propTypes2.default.bool,
  nodeName: _propTypes2.default.string
}, _class.defaultProps = {
  flickThreshold: 0.6,
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  nodeName: 'div'
}, _temp);
exports.default = Swipeable;