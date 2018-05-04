import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Radar} = Pile
const _Radar = React.createClass({
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
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
