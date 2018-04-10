'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/04/10.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../swipe/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipeable = _index2.default.Swipeable;
var SwipeDel = (_temp = _class = function (_React$Component) {
  _inherits(SwipeDel, _React$Component);

  function SwipeDel(props) {
    _classCallCheck(this, SwipeDel);

    var _this = _possibleConstructorReturn(this, (SwipeDel.__proto__ || Object.getPrototypeOf(SwipeDel)).call(this, props));

    _this.swipingLeft = _this.swipingLeft.bind(_this);
    _this.swiped = _this.swiped.bind(_this);
    return _this;
  }

  _createClass(SwipeDel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initSetState(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      // if (nextprops.show !== this.props.show) {
      this.initSetState(nextprops);
      // }
    }

    // 设置 内容位置以及展开状态

  }, {
    key: 'setContState',
    value: function setContState(pos, touchState) {
      var delContent = this.delContent,
          _props = this.props,
          index = _props.index,
          touchBack = _props.touchBack,
          self = this;


      delContent.style.WebkitTransition = 'all .1s ease-in';
      delContent.style.left = -pos + 'px';

      setTimeout(function () {
        delContent.style.WebkitTransition = 'none';
        self.setState({
          oldPosX: pos
        });
        if (touchBack) {
          touchBack({ index: index, touchState: touchState });
        }
      }, 100);
    }
  }, {
    key: 'swipingLeft',
    value: function swipingLeft(e, posX) {
      var self = this,
          delContent = this.delContent,
          _state = this.state,
          oldPosX = _state.oldPosX,
          postion = _state.postion,
          _props2 = this.props,
          touchDefault = _props2.touchDefault,
          displacement = _props2.displacement;

      var setPosx = oldPosX;

      // 判断是否有因素影响拖动
      if (touchDefault) {
        return false;
      }

      if (displacement) {
        return false;
      }

      // 坐标位置设置
      if (posX <= postion) {
        setPosx = posX;
      } else {
        setPosx = postion + Math.sqrt(posX - postion) * 3;
      }

      // 弹层跟随坐标
      delContent.style.left = -setPosx + 'px';
      setTimeout(function () {
        self.setState({
          oldPosX: setPosx
        });
      }, 30);
      return true;
    }
  }, {
    key: 'initSetState',
    value: function initSetState(props) {
      var delAside = this.delAside,
          delContent = this.delContent,
          delSwipContent = this.delSwipContent,
          show = props.show,
          displacement = props.displacement;


      this.state = {
        oldPosX: 0,
        postion: delAside.clientWidth
      };

      delContent.style.WebkitTransition = 'all .1s ease-in';
      delSwipContent.style.cssText = 'height:' + (show ? delContent.clientHeight : 0) + 'px';

      if (displacement) {
        delContent.style.left = '-' + delAside.clientWidth + 'px';
      } else {
        delContent.style.left = 0;
      }

      setTimeout(function () {
        delContent.style.WebkitTransition = 'none';
        delContent.style.position = 'absolute';
      }, 100);
    }
  }, {
    key: 'swiped',
    value: function swiped(e, posX) {
      var _state2 = this.state,
          oldPosX = _state2.oldPosX,
          postion = _state2.postion,
          _props3 = this.props,
          degree = _props3.degree,
          index = _props3.index,
          touchDefault = _props3.touchDefault,
          touchDefaultBack = _props3.touchDefaultBack,
          displacement = _props3.displacement,
          posXabs = Math.abs(posX);

      // 判断当前情景是否可以拖动

      if (!displacement) {
        if (posX < degree) {
          this.setContState(0, false);
          return false;
        }
      }

      // 判断是否有因素影响拖动
      if (touchDefault) {
        if (touchDefaultBack) {
          touchDefaultBack({ index: index, touchState: false });
        }
        return false;
      }

      if (displacement) {
        // 关闭状态
        this.setContState(0, false);
      } else {
        // 展开状态
        if (posXabs >= oldPosX && posXabs >= degree) {
          this.setContState(postion, true);
        } else {
          this.setContState(0, false);
        }
      }
      return true;
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      return this.props.buttons.map(function (re, idx) {
        var type = re.type,
            label = re.label,
            others = _objectWithoutProperties(re, ['type', 'label']);

        var className = (0, _classnames2.default)({
          'btn-default': type !== 'delet' && type !== 'cancel',
          'btn-del': type === 'delet',
          'btn-cancel': type === 'cancel'
        });

        return _react2.default.createElement(
          'a',
          _extends({
            key: idx
          }, others, {
            className: className
          }),
          _react2.default.createElement(
            'span',
            null,
            label
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          className = _props4.className,
          children = _props4.children,
          cls = (0, _classnames2.default)(_defineProperty({
        'jimu-swipe-del': true
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, ref: function ref(n) {
            _this2.delSwipContent = n;
          } },
        _react2.default.createElement(
          Swipeable,
          { onSwipingLeft: this.swipingLeft, onSwiped: this.swiped },
          _react2.default.createElement(
            'div',
            { className: 'del-content', ref: function ref(n) {
                _this2.delContent = n;
              } },
            children
          ),
          _react2.default.createElement(
            'div',
            { className: 'del-aside', ref: function ref(n) {
                _this2.delAside = n;
              } },
            this.renderButtons()
          )
        )
      );
    }
  }]);

  return SwipeDel;
}(_react2.default.Component), _class.propTypes = {
  buttons: _propTypes2.default.array,
  degree: _propTypes2.default.number,
  index: _propTypes2.default.number,
  show: _propTypes2.default.bool,
  displacement: _propTypes2.default.bool,
  touchDefault: _propTypes2.default.bool,
  touchDefaultBack: _propTypes2.default.func,
  touchBack: _propTypes2.default.func
}, _class.defaultProps = {
  index: 0, //
  buttons: [], // 按钮信息 { type: 'cancel', label: '取消', onClick: self._confirmcancel }
  degree: 50, // 滑动展示最小值
  show: true, // 是否展开状态（展示状态）
  displacement: false, // 是否位移(已滑动状态)
  touchDefault: false // 是否有因素影响拖动
}, _temp);
exports.default = SwipeDel;