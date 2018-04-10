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

var DateRangePicker = (_temp = _class = function (_Component) {
  _inherits(DateRangePicker, _Component);

  function DateRangePicker() {
    _classCallCheck(this, DateRangePicker);

    return _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this));
  }

  _createClass(DateRangePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          valueData = _props.valueData,
          open = _props.open,
          startData = _props.startData,
          endData = _props.endData,
          yearText = _props.yearText,
          monthText = _props.monthText,
          dayText = _props.dayText,
          timeArr = [],
          startDay = '',
          endDay = '',
          onDay = '',
          endDataTamp = !endData ? new Date().getTime() : this._dataTransTamp(endData),
          startDataTamp = this._dataTransTamp(startData),
          days = Math.ceil((endDataTamp - startDataTamp) / 1000 / 24 / 60 / 60);

      // 判断是否传入开始日期 并且检验传入日期是否有效


      if (startData && this.isEffectiveDate(startData)) {
        startDay = startData;
      } else {
        startDay = this._getNewDate();
      }

      endDay = endData || this._getNewDate();
      onDay = valueData || this._getNewDate();

      // 设置初始数组
      var opts = this._setInitOptions(startDay, endDay, onDay),

      // newArrValue = startDay.split("/"),
      dayList = onDay.split('/'),
          onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])],
          onDataArr = ['' + onDataValue[0] + yearText, '' + onDataValue[1] + monthText, '' + onDataValue[2] + dayText];
      // 设置默认显示参数
      this.setState({
        options: opts, // 默认数值
        startD: startDay,
        endD: endDay,
        valueD: onDataValue,
        dayState: days,
        startDataState: startData,
        value: onDataArr,
        open: open,
        valueData: valueData
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}

    // 设置 options 当前年月日

  }, {
    key: '_setInitOptions',
    value: function _setInitOptions(startDay, endDay, onDay) {
      var self = this,
          start = startDay.split('/'),
          end = endDay.split('/'),
          on = onDay.split('/'),
          opt = [],

      /* opt 年月日 数组 */
      year = [],
          mouth = [],
          day = [],


      /* 开始、结束、当前 年月日 */
      ys = Number(start[0]),
          ye = Number(end[0]),
          yon = Number(on[0]),
          ms = Number(start[1]),
          me = Number(end[1]),
          mon = Number(on[1]),
          ds = Number(start[2]),
          de = Number(end[2]),
          don = Number(on[2]),
          optms = 1,
          optme = 12,
          optds = 1,
          optde = this._getDays(yon, mon);

      // 如果同年 2017/3/5 2017/6/7
      if (ys == yon && yon == ye) {
        optms = ms;
        optme = me;
        // 月份相同
        if (mon == me && mon == ms) {
          optds = ds;
          optde = de;
        } else {
          // 如果 当前月份 与 开始月份相同
          if (mon == ms) {
            optds = ds;
          }
          // 如果 当前月份 与 结束月份相同
          if (mon == me) {
            optds = 1;
            optde = de;
          }
        }
      } else {
        // 如果不同年 2016/3/5 2017 /6/7
        // 如果当前年份与结束年份相等
        if (yon == ys) {
          optme = 12;
          optms = ms;
          // 如果 当前月份 与 开始月份相同
          if (mon == ms) {
            optds = ds;
          }
          // 如果 当前月份 与 结束月份相同
          if (mon == me) {
            optds = 1;
          }
        }

        if (yon == ye) {
          optms = 1;
          optme = me;

          // 如果 当前月份 与 结束月份相同
          if (mon == me) {
            optds = 1;
            optde = de;
          }
        }
      }

      var _props2 = this.props,
          yearText = _props2.yearText,
          monthText = _props2.monthText;

      // 设置 年份

      for (; ys <= ye; ys++) {
        year.push(this._addStrUnit(ys, yearText));
      }

      // 设置 月份
      for (; optms <= optme; optms++) {
        mouth.push(this._addStrUnit(optms, monthText));
      }

      // 设置 天
      for (; optds <= optde; optds++) {
        day.push(this._setDaysWeek(yon, mon, optds));
      }

      return opt = [year, mouth, day];
    }
  }, {
    key: '_setDaysWeek',
    value: function _setDaysWeek(yon, mon, optds) {
      var dayText = this.props.dayText,
          nowdt = yon + '/' + mon + '/' + optds,
          week = new Date(nowdt).getDay(),
          newdaysopt = '' + optds + dayText;

      return newdaysopt;
    }
  }, {
    key: 'onChange',
    value: function onChange(val, text, listIndex) {
      var _props3 = this.props,
          yearText = _props3.yearText,
          monthText = _props3.monthText,
          dayText = _props3.dayText,
          _state = this.state,
          startD = _state.startD,
          endD = _state.endD,
          value = _state.value,
          valueD = _state.valueD,
          valueData = _state.valueData,
          options = _state.options,
          newDataArr = valueData,
          startDataArr = startD.split('/'),
          onData = valueD; // 当前时间数组

      if (this.initDraw) {
        this.setState({
          value: ['' + valueD[0] + yearText, '' + valueD[1] + monthText, '' + valueD[2] + dayText],
          valueD: valueD,
          valueData: valueData
        });
        return false;
      }

      // 当改变年份时
      if (listIndex == 0) {
        var yearval = this._deleteStrUnit(val, yearText);
        // 当前年份
        if (startD.split('/')[0] == yearval) {
          onData = [yearval, startDataArr[1], startDataArr[2]];
        } else {
          onData[0] = yearval;
        }

        // 判断 2月份是否是  29号
        if (valueD[2] == 29) {
          onData[2] = 28;
        }
      }

      // 当改变月份时
      if (listIndex == 1) {
        var mouthval = this._deleteStrUnit(val, monthText);
        // 当前年份
        if (startDataArr[0] == onData[0] && startDataArr[1] == mouthval) {
          onData = [startDataArr[0], mouthval, startDataArr[2]];
        } else {
          onData[1] = mouthval;
        }
      }

      // 当改变日时
      if (listIndex == 2) {
        onData[2] = this._deleteStrUnit(val, dayText);
      }

      newDataArr = [this._addStrUnit(onData[0], yearText), this._addStrUnit(onData[1], monthText), this._setDaysWeek(onData[0], onData[1], onData[2])];
      var opts = this._setInitOptions(startD, endD, onData.join('/'));
      // 判断当前年月是否包含当前的日  比如 2月 29

      if (opts[2].length < onData[2]) {
        onData[2] = 1;
        newDataArr[2] = '1' + dayText;
      }

      if (opts[1].length < onData[1]) {
        onData[1] = 1;
        newDataArr[1] = '1' + monthText;
      }

      var setValueData = onData.join('/');

      this.setState({
        value: newDataArr,
        valueD: onData,
        valueData: setValueData,
        options: opts
      });
    }

    // 数组添加单位

  }, {
    key: '_addArrUnit',
    value: function _addArrUnit(arr, unit) {
      arr.map(function (re, i) {
        return '' + re + unit;
      });
    }

    // 数组删除单位

  }, {
    key: '_deleteArrUnit',
    value: function _deleteArrUnit(arr, unit) {
      arr.map(function (re, i) {
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

    // 判断是否为有效日期

  }, {
    key: 'isEffectiveDate',
    value: function isEffectiveDate(data) {
      var dataArr = data.split('/'),
          intYear = dataArr[0],
          intMonth = dataArr[1],
          intDay = dataArr[2];
      if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false;
      if (intMonth > 12 || intMonth < 1) return false;
      if (intDay < 1 || intDay > 31) return false;
      if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && intDay > 30) return false;
      if (intMonth == 2) {
        if (intDay > 29) return false;
        if ((intYear % 100 == 0 && intYear % 400 != 0 || intYear % 4 != 0) && intDay > 28) return false;
      }
      return true;
    }

    // 获取 结束时间

  }, {
    key: '_getEndData',
    value: function _getEndData(startData, days) {
      var nowTamp = this._dataTransTamp(startData) + days * 60 * 60 * 1000 * 24;
      return this._tampTransData(nowTamp);
    }

    // 时间戳转换时间

  }, {
    key: '_tampTransData',
    value: function _tampTransData(tamp) {
      var d = new Date(parseInt(tamp));
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
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      var _state2 = this.state,
          value = _state2.value,
          valueData = _state2.valueData,
          _props4 = this.props,
          yearText = _props4.yearText,
          monthText = _props4.monthText,
          dayText = _props4.dayText,
          dataString = '';

      dataString += this._deleteStrUnit(value[0], yearText) + '/';
      dataString += this._deleteStrUnit(value[1], monthText) + '/';
      dataString += this._deleteStrUnit(value[2], dayText);
      var fmt = new Date(dataString + ' 00:00').getTime();
      this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, valueData, {
        fmt: fmt,
        data: dataString
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          bntTest = _props5.bntTest,
          textvalue = _props5.textvalue,
          _state3 = this.state,
          value = _state3.value,
          options = _state3.options,
          open = _state3.open;

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
          value: value,
          options: options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: open
        })
      );
    }
  }, {
    key: 'show',
    value: function show() {
      this._showFunc();
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this._showFunc();
    }
  }, {
    key: '_showFunc',
    value: function _showFunc() {
      if (this.props.valueData != this.state.valueData) {
        var _props6 = this.props,
            valueData = _props6.valueData,
            endData = _props6.endData,
            startData = _props6.startData,
            yearText = _props6.yearText,
            monthText = _props6.monthText,
            dayText = _props6.dayText,
            valueDataArr = valueData.split('/'),
            endDay = endData || this._getNewDate(),
            onDay = valueData || this._getNewDate(),
            startDay = void 0;

        // 判断是否传入开始日期 并且检验传入日期是否有效


        if (startData && this.isEffectiveDate(startData)) {
          startDay = startData;
        } else {
          startDay = this._getNewDate();
        }

        // 设置初始数组
        var self = this,
            options = this._setInitOptions(startDay, endDay, onDay),
            dayList = onDay.split('/'),
            onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])],
            onDataArr = ['' + onDataValue[0] + yearText, '' + onDataValue[1] + monthText, '' + onDataValue[2] + dayText];

        this.setState({
          valueData: valueData,
          options: options,
          valueD: onDataValue,
          value: onDataArr
        });

        this.initDraw = true;
        setTimeout(function () {
          self.initDraw = false;
        }, 500);

        // this.refs.date_picker.show()
      }
      this.refs.date_picker.show();
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
  }]);

  return DateRangePicker;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.array,
  open: _propTypes2.default.bool,
  pickerAway: _propTypes2.default.func
}, _class.defaultProps = {
  textvalue: '',
  pickerAway: function pickerAway() {},

  open: false,
  valueData: '',
  yearText: '年',
  monthText: '月',
  dayText: '日',
  startData: '2000/01/01', // 开始日期 2000/01/01
  endData: '' // 结束日期 2017/12/29
}, _temp);


module.exports = DateRangePicker;