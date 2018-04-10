'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _picker = require('../picker/picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarNumberPicker = (_temp = _class = function (_Component) {
  _inherits(CarNumberPicker, _Component);

  function CarNumberPicker() {
    _classCallCheck(this, CarNumberPicker);

    return _possibleConstructorReturn(this, (CarNumberPicker.__proto__ || Object.getPrototypeOf(CarNumberPicker)).call(this));
  }

  _createClass(CarNumberPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // 设置默认显示参数
      var _props = this.props,
          open = _props.open,
          options = _props.options,
          value = _props.value;

      this.setState({
        open: open,
        options: options,
        value: value });
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, idx) {
      var value = this.state.value;

      value[idx] = val;
      this.setState({
        value: value });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.value !== this.props.value) {
        this.setState({
          value: nextprops.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var textvalue = this.props.textvalue,
          _state = this.state,
          value = _state.value,
          options = _state.options,
          open = _state.open;

      return _react2.default.createElement(
        'div',
        { className: 'dataPicker' },
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this._onClick.bind(this), ref: 'pickertime' },
          textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'car_picker',
          value: value,
          options: options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: open })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.car_picker.show();
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.car_picker.show();
    }
  }]);

  return CarNumberPicker;
}(_react.Component), _class.propTypes = {
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func
}, _class.defaultProps = {
  textvalue: '车牌 picker',
  pickerAway: function pickerAway() {},

  open: false,
  options: [['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼'], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']],
  value: ['京', 'A'] // 默认数值
}, _temp);


module.exports = CarNumberPicker;