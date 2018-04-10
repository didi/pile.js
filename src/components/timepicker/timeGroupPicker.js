import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class TimeGroup extends Component {
  static _gethouer() {
    return new Date().getHours();
  }

  // 验证当前 value 是否有效
  static _checkValueTime(starthour, endhour) {
    if (starthour >= 0 && starthour < 24 && endhour <= 24 && endhour > starthour) {
      return true;
    }
    return false;
  }

  // 设置开始小时参数值
  static _pushStartHour() {
    const startA = [];
    for (let i = 0; i < 24; i++) {
      startA.push(i);
    }
    return startA;
  }

  // 设置结束小时参数值
  static _pushEndHour(starthour) {
    const endA = [];
    for (let i = starthour + 1; i <= 24; i++) {
      endA.push(i);
    }
    return endA;
  }
  static propTypes = {
    value: PropTypes.array,
    open: PropTypes.bool,
    pickerAway: PropTypes.func,
  };

  static defaultProps = {
    unit: '点',
    // bntTest : "时间组件按钮",
    textvalue: '时间组件按钮',
    pickerAway() {},
    open: false,
    value: null,
  };

  componentWillMount() {
    const { value, open } = this.props;
    let timeArr;

    // 如果没有填写value 则默认获取当前时间
    const onTime = this._gethouer() >= 24 ? 0 : this._gethouer();

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
    const newTimeArr = [this._stringAddUnit(timeArr[0]), this._stringAddUnit(timeArr[1])];

    // 设置默认显示参数
    this.setState({
      value: newTimeArr, // 默认数值 开始时间 、 结束时间
      options: [this._optionsAddUnit(this._pushStartHour()),
        this._optionsAddUnit(this._pushEndHour(timeArr[0]))], // 默认数值
      open,
    });
  }

  onChange(val, text, listIndex) {
    // 当改变开始时间时
    const { value } = this.state;
    let endHour;
    const startHour = value[0];
    const nval = this._deleteUnit(val);

    if (listIndex === 0) {
      endHour = nval + 1;
      this.setState({
        options: [this._optionsAddUnit(this._pushStartHour()),
          this._optionsAddUnit(this._pushEndHour(nval))],
        value: [this._stringAddUnit(nval), this._stringAddUnit(endHour)],
      });
    } else {
      this.setState({
        value: [startHour, this._stringAddUnit(nval)],
      });
    }
  }

  onClickAway() {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
  }

  show() {
    this.refs.date_picker.show();
  }

  // 数组添加单位
  _optionsAddUnit(arr) {
    const { unit } = this.props;
    const newarr = arr.map(re => (`${re}${unit}`));
    return newarr;
  }

  // 字符串添加单位
  _stringAddUnit(string) {
    const { unit } = this.props;
    return `${string}${unit}`;
  }

  // 删除单位
  _deleteUnit(string) {
    return Number(string.split(this.props.unit)[0]);
  }

  _onClick() {
    this.refs.date_picker.show();
  }

  render() {
    const { bntTest, textvalue } = this.props;

    return (
      <div>
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
      </div>);
  }
}

module.exports = TimeGroup;
