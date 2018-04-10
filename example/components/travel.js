import React, { Component } from 'react';
import JIMU from './index';

const { Travel } = JIMU;

const _CarRecord = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
    <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 104}px` }}>
      <h2 className="page-title"><b>Travel</b><span>用车行程</span></h2>
      <div className="demo-show">
        <dl className="dl-list">
          <dt>用车行程卡片</dt>
          <dd>
            <Travel
              weekFormat="zh"
              weekShow={false}
              dateFormat="MM月dd日 hh:ss"
              start_name="北京首都国际机场T2航站楼"
              end_name="当代城市家园-东门"
              create_time={1513571852}
              stateHtml={<div>等待出发</div>}
              remarksHtml={<div>专车</div>}
              href="javascript:;"
            />
            <Travel
              weekFormat="zh"
              weekShow
              dateFormat="MM月dd日 hh:ss"
              start_name="北京首都国际机场T2航站楼"
              end_name="当代城市家园-东门"
              create_time={1430291523}
              stateHtml={<div>等待出发</div>}
              remarksHtml={<div>专车 <span className="remark fz11">快车</span><span className="remark fz11">企业支付</span></div>}
              href="javascript:;"
            />
          </dd>
        </dl>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic" />
    </div>
  </div>

);
module.exports = _CarRecord;
