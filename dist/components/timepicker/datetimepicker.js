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

var DateTimePicker = (_temp = _class = function (_Component) {
  _inherits(DateTimePicker, _Component);

  function DateTimePicker() {
    _classCallCheck(this, DateTimePicker);

    return _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this));
  }

  _createClass(DateTimePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setInitState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setInitState();
    }
  }, {
    key: 'setInitState',
    value: function setInitState() {
      var _props = this.props,
          startData = _props.startData,
          endData = _props.endData,
          defaultData = _props.defaultData,
          scale = _props.scale,
          format = _props.format,
          open = _props.open,
          nameFormatBool = _props.nameFormatBool,
          dates = this.setDateFormat(defaultData, 'yyyy/MM/dd hh:mm'),
          onDataTime = this._getTimeRound(defaultData, scale),
          startDateTime = this._getTimeRound(startData, scale),
          endDateTime = this._getTimeRound(endData, scale),
          len = this._getDayDiff(endDateTime.split(' ')[0], startDateTime.split(' ')[0]),
          onDataArr = this.setDateFormat(onDataTime, 'yyyy/MM/dd hh:mm'),
          startDateArr = this.setDateFormat(startDateTime, 'yyyy/MM/dd hh:mm'),
          endDateArr = this.setDateFormat(endDateTime, 'yyyy/MM/dd hh:mm'),
          getHoverOver = this._checkHourOver(onDataArr, startDateArr, endDateArr),
          startMinutes = 0,
          endMinutes = 59,
          nowdate = this._getDataTime(),
          tomorrow = this._tomorrowData(),
          valueFirst = this.setDateFormat(onDataTime, 'yyyy/M/d').fmt,
          setValueFirst = '' + this.setDateFormat(onDataTime, format[0]).fmt;

      if (nameFormatBool) {
        if (valueFirst == nowdate) {
          setValueFirst = '今天';
        } else if (valueFirst == tomorrow) {
          setValueFirst = '明天';
        }
      }

      // 设置起始的分钟数
      if (onDataTime.split(':')[0] == startDateTime.split(':')[0]) {
        startMinutes = startDateArr.datelist.m;
      }

      if (onDataTime.split(':')[0] == endDateTime.split(':')[0]) {
        endMinutes = endDateArr.datelist.m;
      }

      this.setState({
        open: open,
        onDataTime: onDataTime,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        len: len,
        onDataArr: onDataArr,
        startDateArr: startDateArr,
        endDateArr: endDateArr,
        value: [setValueFirst, '' + onDataArr.datelist.h + format[1], '' + onDataArr.datelist.m + format[2]], // 默认数值 开始时间 、 结束时间
        options: [this._setInitData(startDateArr.fmt, len), this._setInitHour(getHoverOver.starthour, getHoverOver.endhour), this._setInitMinutes(startMinutes, endMinutes)] // 初始数值
      });
    }

    // 判断小时展示范围

  }, {
    key: '_checkHourOver',
    value: function _checkHourOver(onDataArr, startDate, endDate) {
      var starthour = 0,
          endhour = 23;
      // 判断当前日期是否是起始日期
      if (onDataArr.datelist.y == startDate.datelist.y && onDataArr.datelist.M == startDate.datelist.M && onDataArr.datelist.d == startDate.datelist.d) {
        starthour = startDate.datelist.h;
      }

      // 判断当前日期是否是结束日期
      if (onDataArr.datelist.y == endDate.datelist.y && onDataArr.datelist.M == endDate.datelist.M && onDataArr.datelist.d == endDate.datelist.d) {
        endhour = endDate.datelist.h;
      }

      return {
        starthour: starthour,
        endhour: endhour };
    }

    // 获取两个区间日期 direction ：before 获取开始日期，after 获取结束日期

  }, {
    key: '_getDataDiff',
    value: function _getDataDiff(onData, sectionMinutes, direction) {
      var scale = this.props.scale,
          timestamp = new Date(onData).getTime(),
          diffTamp = sectionMinutes * 1000 * 60,
          diffDate = direction == 'after' ? timestamp + diffTamp : timestamp - diffTamp,
          date = new Date(parseInt(diffDate)),
          setMinutes = date.getMinutes();


      for (var i = setMinutes, max = setMinutes + scale; i <= max; i++) {
        if (!(i % scale)) {
          setMinutes = i >= 60 ? i - 60 : i;
        }
      }

      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + setMinutes;
    }

    // 当前日期取整  upward 是否向上取值

  }, {
    key: '_getTimeRound',
    value: function _getTimeRound(time, scale) {
      var upward = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var onMinutes = Number(time.split(':')[1]),
          timestamp = new Date(time).getTime(),
          scaleMinutes = onMinutes,
          diffTamp = 0,
          isback = true;

      if (upward) {
        for (var i = onMinutes, max = onMinutes + scale; i <= max; i++) {
          if (!(i % scale) && isback) {
            scaleMinutes = i;
            isback = false;
          }
        }
      } else {
        for (var i = onMinutes, min = onMinutes - scale; i >= min; i--) {
          if (!(i % scale) && isback) {
            scaleMinutes = i;
            isback = false;
          }
        }
      }

      diffTamp = (scaleMinutes - onMinutes) * 1000 * 60;
      var date = new Date(parseInt(timestamp + diffTamp));
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    }

    // 查看两个日期间隔几天 startDate、endDate  格式 如：2017/8/2

  }, {
    key: '_getDayDiff',
    value: function _getDayDiff(startDate, endDate) {
      var startTime = new Date(Date.parse(startDate)).getTime(),
          endTime = new Date(Date.parse(endDate)).getTime(),
          dates = Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
      return dates;
    }

    // 设置初始日期展示

  }, {
    key: '_setInitData',
    value: function _setInitData(startDate, len) {
      var self = this,
          _props2 = this.props,
          format = _props2.format,
          delay = _props2.delay,
          nameFormatBool = _props2.nameFormatBool,
          timestamp = new Date(startDate).getTime(),
          dataArr = [],
          nowdate = this._getDataTime(),
          tomorrow = this._tomorrowData();
      this.dataTimeArr = [];
      for (var i = 0; i <= len; i++) {
        var tamp = timestamp + 24 * 60 * 60 * 1000 * i;

        if (nameFormatBool) {
          if (nowdate == self.setDateFormat(new Date(parseInt(tamp)), 'yyyy/M/d').fmt) {
            dataArr.push('今天');
          } else if (tomorrow == self.setDateFormat(new Date(parseInt(tamp)), 'yyyy/M/d').fmt) {
            dataArr.push('明天');
          } else {
            dataArr.push(self.setDateFormat(new Date(parseInt(tamp)), format[0]).fmt);
          }
        } else {
          dataArr.push(self.setDateFormat(new Date(parseInt(tamp)), format[0]).fmt);
        }

        this.dataTimeArr.push(self.setDateFormat(new Date(parseInt(tamp)), 'yyyy/MM/dd').fmt);
      }

      return dataArr;
    }

    // 设置初始小时展示

  }, {
    key: '_setInitHour',
    value: function _setInitHour(starthour, endhour) {
      var self = this,
          _props3 = this.props,
          value = _props3.value,
          format = _props3.format,
          scale = _props3.scale,
          hourArr = [],
          deleytamp = new Date().getTime() + 60 * 1000 * scale,
          date = new Date(parseInt(deleytamp)),
          dates = this.setDateFormat(date, 'yyyy/MM/dd hh:mm'),
          gethour = starthour;

      for (var i = gethour; i <= endhour; i++) {
        hourArr.push(i + format[1]);
      }
      return hourArr;
    }

    // 设置初始小时展示

  }, {
    key: '_setInitMinutes',
    value: function _setInitMinutes(minutes, end) {
      var self = this,
          _props4 = this.props,
          scale = _props4.scale,
          value = _props4.value,
          format = _props4.format,
          minutesArr = [];

      for (var i = 0; i <= end; i++) {
        // minutesArr.push(i + format[1])
        if (!(i % scale)) {
          if (minutes <= i) {
            minutesArr.push(i + format[2]);
          }
        }
      }

      minutesArr = minutesArr.length == 0 ? ['0' + format[2]] : minutesArr;
      return minutesArr;
    }

    // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm

  }, {
    key: 'setDateFormat',
    value: function setDateFormat(nowdate, fmt) {
      var deleytamp = new Date(nowdate).getTime(),
          date = new Date(parseInt(deleytamp)),
          o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
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
          m: date.getMinutes()
        }
      };
    }

    // 获取当前日期

  }, {
    key: '_tomorrowData',
    value: function _tomorrowData() {
      var deleytamp = new Date().getTime() + 24 * 60 * 60 * 1000,
          d = new Date(parseInt(deleytamp));
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }

    // 获取当前日期

  }, {
    key: '_getDataTime',
    value: function _getDataTime() {
      var d = new Date();
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      var format = this.props.format,
          _state = this.state,
          value = _state.value,
          onDataTime = _state.onDataTime,
          fmt = new Date(onDataTime).getTime();
      this.props.pickerAway && this.props.pickerAway(value, onDataTime, this.refs.pickertime, {
        fmt: fmt,
        data: onDataTime
      });
    }

    // 字符串删除单位

  }, {
    key: '_deleteStrUnit',
    value: function _deleteStrUnit(string, unit) {
      return string.split(unit)[0];
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      var format = this.props.format,
          _state2 = this.state,
          options = _state2.options,
          value = _state2.value,
          len = _state2.len,
          startDateArr = _state2.startDateArr,
          endDateArr = _state2.endDateArr,
          startDateTime = _state2.startDateTime,
          endDateTime = _state2.endDateTime,
          onDataTime = _state2.onDataTime,
          day = options[0],
          hours = options[1],
          minutes = options[2],
          setHour = hours,
          setMinute = minutes,
          onDay = value[0],
          onHours = value[1],
          onMinutes = value[2];

      // 日期更改时
      if (listIndex === 0) {
        onDay = val;

        // 开始日期
        if (onDay == day[0]) {
          var getHour = this._deleteStrUnit(onHours, format[1]);
          // 判断小时是否在开始范围内
          setHour = this._setInitHour(startDateArr.datelist.h, 23);
          if (getHour < startDateArr.datelist.h) {
            onHours = startDateArr.datelist.h + format[1];
          }
        }

        // 结束日期
        if (onDay == day[len]) {
          var _getHour = this._deleteStrUnit(onHours, format[1]);
          setHour = this._setInitHour(0, endDateArr.datelist.h);
          if (_getHour > endDateArr.datelist.h) {
            onHours = endDateArr.datelist.h + format[1];
          }
        }

        if (onDay !== day[0] && onDay !== day[len]) {
          setHour = this._setInitHour(0, 23);
        }
      }

      // 小时修改时
      if (listIndex === 1) {
        onHours = val;
      }

      if (listIndex === 2) {
        onMinutes = val;
      }

      // 开始日期
      if (onDay == day[0] && onHours == setHour[0]) {
        var getMinute = this._deleteStrUnit(onMinutes, format[2]),
            endMinutes = startDateTime.split(':')[0] == endDateTime.split(':')[0] ? endDateArr.datelist.m : 59;
        // 判断分钟是否在开始范围内
        setMinute = this._setInitMinutes(startDateArr.datelist.m, endMinutes);
        if (getMinute < Number(startDateArr.datelist.m)) {
          onMinutes = startDateArr.datelist.m + format[2];
        }
      }
      // 结束日期
      else if (onDay == day[len] && this._deleteStrUnit(onHours, format[1]) == endDateArr.datelist.h) {
          var _getMinute = this._deleteStrUnit(onMinutes, format[2]);
          // 判断分钟是否在开始范围内
          setMinute = this._setInitMinutes(0, endDateArr.datelist.m);
          if (_getMinute > Number(endDateArr.datelist.m)) {
            onMinutes = endDateArr.datelist.m + format[2];
          }
        } else {
          setMinute = this._setInitMinutes(0, 59);
        }

      // 设置日期
      for (var i = day.length - 1; i >= 0; i--) {
        if (day[i] == onDay) {
          onDataTime = this.dataTimeArr[i] + ' ' + this._deleteStrUnit(onHours, format[1]) + ':' + this._deleteStrUnit(onMinutes, format[2]);
        }
      }

      this.setState({
        onDataTime: onDataTime,
        value: [onDay, onHours, onMinutes],
        options: [day, setHour, setMinute]
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
          open: this.state.open,
          titleName: this.props.titleName })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this._showFunc();
    }
  }, {
    key: 'show',
    value: function show() {
      this._showFunc();
    }
  }, {
    key: '_showFunc',
    value: function _showFunc() {
      this.setInitState();
      this.refs.date_picker.show();
    }
  }]);

  return DateTimePicker;
}(_react.Component), _class.propTypes = {
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func,
  len: _propTypes2.default.number
}, _class.defaultProps = {
  textvalue: '时间组件按钮',
  pickerAway: function pickerAway() {},

  open: false,
  format: ['yyyy年MM月dd日', '点', '分'],
  startData: '2017/12/21 23:55',
  endData: '2018/1/8 01:20',
  defaultData: '2017/12/31 23:55',
  scale: 5, //  分钟刻度
  titleName: '当前时间', // title
  nameFormatBool: true // 日期显示格式
}, _temp);


module.exports = DateTimePicker;