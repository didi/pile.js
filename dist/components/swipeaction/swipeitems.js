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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _swipeitem = require('./swipeitem');

var _swipeitem2 = _interopRequireDefault(_swipeitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwipeItems = (_temp = _class = function (_React$Component) {
  _inherits(SwipeItems, _React$Component);

  function SwipeItems(props) {
    _classCallCheck(this, SwipeItems);

    var _this = _possibleConstructorReturn(this, (SwipeItems.__proto__ || Object.getPrototypeOf(SwipeItems)).call(this, props));

    _this._touchDefaultBack = _this._touchDefaultBack.bind(_this);
    _this._touchBack = _this._touchBack.bind(_this);

    _this.initSetState(_this.props);
    return _this;
  }

  _createClass(SwipeItems, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.buttons !== this.props.buttons || nextprops.shows !== this.props.shows) {
        this.initSetState(nextprops);
      }
    }
  }, {
    key: 'initSetState',
    value: function initSetState(props) {
      // 设置 state
      this.state = {
        shows: this.initStateVal(props, 'shows', true),
        displacements: this.initStateVal(props, 'displacements', false),
        disTouchs: this.initStateVal(props, 'disTouchs', true),
        touchDefaults: this.initStateVal(props, 'touchDefaults', false)
      };
    }
  }, {
    key: 'initStateVal',
    value: function initStateVal(props, key, defaultkey) {
      var newArr = [];
      _react2.default.Children.map(this.props.children, function (child, i) {
        var newKey = void 0;
        if (props[key][i] === undefined) {
          newKey = defaultkey;
        } else {
          newKey = props[key][i];
        }
        newArr.push(newKey);
      });
      return newArr;
    }
  }, {
    key: 'lotStateVal',
    value: function lotStateVal(key) {
      var newArr = [];
      _react2.default.Children.map(this.props.children, function (child, i) {
        var newKey = key;
        newArr.push(newKey);
      });
      return newArr;
    }
  }, {
    key: 'singleStateVal',
    value: function singleStateVal(key, index, defaultkey) {
      this.state[key][index] = defaultkey;
      return this.state[key];
    }

    // touch状态下callback

  }, {
    key: '_touchBack',
    value: function _touchBack(o) {
      var itemsTouchBack = this.props.itemsTouchBack;


      this.setState({
        displacements: this.singleStateVal('touchDefaults', o.index, o.touchState),
        touchDefaults: this.lotStateVal(o.touchState)
      });

      if (itemsTouchBack) {
        itemsTouchBack(o);
      }
    }

    // 有因素影响拖动状态下callback

  }, {
    key: '_touchDefaultBack',
    value: function _touchDefaultBack(o) {
      this.setState({
        displacements: this.lotStateVal(false),
        touchDefaults: this.lotStateVal(false)
      });

      var itemsTouchBack = this.props.itemsTouchBack;

      if (itemsTouchBack) {
        itemsTouchBack(o);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this,
          _props = this.props,
          className = _props.className,
          buttons = _props.buttons,
          _state = this.state,
          disTouchs = _state.disTouchs,
          shows = _state.shows,
          touchDefaults = _state.touchDefaults,
          displacements = _state.displacements,
          cls = (0, _classnames2.default)(_defineProperty({
        'jimu-swipe-items': true
      }, className, className));


      var defaultButtons = [{
        type: 'delet',
        label: '删除',
        onClick: self._confirmdel
      }];

      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.Children.map(this.props.children, function (child, index) {
          if (disTouchs[index]) {
            return _react2.default.createElement(
              _swipeitem2.default,
              {
                key: index,
                index: index,
                buttons: buttons[index] || defaultButtons,
                show: shows[index],
                displacement: displacements[index],
                touchDefault: touchDefaults[index],
                touchDefaultBack: self._touchDefaultBack,
                touchBack: self._touchBack
              },
              child
            );
          }
          return _react2.default.createElement(
            'div',
            { className: 'jimu-swipe-del jimu-item-undel', key: index },
            child
          );
        })
      );
    }
  }]);

  return SwipeItems;
}(_react2.default.Component), _class.propTypes = {
  buttons: _propTypes2.default.array,
  shows: _propTypes2.default.array,
  displacements: _propTypes2.default.array,
  disTouchs: _propTypes2.default.array,
  touchDefaults: _propTypes2.default.array,
  itemsTouchBack: _propTypes2.default.func
}, _class.defaultProps = {
  buttons: [], // 按钮信息 { type: 'cancel', label: '取消', onClick: self._confirmcancel }
  shows: [], // 数据展开
  displacements: [], // 默认已滑动展开
  disTouchs: [], // 是否可以拖动
  touchDefaults: [], // 是否有因素影响拖动
  itemsTouchBack: function itemsTouchBack() {}
}, _temp);
exports.default = SwipeItems;