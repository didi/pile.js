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

var TimeDefaultPicker = (_temp = _class = function (_Component) {
  _inherits(TimeDefaultPicker, _Component);

  function TimeDefaultPicker() {
    _classCallCheck(this, TimeDefaultPicker);

    return _possibleConstructorReturn(this, (TimeDefaultPicker.__proto__ || Object.getPrototypeOf(TimeDefaultPicker)).call(this));
  }

  _createClass(TimeDefaultPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setInitState();
    }
  }, {
    key: 'setInitState',
    value: function setInitState() {
      var _props = this.props,
          value = _props.value,
          open = _props.open,
          len = _props.len,
          format = _props.format,
          dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm');
      // 设置默认显示参数

      this.setState({
        startData: dates.fmt,
        value: value, // 默认数值 开始时间 、 结束时间
        options: [this._setInitData(dates.fmt, len), this._setInitHour(dates.datelist.h, true), [' ']], // 初始数值
        open: open
      });
    }

    // 设置初始日期展示

  }, {
    key: '_setInitData',
    value: function _setInitData(startDate, len) {
      var self = this,
          _props2 = this.props,
          value = _props2.value,
          format = _props2.format,
          delay = _props2.delay,
          optOneArr = _props2.optOneArr,
          timestamp = new Date(startDate).getTime(),
          dataArr = [];
      // 获取全部日期相关
      this.allData = [];

      for (var i = 0; i < len; i++) {
        var tamp = timestamp + 24 * 60 * 60 * 1000 * i + 60 * 1000 * delay;
        if (i < optOneArr.length) {
          dataArr.push(optOneArr[i]);
        } else {
          dataArr.push(self.setDateFormat(new Date(parseInt(tamp)), format[0]).fmt);
        }

        this.allData.push(self.setDateFormat(new Date(parseInt(tamp)), 'yyyy/MM/dd').fmt);
      }

      // console.log(this.allData)
      return dataArr;
    }

    // 设置初始小时展示   isOnday  是否当天

  }, {
    key: '_setInitHour',
    value: function _setInitHour(hour, isOnday) {
      var self = this,
          _props3 = this.props,
          value = _props3.value,
          format = _props3.format,
          scale = _props3.scale,
          nowText = _props3.nowText,
          hourArr = isOnday ? [nowText] : [],
          deleytamp = new Date().getTime() + 60 * 1000 * scale,
          date = new Date(parseInt(deleytamp)),
          dates = this.setDateFormat(date, 'yyyy/MM/dd hh:mm'),
          gethour = isOnday ? dates.datelist.h : hour;


      for (var i = gethour; i < 24; i++) {
        hourArr.push(i + format[1]);
      }
      return hourArr;
    }

    // 设置初始小时展示

  }, {
    key: '_setInitMinutes',
    value: function _setInitMinutes(minutes) {
      var self = this,
          _props4 = this.props,
          scale = _props4.scale,
          value = _props4.value,
          format = _props4.format,
          minutesArr = [];

      for (var i = 0; i < 60; i++) {
        // minutesArr.push(i + format[1])
        if (!(i % scale)) {
          if (minutes <= i) {
            if (i < 10) {
              i = '0' + i;
            }
            minutesArr.push(i + format[2]);
          }
        }
      }
      return minutesArr;
    }

    // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm

  }, {
    key: 'setDateFormat',
    value: function setDateFormat(nowdate, fmt) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$isDelay = _ref.isDelay,
          isDelay = _ref$isDelay === undefined ? true : _ref$isDelay;

      // console.log(isDelay)
      var delay = this.props.delay,
          deleytamp = isDelay ? new Date(nowdate).getTime() + 60 * 1000 * delay : new Date(nowdate).getTime(),
          date = new Date(parseInt(deleytamp)),
          o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
      };

      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }

      return {
        fmt: fmt,
        datelist: {
          y: date.getFullYear(),
          M: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          m: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
        }
      };
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      var _props5 = this.props,
          optOneArr = _props5.optOneArr,
          format = _props5.format,
          nowText = _props5.nowText,
          _state = this.state,
          value = _state.value,
          options = _state.options,
          dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm'),
          timestamp = new Date().getTime(),
          ondate = value[0],
          onhour = value[1],
          onminute = value[2],
          setValArr = value,
          len = options[0].length,
          dataString = '',
          fmt = void 0;

      for (var i = 0; i < len; i++) {
        var tamp = timestamp + 24 * 60 * 60 * 1000 * i;
        if (options[0][i] === ondate) {
          if (i < optOneArr.length) {
            dataString += this.setDateFormat(new Date(parseInt(tamp)), 'yyyy/MM/dd').fmt;
          } else {
            dataString += this.allData[i];
          }
        }
      }
      if (onhour === nowText) {
        onhour = dates.datelist.h + format[1];
        onminute = dates.datelist.m + format[2];
        setValArr[2] = dates.datelist.m + format[2];
      }

      dataString += ' ' + onhour.split(format[1])[0] + ':' + onminute.split(format[2])[0];
      fmt = new Date(dataString).getTime();

      this.props.pickerAway && this.props.pickerAway([ondate, onhour, onminute], this.refs.pickertime, setValArr, {
        fmt: fmt,
        data: this.setDateFormat(new Date(dataString), 'yyyy/MM/dd hh:mm', { isDelay: false }).fmt
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      var _state2 = this.state,
          options = _state2.options,
          value = _state2.value,
          _props6 = this.props,
          format = _props6.format,
          optOneArr = _props6.optOneArr,
          nowText = _props6.nowText,
          days = options[0],
          hours = options[1],
          minutes = options[2],
          setHours = hours,
          setMinutes = minutes,
          dates = this.setDateFormat(new Date(), 'yyyy/MM/dd hh:mm'),
          onDay = value[0],
          onHours = value[1],
          onMinutes = value[2];

      // 日期更改时

      if (listIndex === 0) {
        if (val === days[0]) {
          setMinutes = [];
          setHours = this._setInitHour(dates.datelist.h, true);
          onHours = nowText;
          onMinutes = '';
        } else {
          setHours = this._setInitHour(0, false);
          setMinutes = this._setInitMinutes(0);
          onHours = '0' + format[1];
          onMinutes = '00' + format[2];
        }
        onDay = val;
      }

      // 小时修改时
      if (listIndex === 1) {
        if (onDay === optOneArr[0] && val === nowText) {
          setMinutes = [];
          onMinutes = '';
        } else if (onDay === optOneArr[0] && val === dates.datelist.h + format[1]) {
          setMinutes = this._setInitMinutes(dates.datelist.m);
          onMinutes = this._setInitMinutes(dates.datelist.m)[0];
        } else {
          onMinutes = '00' + format[2];
          setMinutes = this._setInitMinutes(0);
        }
        onHours = val;
      }

      if (listIndex === 2) {
        onMinutes = val;
      }

      this.setState({
        value: [onDay, onHours, onMinutes],
        options: [days, setHours, setMinutes]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var textvalue = this.props.textvalue;


      return _react2.default.createElement(
        'div',
        { className: 'dataPicker' },
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this._onClick.bind(this), ref: 'pickertime' },
          textvalue
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
  }]);

  return TimeDefaultPicker;
}(_react.Component), _class.propTypes = {
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func,
  len: _propTypes2.default.number
}, _class.defaultProps = {
  textvalue: '时间组件按钮',
  pickerAway: function pickerAway() {},

  open: false,
  len: 7, // 展示天数
  format: ['M月d日', '点', '分'],
  delay: 5, // 与当前时间推迟（）分钟后，开始计时
  value: ['今天', '现在', ' '], // 默认数值
  optOneArr: ['今天', '明天', '后天'], // 第一栏默认名称
  nowText: '现在',
  scale: 10 //  分钟刻度
}, _temp);


module.exports = TimeDefaultPicker;