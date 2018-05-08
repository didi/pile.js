import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class CarRecord extends Component {
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
    drsFontLen: PropTypes.number,
    nameFontLen: PropTypes.number,
    nameSubstrLen: PropTypes.number,
    weekFormat: PropTypes.string,
    weekShow: PropTypes.bool,
    dateFormat: PropTypes.string,

    start_name: PropTypes.string.isRequired,
    end_name: PropTypes.string.isRequired,
    filedMap: PropTypes.object.isRequired,
    create_time: PropTypes.number.isRequired,
    use_car_type: PropTypes.number.isRequired,
    require_level: PropTypes.number.isRequired,
    pay_type: PropTypes.number.isRequired,
    real_pay: PropTypes.number.isRequired,
    tip_fee: PropTypes.number.isRequired,
    other_fee: PropTypes.number.isRequired,
    realname: PropTypes.string.isRequired,

  };

  static defaultProps = {
    drsFontLen: 15, // 地址文字截取数 number
    nameFontLen: 5, // 人名文字截取判断数 number
    nameSubstrLen: 3, // 人名文字截取拼接数 number
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


  // 地址文字截取
  subFontChar(name, num = this.props.drsFontLen) {
    const re = /[0-9]|[a-z]|[A-Z]|\./;
    let length = 0;
    let i;
    if (name.length <= num) {
      return name;
    }
    for (i = 0; i < name.length; i++) {
      if (length > num) {
        break;
      }
      if (re.test(name[i])) {
        length += 0.5;
      } else {
        length += 1;
      }
    }
    return length > num ? `${name.substr(0, i - 1)}...` : name;
  }

  // 名字文字截取
  changeName(name, fontLen = this.props.nameFontLen, subNum = this.props.nameSubstrLen) {
    return name.length >= fontLen ? `${name.substr(0, subNum)}...` : name;
  }

  render() {
    const {
      start_name, end_name, filedMap, create_time, className, use_car_type, require_level,
      pay_type, real_pay, tip_fee, other_fee, realname, superAdmin, weekShow,
      weekFormat, drsFontLen, nameSubstrLen, dateFormat, nameFontLen,
      ...others
    } = this.props;
    const username = this.changeName(realname);
    const timeObj = new Date(create_time * 1000);
    const data = !weekShow ? CarRecord.setDateFormat(timeObj, this.props.dateFormat) : `${CarRecord.setDateFormat(timeObj, this.props.dateFormat)} ${this.setWeekFormat(timeObj)}`;
    const startName = start_name && this.subFontChar(start_name);
    const endName = end_name && this.subFontChar(end_name);
    const cls = classNames({
      'car-record-list': true,
      [className]: className,
    });
    const Wapper = this.props.href ? 'a' : 'div';
    return (
      <Wapper className={cls} {...others}>
        <div className="record-head">
          <span className="icon-time icon-pile-time" />
          <span className="timer fz12">{data}</span>
          {superAdmin === 1 && <span className="remark fz16">{username}</span>}
          {use_car_type !== '2' && <span className="remark fz11">{filedMap.use_car_type[use_car_type]}</span>}
          {use_car_type === '2' && <span className="remark fz11">{filedMap.require_level[require_level]}</span>}
          {pay_type !== '0' && <span className="remark fz11">{filedMap.pay_type[pay_type]}</span>}
        </div>
        <div className="wrapper wrapper-from-hook">
          <span className="pile-icon pile-icon-location-point" />
          <span className="fz14 txt-from txt-from-hook default ml5">{startName}</span>
        </div>
        <div className="wrapper wrapper-from-hook">
          <span className="pile-icon pile-icon-location-point-red" />
          <span className="fz14 txt-from txt-from-hook default ml5">{endName}</span>
        </div>
        <div className="car-record-cost">
          <p className="main-cost fz16">
            <span>{real_pay}</span>元
          </p>
          {Number(tip_fee) > 0 && <p className="fz11">小费{tip_fee}元</p>}
          {Number(other_fee) > 0 && <p className="fz11">附加费{other_fee}元</p>}
        </div>
      </Wapper>
    );
  }
}
