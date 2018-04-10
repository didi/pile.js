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

var Star = (_temp = _class = function (_React$Component) {
  _inherits(Star, _React$Component);

  function Star(props) {
    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this, props));

    var _this$props = _this.props,
        len = _this$props.len,
        defaultVal = _this$props.defaultVal;

    if (len < defaultVal) {
      console.error('当前默认值大于len,请检查默认值');
    }
    _this.state = {
      currentValue: defaultVal,
      setLenArr: _this.setLenArrFuc(len)
    };
    return _this;
  }

  _createClass(Star, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.state = {
        currentValue: nextProps.defaultVal,
        setLenArr: this.setLenArrFuc(nextProps.len)
      };
    }
  }, {
    key: 'onScore',
    value: function onScore(n) {
      if (this.props.disabled) {
        return;
      }
      this.setState({
        currentValue: n
      });
      this.props.back && this.props.back(n);
    }
  }, {
    key: 'setLenArrFuc',
    value: function setLenArrFuc(len) {
      return Array(len).fill(0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          bigger = _props.bigger;
      var _state = this.state,
          setLenArr = _state.setLenArr,
          currentValue = _state.currentValue;

      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-score-star': true,
        'jimu-score-disabled': disabled,
        'jimu-score-bigger': bigger
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(
          'div',
          { className: 'jimu-star-main' },
          setLenArr.map(function (re, index) {
            var strCls = (0, _classnames2.default)({
              'icon-trip_icon_star': true,
              'icon-trip_icon_star_on': currentValue > index
            });
            return _react2.default.createElement('span', {
              className: strCls,
              key: index,
              onClick: function onClick() {
                _this2.onScore(index + 1);
              }
            });
          })
        )
      );
    }
  }]);

  return Star;
}(_react2.default.Component), _class.propTypes = {
  len: _propTypes2.default.number,
  defaultVal: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  bigger: _propTypes2.default.bool,
  back: _propTypes2.default.func
}, _class.defaultProps = {
  len: 5, // 个数
  defaultVal: 0, // 默认值
  disabled: false, // 值为 true 时，滑块为禁用状态
  bigger: false, // 值为 true 时，尺寸大
  back: function back() {}
}, _temp);
exports.default = Star;