'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by zhaojie on 16/06/12.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bubble = (_temp = _class = function (_React$Component) {
  _inherits(Bubble, _React$Component);

  function Bubble(props) {
    _classCallCheck(this, Bubble);

    var _this = _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, props));

    _this.state = _extends({
      bubbleShow: _this.props.show
    }, _this.props);
    return _this;
  }

  _createClass(Bubble, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setStyle();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops) {
        this.setState({
          bubbleShow: nextprops.show,
          top: nextprops.top,
          left: nextprops.left,
          align: nextprops.align,
          direction: nextprops.direction,
          closeBtnShow: nextprops.closeBtnShow
        });

        var self = this;
        setTimeout(function () {
          self.setStyle();
        });
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle() {
      var _state = this.state,
          direction = _state.direction,
          top = _state.top,
          left = _state.left,
          closeBtnShow = _state.closeBtnShow,
          align = _state.align,
          bubbleWrap = this.refs.bubbleWrap,
          bubbleDom = _reactDom2.default.findDOMNode(bubbleWrap);

      setTimeout(function () {
        var bubbleDomWidth = bubbleDom.clientWidth,
            bubbleDomHeight = bubbleDom.clientHeight,
            transX = void 0,
            transY = void 0;

        if (direction === 'left' || direction === 'right') {
          transX = direction !== 'left' ? '5px' : '-' + (bubbleDomWidth + 5) + 'px';
          transY = '-' + bubbleDomHeight / 2 + 'px';

          if (align === 1) {
            transY = '-25px';
          }
          if (align === 2) {
            transY = '-' + (bubbleDomHeight - 25) + 'px';
          }
        }

        if (direction === 'bottom' || direction === 'top') {
          transX = '-' + bubbleDomWidth / 2 + 'px';
          transY = direction !== 'top' ? '5px' : '-' + (bubbleDomHeight + 5) + 'px';
          if (align === 1) {
            transX = '-25px';
          }
          if (align === 2) {
            transX = '-' + (bubbleDomWidth - 25) + 'px';
          }
        }
        bubbleWrap.style.webkitTransform = 'translate(' + transX + ',' + transY + ')';
      });

      bubbleWrap.style.top = top;
      bubbleWrap.style.left = left;
    }
  }, {
    key: 'hiddenBubble',
    value: function hiddenBubble() {
      this.setState({
        bubbleShow: false
      });
      this.props.closeBack && this.props.closeBack();
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _state2 = this.state,
          bubbleShow = _state2.bubbleShow,
          className = _state2.className,
          closeBtnShow = _state2.closeBtnShow,
          direction = _state2.direction,
          align = _state2.align,
          cls = (0, _classnames2.default)((_classNames = {
        'jimu-bubble': true
      }, _defineProperty(_classNames, 'jimu-bubble-' + direction, true), _defineProperty(_classNames, 'jimu-bubble-' + align, true), _defineProperty(_classNames, 'jimu-bubble-close', closeBtnShow), _defineProperty(_classNames, className, className), _classNames));


      return _react2.default.createElement(
        'div',
        { className: cls, ref: 'bubbleWrap', style: { display: bubbleShow ? 'block' : 'none' } },
        _react2.default.createElement(
          'div',
          { className: 'jimu-bubble-content', ref: 'bubbleCont' },
          this.props.children,
          closeBtnShow && _react2.default.createElement('span', { className: 'icon-del bubble-close', onClick: this.hiddenBubble.bind(this) })
        )
      );
    }
  }]);

  return Bubble;
}(_react2.default.Component), _class.propTypes = {
  direction: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  closeBtnShow: _propTypes2.default.bool,
  top: _propTypes2.default.string,
  left: _propTypes2.default.string,
  closeBack: _propTypes2.default.func
}, _class.defaultProps = {
  direction: 'left', // 方向
  show: true, // 是否展示
  closeBtnShow: true, // 是否需要关闭按钮
  top: '200px', // 弹层定位  top 值
  left: '200px', // 弹层定位  left 值
  closeBack: null, // 关闭按钮点击回调
  align: 0 // 0:水平或者垂直居中，1 ：左对齐或者顶部对齐，2右对齐或者底部对齐
}, _temp);
exports.default = Bubble;