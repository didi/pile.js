'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                   * Created by yanshenshen on 17/10/30.
                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoticeBar = (_temp = _class = function (_React$Component) {
  _inherits(NoticeBar, _React$Component);

  function NoticeBar(props) {
    _classCallCheck(this, NoticeBar);

    var _this = _possibleConstructorReturn(this, (NoticeBar.__proto__ || Object.getPrototypeOf(NoticeBar)).call(this, props));

    _this.state = {
      show: _this.props.show
    };
    _this.hideClick = _this.hideClick.bind(_this);
    return _this;
  }

  _createClass(NoticeBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          rollingUp = _props.rollingUp,
          message = _props.message;
      var messageRoot = this.messageRoot,
          messageItemsRoot = this.messageItemsRoot;

      var msgWidth = messageRoot.clientWidth;
      var itemsWidth = messageItemsRoot.clientWidth;

      if (itemsWidth > msgWidth && !rollingUp) {
        this.latMove();
        return;
      }
      messageItemsRoot.style.left = '0px';
      if (rollingUp && (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
        this.rollMove();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.show !== this.props.show) {
        this.setState({
          show: nextProps.iconHide
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timer && clearInterval(this.timer);
      this.rooltimer && clearTimeout(this.rooltimer);
      this.scrolltimer && clearTimeout(this.scrolltimer);
    }
  }, {
    key: 'latMove',
    value: function latMove() {
      var _this2 = this;

      var self = this;
      var _props2 = this.props,
          speed = _props2.speed,
          scrollDuration = _props2.scrollDuration,
          scrollDefaultLeft = _props2.scrollDefaultLeft;
      var messageRoot = this.messageRoot,
          messageItemsRoot = this.messageItemsRoot;
      // msgWidth = messageRoot.clientWidth,

      var itemsWidth = messageItemsRoot.clientWidth - messageRoot.clientWidth;
      var mySpeed = speed > 10 ? 10 : speed;
      var initLeft = scrollDefaultLeft;
      this.itemsLeft = initLeft;
      this.timer = setInterval(function () {
        if (self.itemsLeft < -itemsWidth) {
          self.itemsLeft = initLeft;
          _this2.timer && clearInterval(_this2.timer);

          self.scrolltimer = setTimeout(function () {
            self.latMove();
          }, scrollDuration);

          return false;
        }
        self.itemsLeft -= 1;
        self.latMoving(self.itemsLeft);
        return true;
      }, 100 / mySpeed);
    }
  }, {
    key: 'latMoving',
    value: function latMoving(left) {
      var messageItemsRoot = this.messageItemsRoot;

      messageItemsRoot.style.left = left + 'px';
    }
  }, {
    key: 'rollMove',
    value: function rollMove() {
      var self = this;
      var _props3 = this.props,
          speed = _props3.speed,
          message = _props3.message,
          duration = _props3.duration;
      var messageItemsRoot = this.messageItemsRoot;

      var mySpeed = speed > 10 ? 10 : speed;
      // 如果子元素个数为一时 ，不滚动
      if (message.length <= 1) {
        return;
      }
      this.itemsCur = 0;
      this.timer = setInterval(function () {
        if (self.itemsCur >= message.length) {
          self.itemsCur = 0;
          messageItemsRoot.style.WebkitTransition = 'none';
          messageItemsRoot.style.top = '0px';
        }
        self.rooltimer && clearTimeout(self.rooltimer);
        self.rooltimer = setTimeout(function () {
          messageItemsRoot.style.WebkitTransition = 'all ' + duration + 's ease-in';
          self.itemsCur += 1;
          self.rollMoveing(self.itemsCur);
        }, 20);
      }, 1000 * (10 / mySpeed));
    }
  }, {
    key: 'rollMoveing',
    value: function rollMoveing(idx) {
      var messageItemsRoot = this.messageItemsRoot,
          messageRoot = this.messageRoot;

      messageItemsRoot.style.top = '-' + idx * messageRoot.clientHeight + 'px';
    }
  }, {
    key: 'hideClick',
    value: function hideClick() {
      this.setState({
        show: false
      });
      this.timer && clearInterval(this.timer);
      this.rooltimer && clearTimeout(this.rooltimer);
      this.scrolltimer && clearTimeout(this.scrolltimer);
      this.props.closeBack && this.props.closeBack();
    }
  }, {
    key: 'messageHTML',
    value: function messageHTML() {
      var message = this.props.message;

      if (typeof message === 'string') {
        return _react2.default.createElement(
          'li',
          null,
          message
        );
      }
      if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
        return message.map(function (re, idx) {
          return _react2.default.createElement(
            'li',
            { key: idx },
            re
          );
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          closeIconShow = _props4.closeIconShow,
          className = _props4.className,
          message = _props4.message,
          iconHtml = _props4.iconHtml,
          rollingUp = _props4.rollingUp,
          isShadowStyle = _props4.isShadowStyle;
      var show = this.state.show;

      var cls = (0, _classnames2.default)(_defineProperty({
        'pile-noticebar': true,
        'pile-noticebar-layout-asideicon': iconHtml,
        'pile-noticebar-layout-iconhidden': !iconHtml,
        'pile-noticebar-layout-shadow': isShadowStyle,
        'pile-noticebar-layout-closehidden': !closeIconShow,
        'pile-noticebar-rollingup': rollingUp
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, style: { display: show ? 'flex' : 'none' } },
        iconHtml && _react2.default.createElement(
          'div',
          { className: 'pile-noticebar-aside-icon' },
          iconHtml
        ),
        _react2.default.createElement(
          'div',
          { className: 'pile-noticebar-msg', ref: function ref(t) {
              _this3.messageRoot = t;
            } },
          _react2.default.createElement(
            'ul',
            { className: 'pile-noticebar-msg-items', ref: function ref(t) {
                _this3.messageItemsRoot = t;
              }, style: { left: '1000px' } },
            this.messageHTML(),
            rollingUp && message.length > 1 && (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' && _react2.default.createElement(
              'li',
              { key: '-1' },
              message[0]
            )
          )
        ),
        closeIconShow && _react2.default.createElement(
          'div',
          { className: 'pile-noticebar-icon-close', onClick: this.hideClick },
          _react2.default.createElement('span', { className: 'icon-del' })
        )
      );
    }
  }]);

  return NoticeBar;
}(_react2.default.Component), _class.propTypes = {
  show: _propTypes2.default.bool,
  closeIconShow: _propTypes2.default.bool,
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  isShadowStyle: _propTypes2.default.bool,
  speed: _propTypes2.default.number,
  duration: _propTypes2.default.number,
  closeBack: _propTypes2.default.func
}, _class.defaultProps = {
  show: true, // 是否展示
  closeIconShow: false, // 是否显示关闭按钮
  message: '', // 通告栏提示文本
  isShadowStyle: false, // 展示类型 false：通栏展示 ，true：白色背景带阴影的通栏
  iconHtml: '', // icon图标 html 结构
  speed: 3, // 速度
  rollingUp: false, // 是否开启上下翻滚
  closeBack: function closeBack() {},
  // 关闭后的回调
  duration: 0.8, // 翻滚动画执行的时间
  scrollDuration: 3000, // 左右滚动停顿时常
  scrollDefaultLeft: 10 // 左右滚动时初始位置
}, _temp);
exports.default = NoticeBar;