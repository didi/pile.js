import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../picker/picker.js';

class PickerTime extends Component {
  static generateM(max) {
    const arr = [];
    for (let i = 0; i < max; i++) {
      const m = i * 5;
      arr.push(`${m < 10 ? `0${m}` : m}分`);
    }
    return arr;
  }

  static _compare(startTime, endTime) {
    if (startTime && endTime) {
      let result = 0;
      startTime.forEach((item, i) => {
        if ((startTime[i] > endTime[i]) && result === 0) {
          result = 1;
        } else if ((startTime[i] < endTime[i]) && result === 0) {
          result = 2;
        }
      });
      if (result === 2) return true;
      return false;
    }
    return true;
  }

  static _getDay() {
    const today = new Date();
    return today;
  }

  static propTypes = {
    // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    // options: PropTypes.array.isRequired,
    // onChange: PropTypes.func,
    // onShow: PropTypes.func,
    // onDismiss: PropTypes.func,
    // onClickAway: PropTypes.func,
    // width: PropTypes.string
    options: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.initoptions = this.initoptions.bind(this);
  }
  // getDefaultProps: function() {
  //   return {
  //     options: 'default value'
  //   }
  // }

  componentWillMount() {
    let {
      scale, day, open,
    } = this.props.options;
    const { startTime, endTime, value } = this.props.options;
    // 默认5分钟的刻度
    scale = scale || 5;
    day = day || 3;
    open = open || false;
    const dayarr = [];
    const marr = [];
    const harr = [];
    // options 全值
    for (let i = 0; i < day; i++) {
      switch (i) {
        case 0:
          dayarr.push('今日');
          break;
        case 1:
          dayarr.push('次日');
          break;
        case 2:
          dayarr.push('后天');
          break;
        default:
          dayarr.push(PickerTime._getDay());
          break;
      }
    }
    for (let i = 0; i < 60; i++) {
      if (i < 24) {
        harr.push(`${i < 10 ? `0${i}` : i}时`);
      }
      if (!(i % scale)) {
        marr.push(`${i < 10 ? `0${i}` : i}分`);
      }
    }
    const alloptions = [dayarr, harr, marr];
    this.setState({
      alloptions,
    });
    this._getoptionvalue(alloptions, startTime, endTime, scale, value, day, open);
  }

  componentWillReceiveProps(nextprops) {
    const { startTime } = nextprops;

    if (startTime) {
      this.setState({
        /* eslint-disable react/no-unused-state */
        startTime,
        /* eslint-enable */
      });
      this.initoptions(startTime);
    }
  }

  onClickAway() {
    this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
  }

  onChange(value, text, listIndex) {
    const val = this.state.value.slice(0);
    let options = this.state.options.slice(0);
    const len = this.state.options.length;
    const { starttime } = this.state;
    let newvalue;
    const daylength = options[0].length;
    const {
      alloptions, endtime, scale,
    } = this.state;

    // day变化
    if (len === 3 && listIndex === 0) {
      // 天数的位置
      // day不可能只有一天 否则无change
      const dayindex = options[0].indexOf(value);
      if (dayindex === 0 && starttime) {
        // 第一天并且有start值并且最后一天和第一天不是同一天
        // let startTimeD = parseInt(starttime[0]);
        let startTimeH = parseInt(starttime[1], 10);
        let startTimeM = parseInt(starttime[2], 10);
        const lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
        if (lastmin < startTimeM) {
          startTimeH += 1;
          startTimeM = 0;
        }
        if (startTimeH > 23) {
          // startTimeD += 1;
          startTimeH = 0;
        }
        options = [options[0], alloptions[1].slice(startTimeH),
          alloptions[2].slice(Math.ceil(startTimeM / scale))];
      } else if (dayindex === daylength - 1 && endtime) {
        // 最后一天并且有end值
        const endTimeH = parseInt(endtime[1], 10);
        const endTimeM = parseInt(endtime[2], 10);
        options = [options[0], alloptions[1].slice(0, endTimeH + 1),
          alloptions[2].slice(0, Math.ceil((endTimeM + 1) / scale))];
      } else {
        // hour min为全值
        options = [options[0], alloptions[1], alloptions[2]];
      }
      newvalue = [value, options[1][0], options[2][0]];
      this.setState({
        options,
        value: newvalue,
      });
    } else if ((len === 3 && listIndex === 1) || (len === 2 && listIndex === 0)) {
      // hour变化
      const dayindex = options[0].indexOf(val[0]);
      const hourindex = options[1].indexOf(val[1]);
      const hourlen = options[1].length;
      if (dayindex === 0 && hourindex === 0 && starttime) {
        // 第一天 第一个hour 并且有start值
        let startTimeM = parseInt(starttime[2], 10);
        const lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
        if (lastmin < startTimeM) {
          startTimeM = 0;
        }
        // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
        options = [options[0], options[1], alloptions[2].slice(Math.ceil(startTimeM / scale))];
      } else if (dayindex === daylength - 1 && hourindex === hourlen - 1 && endtime) {
        // 最后一天 最后一个hour 并且有end值
        const endTimeM = parseInt(endtime[2], 10);
        options = [options[0], options[1],
          alloptions[2].slice(0, Math.ceil((endTimeM + 1) / scale))];
      // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
      } else {
        // hour da不变 min为全值
        options = [options[0], options[1], alloptions[2]];
      }
      newvalue = [val[0], value, options[2][0]];
      this.setState({
        options,
        value: newvalue,
      });
    }
  }

  initoptions(startTime) {
    const startArr = startTime.split(':');
    const startTimeH = parseInt(startArr[0], 10);
    const startTimeM = parseInt(startArr[1], 10);
    const options = this.state.options.slice(0);

    const harr = [];
    const marr = [];
    // 选日的时候只触发时的重新渲染
    // 初始化一下最小值
    let minH = startTimeH;

    if (startTimeM === 55) {
      // 如果是55的话，则加小时往后加1
      minH += 1;
    }

    for (let i = minH; i < 24; i++) {
      // 初始化小时
      harr.push(`${i < 10 ? `0${i}` : i}时`);
    }

    if (startTimeM !== 55) {
      // 如果是第一项的话  并且上一项的分钟不是时间正常计算

      for (let i = (startTimeM / 5 + 1); i < 12; i++) {
        // 初始化第一项的分钟
        const m = i * 5;
        marr.push(`${m < 10 ? `0${m}` : m}分`);
      }
      if (startTimeM === 0 && startTimeH === 0) {
        // 分钟和时间都为0的时候，不显示次日
        options[0] = ['当日'];
      } else {
        options[0] = ['当日', '次日'];
      }
    } else {
      // 如果时间是55
      // 如果小时等于23点
      if (startTimeH === 23) {
        // 那只能选次日
        options[0] = ['次日'];
        // 初始化小时
        for (let i = 0; i < 24; i++) {
          harr.push(`${i < 10 ? `0${i}` : i}时`);
        }
      }
      // 分钟按正常逻辑处理
      for (let i = 0; i < 12; i++) {
        const m = i * 5;
        marr.push(`${m < 10 ? `0${m}` : m}分`);
      }
    }

    options[1] = harr;
    options[2] = marr;
    this.setState({
      options,
      value: [options[0][0], harr[0], marr[0]],
    });
  // this.props.pickerAway([options[0][0], harr[0], marr[0]])
  }
  show() {
    this.refs.picker.show();
  }

  _onClick() {
    this.refs.picker.show();
  }

  // 初始化iotions
  _getoptionvalue(alloptions, startTime, endTime, scale, value, day, open) {
    let options;
    let valuearr;
    let dayarr;
    let harr;
    let marr;
    // let dayarr = alloptions[0],harr = alloptions[1],marr = alloptions[2]
    // let alldayarr, allharr, allmarr

    if (startTime && !endTime) {
      let startTimeD = parseInt(startTime[0], 10);
      let startTimeH = parseInt(startTime[1], 10);
      let startTimeM = parseInt(startTime[2], 10);
      const lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
      if (lastmin < startTimeM) {
        startTimeH += 1;
        startTimeM = 0;
      }
      if (startTimeH > 23) {
        startTimeD += 1;
        startTimeH = 0;
      }
      dayarr = alloptions[0].slice(startTimeD);
      harr = alloptions[1].slice(startTimeH);
      marr = alloptions[2].slice(Math.ceil(startTimeM / scale));
    } else if (endTime && !startTime) {
      const endTimeD = parseInt(endTime[0], 10);
      const endTimeH = parseInt(endTime[1], 10);
      const endTimeM = parseInt(endTime[2], 10);
      dayarr = alloptions[0].slice(0, endTimeD);
      harr = alloptions[1].slice(0, endTimeH);
      marr = alloptions[2].slice(0, Math.ceil(endTimeM / scale));
    } else if (endTime && startTime) {
      if (PickerTime._compare(startTime, endTime)) {
        let startTimeD = parseInt(startTime[0], 10);
        let startTimeH = parseInt(startTime[1], 10);
        let startTimeM = parseInt(startTime[2], 10);
        const endTimeD = parseInt(endTime[0], 10);
        const endTimeH = parseInt(endTime[1], 10);
        const endTimeM = parseInt(endTime[2], 10);
        // 判断极端情况的开始值
        const lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
        if (lastmin < startTimeM) {
          startTimeH += 1;
          startTimeM = 0;
        }
        if (startTimeH > 23) {
          startTimeD += 1;
          startTimeH = 0;
        }
        // 分别判断同一天 同一小时的情况
        if (startTimeD !== endTimeD) {
          dayarr = alloptions[0].slice(startTimeD, endTimeD);
          harr = alloptions[1].slice(startTimeH);
          marr = alloptions[2].slice(Math.ceil(startTimeM / scale));
        } else if (startTimeH !== endTimeH) {
          dayarr = [alloptions[0][startTimeD]];
          harr = alloptions[1].slice(startTimeH, endTimeH);
          marr = alloptions[2].slice(Math.ceil(startTimeM / scale));
        } else {
          dayarr = [alloptions[0][startTimeD]];
          harr = [alloptions[1][startTimeH]];
          marr = alloptions[2].slice(
            Math.ceil(startTimeM / scale),
            Math.ceil(endTimeM / scale) + 1,
          );
        }
      }
    } else {
      dayarr = alloptions[0];
      harr = alloptions[1];
      marr = alloptions[2];
    }

    if (dayarr.length > 0) {
      options = [dayarr, harr, marr];
    } else {
      options = [harr, marr];
    }

    if (value) {
      valuearr = value.splice(':');
    } else {
      valuearr = [options[0][0], options[1][0], options[2][0]];
    }

    this.setState({
      value: valuearr,
      alloptions,
      options,
      starttime: startTime,
      endtime: endTime,
      scale,
      open,
    });
  }

  render() {
    const { textvalue } = this.props;

    if (!this.state) {

      // if(startTime){
      //   self.initoptions(startTime)
      // }
    }
    return (
      <div>
        <div className="pickertime" onClick={this._onClick.bind(this)} ref="pickertime">
          {textvalue}
        </div>
        <Picker
          ref="picker"
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
          onClickAway={this.onClickAway.bind(this)}
          open={this.state.open}
        />
      </div>);
  }
}

module.exports = PickerTime;
