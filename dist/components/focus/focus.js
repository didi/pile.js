'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../swipe/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipeable = _index2.default.Swipeable;
var Focus = (_temp = _class = function (_Component) {
  _inherits(Focus, _Component);

  function Focus(props) {
    _classCallCheck(this, Focus);

    var _this = _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).call(this, props));

    var _this$props = _this.props,
        index = _this$props.index,
        children = _this$props.children,
        loop = _this$props.loop;

    _this.state = {
      degree: 50,
      index: index > children.length - 1 ? children.length - 1 : index,
      len: children.length,
      // loop : timer ? true : loop
      loop: loop
    };

    _this.touching = _this.touching.bind(_this);
    _this.touchLeft = _this.touchLeft.bind(_this);
    _this.touchRight = _this.touchRight.bind(_this);
    _this.touchEd = _this.touchEd.bind(_this);
    return _this;
  }

  _createClass(Focus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          index = _props.index,
          width = _props.width,
          children = _props.children,
          loop = _props.loop,
          timer = _props.timer;

      var itemsWidthNumber = Number(width.split('px')[0]);
      //  setloop = timer ? true : loop;

      this.state = {
        degree: 50,
        index: index > children.length - 1 ? children.length - 1 : index,
        itemsWidthNumber: itemsWidthNumber,
        len: children.length,
        loop: loop,
        translateX: loop ? itemsWidthNumber * children.length : 0
      };
      this.setStyleInit();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mytimer && clearInterval(this.mytimer);
    }
  }, {
    key: 'setStyleInit',
    value: function setStyleInit() {
      var focusContent = this.focusContent;
      var _state = this.state,
          index = _state.index,
          itemsWidthNumber = _state.itemsWidthNumber,
          len = _state.len,
          loop = _state.loop,
          translateX = _state.translateX;


      if (len > 1) {
        if (loop) {
          focusContent.style.width = itemsWidthNumber * len * 3 + 'px';
          focusContent.style.left = -itemsWidthNumber * index - translateX + 'px';
        } else {
          focusContent.style.width = itemsWidthNumber * len + 'px';
          focusContent.style.left = -itemsWidthNumber * index + 'px';
        }
        this.autoMove();
      }
    }
  }, {
    key: 'touchRight',
    value: function touchRight(e, poaX) {
      var focusContent = this.focusContent,
          _state2 = this.state,
          index = _state2.index,
          itemsWidthNumber = _state2.itemsWidthNumber,
          translateX = _state2.translateX,
          loop = _state2.loop;

      // 阻止window窗体滚动
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();

      focusContent.style.WebkitTransition = 'none';
      if (index === 0) {
        if (loop) {
          focusContent.style.left = poaX - translateX + 'px';
        } else {
          focusContent.style.left = poaX / 5 + 'px';
        }

        return false;
      }
      focusContent.style.left = -(itemsWidthNumber * index - poaX) - translateX + 'px';
      return true;
    }
  }, {
    key: 'touchLeft',
    value: function touchLeft(e, poaX) {
      var focusContent = this.focusContent,
          _state3 = this.state,
          index = _state3.index,
          itemsWidthNumber = _state3.itemsWidthNumber,
          len = _state3.len,
          loop = _state3.loop,
          translateX = _state3.translateX;

      focusContent.style.WebkitTransition = 'none';

      // 阻止window窗体滚动
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();

      if (index === len - 1) {
        if (loop) {
          focusContent.style.left = -(itemsWidthNumber * index + poaX) - translateX + 'px';
        } else {
          focusContent.style.left = -(itemsWidthNumber * index + poaX / 5) + 'px';
        }
      } else {
        focusContent.style.left = -(itemsWidthNumber * index + poaX) - translateX + 'px';
      }
    }
  }, {
    key: 'touching',
    value: function touching() {
      var timer = this.props.timer;


      if (timer) {
        clearInterval(this.mytimer);
      }
    }
  }, {
    key: 'touchEd',
    value: function touchEd(e, poaX) {
      var _state4 = this.state,
          index = _state4.index,
          len = _state4.len,
          loop = _state4.loop;


      if (poaX < 0) {
        if (!loop && index === 0) {
          this.move(index);
        } else {
          this.move(index - 1);
        }
      }

      if (poaX > 0) {
        if (!loop && index === len - 1) {
          this.move(index);
        } else {
          this.move(index + 1);
        }
      }

      this.autoMove();
    }
  }, {
    key: 'autoMove',
    value: function autoMove() {
      var self = this,
          _props2 = this.props,
          direction = _props2.direction,
          timer = _props2.timer,
          auto = _props2.auto;

      var dir = 1;

      if (direction !== 'left') {
        dir = -1;
      }
      if (auto) {
        clearInterval(self.mytimer);
        self.mytimer = setInterval(function () {
          var autoindex = self.state.index + dir;
          self.move(autoindex);
        }, timer);
      }
    }
  }, {
    key: 'move',
    value: function move(index) {
      var _state5 = this.state,
          itemsWidthNumber = _state5.itemsWidthNumber,
          translateX = _state5.translateX,
          len = _state5.len,
          loop = _state5.loop,
          duration = this.props.duration,
          focusContent = this.focusContent;


      var stateIndex = index;

      focusContent.style.WebkitTransition = 'all ' + duration / 1000 + 's ease-in';

      if (loop) {
        focusContent.style.left = -itemsWidthNumber * index - translateX + 'px';
        if (index < 0) {
          stateIndex = len - 1;
          setTimeout(function () {
            focusContent.style.WebkitTransition = 'none';
            focusContent.style.left = -itemsWidthNumber * stateIndex - translateX + 'px';
          }, duration);
        }
        if (index >= len) {
          stateIndex = 0;
          setTimeout(function () {
            focusContent.style.WebkitTransition = 'none';
            focusContent.style.left = -itemsWidthNumber * stateIndex - translateX + 'px';
          }, duration);
        }
      } else {
        if (index < 0) {
          stateIndex = len - 1;
        }
        if (index >= len) {
          stateIndex = 0;
        }
        focusContent.style.left = -itemsWidthNumber * stateIndex + 'px';
      }

      this.setState({
        index: stateIndex
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          className = _props3.className,
          children = _props3.children,
          width = _props3.width,
          spotShow = _props3.spotShow,
          _state6 = this.state,
          index = _state6.index,
          loop = _state6.loop;


      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-focus-layout': true
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, style: { width: width } },
        children.length > 1 ? _react2.default.createElement(
          Swipeable,
          {
            onSwiping: this.touching,
            onSwipingLeft: this.touchLeft,
            onSwipingRight: this.touchRight,
            onSwiped: this.touchEd
          },
          loop ? _react2.default.createElement(
            'div',
            { className: 'jimu-focus-content', ref: function ref(t) {
                _this2.focusContent = t;
              } },
            children.map(function (re, i) {
              return _react2.default.createElement(
                'div',
                { className: 'jimu-focus-items', style: { width: width }, key: i },
                re
              );
            }),
            children.map(function (re, i) {
              return _react2.default.createElement(
                'div',
                { className: 'jimu-focus-items', style: { width: width }, key: i },
                re
              );
            }),
            children.map(function (re, i) {
              return _react2.default.createElement(
                'div',
                { className: 'jimu-focus-items', style: { width: width }, key: i },
                re
              );
            })
          ) : _react2.default.createElement(
            'div',
            { className: 'jimu-focus-content', ref: function ref(t) {
                _this2.focusContent = t;
              } },
            children.map(function (re, i) {
              return _react2.default.createElement(
                'div',
                { className: 'jimu-focus-items', style: { width: width }, key: i },
                re
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'jimu-focus-ft' },
            spotShow && children.map(function (re, i) {
              if (i === index) {
                return _react2.default.createElement('span', { className: 'jimu-focus-ftitems jimu-focus-current', key: i });
              }
              return _react2.default.createElement('span', { className: 'jimu-focus-ftitems', key: i });
            })
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'jimu-focus-content', ref: function ref(t) {
              _this2.focusContent = t;
            } },
          _react2.default.createElement(
            'div',
            { className: 'jimu-focus-items', style: { width: width } },
            children
          )
        )
      );
    }
  }]);

  return Focus;
}(_react.Component), _class.propTypes = {
  index: _propTypes2.default.number,
  duration: _propTypes2.default.number,
  width: _propTypes2.default.string,
  direction: _propTypes2.default.string,
  loop: _propTypes2.default.bool,
  auto: _propTypes2.default.bool
}, _class.defaultProps = {
  index: 0,
  width: '375px',
  timer: null,
  loop: true, // 循环
  direction: 'left',
  duration: 200,
  auto: true,
  spotShow: false // 是否显示指示点
}, _temp);

module.exports = Focus;