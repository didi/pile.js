import React, { Component } from 'react';
import Picker from '../picker/picker.js';

class PickerDate extends Component {
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

  static _getDay(year, month) {
    return new Date(year, month, 0).getDate();
  }

  componentWillMount() {
    let {
      year, showtoday, open,
    } = this.props.options;
    const { endTime } = this.props.options;
    open = open || false;
    year = year || 2;
    showtoday = showtoday || true;
    const currentdate = new Date();
    const yeararr = [];
    const marr = [];
    const darr = [];
    const currentyear = currentdate.getFullYear();
    const cunrrentmonth = currentdate.getMonth() + 1;
    const currentday = currentdate.getDate();
    const startTime = [currentyear, cunrrentmonth, currentday];
    const days = this._getDay(startTime[0], startTime[1]);
    let tomorrow;

    if (startTime[2] < days) {
      tomorrow = [startTime[0], startTime[1], startTime[2] + 1];
    } else if (startTime[1] < 12) {
      tomorrow = [startTime[0], startTime[1] + 1, 1];
    } else {
      tomorrow = [startTime[0] + 1, 1, 1];
    }
    // let startTime = [currentyear,cunrrentmonth,currentday]
    // options 全值
    // set year month day
    for (let i = 0; i < 31; i++) {
      if (i < year) {
        yeararr.push(startTime[0] + i);
      }
      if (i < 12) {
        marr.push(`${i + 1}月`);
      }
      if (i < 31) {
        darr.push(`${i + 1}日`);
      }
    }
    const alloptions = [yeararr, marr, darr];

    this._getoptionvalue(alloptions, startTime, endTime, year, open);

    this.setState({
      today: startTime,
      isshowhanzi: showtoday,
      tomorrow,
      alloptions,
      open,
    });
  }


  componentWillReceiveProps(nextprops) {
    const { startTime } = nextprops;
    if (startTime) {
      /* eslint-disable react/no-unused-state */
      this.setState({
        startTime,
      });
      /* eslint-enable react/no-unused-state */
    }
  }

  onChange(value, text, listIndex) {
    const val = this.state.value.slice(0);
    let options = this.state.options.slice(0);
    const { starttime } = this.state;
    let newvalue;
    const { alloptions } = this.state;

    // 在有年值得时候转化成数字
    if (typeof (val[0]) !== 'number') {
      val[0] = Number(val[0].match('^[0-9]*'));
    }
    if (listIndex !== 2) { // day变化不做任何处理
      if (listIndex === 0) { // year变化
        // year的位置
        // year不可能只有一个 否则无change
        const yearindex = options[0].indexOf(value);
        if (yearindex === 0 && starttime) {
          // 第一年并且有start值并且最后一年和第一年不是同一年
          // const startTimeY = parseInt(starttime[0], 10);
          const startTimeM = parseInt(starttime[1], 10);
          const startTimeD = parseInt(starttime[2], 10);
          const days = this._getDay(options[0][0], Number(alloptions[1].slice(startTimeM - 1)[0].replace(/[^0-9]/ig, '')));
          options = [options[0], alloptions[1].slice(startTimeM - 1),
            alloptions[2].slice(startTimeD - 1, days)];
        } else {
          // month day为全值
          const days = this._getDay(options[0][0], 1);
          options = [options[0], alloptions[1], alloptions[2].slice(0, days)];
        }
        newvalue = [value, options[1][0], options[2][0]];
      } else if (listIndex === 1) { // month变化
        const yearindex = options[0].indexOf(val[0]);
        const monthindex = options[1].indexOf(val[1]);
        // const daylen = options[1].length;
        if (yearindex === 0 && monthindex === 0 && starttime) {
          // 第一年 第一个month 并且有start值
          // const startTimeY = parseInt(starttime[0], 10);
          // const startTimeM = parseInt(starttime[1], 10);
          const startTimeD = parseInt(starttime[2], 10);
          const days = this._getDay(options[0][0], Number(options[1][0].replace(/[^0-9]/ig, '')));
          // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
          options = [options[0], options[1], alloptions[2].slice(startTimeD - 1, days)];
        } else {
          // YEAR MONTH不变 DAY为全值
          const days = this._getDay(Number(val[0]), Number(val[1].replace(/[^0-9]/ig, '')));
          options = [options[0], options[1], alloptions[2].slice(0, days)];
        }

        newvalue = [val[0], value, options[2][0]];
      }
      if (this.state.isshowhanzi) {
        options = this._showHanzi(options, newvalue);
      }
      this.setState({
        options,
        value: newvalue,
      });
    }
  }

  onClickAway() {
    const { value } = this.state;
    let dataString = '';
    dataString += `${value[0]}/`;
    dataString += `${value[1].split('月')[0]}/`;
    dataString += value[2].split('日')[0];

    const fmt = new Date(`${dataString} 00:00`).getTime();
    this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, {
      fmt,
      data: dataString,
    });
  }


  _onClick() {
    this.refs.date_picker.show();
  }

  show() {
    this.refs.date_picker.show();
  }

  _showHanzi(options, value) {
    const first = [value[0], Number(value[1].replace(/[^0-9]/ig, ''))];
    const { today } = this.state;
    const { tomorrow } = this.state;
    if (first[0] === today[0] && first[1] === today[1]) {
      options[2][0] = `${options[2][0]}（今日）`;
      if (options[2].length > 1) {
        options[2][1] = `${options[2][1]}（明日）`;
      }
    } else if (first[0] === tomorrow[0] && first[1] === tomorrow[1]) {
      options[2][0] = `${options[2][0]}（明日）`;
    }
    return options;
  }
  // 初始化iotions
  _getoptionvalue(alloptions, startTime, endTime, year, open) {
    let yeararr;
    let marr;
    let darr;
    let { showtoday } = this.props.options;
    showtoday = showtoday || true;

    if (startTime && !endTime) {
      const startTimeY = parseInt(startTime[0], 10);
      const startTimeM = parseInt(startTime[1], 10);
      const startTimeD = parseInt(startTime[2], 10);
      const days = this._getDay(startTimeY, startTimeM);
      yeararr = alloptions[0];
      marr = alloptions[1].slice(startTimeM - 1);
      darr = alloptions[2].slice(startTimeD - 1, days);
      if (showtoday) {
        darr[0] += '（今日）';
        if (darr.length > 1) {
          darr[1] += '（明日）';
        }
      }
    }

    const options = [yeararr, marr, darr];
    const valuearr = [options[0][0], options[1][0], options[2][0]];
    this.setState({
      value: valuearr,
      alloptions,
      options,
      starttime: startTime,
      /* eslint-disable react/no-unused-state */
      year,
      pickerAway: this.props.pickerAway,
      /* eslint-enable react/no-unused-state */
      open,
    });
  }

  render() {
    const { textvalue } = this.props;
    if (!this.state) { return null; }

    return (
      <div>
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
        />
      </div>);
  }
}

module.exports = PickerDate;
