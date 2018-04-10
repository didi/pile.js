import React, { Component } from 'react'
import JIMU from './index'

const {PermissionsCard,Label} = JIMU
// 司机 driver
const _Driver = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 104}px`}}>
      <h2 className="page-title"><b>PermissionsCard</b><span>权限卡片</span></h2>
      <div className="demo-show"  style={{"margin" : "0 10px"}}>
        <PermissionsCard
          iconHTML={<span className="icon-jimu-right"></span>}
          titleHTML = "微信支付合作商谈"
          messageHTML = "1月12日-1月20日"
          labelTitle = "已通过"
          labelType="success"
          href="javascript:;"
        />

        <PermissionsCard
          iconHTML={<span className="icon-jimu-right"></span>}
          titleHTML = "微信支付合作商谈"
          messageHTML = "1月12日-1月20日"
          labelTitle = "过期未审批"
          labelType="fail"
          href="javascript:;"
        />
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>

)
module.exports = _Driver
