import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class TimePeriod extends Component {
  static propTypes = {
    value: PropTypes.array,
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
  };

  static defaultProps = {
    textvalue: '',
    delay: 10, // 延迟分钟（分钟）
    timeFrame: 30, // 时间范围（小时）
    pickerAway() {},
    open: false,
    unit: '次日',
    titleName: '每日可用时间段',
    value: ['09:00', '23:00'],
  };

  componentWillMount() {
    const { value } = this.props;
    const startTimeArr = this._setStartTime();
    const endTimeArr = this._setEndTime(value[0]);
    // 设置默认显示参数
    this.setState({
      value: [value ? value[0] : startTimeArr[0],
        value ? value[1] : endTimeArr[0]], // 默认数值 开始时间 、 结束时间
      options: [startTimeArr, endTimeArr], // 默认数值
    });
  }

  onChange(val, text, listIndex) {
    // 当改变开始时间时
    const { value, options } = this.state;
    const startTime = value[0];
    const endTime = value[1];
    // 当改变开始时间时
    if (listIndex === 0) {
      const endTimeArr = this._setEndTime(val);
      const endTimeVal = this.checkEndTimeIsBefore(val, endTime) ? endTimeArr[0] : endTime;
      this.setState({
        value: [val, endTimeVal],
        options: [options[0], endTimeArr],
      });
    } else {
      this.setState({
        value: [startTime, val],
      });
    }
  }

  onClickAway() {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
  }

  // 检测结束时间是否早于开始时间  true 早于， false 晚于
  checkEndTimeIsBefore(startTime, endTime) {
    const { unit } = this.props;
    const splitStartTime = startTime.split(':');
    const splitEndTime = endTime.split(':');

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

  show() {
    this.refs.date_picker.show();
  }

  // 设置开始时间
  _setStartTime() {
    const { delay } = this.props;
    const startArr = [];
    const mdelay = 60 / delay;
    for (let i = 0, len = 24; i < len; i++) {
      for (let mi = 0, mlen = mdelay; mi < mlen; mi++) {
        const newi = i < 10 ? `0${i}` : i;
        const newmi = mi * delay < 10 ? `0${mi * delay}` : mi * delay;
        startArr.push(`${newi}:${newmi}`);
      }
    }
    return startArr;
  }

  // 设置结束时间
  _setEndTime(startTime = '00:00') {
    const { delay, unit } = this.props;
    const mdelay = 60 / delay;
    const splitStartTime = startTime.split(':');
    const startH = Number(splitStartTime[0]);
    const startM = Number(splitStartTime[1]);
    const endArr = [];
    for (let i = startH, len = 31 + startH; i < len; i++) {
      if (i < 48) {
        for (let mi = 0, mlen = mdelay; mi < mlen; mi++) {
          let newi = i < 10 ? `0${i}` : i;
          const cond1 = startH === i && mi * delay <= startM;
          const cond2 = startH + 30 === i && mi * delay > startM;
          if (!(cond1 || cond2)) {
            const newmi = mi * delay < 10 ? `0${mi * delay}` : mi * delay;
            if (newi >= 24) {
              newi = `${unit}${newi - 24 < 10 ? `0${newi - 24}` : newi - 24}`;
            }
            endArr.push(`${newi}:${newmi}`);
          }
        }
      }
    }
    return endArr;
  }
  render() {
    const { textvalue, open, titleName } = this.props;
    const { options, value } = this.state;

    return (
      <div>
        <div className="pickertime" onClick={this.show.bind(this)} ref="pickertime">
          {textvalue}
        </div>
        <Picker
          ref="date_picker"
          value={value}
          options={options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={open}
          titleName={titleName}
        />
      </div>);
  }
}

module.exports = TimePeriod;
