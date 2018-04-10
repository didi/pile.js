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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sliders = (_temp = _class = function (_React$Component) {
  _inherits(Sliders, _React$Component);

  function Sliders(props) {
    _classCallCheck(this, Sliders);

    var _this = _possibleConstructorReturn(this, (Sliders.__proto__ || Object.getPrototypeOf(Sliders)).call(this, props));

    _this.changeBack = _this.changeBack.bind(_this);
    return _this;
  }

  _createClass(Sliders, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var sliderTitles = this.sliderTitles;

      sliderTitles.innerHTML = this.props.titleBefore + ' <b class="height-light-type"> ' + this.props.defaultValue + ' </b>' + this.props.titleAfter;
    }
  }, {
    key: 'changeBack',
    value: function changeBack(value) {
      var sliderTitles = this.sliderTitles;

      sliderTitles.innerHTML = this.props.titleBefore + ' <b class="height-light-type"> ' + value.value + ' </b>' + this.props.titleAfter;

      // 向父元素传值
      if (this.props.upChangeBack) {
        this.props.upChangeBack({
          value: value.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var others = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement(
        'div',
        { className: 'jimu-sliders' },
        _react2.default.createElement(
          _slider2.default,
          _extends({}, others, { onChangeBack: this.changeBack }),
          _react2.default.createElement('div', { className: 'slider-title', ref: function ref(n) {
              _this2.sliderTitles = n;
            } })
        )
      );
    }
  }]);

  return Sliders;
}(_react2.default.Component), _class.propTypes = {
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  defaultValue: _propTypes2.default.number,
  onChangeBack: _propTypes2.default.func,
  upChangeBack: _propTypes2.default.func,
  titleBefore: _propTypes2.default.string,
  titleAfter: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
}, _class.defaultProps = {
  min: 0, // 最小值
  max: 10, // 最大值
  defaultValue: 0, // 设置初始取值
  disabled: false, // 值为 true 时，滑块为禁用状态
  onChangeBack: function onChangeBack() {},
  // 获取子元素值 会触发 onChange 事件，并把改变后的值作为参数传入
  upChangeBack: function upChangeBack() {},
  // 向父元素传值 会触发 onChange 事件，并把改变后的值作为参数传入
  titleBefore: '我愿意自费',
  titleAfter: '元升舱叫车'
}, _temp);
exports.default = Sliders;