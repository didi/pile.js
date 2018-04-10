'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _picker = require('../picker/picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pickers = (_temp = _class = function (_Component) {
  _inherits(Pickers, _Component);

  function Pickers(props) {
    _classCallCheck(this, Pickers);

    var _this = _possibleConstructorReturn(this, (Pickers.__proto__ || Object.getPrototypeOf(Pickers)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onClickAway = _this.onClickAway.bind(_this);
    _this.onClickCancel = _this.onClickCancel.bind(_this);
    return _this;
  }

  _createClass(Pickers, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // 设置默认显示参数
      this.setState(_extends({
        oldValue: this.props.value
      }, this.props));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops !== this.props) {
        this.setState(_extends({
          oldValue: nextprops.value
        }, nextprops));
      }
    }
  }, {
    key: 'onClickCancel',
    value: function onClickCancel() {
      this.setState({
        value: this.state.oldValue
      });
      this.props.clickCancel && this.props.clickCancel();
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, idx) {
      var value = this.state.value;

      value[idx] = val;
      this.setState({
        value: value
      });
      this.props.onChange && this.props.onChange(val, text, idx);
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      this.props.pickerAway && this.props.pickerAway(this.state.value);
    }
  }, {
    key: 'show',
    value: function show() {
      this.pickers.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_picker2.default, {
        ref: function ref(t) {
          _this2.pickers = t;
        },
        value: this.state.value,
        options: this.state.options,
        onChange: this.onChange,
        onClickAway: this.onClickAway,
        onClickCancel: this.onClickCancel,
        open: this.state.open,
        weekText: ['', '', '', '', '', '', '']
      });
    }
  }]);

  return Pickers;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.array,
  options: _propTypes2.default.array
}, _class.defaultProps = {}, _temp);


module.exports = Pickers;