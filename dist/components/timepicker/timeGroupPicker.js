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

var TimeGroup = (_temp = _class = function (_Component) {
  _inherits(TimeGroup, _Component);

  function TimeGroup() {
    _classCallCheck(this, TimeGroup);

    return _possibleConstructorReturn(this, (TimeGroup.__proto__ || Object.getPrototypeOf(TimeGroup)).call(this));
  }

  _createClass(TimeGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          value = _props.value,
          open = _props.open,
          timeArr = [];

      // 如果没有填写value 则默认获取当前时间

      var onTime = this._gethouer() >= 24 ? 0 : this._gethouer();

      // 判断
      if (value) {
        // 判断是否符合时间单位（0-24）
        if (this._checkValueTime(value[0], value[1])) {
          timeArr = value;
        } else {
          timeArr = [onTime, onTime + 1];
        }
      } else {
        timeArr = [onTime, onTime + 1];
      }

      // value 添加 单位
      var newTimeArr = [this._stringAddUnit(timeArr[0]), this._stringAddUnit(timeArr[1])];

      // 设置默认显示参数
      this.setState({
        value: newTimeArr, // 默认数值 开始时间 、 结束时间
        options: [this._optionsAddUnit(this._pushStartHour()), this._optionsAddUnit(this._pushEndHour(timeArr[0]))], // 默认数值
        open: open
      });
    }

    // 数组添加单位

  }, {
    key: '_optionsAddUnit',
    value: function _optionsAddUnit(arr) {
      var unit = this.props.unit;

      var newarr = arr.map(function (re, index) {
        return '' + re + unit;
      });
      return newarr;
    }

    // 字符串添加单位

  }, {
    key: '_stringAddUnit',
    value: function _stringAddUnit(string) {
      var unit = this.props.unit;

      return '' + string + unit;
    }

    // 删除单位

  }, {
    key: '_deleteUnit',
    value: function _deleteUnit(string) {
      return Number(string.split(this.props.unit)[0]);
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      // 当改变开始时间时
      var _state = this.state,
          value = _state.value,
          options = _state.options,
          endHour = value[1],
          startHour = value[0],
          nval = this._deleteUnit(val);

      if (listIndex == 0) {
        endHour = nval + 1;
        this.setState({
          options: [this._optionsAddUnit(this._pushStartHour()), this._optionsAddUnit(this._pushEndHour(nval))],
          value: [this._stringAddUnit(nval), this._stringAddUnit(endHour)]
        });
      } else {
        this.setState({
          value: [startHour, this._stringAddUnit(nval)]
        });
      }
    }

    // 验证当前 value 是否有效

  }, {
    key: '_checkValueTime',
    value: function _checkValueTime(starthour, endhour) {
      if (starthour >= 0 && starthour < 24 && endhour <= 24 && endhour > starthour) {
        return true;
      }
      return false;
    }

    // 设置开始小时参数值

  }, {
    key: '_pushStartHour',
    value: function _pushStartHour() {
      var startA = [];
      for (var i = 0; i < 24; i++) {
        startA.push(i);
      }
      return startA;
    }

    // 设置结束小时参数值

  }, {
    key: '_pushEndHour',
    value: function _pushEndHour(starthour) {
      var endA = [];
      for (var i = starthour + 1; i <= 24; i++) {
        endA.push(i);
      }
      return endA;
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          bntTest = _props2.bntTest,
          textvalue = _props2.textvalue;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this._onClick.bind(this), ref: 'pickertime' },
          bntTest || textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'date_picker',
          value: this.state.value,
          options: this.state.options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: this.state.open
        })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.date_picker.show();
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.date_picker.show();
    }
  }, {
    key: '_gethouer',
    value: function _gethouer() {
      return new Date().getHours();
    }
  }]);

  return TimeGroup;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.array,
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func
}, _class.defaultProps = {
  unit: '点',
  // bntTest : "时间组件按钮",
  textvalue: '时间组件按钮',
  pickerAway: function pickerAway() {},

  open: false
}, _temp);


module.exports = TimeGroup;