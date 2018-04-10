import React, { Component } from 'react'
import JIMU from './index'

const {Radar} = JIMU
const _Radar = React.createClass({
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr demo-content" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Radar</b><span>雷达图</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>基本</dt>
            </dl>
          </div>

          <div className="component-bg-white de-padd-40-20" style={{"marginTop":"10px"}}>
            <Radar />
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _Radar
