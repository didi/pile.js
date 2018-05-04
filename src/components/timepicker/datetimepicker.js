import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class DateTimePicker extends Component {
  // 设置delay 以后时间 日期格式化  yyyy-MM-dd hh:mm ; yyyy/MM/dd hh:mm
  static setDateFormat(nowdate, fmt) {
    const deleytamp = new Date(nowdate).getTime();
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

  // 获取当前日期
  static _tomorrowData() {
    const deleytamp = new Date().getTime() + 24 * 60 * 60 * 1000;
    const d = new Date(parseInt(deleytamp, 10));
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

  // 获取当前日期
  static _getDataTime() {
    const d = new Date();
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

  // 判断小时展示范围
  static _checkHourOver(onDataArr, startDate, endDate) {
    let starthour = 0;
    let endhour = 23;
    // 判断当前日期是否是起始日期
    if (onDataArr.datelist.y === startDate.datelist.y
      && onDataArr.datelist.M === startDate.datelist.M
     && onDataArr.datelist.d === startDate.datelist.d) {
      starthour = startDate.datelist.h;
    }

    // 判断当前日期是否是结束日期
    if (onDataArr.datelist.y === endDate.datelist.y &&
      onDataArr.datelist.M === endDate.datelist.M && onDataArr.datelist.d === endDate.datelist.d) {
      endhour = endDate.datelist.h;
    }

    return {
      starthour,
      endhour,
    };
  }

  // 当前日期取整  upward 是否向上取值
  static _getTimeRound(time, scale, upward = true) {
    const onMinutes = Number(time.split(':')[1]);
    const timestamp = new Date(time).getTime();
    let scaleMinutes = onMinutes;
    let isback = true;

    if (upward) {
      for (let i = onMinutes, max = onMinutes + scale; i <= max; i++) {
        if (!(i % scale) && isback) {
          scaleMinutes = i;
          isback = false;
        }
      }
    } else {
      for (let i = onMinutes, min = onMinutes - scale; i >= min; i--) {
        if (!(i % scale) && isback) {
          scaleMinutes = i;
          isback = false;
        }
      }
    }

    const diffTamp = (scaleMinutes - onMinutes) * 1000 * 60;
    const date = new Date(parseInt(timestamp + diffTamp, 10));
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  // 查看两个日期间隔几天 startDate、endDate  格式 如：2017/8/2
  static _getDayDiff(startDate, endDate) {
    const startTime = new Date(Date.parse(startDate)).getTime();
    const endTime = new Date(Date.parse(endDate)).getTime();
    const dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates;
  }

  // 字符串删除单位
  static _deleteStrUnit(string, unit) {
    return string.split(unit)[0];
  }

  static propTypes = {
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
    /* eslint-disable react/no-unused-prop-types */
    len: PropTypes.number,
    /* esline-enale react/no-unused-prop-types */
  };

  static defaultProps = {
    textvalue: '时间组件按钮',
    pickerAway() {},
    open: false,
    format: ['yyyy年MM月dd日', '点', '分'],
    startData: '2017/12/21 23:55',
    endData: '2018/1/8 01:20',
    defaultData: '2017/12/31 23:55',
    scale: 5, //  分钟刻度
    titleName: '当前时间', // title
    nameFormatBool: true, // 日期显示格式
    len: 0,
  };

  componentWillMount() {
    this.setInitState();
  }

  componentWillReceiveProps() {
    this.setInitState();
  }

  onClickAway() {
    const { value, onDataTime } = this.state;
    const fmt = new Date(onDataTime).getTime();
    this.props.pickerAway && this.props.pickerAway(value, onDataTime, this.refs.pickertime, {
      fmt,
      data: onDataTime,
    });
  }

  onChange(val, text, listIndex) {
    const { format } = this.props;
    let {
      onDataTime,
    } = this.state;
    const {
      options, value, len, startDateArr, endDateArr, startDateTime, endDateTime,
    } = this.state;
    const day = options[0];
    const hours = options[1];
    let setHour = hours;
    let setMinute;
    let onDay = value[0];
    let onHours = value[1];
    let onMinutes = value[2];

    // 日期更改时
    if (listIndex === 0) {
      onDay = val;

      // 开始日期
      if (onDay === day[0]) {
        const getHour = DateTimePicker._deleteStrUnit(onHours, format[1]);
        // 判断小时是否在开始范围内
        setHour = this._setInitHour(startDateArr.datelist.h, 23);
        if (getHour < startDateArr.datelist.h) {
          onHours = startDateArr.datelist.h + format[1];
        }
      }

      // 结束日期
      if (onDay === day[len]) {
        const getHour = DateTimePicker._deleteStrUnit(onHours, format[1]);
        setHour = this._setInitHour(0, endDateArr.datelist.h);
        if (getHour > endDateArr.datelist.h) {
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
    if (onDay === day[0] && onHours === setHour[0]) {
      const getMinute = DateTimePicker._deleteStrUnit(onMinutes, format[2]);
      const endMinutes = startDateTime.split(':')[0] === endDateTime.split(':')[0] ? endDateArr.datelist.m : 59;
      // 判断分钟是否在开始范围内
      setMinute = this._setInitMinutes(startDateArr.datelist.m, endMinutes);
      if (getMinute < Number(startDateArr.datelist.m)) {
        onMinutes = startDateArr.datelist.m + format[2];
      }
      // 结束日期
    } else if (onDay === day[len]
      && DateTimePicker._deleteStrUnit(onHours, format[1]) === endDateArr.datelist.h) {
      const getMinute = DateTimePicker._deleteStrUnit(onMinutes, format[2]);
      // 判断分钟是否在开始范围内
      setMinute = this._setInitMinutes(0, endDateArr.datelist.m);
      if (getMinute > Number(endDateArr.datelist.m)) {
        onMinutes = endDateArr.datelist.m + format[2];
      }
    } else {
      setMinute = this._setInitMinutes(0, 59);
    }

    // 设置日期
    for (let i = day.length - 1; i >= 0; i--) {
      if (day[i] === onDay) {
        onDataTime = `${this.dataTimeArr[i]} ${DateTimePicker._deleteStrUnit(onHours, format[1])}:${DateTimePicker._deleteStrUnit(onMinutes, format[2])}`;
      }
    }

    this.setState({
      onDataTime,
      value: [onDay, onHours, onMinutes],
      options: [day, setHour, setMinute],
    });
  }

  setInitState() {
    const {
      startData, endData, defaultData, scale, format, open, nameFormatBool,
    } = this.props;
    // 设置默认显示参数
    const onDataTime = DateTimePicker._getTimeRound(defaultData, scale);
    const startDateTime = DateTimePicker._getTimeRound(startData, scale);
    const endDateTime = DateTimePicker._getTimeRound(endData, scale);
    const len = DateTimePicker._getDayDiff(endDateTime.split(' ')[0], startDateTime.split(' ')[0]);
    const onDataArr = DateTimePicker.setDateFormat(onDataTime, 'yyyy/MM/dd hh:mm');
    const startDateArr = DateTimePicker.setDateFormat(startDateTime, 'yyyy/MM/dd hh:mm');
    const endDateArr = DateTimePicker.setDateFormat(endDateTime, 'yyyy/MM/dd hh:mm');

    // 获取时间范围
    const getHoverOver = DateTimePicker._checkHourOver(onDataArr, startDateArr, endDateArr);
    let startMinutes = 0;
    let endMinutes = 59;
    const nowdate = DateTimePicker._getDataTime();
    const tomorrow = DateTimePicker._tomorrowData();
    const valueFirst = DateTimePicker.setDateFormat(onDataTime, 'yyyy/M/d').fmt;
    let setValueFirst = `${DateTimePicker.setDateFormat(onDataTime, format[0]).fmt}`;

    if (nameFormatBool) {
      if (valueFirst === nowdate) {
        setValueFirst = '今天';
      } else if (valueFirst === tomorrow) {
        setValueFirst = '明天';
      }
    }

    // 设置起始的分钟数
    if (onDataTime.split(':')[0] === startDateTime.split(':')[0]) {
      startMinutes = startDateArr.datelist.m;
    }

    if (onDataTime.split(':')[0] === endDateTime.split(':')[0]) {
      endMinutes = endDateArr.datelist.m;
    }

    this.setState({
      open,
      onDataTime,
      startDateTime,
      endDateTime,
      len,
      // onDataArr,
      startDateArr,
      endDateArr,
      value: [setValueFirst, `${onDataArr.datelist.h}${format[1]}`, `${onDataArr.datelist.m}${format[2]}`], // 默认数值 开始时间 、 结束时间
      options: [this._setInitData(startDateArr.fmt, len),
        this._setInitHour(getHoverOver.starthour, getHoverOver.endhour),
        this._setInitMinutes(startMinutes, endMinutes)], // 初始数值
    });
  }


  // 获取两个区间日期 direction ：before 获取开始日期，after 获取结束日期
  _getDataDiff(onData, sectionMinutes, direction) {
    const { scale } = this.props;
    const timestamp = new Date(onData).getTime();
    const diffTamp = sectionMinutes * 1000 * 60;
    const diffDate = direction === 'after' ? timestamp + diffTamp : timestamp - diffTamp;
    const date = new Date(parseInt(diffDate, 10));
    let setMinutes = date.getMinutes();

    for (let i = setMinutes, max = setMinutes + scale; i <= max; i++) {
      if (!(i % scale)) {
        setMinutes = i >= 60 ? (i - 60) : i;
      }
    }

    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${setMinutes}`;
  }

  // 设置初始日期展示
  _setInitData(startDate, len) {
    const { format, nameFormatBool } = this.props;
    const timestamp = new Date(startDate).getTime();
    const dataArr = [];
    const nowdate = DateTimePicker._getDataTime();
    const tomorrow = DateTimePicker._tomorrowData();
    this.dataTimeArr = [];
    for (let i = 0; i <= len; i++) {
      const tamp = timestamp + 24 * 60 * 60 * 1000 * i;

      if (nameFormatBool) {
        if (nowdate === DateTimePicker.setDateFormat(new Date(parseInt(tamp, 10)), 'yyyy/M/d').fmt) {
          dataArr.push('今天');
        } else if (tomorrow === DateTimePicker.setDateFormat(new Date(parseInt(tamp, 10)), 'yyyy/M/d').fmt) {
          dataArr.push('明天');
        } else {
          dataArr.push(DateTimePicker.setDateFormat(new Date(parseInt(tamp, 10)), format[0]).fmt);
        }
      } else {
        dataArr.push(DateTimePicker.setDateFormat(new Date(parseInt(tamp, 10)), format[0]).fmt);
      }

      this.dataTimeArr.push(DateTimePicker.setDateFormat(new Date(parseInt(tamp, 10)), 'yyyy/MM/dd').fmt);
    }

    return dataArr;
  }

  // 设置初始小时展示
  _setInitHour(starthour, endhour) {
    const { format } = this.props;
    const hourArr = [];
    const gethour = starthour;

    for (let i = gethour; i <= endhour; i++) {
      hourArr.push(i + format[1]);
    }
    return hourArr;
  }

  // 设置初始小时展示
  _setInitMinutes(minutes, end) {
    const { scale, format } = this.props;
    let minutesArr = [];

    for (let i = 0; i <= end; i++) {
      // minutesArr.push(i + format[1])
      if (!(i % scale)) {
        if (minutes <= i) {
          minutesArr.push(i + format[2]);
        }
      }
    }

    minutesArr = minutesArr.length === 0 ? [`0${format[2]}`] : minutesArr;
    return minutesArr;
  }

  _onClick() {
    this._showFunc();
  }

  show() {
    this._showFunc();
  }

  _showFunc() {
    this.setInitState();
    this.refs.date_picker.show();
  }

  render() {
    const { textvalue } = this.props;

    return (
      <div className="dataPicker">
        <div className="pickertime" onClick={this._onClick.bind(this)} ref="pickertime">
          {textvalue}
        </div>
        <Picker
          ref="date_picker"
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={this.state.open}
          titleName={this.props.titleName}
        />
      </div>
    );
  }
}

module.exports = DateTimePicker;
