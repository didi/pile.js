'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/04/10.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FadeIn = (_temp = _class = function (_React$Component) {
  _inherits(FadeIn, _React$Component);

  function FadeIn(props) {
    _classCallCheck(this, FadeIn);

    var _this = _possibleConstructorReturn(this, (FadeIn.__proto__ || Object.getPrototypeOf(FadeIn)).call(this, props));

    _this.state = {
      maskHidden: true
    };
    _this.wrapFadeIn = _this.wrapFadeIn.bind(_this);
    _this.wrapFadeOut = _this.wrapFadeOut.bind(_this);
    _this.closeTips = _this.closeTips.bind(_this);
    return _this;
  }

  _createClass(FadeIn, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setPos(this.props);
      this.setStyle(this.props);
      if (this.props.show) {
        this.wrapFadeIn(this.setPos(this.props), this.props.direction);
      } else {
        this.wrapFadeOut(this.setPos(this.props), this.props.direction);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.height !== this.props.height || nextprops.width !== this.props.width || nextprops.direction !== this.props.direction || nextprops.align !== this.props.align) {
        this.setStyle(nextprops);
      }
      if (nextprops.show) {
        this.wrapFadeIn(this.setPos(nextprops), nextprops.direction);
      } else {
        this.wrapFadeOut(this.setPos(nextprops), nextprops.direction);
      }
    }
  }, {
    key: 'setPosStyle',
    value: function setPosStyle(left, right, top, bottom) {
      var wraplayout = this.wraplayout;

      wraplayout.style.left = left;
      wraplayout.style.right = right;
      wraplayout.style.top = top;
      wraplayout.style.bottom = bottom;
    }
  }, {
    key: 'setStyle',
    value: function setStyle(data) {
      var height = data.height,
          width = data.width,
          direction = data.direction,
          align = data.align;
      var wraplayout = this.wraplayout;

      wraplayout.style.height = height;
      wraplayout.style.width = width;
      wraplayout.style.display = 'block';
      if (direction === 'top') {
        if (align === 0) {
          this.setPosStyle('50%', 'auto', 0, 'auto');
        } else if (align === 1) {
          this.setPosStyle(0, 'auto', 0, 'auto');
        } else {
          this.setPosStyle('auto', 0, 0, 'auto');
        }
      } else if (direction === 'bottom') {
        if (align === 0) {
          this.setPosStyle('50%', 'auto', 'auto', 0);
        } else if (align === 1) {
          this.setPosStyle(0, 'auto', 'auto', 0);
        } else {
          this.setPosStyle('auto', 0, 'auto', 0);
        }
      } else if (direction === 'left') {
        if (align === 0) {
          this.setPosStyle(0, 'auto', '50%', 'auto');
        } else if (align === 1) {
          this.setPosStyle(0, 'auto', 0, 'auto');
        } else {
          this.setPosStyle(0, 'auto', 'auto', 0);
        }
      } else if (direction === 'right') {
        if (align === 0) {
          this.setPosStyle('auto', 0, '50%', 'auto');
        } else if (align === 1) {
          this.setPosStyle('auto', 0, 0, 'auto');
        } else {
          this.setPosStyle('auto', 0, 'auto', 0);
        }
      }
    }
  }, {
    key: 'setPos',
    value: function setPos(props) {
      var direction = props.direction,
          align = props.align;

      var posInP = void 0,
          posOutP = void 0;
      if (direction === 'bottom') {
        posInP = '0';
        posOutP = '100%';
      } else if (direction === 'left') {
        posInP = '0';
        posOutP = '-100%';
      } else if (direction === 'right') {
        posInP = '0';
        posOutP = '100%';
      } else {
        posInP = '0';
        posOutP = '-100%';
      }
      var alignPos = align === 0 ? '-50%' : 0;
      var pos = {
        posInP: posInP,
        posOutP: posOutP,
        alignPos: alignPos
      };
      return pos;
    }
  }, {
    key: 'wrapFadeIn',
    value: function wrapFadeIn(pos, direction) {
      var wraplayout = this.wraplayout;

      if (direction === 'bottom' || direction === 'top') {
        wraplayout.style.webkitTransform = 'translate(' + pos.alignPos + ',' + pos.posInP + ')';
      }
      if (direction === 'left' || direction === 'right') {
        wraplayout.style.webkitTransform = 'translate(' + pos.posInP + ',' + pos.alignPos + ')';
      }
      this.setState({
        maskHidden: false
      });
      this.props.showBack && this.props.showBack();
    }
  }, {
    key: 'wrapFadeOut',
    value: function wrapFadeOut(pos, direction) {
      var wraplayout = this.wraplayout;

      if (direction === 'bottom' || direction === 'top') {
        wraplayout.style.webkitTransform = 'translate(' + pos.alignPos + ',' + pos.posOutP + ')';
      }
      if (direction === 'left' || direction === 'right') {
        wraplayout.style.webkitTransform = 'translate(' + pos.posOutP + ',' + pos.alignPos + ')';
      }
      this.setState({
        maskHidden: true
      });
    }
  }, {
    key: 'closeTips',
    value: function closeTips() {
      this.wrapFadeOut(this.setPos(this.props), this.props.direction);
      this.props.closeBack && this.props.closeBack();
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var _props = this.props,
          closeBtnText = _props.closeBtnText,
          children = _props.children,
          closeShow = _props.closeShow,
          contentPadding = _props.contentPadding,
          className = _props.className,
          transparent = _props.transparent,
          direction = _props.direction;

      var claName = (0, _classnames2.default)({
        'up-bd': contentPadding,
        'jimu-up-content': !contentPadding
      });
      var cls = (0, _classnames2.default)((_classNames = {
        'up-wrap': true,
        'jimu-fade-wrap': true
      }, _defineProperty(_classNames, 'jimu-fade-' + direction, true), _defineProperty(_classNames, 'jimu-fade-top-show', !closeShow), _defineProperty(_classNames, className, className), _classNames));
      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(_mask2.default, { transparent: transparent, hidden: this.state.maskHidden, onClick: this.closeTips }),
        _react2.default.createElement(
          'div',
          { className: 'up-layout', ref: function ref(t) {
              _this2.wraplayout = t;
            } },
          closeShow ? _react2.default.createElement(
            'span',
            { className: 'close-bnt', onClick: this.closeTips },
            closeBtnText
          ) : null,
          _react2.default.createElement(
            'div',
            { className: claName },
            children
          )
        )
      );
    }
  }]);

  return FadeIn;
}(_react2.default.Component), _class.defaultProps = {
  closeBtnText: '确定',
  show: false,
  direction: 'bottom', // 滑动方向 bottom , top , left ,right
  closeShow: true, // 关闭按钮是否展示
  height: 'auto', // 高度  "100%" 、"300px"
  width: '100%', // 宽度  "100%" 、"300px"
  transparent: false, // 背景是否透明
  closeBack: function closeBack() {},
  // 关闭时的回调
  showBack: function showBack() {},
  // 展开时的回调
  align: 1 // 0:水平或者垂直居中，1 ：左对齐或者顶部对齐，2右对齐或者底部对齐
}, _temp);
exports.default = FadeIn;