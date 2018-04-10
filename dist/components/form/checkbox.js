'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/11/16.
                   */


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

var Checkbox = (_temp = _class = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    _this.state = {
      defaultChecked: _this.props.defaultChecked
    };
    _this.clicktaggle = _this.clicktaggle.bind(_this);
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.defaultChecked !== this.props.defaultChecked) {
        this.setState({
          defaultChecked: nextProps.defaultChecked
        });
      }
    }
  }, {
    key: 'clicktaggle',
    value: function clicktaggle() {
      if (this.props.disabled) {
        return;
      }
      this.setState({
        defaultChecked: !this.state.defaultChecked
      });
      this.props.back && this.props.back(!this.state.defaultChecked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          disabled = _props.disabled,
          defaultChecked = this.state.defaultChecked;


      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-form-checkbox': true,
        'jimu-checkbox-checked': defaultChecked,
        'jimu-checkbox-disabled': disabled
      }, className, className));

      return _react2.default.createElement(
        'div',
        { className: cls, onClick: this.clicktaggle },
        !defaultChecked && _react2.default.createElement('span', { className: 'icon-jimu-check-normal' }),
        defaultChecked && _react2.default.createElement('span', { className: 'icon-jimu-check' }),
        _react2.default.createElement(
          'label',
          null,
          label
        )
      );
    }
  }]);

  return Checkbox;
}(_react2.default.Component), _class.propTypes = {
  back: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  label: _propTypes2.default.string
}, _class.defaultProps = {
  back: function back() {},

  disabled: false,
  defaultChecked: false,
  label: ''
}, _temp);
exports.default = Checkbox;