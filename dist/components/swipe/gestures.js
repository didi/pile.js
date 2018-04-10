'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Gestures = (_temp = _class = function (_React$Component) {
  _inherits(Gestures, _React$Component);

  function Gestures(props) {
    _classCallCheck(this, Gestures);

    var _this = _possibleConstructorReturn(this, (Gestures.__proto__ || Object.getPrototypeOf(Gestures)).call(this, props));

    _this._handleTouchStart = function (e) {
      _this._emitEvent('onTouchStart', e);

      _this.setState({
        start: Date.now(),
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        swiping: false
      });
    };

    _this._handleTouchMove = function (e) {
      var ge = _this._getGestureDetails(e);
      _this._emitEvent('onTouchMove', ge);

      if (ge.gesture.absX > _this.props.swipeThreshold && ge.gesture.absY > _this.props.swipeThreshold) {
        _this._handleSwipeGesture(ge);
      }
    };

    _this._handleTouchCancel = function (e) {
      _this._emitEvent('onTouchCancel', e);
      _this._resetState();
    };

    _this._handleTouchEnd = function (e) {
      var ge = _this._getGestureDetails(e);
      _this._emitEvent('onTouchEnd', ge);

      if (_this.state.swiping) {
        _this._handleSwipeGesture(ge);
        return _this._resetState();
      }
      if (ge.gesture.duration > 0) {
        _this._handleTapGesture(ge);
      }
      _this._resetState();
    };

    _this.state = {
      x: null,
      y: null,
      swiping: false,
      start: 0
    };
    return _this;
  }

  _createClass(Gestures, [{
    key: '_resetState',
    value: function _resetState() {
      this.setState({
        x: null, y: null, swiping: false, start: 0
      });
    }
  }, {
    key: '_emitEvent',
    value: function _emitEvent(name, e) {
      if (this.props[name]) {
        this.props[name](e);
      }
    }
  }, {
    key: '_getGestureDetails',
    value: function _getGestureDetails(e) {
      var _e$changedTouches$ = e.changedTouches[0],
          clientX = _e$changedTouches$.clientX,
          clientY = _e$changedTouches$.clientY;

      var deltaX = this.state.x - clientX;
      var deltaY = this.state.y - clientY;
      var absX = Math.abs(deltaX);
      var absY = Math.abs(deltaY);
      var duration = Date.now() - this.state.start;
      var velocity = Math.sqrt(absX * absX + absY * absY) / duration;
      var done = e.type === 'touchend';
      e.gesture = {
        deltaX: deltaX, deltaY: deltaY, absX: absX, absY: absY, velocity: velocity, duration: duration, done: done
      };
      return e;
    }
  }, {
    key: '_handleTapGesture',
    value: function _handleTapGesture(ge) {
      ge.type = 'tap';
      this._emitEvent('onTap', ge);
    }
  }, {
    key: '_handleSwipeGesture',
    value: function _handleSwipeGesture(ge) {
      var _ge$gesture = ge.gesture,
          deltaX = _ge$gesture.deltaX,
          absX = _ge$gesture.absX,
          deltaY = _ge$gesture.deltaY,
          absY = _ge$gesture.absY;

      var direction = absX > absY ? deltaX < 0 ? 'Right' : 'Left' : deltaY < 0 ? 'Up' : 'Down';

      this.setState({ swiping: true });

      ge.gesture.isFlick = ge.gesture.velocity > this.props.flickThreshold;
      ge.type = 'swipe' + direction.toLowerCase();
      this._emitEvent('onSwipe' + direction, ge);
      ge.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        onTouchStart: this._handleTouchStart,
        onTouchMove: this._handleTouchMove,
        onTouchCancel: this._handleTouchCancel,
        onTouchEnd: this._handleTouchEnd
      });
    }
  }]);

  return Gestures;
}(_react2.default.Component), _class.propTypes = {
  onSwipeUp: _propTypes2.default.func,
  onSwipeDown: _propTypes2.default.func,
  onSwipeLeft: _propTypes2.default.func,
  onSwipeRight: _propTypes2.default.func,
  flickThreshold: _propTypes2.default.number,
  swipeThreshold: _propTypes2.default.number
}, _class.defaultProps = {
  flickThreshold: 0.6,
  swipeThreshold: 10
}, _temp);
exports.default = Gestures;