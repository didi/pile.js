'use strict';

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

var DatePeriodPicker = (_temp = _class = function (_Component) {
  _inherits(DatePeriodPicker, _Component);

  function DatePeriodPicker() {
    _classCallCheck(this, DatePeriodPicker);

    return _possibleConstructorReturn(this, (DatePeriodPicker.__proto__ || Object.getPrototypeOf(DatePeriodPicker)).apply(this, arguments));
  }

  _createClass(DatePeriodPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          open = _props.open,
          days = _props.days,
          startData = _props.startData,
          format = _props.format;

      var startDay = void 0;

      // 判断是否传入开始日期 并且检验传入日期是否有效
      if (startData && DatePeriodPicker.isEffectiveDate(startData)) {
        startDay = startData;
      } else {
        startDay = DatePeriodPicker._getNewDate();
      }

      var endDay = DatePeriodPicker._getEndData(startDay, days - 1);

      // 设置初始数组
      var opts = this._setInitOptions(startDay, endDay, startDay);
      var newArrValue = startDay.split('/');

      // 设置默认显示参数
      this.setState({
        value: [DatePeriodPicker._addStrUnit(newArrValue[0], format[0]), DatePeriodPicker._addStrUnit(newArrValue[1], format[1]), this._setDaysWeek(newArrValue[0], newArrValue[1], newArrValue[2])], // 默认数值 开始时间 、 结束时间
        options: opts, // 默认数值
        open: open,
        startD: startDay,
        endD: endDay,
        valueD: newArrValue
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      var format = this.props.format;
      var _state = this.state,
          startD = _state.startD,
          endD = _state.endD,
          valueD = _state.valueD;

      var startDataArr = startD.split('/'); // 起始时间数组
      var onData = valueD; // 当前时间数组

      // 当改变年份时
      if (listIndex === 0) {
        var yearval = DatePeriodPicker._deleteStrUnit(val, format[0]);
        // 当前年份
        if (startD.split('/')[0] === yearval) {
          onData = [yearval, startDataArr[1], startDataArr[2]];
        } else {
          onData = [yearval, 1, 1];
        }
      }

      // 当改变月份时
      if (listIndex === 1) {
        var mouthval = DatePeriodPicker._deleteStrUnit(val, format[1]);
        // 当前年份
        if (startDataArr[0] === onData[0] && startDataArr[1] === mouthval) {
          onData = [startDataArr[0], mouthval, startDataArr[2]];
        } else {
          onData = [onData[0], mouthval, 1];
        }
      }

      // 当改变日时
      if (listIndex === 2) {
        onData[2] = DatePeriodPicker._deleteStrUnit(val, format[2]);
      }

      var newDataArr = [DatePeriodPicker._addStrUnit(onData[0], format[0]), DatePeriodPicker._addStrUnit(onData[1], format[1]), this._setDaysWeek(onData[0], onData[1], onData[2])];

      this.setState({
        value: newDataArr,
        options: this._setInitOptions(startD, endD, onData.join('/')),
        valueD: onData
      });
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      var format = this.props.format;
      var value = this.state.value;

      var dataString = '';
      dataString += value[0].split(format[0])[0] + '/';
      dataString += value[1].split(format[1])[0] + '/';
      dataString += value[2].split(format[2])[0];

      var fmt = new Date(dataString + ' 00:00').getTime();
      this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, {
        fmt: fmt,
        data: dataString
      });
    }

    // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm

  }, {
    key: 'setDateFormat',
    value: function setDateFormat(nowdate, fmt) {
      var delay = this.props.delay;

      var deleytamp = new Date(nowdate).getTime() + 60 * 1000 * delay;
      var date = new Date(parseInt(deleytamp, 10));
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
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

    // 设置 options 当前年月日

  }, {
    key: '_setInitOptions',
    value: function _setInitOptions(startDay, endDay, onDay) {
      var format = this.props.format;

      var start = startDay.split('/');
      var end = endDay.split('/');
      var on = onDay.split('/');
      var year = [];
      var mouth = [];
      var day = [];

      /* 开始、结束、当前 年月日 */
      var ys = Number(start[0]);
      var ye = Number(end[0]);
      var yon = Number(on[0]);
      var ms = Number(start[1]);
      var me = Number(end[1]);
      var mon = Number(on[1]);
      var ds = Number(start[2]);
      var de = Number(end[2]);

      var optms = 1;
      var optme = 12;
      var optds = 1;
      var optde = DatePeriodPicker._getDays(yon, mon);

      // 如果同年 2017/3/5 2017/6/7
      if (ys === yon && yon === ye) {
        optms = ms;
        optme = me;
        // 月份相同
        if (mon === me && mon === ms) {
          optds = ds;
          optde = de;
        } else {
          // 如果 当前月份 与 开始月份相同
          if (mon === ms) {
            optds = ds;
          }
          // 如果 当前月份 与 结束月份相同
          if (mon === me) {
            optds = 1;
            optde = de;
          }
        }
      } else {
        // 如果不同年 2016/3/5 2017 /6/7
        // 如果当前年份与结束年份相等
        if (yon === ys) {
          optme = 12;
          optms = ms;
          // 如果 当前月份 与 开始月份相同
          if (mon === ms) {
            optds = ds;
          }
          // 如果 当前月份 与 结束月份相同
          if (mon === me) {
            optds = 1;
          }
        }

        if (yon === ye) {
          optms = 1;
          optme = me;

          // 如果 当前月份 与 结束月份相同
          if (mon === me) {
            optds = 1;
            optde = de;
          }
        }
      }

      // 设置 年份
      for (; ys <= ye; ys++) {
        year.push(DatePeriodPicker._addStrUnit(ys, format[0]));
      }

      // 设置 月份
      for (; optms <= optme; optms++) {
        mouth.push(DatePeriodPicker._addStrUnit(optms, format[1]));
      }

      // 设置 天
      for (; optds <= optde; optds++) {
        day.push(this._setDaysWeek(yon, mon, optds));
      }
      return [year, mouth, day];
    }
  }, {
    key: '_setDaysWeek',
    value: function _setDaysWeek(yon, mon, optds) {
      var nowdt = yon + '/' + mon + '/' + optds;
      var week = new Date(nowdt).getDay();
      var newdaysopt = optds + '\u65E5 ' + this.props.weekText[week];
      return newdaysopt;
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.date_picker.show();
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.date_picker.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          bntTest = _props2.bntTest,
          textvalue = _props2.textvalue;


      return _react2.default.createElement(
        'div',
        { className: 'dataPicker' },
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
  }], [{
    key: 'isEffectiveDate',

    // 判断是否为有效日期
    value: function isEffectiveDate(data) {
      var dataArr = data.split('/');
      var intYear = dataArr[0];
      var intMonth = dataArr[1];
      var intDay = dataArr[2];
      /* eslint-disable no-restricted-globals */
      if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false;
      /* eslint-enable no-restricted-globals */
      if (intMonth > 12 || intMonth < 1) return false;
      if (intDay < 1 || intDay > 31) return false;
      if ((intMonth === 4 || intMonth === 6 || intMonth === 9 || intMonth === 11) && intDay > 30) return false;
      if (intMonth === 2) {
        if (intDay > 29) return false;
        if ((intYear % 100 === 0 && intYear % 400 !== 0 || intYear % 4 !== 0) && intDay > 28) return false;
      }
      return true;
    }

    // 数组添加单位

  }, {
    key: '_addArrUnit',
    value: function _addArrUnit(arr, unit) {
      arr.map(function (re) {
        return '' + re + unit;
      });
    }

    // 数组删除单位

  }, {
    key: '_deleteArrUnit',
    value: function _deleteArrUnit(arr, unit) {
      arr.map(function (re) {
        return re.split(unit)[0];
      });
    }

    // 字符串添加单位

  }, {
    key: '_addStrUnit',
    value: function _addStrUnit(string, unit) {
      return '' + string + unit;
    }

    // 字符串删除单位

  }, {
    key: '_deleteStrUnit',
    value: function _deleteStrUnit(string, unit) {
      return string.split(unit)[0];
    }

    // 时间戳转换时间

  }, {
    key: '_tampTransData',
    value: function _tampTransData(tamp) {
      var d = new Date(parseInt(tamp, 10));
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }

    // 时间转换时间戳

  }, {
    key: '_dataTransTamp',
    value: function _dataTransTamp(data) {
      return new Date(data).getTime();
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

    // 获取当前月份参数

  }, {
    key: '_getDays',
    value: function _getDays(y, m) {
      return new Date(y, m, 0).getDate();
    }
  }, {
    key: '_getNewDate',
    value: function _getNewDate() {
      var d = new Date();
      return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }

    // 获取 结束时间

  }, {
    key: '_getEndData',
    value: function _getEndData(startData, days) {
      var nowTamp = DatePeriodPicker._dataTransTamp(startData) + days * 60 * 60 * 1000 * 24;
      return DatePeriodPicker._tampTransData(nowTamp);
    }
  }]);

  return DatePeriodPicker;
}(_react.Component), _class.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  value: _propTypes2.default.array,
  /* eslint-enable react/no-unused-prop-types */
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func,
  days: _propTypes2.default.number
}, _class.defaultProps = {
  value: [],
  textvalue: '时间组件按钮',
  pickerAway: function pickerAway() {},

  open: false,
  format: ['年', '月', '日'],
  days: 7, // 显示时间段
  startData: '', // 开始时间 2017/12/29
  weekText: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
}, _temp);


module.exports = DatePeriodPicker;