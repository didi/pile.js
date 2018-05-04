import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class DatePeriodPicker extends Component {
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

  // 获取 结束时间
  static _getEndData(startData, days) {
    const nowTamp = DatePeriodPicker._dataTransTamp(startData) + days * 60 * 60 * 1000 * 24;
    return DatePeriodPicker._tampTransData(nowTamp);
  }

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    value: PropTypes.array,
    /* eslint-enable react/no-unused-prop-types */
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
    days: PropTypes.number,
  };

  static defaultProps = {
    value: [],
    textvalue: '时间组件按钮',
    pickerAway() {},
    open: false,
    format: ['年', '月', '日'],
    days: 7, // 显示时间段
    startData: '', // 开始时间 2017/12/29
    weekText: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  };

  componentWillMount() {
    const {
      open, days, startData, format,
    } = this.props;
    let startDay;

    // 判断是否传入开始日期 并且检验传入日期是否有效
    if (startData && DatePeriodPicker.isEffectiveDate(startData)) {
      startDay = startData;
    } else {
      startDay = DatePeriodPicker._getNewDate();
    }

    const endDay = DatePeriodPicker._getEndData(startDay, days - 1);

    // 设置初始数组
    const opts = this._setInitOptions(startDay, endDay, startDay);
    const newArrValue = startDay.split('/');

    // 设置默认显示参数
    this.setState({
      value: [DatePeriodPicker._addStrUnit(newArrValue[0], format[0]),
        DatePeriodPicker._addStrUnit(newArrValue[1], format[1]),
        this._setDaysWeek(newArrValue[0], newArrValue[1], newArrValue[2])], // 默认数值 开始时间 、 结束时间
      options: opts, // 默认数值
      open,
      startD: startDay,
      endD: endDay,
      valueD: newArrValue,
    });
  }


  onChange(val, text, listIndex) {
    const { format } = this.props;
    const {
      startD, endD, valueD,
    } = this.state;
    const startDataArr = startD.split('/'); // 起始时间数组
    let onData = valueD; // 当前时间数组

    // 当改变年份时
    if (listIndex === 0) {
      const yearval = DatePeriodPicker._deleteStrUnit(val, format[0]);
      // 当前年份
      if (startD.split('/')[0] === yearval) {
        onData = [yearval, startDataArr[1], startDataArr[2]];
      } else {
        onData = [yearval, 1, 1];
      }
    }

    // 当改变月份时
    if (listIndex === 1) {
      const mouthval = DatePeriodPicker._deleteStrUnit(val, format[1]);
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

    const newDataArr = [DatePeriodPicker._addStrUnit(onData[0], format[0]),
      DatePeriodPicker._addStrUnit(onData[1], format[1]),
      this._setDaysWeek(onData[0], onData[1], onData[2])];

    this.setState({
      value: newDataArr,
      options: this._setInitOptions(startD, endD, onData.join('/')),
      valueD: onData,
    });
  }

  onClickAway() {
    const { format } = this.props;
    const { value } = this.state;
    let dataString = '';
    dataString += `${value[0].split(format[0])[0]}/`;
    dataString += `${value[1].split(format[1])[0]}/`;
    dataString += value[2].split(format[2])[0];

    const fmt = new Date(`${dataString} 00:00`).getTime();
    this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, {
      fmt,
      data: dataString,
    });
  }


  // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm
  setDateFormat(nowdate, fmt) {
    const { delay } = this.props;
    const deleytamp = new Date(nowdate).getTime() + 60 * 1000 * delay;
    const date = new Date(parseInt(deleytamp, 10));
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }

    return {
      fmt,
      datelist: {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
      },
    };
  }

  // 设置 options 当前年月日
  _setInitOptions(startDay, endDay, onDay) {
    const { format } = this.props;
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
    let optde = DatePeriodPicker._getDays(yon, mon);

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

  _setDaysWeek(yon, mon, optds) {
    const nowdt = `${yon}/${mon}/${optds}`;
    const week = new Date(nowdt).getDay();
    const newdaysopt = `${optds}日 ${this.props.weekText[week]}`;
    return newdaysopt;
  }


  show() {
    this.refs.date_picker.show();
  }

  _onClick() {
    this.refs.date_picker.show();
  }

  render() {
    const { bntTest, textvalue } = this.props;

    return (
      <div className="dataPicker">
        <div className="pickertime" onClick={this._onClick.bind(this)} ref="pickertime">
          {bntTest || textvalue}
        </div>
        <Picker
          ref="date_picker"
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={this.state.open}
        />
      </div>
    );
  }
}

module.exports = DatePeriodPicker;
