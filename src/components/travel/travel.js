import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Travel extends Component {
  // 日期格式化   yyyy-MM-dd hh:mm ; yyyy/mm/dd hh:mm
  static setDateFormat(date, fmt) {
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
    return fmt;
  }
  static propTypes = {
    weekFormat: PropTypes.string,
    weekShow: PropTypes.bool,
    dateFormat: PropTypes.string,
  };

  static defaultProps = {
    weekFormat: 'zh', // 星期名称格式 string (zh、en、enlong)
    weekShow: true, // 星期是否展示 bool
    dateFormat: 'yyyy-MM-dd hh:mm', // 日期格式 string ( yyyy-MM-dd hh:mm 、 yyyy/mm/dd hh:mm、 yyyy-MM-dd、 yyyy/mm/dd)
  };

  // 设置星期格式
  setWeekFormat(time) {
    const week = {
      zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      enlong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    };
    const dayCn = week[this.props.weekFormat][time.getDay()];
    return dayCn;
  }

  render() {
    const {
      create_time, className, weekShow, end_name, start_name, stateHtml,
      remarksHtml, ...others
    } = this.props;
    const timeObj = new Date(create_time * 1000);
    const data = !weekShow ? this.setDateFormat(timeObj, this.props.dateFormat) : `${this.setDateFormat(timeObj, this.props.dateFormat)} ${this.setWeekFormat(timeObj)}`;
    const cls = classNames({
      'car-record-list': true,
      'jimu-app-v2': true,
      'jimu-travel': true,
      [className]: className,
    });
    const Wrapper = this.props.href ? 'a' : 'div';
    return (
      <Wrapper className={cls} {...others}>
        <div className="record-head">
          <span className="icon-time icon-jimu-time" />
          <span className="timer fz12">{data}</span>
        </div>
        <div className="wrapper wrapper-from-hook">
          <span className="jimu-icon jimu-icon-location-point" />
          <span className="fz14 txt-from txt-from-hook default ml5">{start_name}</span>
        </div>
        <div className="wrapper wrapper-from-hook">
          <span className="jimu-icon jimu-icon-location-point-red" />
          <span className="fz14 txt-from txt-from-hook default ml5">{end_name}</span>
        </div>
        <div className="car-travel-state">
          {stateHtml}
        </div>
        <div className="car-travel-remarks">
          {remarksHtml}
        </div>
      </Wrapper>
    );
  }
}

module.exports = Travel;
