'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/10/26.
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

var Stepper = (_temp = _class = function (_React$Component) {
  _inherits(Stepper, _React$Component);

  function Stepper(props) {
    _classCallCheck(this, Stepper);

    var _this = _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call(this, props));

    var _this$props = _this.props,
        defaultVal = _this$props.defaultVal,
        min = _this$props.min,
        max = _this$props.max;

    if (min > defaultVal) {
      throw new Error('默认值小于最小值，请查看');
    }
    if (max < defaultVal) {
      throw new Error('默认值大于最大值，请查看');
    }
    _this.state = { defaultVal: defaultVal };

    _this.prevClick = _this.prevClick.bind(_this);
    _this.nextClick = _this.nextClick.bind(_this);
    return _this;
  }

  _createClass(Stepper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.defaultVal !== this.props.defaultVal) {
        this.setState({
          defaultVal: nextProps.defaultVal
        });
      }
      if (nextProps.min > nextProps.defaultVal) {
        throw new Error('默认值小于最小值，请查看');
      }
      if (nextProps.max < nextProps.defaultVal) {
        throw new Error('默认值大于最大值，请查看');
      }
    }
  }, {
    key: 'prevClick',
    value: function prevClick() {
      var _props = this.props,
          disabled = _props.disabled,
          min = _props.min,
          back = _props.back,
          steps = _props.steps;
      var defaultVal = this.state.defaultVal;

      if (disabled || min >= defaultVal) {
        return;
      }

      var setVal = defaultVal - steps < min ? min : defaultVal - steps;
      this.setState({
        defaultVal: setVal
      });
      back && back(setVal);
    }
  }, {
    key: 'nextClick',
    value: function nextClick() {
      var _props2 = this.props,
          disabled = _props2.disabled,
          max = _props2.max,
          back = _props2.back,
          steps = _props2.steps;
      var defaultVal = this.state.defaultVal;

      if (disabled || max <= defaultVal) {
        return;
      }
      var setVal = defaultVal + steps > max ? max : defaultVal + steps;
      this.setState({
        defaultVal: setVal
      });
      back && back(setVal);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          disabled = _props3.disabled,
          min = _props3.min,
          max = _props3.max;
      var defaultVal = this.state.defaultVal;

      var cls = (0, _classnames2.default)(_defineProperty({
        'pile-stepper': true,
        'pile-stepper-disabled': disabled
      }, className, className));
      var prevCls = (0, _classnames2.default)({
        'pile-stepper-btn': true,
        'icon-pile-artboard-reduce': true,
        'pile-stepper-btn-prev': true,
        'pile-stepper-disabled': defaultVal <= min
      });
      var nextCls = (0, _classnames2.default)({
        'pile-stepper-btn': true,
        'icon-pile-artboard-add': true,
        'pile-stepper-btn-next': true,
        'pile-stepper-disabled': defaultVal >= max
      });
      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement('span', { className: prevCls, onClick: this.prevClick }),
        _react2.default.createElement(
          'span',
          { className: 'pile-stepper-defaultval' },
          defaultVal
        ),
        _react2.default.createElement('span', { className: nextCls, onClick: this.nextClick })
      );
    }
  }]);

  return Stepper;
}(_react2.default.Component), _class.propTypes = {
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  defaultVal: _propTypes2.default.number,
  steps: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  back: _propTypes2.default.func
}, _class.defaultProps = {
  min: 0, // 最小值
  max: 5, // 最大值
  steps: 1, // 每次进阶数
  defaultVal: 2, // 默认值
  disabled: false, // 是否禁用
  back: function back() {}
}, _temp);
exports.default = Stepper;