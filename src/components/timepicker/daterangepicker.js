import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class DateRangePicker extends Component {
  // 判断是否为有效日期
  static isEffectiveDate(data) {
    const dataArr = data.split('/');
    const intYear = dataArr[0];
    const intMonth = dataArr[1];
    const intDay = dataArr[2];
    /* eslint-disable no-restricted-globals */
    if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false;
    /* eslint-enable no-restricted-globals */
    if (intMonth > 12 || intMonth < 1) return false;
    if (intDay < 1 || intDay > 31) return false;
    if ((intMonth === 4 || intMonth === 6 || intMonth === 9
      || intMonth === 11) && (intDay > 30)) return false;
    if (intMonth === 2) {
      if (intDay > 29) return false;
      if ((((intYear % 100 === 0) && (intYear % 400 !== 0))
       || (intYear % 4 !== 0)) && (intDay > 28)) return false;
    }
    return true;
  }

  // 数组添加单位
  static _addArrUnit(arr, unit) {
    arr.map(re => `${re}${unit}`);
  }

  // 数组删除单位
  static _deleteArrUnit(arr, unit) {
    arr.map(re => re.split(unit)[0]);
  }

  // 字符串添加单位
  static _addStrUnit(string, unit) {
    return `${string}${unit}`;
  }

  // 字符串删除单位
  static _deleteStrUnit(string, unit) {
    return string.split(unit)[0];
  }

  // 时间戳转换时间
  static _tampTransData(tamp) {
    const d = new Date(parseInt(tamp, 10));
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

  // 时间转换时间戳
  static _dataTransTamp(data) {
    return new Date(data).getTime();
  }

  // 设置结束小时参数值
  static _pushEndHour(starthour) {
    const endA = [];
    for (let i = starthour + 1; i <= 24; i++) {
      endA.push(i);
    }
    return endA;
  }

  // 获取当前月份参数
  static _getDays(y, m) {
    return new Date(y, m, 0).getDate();
  }

  static _getNewDate() {
    const d = new Date();
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    value: PropTypes.array,
    /* eslint-enable react/no-unused-prop-types */
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
  };

  static defaultProps = {
    value: [],
    textvalue: '',
    pickerAway() {},
    open: false,
    valueData: '',
    yearText: '年',
    monthText: '月',
    dayText: '日',
    startData: '2000/01/01', // 开始日期 2000/01/01
    endData: '', // 结束日期 2017/12/29
  };

  componentWillMount() {
    const {
      valueData, open, startData, endData, yearText, monthText, dayText,
    } = this.props;
    let startDay;
    const endDataTamp = !endData ? new Date().getTime() : this._dataTransTamp(endData);
    const startDataTamp = this._dataTransTamp(startData);
    const days = Math.ceil((endDataTamp - startDataTamp) / 1000 / 24 / 60 / 60);

    // 判断是否传入开始日期 并且检验传入日期是否有效
    if (startData && this.isEffectiveDate(startData)) {
      startDay = startData;
    } else {
      startDay = this._getNewDate();
    }

    const endDay = endData || this._getNewDate();
    const onDay = valueData || this._getNewDate();

    // 设置初始数组
    const opts = this._setInitOptions(startDay, endDay, onDay);
    // newArrValue = startDay.split("/"),
    const dayList = onDay.split('/');
    const onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])];
    const onDataArr = [`${onDataValue[0]}${yearText}`, `${onDataValue[1]}${monthText}`, `${onDataValue[2]}${dayText}`];
    // 设置默认显示参数
    this.setState({
      options: opts, // 默认数值
      startD: startDay,
      endD: endDay,
      valueD: onDataValue,
      /* eslint-disable react/no-unused-state */
      dayState: days,
      startDataState: startData,
      /* esline-enable react/no-unused-state */
      value: onDataArr,
      open,
      valueData,
    });
  }

  onClickAway() {
    const { value, valueData } = this.state;
    const { yearText, monthText, dayText } = this.props;
    let dataString = '';
    dataString += `${this._deleteStrUnit(value[0], yearText)}/`;
    dataString += `${this._deleteStrUnit(value[1], monthText)}/`;
    dataString += this._deleteStrUnit(value[2], dayText);
    const fmt = new Date(`${dataString} 00:00`).getTime();
    this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, valueData, {
      fmt,
      data: dataString,
    });
  }

  onChange(val, text, listIndex) {
    const
      { yearText, monthText, dayText } = this.props;
    const {
      startD, endD, valueD, valueData,
    } = this.state;
    const startDataArr = startD.split('/'); // 起始时间数组
    let onData = valueD; // 当前时间数组

    if (this.initDraw) {
      this.setState({
        value: [`${valueD[0]}${yearText}`, `${valueD[1]}${monthText}`, `${valueD[2]}${dayText}`],
        valueD,
        valueData,
      });
      return;
    }

    // 当改变年份时
    if (listIndex === 0) {
      const yearval = this._deleteStrUnit(val, yearText);
      // 当前年份
      if (startD.split('/')[0] === yearval) {
        onData = [yearval, startDataArr[1], startDataArr[2]];
      } else {
        onData[0] = yearval;
      }

      // 判断 2月份是否是  29号
      if (valueD[2] === 29) {
        onData[2] = 28;
      }
    }

    // 当改变月份时
    if (listIndex === 1) {
      const mouthval = this._deleteStrUnit(val, monthText);
      // 当前年份
      if (startDataArr[0] === onData[0] && startDataArr[1] === mouthval) {
        onData = [startDataArr[0], mouthval, startDataArr[2]];
      } else {
        onData[1] = mouthval;
      }
    }

    // 当改变日时
    if (listIndex === 2) {
      onData[2] = this._deleteStrUnit(val, dayText);
    }

    const newDataArr = [this._addStrUnit(onData[0], yearText), this._addStrUnit(
      onData[1],
      monthText,
    ), this._setDaysWeek(onData[0], onData[1], onData[2])];
    const opts = this._setInitOptions(startD, endD, onData.join('/'));
    // 判断当前年月是否包含当前的日  比如 2月 29

    if (opts[2].length < onData[2]) {
      onData[2] = 1;
      newDataArr[2] = `1${dayText}`;
    }

    if (opts[1].length < onData[1]) {
      onData[1] = 1;
      newDataArr[1] = `1${monthText}`;
    }

    const setValueData = onData.join('/');

    this.setState({
      value: newDataArr,
      valueD: onData,
      valueData: setValueData,
      options: opts,
    });
  }

  // 设置 options 当前年月日
  _setInitOptions(startDay, endDay, onDay) {
    const start = startDay.split('/');
    const end = endDay.split('/');
    const on = onDay.split('/');
    const year = [];
    const mouth = [];
    const day = [];

    /* 开始、结束、当前 年月日 */
    let ys = Number(start[0]);
    const ye = Number(end[0]);
    const yon = Number(on[0]);
    const ms = Number(start[1]);
    const me = Number(end[1]);
    const mon = Number(on[1]);
    const ds = Number(start[2]);
    const de = Number(end[2]);

    let optms = 1;
    let optme = 12;
    let optds = 1;
    let optde = this._getDays(yon, mon);

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

    const { yearText, monthText } = this.props;

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

    return [year, mouth, day];
  }

  _setDaysWeek(yon, mon, optds) {
    const { dayText } = this.props;
    const newdaysopt = `${optds}${dayText}`;
    return newdaysopt;
  }

  // 获取 结束时间
  _getEndData(startData, days) {
    const nowTamp = this._dataTransTamp(startData) + days * 60 * 60 * 1000 * 24;
    return this._tampTransData(nowTamp);
  }

  show() {
    this._showFunc();
  }

  _onClick() {
    this._showFunc();
  }

  _showFunc() {
    if (this.props.valueData !== this.state.valueData) {
      const {
        valueData, endData, startData, yearText, monthText, dayText,
      } = this.props;
      const endDay = endData || this._getNewDate();
      const onDay = valueData || this._getNewDate();
      let startDay;

      // 判断是否传入开始日期 并且检验传入日期是否有效
      if (startData && this.isEffectiveDate(startData)) {
        startDay = startData;
      } else {
        startDay = this._getNewDate();
      }

      // 设置初始数组
      const self = this;
      const options = this._setInitOptions(startDay, endDay, onDay);

      const dayList = onDay.split('/');
      const onDataValue = [dayList[0], Number(dayList[1]), Number(dayList[2])];
      const onDataArr = [`${onDataValue[0]}${yearText}`, `${onDataValue[1]}${monthText}`, `${onDataValue[2]}${dayText}`];

      this.setState({
        valueData,
        options,
        valueD: onDataValue,
        value: onDataArr,
      });

      this.initDraw = true;
      setTimeout(() => {
        self.initDraw = false;
      }, 500);

    // this.refs.date_picker.show()
    }
    this.refs.date_picker.show();
  }

  render() {
    const { bntTest, textvalue } = this.props;
    const { value, options, open } = this.state;
    return (
      <div className="dataPicker">
        <div className="pickertime" onClick={this._onClick.bind(this)} ref="pickertime">
          {bntTest || textvalue}
        </div>
        <Picker
          ref="date_picker"
          value={value}
          options={options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={open}
        />
      </div>
    );
  }
}

module.exports = DateRangePicker;
