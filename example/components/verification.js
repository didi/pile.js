import React, { Component } from 'react';
import JIMU from './index';

const { Verification, Button, LocaleProvider } = JIMU;
import enUS from '../../src/components/localeprovider/en_US';
import zhCN from '../../src/components/localeprovider/zh-CN';
// 底部弹出展示 FadeInUp
const _FadeInUp = React.createClass({
  getInitialState() {
    return {
      show: false,
      documentH: document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight,
      phone: '18510510675',
      timer: 30,
      len: 4,
      timeStart: false,
    };
  },

  fadeShow1() {
    this.setState({
      show: true,
      phone: '13269699598',
      timer: 30,
      len: 4,
      timeStart: true,
    });
  },

  fadeShow2() {
    this.setState({
      show: true,
      timer: 30,
      phone: '13200000000',
      timeStart: true,
      len: 6,
    });
  },

  fadeHide() {
    this.setState({ show: false });
  },

  restBack() {
    this.setState({ timer: 130 });
  },

  inputBack() {
    alert('inputBack');
  },

  inputBeginFun(o) {
    console.log(`inputBegin:  ${o}`);
  },

  render() {
    const {
      show, phone, timer, len, timeStart,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Verification</b><span>验证码</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>基本</dt>
              <dd><Button float onClick={this.fadeShow1}>四位数验证码</Button></dd>
              <dd><Button float onClick={this.fadeShow2}>六位数验证码</Button></dd>
            </dl>
          </div>
        </div>
        <LocaleProvider  locale={zhCN}>
          <Verification
            show={show}
            phone={phone}
            timeStart={timeStart}
            timer={timer}
            len={len}
            inputBack={this.inputBack}
            resetBack={this.restBack}
            timeEndBack={() => { console.log('timeEnd'); }}
            inputBegin={this.inputBeginFun}
          />
        </LocaleProvider>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _FadeInUp;
