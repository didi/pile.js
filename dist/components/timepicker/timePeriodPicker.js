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

var TimePeriod = (_temp = _class = function (_Component) {
  _inherits(TimePeriod, _Component);

  function TimePeriod() {
    _classCallCheck(this, TimePeriod);

    return _possibleConstructorReturn(this, (TimePeriod.__proto__ || Object.getPrototypeOf(TimePeriod)).call(this));
  }

  _createClass(TimePeriod, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var value = this.props.value,
          startTimeArr = this._setStartTime(),
          endTimeArr = this._setEndTime(value[0]);
      // 设置默认显示参数
      this.setState({
        value: [value ? value[0] : startTimeArr[0], value ? value[1] : endTimeArr[0]], // 默认数值 开始时间 、 结束时间
        options: [startTimeArr, endTimeArr] // 默认数值
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      // 当改变开始时间时
      var _state = this.state,
          value = _state.value,
          options = _state.options,
          startTime = value[0],
          endTime = value[1];
      // 当改变开始时间时

      if (listIndex == 0) {
        var endTimeArr = this._setEndTime(val),
            endTimeVal = this.checkEndTimeIsBefore(val, endTime) ? endTimeArr[0] : endTime;
        this.setState({
          value: [val, endTimeVal],
          options: [options[0], endTimeArr]
        });
      } else {
        this.setState({
          value: [startTime, val]
        });
      }
    }

    // 检测结束时间是否早于开始时间  true 早于， false 晚于

  }, {
    key: 'checkEndTimeIsBefore',
    value: function checkEndTimeIsBefore(startTime, endTime) {
      var unit = this.props.unit,
          splitStartTime = startTime.split(':'),
          splitEndTime = endTime.split(':');

      // 如果 endTime 带有 次日 返回 false
      if (endTime.indexOf(unit) > -1) {
        return false;
      }
      // 对比小时
      if (Number(splitEndTime[0]) > Number(splitStartTime[0])) {
        return false;
      }
      // 对比分钟
      if (Number(splitEndTime[1]) > Number(splitStartTime[1])) {
        return false;
      }
      return true;
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          textvalue = _props.textvalue,
          open = _props.open,
          titleName = _props.titleName,
          _state2 = this.state,
          options = _state2.options,
          value = _state2.value;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this.show.bind(this), ref: 'pickertime' },
          textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'date_picker',
          value: value,
          options: options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: open,
          titleName: titleName })
      );
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.date_picker.show();
    }

    // 设置开始时间

  }, {
    key: '_setStartTime',
    value: function _setStartTime() {
      var delay = this.props.delay,
          startArr = [],
          mdelay = 60 / delay;

      for (var i = 0, len = 24; i < len; i++) {
        for (var mi = 0, mlen = mdelay; mi < mlen; mi++) {
          var newi = i < 10 ? '0' + i : i,
              newmi = mi * delay < 10 ? '0' + mi * delay : mi * delay;
          startArr.push(newi + ':' + newmi);
        }
      }
      return startArr;
    }

    // 设置结束时间

  }, {
    key: '_setEndTime',
    value: function _setEndTime() {
      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00';
      var _props2 = this.props,
          delay = _props2.delay,
          unit = _props2.unit,
          startArr = [],
          mdelay = 60 / delay,
          splitStartTime = startTime.split(':'),
          startH = Number(splitStartTime[0]),
          startM = Number(splitStartTime[1]),
          endArr = [];

      for (var i = startH, len = 31 + startH; i < len; i++) {
        if (i < 48) {
          for (var mi = 0, mlen = mdelay; mi < mlen; mi++) {
            var newi = i < 10 ? '0' + i : i;
            if (startH == i && mi * delay <= startM) {} else if (startH + 30 == i && mi * delay > startM) {} else {
              var newmi = mi * delay < 10 ? '0' + mi * delay : mi * delay;
              if (newi >= 24) {
                newi = '' + unit + (newi - 24 < 10 ? '0' + (newi - 24) : newi - 24);
              }
              endArr.push(newi + ':' + newmi);
            }
          }
        }
      }
      return endArr;
    }
  }]);

  return TimePeriod;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.array,
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func
}, _class.defaultProps = {
  textvalue: '',
  delay: 10, // 延迟分钟（分钟）
  timeFrame: 30, // 时间范围（小时）
  pickerAway: function pickerAway() {},

  open: false,
  unit: '次日',
  titleName: '每日可用时间段',
  value: ['09:00', '23:00']
}, _temp);


module.exports = TimePeriod;