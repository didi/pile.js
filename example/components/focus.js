import React, { Component } from 'react'

import JIMU from './index'

const {Focus} = JIMU


function setClick(o){
  alert(o)
}

const _Focus = () => (
  <div className="example-wrap">
    <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
      <h2 className="page-title"><b>Focus</b><span>焦点图</span></h2>

      <div className="demo-content">
        <h2 className="demo-title">自动播放＋滑动控制</h2>
        <div className="component-bg-white">
          <Focus className="focus-demo"
            index = {0}
            width = {`${document.body.clientWidth}px`}
            loop = {true}
            timer = {5000}
            direction = "left"
            duration = {200}
            spotShow ={true}
          >
            <div className="focus-demo-item item-1 item-linehieght-150">1</div>
            <div className="focus-demo-item item-2 item-linehieght-150">2</div>
            <div className="focus-demo-item item-3 item-linehieght-150">3</div>
          </Focus>
        </div>
      </div>

      <div className="demo-content de-mt-20">
        <h2 className="demo-title">滑动控制</h2>
        <div className="component-bg-white">
          <Focus className="focus-demo"
            index = {0}
            width = {`${document.body.clientWidth}px`}
            loop = {true}
            auto = {false}
            direction = "left"
            duration = {200}
          >
            <div className="focus-demo-item item-1">1<div className="text-shadow">此处是文字标题一</div></div>
            <div className="focus-demo-item item-2">2<div className="text-shadow">此处是文字标题一</div></div>
            <div className="focus-demo-item item-3">3<div className="text-shadow">此处是文字标题一</div></div>
          </Focus>
        </div>
      </div>


    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>
)
module.exports = _Focus
