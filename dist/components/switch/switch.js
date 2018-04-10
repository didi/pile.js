'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = (_temp = _class = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      isOpen: _this.props.isOpen,
      radioVal: _this.props.isOpen ? _this.props.openVal : _this.props.closeVal,
      disabled: _this.props.disabled,
      isReader: false
    };
    _this.radioFun = _this.radioFun.bind(_this);
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled !== this.props.disabled) {
        this.state = {
          disabled: nextProps.disabled
        };
      }

      if (nextProps.isOpen !== this.props.isOpen) {
        this.state = {
          isOpen: nextProps.isOpen
        };
      }
    }
  }, {
    key: 'radioFun',
    value: function radioFun() {
      var _state = this.state,
          isOpen = _state.isOpen,
          disabled = _state.disabled;

      if (disabled) {
        return;
      }
      this.setState({
        isOpen: !isOpen,
        radioVal: !isOpen ? this.props.openVal : this.props.closeVal,
        isReader: true
      });

      if (this.props.clickBack) {
        this.props.clickBack({
          isOpen: !isOpen,
          radioVal: !isOpen ? this.props.openVal : this.props.closeVal
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          radioName = _props.radioName,
          isSmall = _props.isSmall,
          className = _props.className,
          _state2 = this.state,
          isOpen = _state2.isOpen,
          radioVal = _state2.radioVal,
          isReader = _state2.isReader,
          disabled = _state2.disabled,
          cls = (0, _classnames2.default)(_defineProperty({
        'ui-switch': true,
        'jimu-switch-issmall': isSmall,
        'switch-open': isOpen && !isReader,
        'switch-open-move': isOpen && isReader,
        'switch-close': !isOpen && !isReader,
        'switch-close-move': !isOpen && isReader,
        'switch-disabled': disabled
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, onClick: this.radioFun },
        _react2.default.createElement('input', { type: 'radio', name: radioName, value: radioVal })
      );
    }
  }]);

  return Switch;
}(_react2.default.Component), _class.propTypes = {
  radioName: _propTypes2.default.string,
  isOpen: _propTypes2.default.bool,
  clickBack: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
}, _class.defaultProps = {
  openVal: 0, // 展开值
  closeVal: 1, // 关闭值
  radioName: 'radio01', // radio name
  isOpen: false, // 展开状态
  clickBack: function clickBack() {},
  // 点击回调函数
  isSmall: false, //
  disabled: false // 值为 true 时，滑块为禁用状态
}, _temp);
exports.default = Switch;