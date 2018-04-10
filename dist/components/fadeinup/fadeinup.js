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

var FadeInUp = (_temp = _class = function (_React$Component) {
  _inherits(FadeInUp, _React$Component);

  function FadeInUp(props) {
    _classCallCheck(this, FadeInUp);

    var _this = _possibleConstructorReturn(this, (FadeInUp.__proto__ || Object.getPrototypeOf(FadeInUp)).call(this, props));

    _this.state = {
      maskHidden: true
    };

    _this.wrapUp = _this.wrapUp.bind(_this);
    _this.wrapDown = _this.wrapDown.bind(_this);
    _this.closeTips = _this.closeTips.bind(_this);
    return _this;
  }

  _createClass(FadeInUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.show) {
        this.wrapUp();
      } else {
        this.wrapDown();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.show) {
        this.wrapUp();
      } else {
        this.wrapDown();
      }
    }
  }, {
    key: 'wrapUp',
    value: function wrapUp() {
      var wraplayout = this.wraplayout;

      wraplayout.style.transform = 'translate(0,0)';
      wraplayout.style.webkitTransform = 'translate(0,0)';
      this.setState({
        maskHidden: false
      });
      this.props.showBack && this.props.showBack();
    }
  }, {
    key: 'wrapDown',
    value: function wrapDown() {
      var wraplayout = this.wraplayout;

      wraplayout.style.transform = 'translate(0,100%)';
      wraplayout.style.webkitTransform = 'translate(0,100%)';
      this.setState({
        maskHidden: true
      });
    }
  }, {
    key: 'closeTips',
    value: function closeTips() {
      this.wrapDown();
      var changeFun = this.props.changeFun;

      changeFun && changeFun();
      this.props.closeBack && this.props.closeBack();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          closeBtnText = _props.closeBtnText,
          children = _props.children,
          closeShow = _props.closeShow,
          contentPadding = _props.contentPadding,
          transparent = _props.transparent;

      var className = (0, _classnames2.default)({
        'up-bd': contentPadding,
        'jimu-up-content': !contentPadding
      });
      var cls = (0, _classnames2.default)(_defineProperty({
        'up-wrap': true,
        'jimu-fadein-wrap': true,
        'jimu-fadein-top-show': !closeShow
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(_mask2.default, { hidden: this.state.maskHidden, transparent: transparent, onClick: this.closeTips }),
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
            { className: className },
            children
          )
        )
      );
    }
  }]);

  return FadeInUp;
}(_react2.default.Component), _class.defaultProps = {
  closeBtnText: '确定',
  changeFun: function changeFun() {},
  // 参数  true 展开 ，false 关闭
  show: true,
  closeShow: true,
  transparent: false, // 背景是否透明
  contentPadding: true
}, _temp);
exports.default = FadeInUp;