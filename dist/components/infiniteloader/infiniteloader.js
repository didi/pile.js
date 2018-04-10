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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../swipe/index');

var _index2 = _interopRequireDefault(_index);

var _getLocale = require('../localeprovider/getLocale');

var _zhCN = require('../localeprovider/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipeable = _index2.default.Swipeable;
var InfiniteLoader = (_temp = _class = function (_React$Component) {
  _inherits(InfiniteLoader, _React$Component);

  function InfiniteLoader(props) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, (InfiniteLoader.__proto__ || Object.getPrototypeOf(InfiniteLoader)).call(this, props));

    _this.state = {
      isSwipeIng: true,
      degree: 120,
      isDegree: false
    };

    _this.SwipingUpBack = _this.SwipingUpBack.bind(_this);
    _this.SwipingDownBack = _this.SwipingDownBack.bind(_this);
    _this.SwipedBack = _this.SwipedBack.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initSetStyle(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      this.initSetStyle(nextprops);
    }
  }, {
    key: 'initSetStyle',
    value: function initSetStyle(props) {
      var conMain = this.conMain;

      conMain.style.WebkitTransition = 'all 0.2s ease-in';
      // conMain.style.WebkitTransform = 'translate(0,0)';
      conMain.style.top = '0';
      this.setState({
        // isSwipeIng : true,
        swipeSucc: props.swipeSucc
      });
    }

    // 当滑动的时候执行

  }, {
    key: 'SwipingFun',
    value: function SwipingFun(posY) {
      var _props = this.props,
          onSwipingBack = _props.onSwipingBack,
          disAbled = _props.disAbled,
          _state = this.state,
          isSwipeIng = _state.isSwipeIng,
          degree = _state.degree;


      if (disAbled) {
        return false;
      }

      if (!isSwipeIng) {
        this.setState({
          isSwipeIng: true,
          swipeSucc: false
        });
      }

      if (Math.abs(posY) > degree) {
        this.setState({
          isDegree: true
        });
      }

      if (onSwipingBack) {
        onSwipingBack();
      }
    }
  }, {
    key: 'SwipingUpBack',
    value: function SwipingUpBack(e, posY) {
      var _props2 = this.props,
          direction = _props2.direction,
          disAbled = _props2.disAbled,
          conMain = this.conMain,
          SwipeNode = this.SwipeNode,
          listNode = _reactDom2.default.findDOMNode(conMain),
          swipeScrollTop = _reactDom2.default.findDOMNode(SwipeNode).scrollTop,
          documentH = _reactDom2.default.findDOMNode(SwipeNode).clientHeight;

      if (disAbled) {
        return false;
      }

      if (direction === 'top' || documentH + swipeScrollTop < listNode.clientHeight) {
        return false;
      }

      e.preventDefault && e.preventDefault();

      conMain.style.WebkitTransition = 'none';
      // conMain.style.WebkitTransform = `translate(0,-${posY / 4}px)`;
      conMain.style.top = '-' + posY / 4 + 'px';

      this.SwipingFun(posY);
    }
  }, {
    key: 'SwipingDownBack',
    value: function SwipingDownBack(e, posY) {
      var _props3 = this.props,
          onSwipingBack = _props3.onSwipingBack,
          direction = _props3.direction,
          disAbled = _props3.disAbled,
          conMain = this.conMain,
          SwipeNode = this.SwipeNode,
          swipeScrollTop = _reactDom2.default.findDOMNode(SwipeNode).scrollTop;

      if (disAbled) {
        return false;
      }

      if (direction !== 'top' || swipeScrollTop > 0) {
        return false;
      }

      e.preventDefault && e.preventDefault();

      conMain.style.WebkitTransition = 'none';
      // conMain.style.WebkitTransform = `translate(0,${posY / 4}px)`;
      conMain.style.top = posY / 4 + 'px';

      this.SwipingFun(posY);
    }
  }, {
    key: 'SwipedBack',
    value: function SwipedBack(e, posX, posY) {
      var _props4 = this.props,
          onSwipedBack = _props4.onSwipedBack,
          direction = _props4.direction,
          disSwipe = _props4.disSwipe,
          disAbled = _props4.disAbled,
          conMain = this.conMain,
          SwipeNode = this.SwipeNode,
          degree = this.state.degree,
          listNode = _reactDom2.default.findDOMNode(conMain),
          swipeScrollTop = _reactDom2.default.findDOMNode(SwipeNode).scrollTop,
          documentH = _reactDom2.default.findDOMNode(SwipeNode).clientHeight,
          newposY = Math.abs(posY);

      if (disAbled) {
        return false;
      }

      if (disSwipe || newposY < degree || direction === 'top' && (swipeScrollTop > 0 || posY > 0)) {
        conMain.style.WebkitTransition = 'all 0.2s ease-in';
        // conMain.style.WebkitTransform = 'translate(0,0)';
        conMain.style.top = '0';
        this.setState({
          isDegree: false
        });

        return false;
      }
      if (disSwipe || newposY < degree || direction === 'bottom') {
        if (posY < 0 || documentH + swipeScrollTop < listNode.clientHeight || documentH + swipeScrollTop > listNode.clientHeight && listNode.clientHeight - documentH - swipeScrollTop >= 0) {
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
        isDegree: false
      });

      if (onSwipedBack) {
        onSwipedBack();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props5 = this.props,
          className = _props5.className,
          children = _props5.children,
          direction = _props5.direction,
          disSwipe = _props5.disSwipe,
          height = _props5.height,
          defaultbackground = _props5.defaultbackground,
          _state2 = this.state,
          isSwipeIng = _state2.isSwipeIng,
          swipeSucc = _state2.swipeSucc,
          isDegree = _state2.isDegree,
          cls = (0, _classnames2.default)(_defineProperty({
        'jimu-swipe-items': true
      }, className, className)),
          cls2 = (0, _classnames2.default)({
        'jimu-pos-layout': true,
        'jimu-pos-top': direction === 'top',
        'jimu-pos-bottom': direction === 'bottom'
      });

      var locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'Infiniteloader', function () {
        return _zhCN2.default.Infiniteloader;
      });
      var dropDownRefreshText = locale.dropDownRefreshText,
          dropUpRefreshText = locale.dropUpRefreshText,
          loadMoreText = locale.loadMoreText,
          loosenRefreshText = locale.loosenRefreshText,
          loadedText = locale.loadedText,
          dataIsNewText = locale.dataIsNewText,
          loadingText = locale.loadingText;

      return _react2.default.createElement(
        Swipeable,
        {
          ref: function ref(t) {
            _this2.SwipeNode = t;
          },
          style: { height: height },
          className: cls,
          onSwipingUp: this.SwipingUpBack,
          onSwipingDown: this.SwipingDownBack,
          onSwiped: this.SwipedBack
        },
        _react2.default.createElement(
          'div',
          { className: 'jimu-swipe-por' },
          _react2.default.createElement(
            'div',
            { ref: function ref(t) {
                _this2.conMain = t;
              }, className: 'jimu-swipe-con', style: { background: defaultbackground || 'transparent' } },
            children
          ),
          _react2.default.createElement(
            'div',
            { className: cls2 },
            !disSwipe ? isSwipeIng ? isDegree ? _react2.default.createElement(
              'div',
              { className: 'swipeing' },
              direction === 'top' ? loosenRefreshText : loadMoreText
            ) : _react2.default.createElement(
              'div',
              { className: 'swipeing' },
              direction === 'top' ? dropDownRefreshText : dropUpRefreshText
            ) : _react2.default.createElement(
              'div',
              { className: 'swiped' },
              swipeSucc ? loadedText : loadingText
            ) : _react2.default.createElement(
              'div',
              { className: 'swipeing' },
              dataIsNewText
            )
          )
        )
      );
    }
  }]);

  return InfiniteLoader;
}(_react2.default.Component), _class.propTypes = {
  direction: _propTypes2.default.string,
  onSwipingBack: _propTypes2.default.func,
  onSwipedBack: _propTypes2.default.func,
  disSwipe: _propTypes2.default.bool,
  disAbled: _propTypes2.default.bool,
  swipeSucc: _propTypes2.default.bool,
  defaultbackground: _propTypes2.default.string
}, _class.defaultProps = {
  direction: 'top',
  onSwipingBack: function onSwipingBack() {},
  onSwipedBack: function onSwipedBack() {},

  disSwipe: false,
  disAbled: false,
  swipeSucc: false,
  height: '400px',
  defaultbackground: ''
}, _temp);

InfiniteLoader.contextTypes = {
  jimuLocale: _propTypes2.default.object
};
exports.default = InfiniteLoader;