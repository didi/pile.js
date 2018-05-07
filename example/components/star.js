import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Button,Score} = Pile,
  {Star} = Score

const _Star = React.createClass({
  getInitialState() {
    return {
      val01 : 0,
      val02 : 2,
      disabled : false,
      disabled02 : false,
      val03 : 4,
      disabled03 : true,
      val04 : 4,
      len : 6,
      len1:5,
      valbig01 : 0,
      valbig02 : 4,
      valbig03 : 4,
      bigdisabled : false
    }
  },

  changestate(){
    this.setState({
      val01 : 4,
      len1 : 8,
      disabled : true
    })
  },

  render() {
    let {val01,disabled02,val02,disabled03,val03,val04,len,len1,disabled,valbig01,valbig02,valbig03,bigdisabled} = this.state

    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr demo-content" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Star</b><span>评星</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>评星（小）</dt>
            </dl>
          </div>
          <div className="component-bg-white de-padd-40-20" style={{"marginTop":"10px"}}>
            <Star defaultVal={val01} len={len1} disabled= {disabled} back={(n)=>{
              this.setState({
                val01 : n
              })
            }}/>
            <div className="start-text">{`当前评分为：${val01}分`}</div>
            <Star defaultVal={val03} disabled={disabled03} back={(n)=>{
              this.setState({
                val02 : n,
                disabled02 : true
              })
            }}/>
            <div className="start-text">带默认值并不可点击</div>
            <Star defaultVal={val04} back={(n)=>{
              this.setState({
                val04 : n
              })
            }}/>
            <div className="start-text">{`带默认值：${val04}分`}</div>
          </div>


          <div className="demo-show" style={{"marginTop":"20px"}}>
            <dl className="dl-list">
              <dt>评星（大）</dt>
            </dl>
          </div>
          <div className="component-bg-white de-padd-40-20" style={{"marginTop":"10px"}}>
            <Star bigger defaultVal={valbig01} len={len1} disabled= {disabled} back={(n)=>{
              this.setState({
                valbig01 : n
              })
            }}/>
            <div className="start-text">{`当前评分为：${valbig01}分`}</div>
            <Star bigger defaultVal={valbig02} disabled={bigdisabled} back={(n)=>{
              this.setState({
                valbig02 : n
              })
            }}/>
            <div className="start-text">带默认值并不可点击</div>
            <Star bigger defaultVal={valbig03} back={(n)=>{
              this.setState({
                valbig03 : n
              })
            }}/>
            <div className="start-text">{`带默认值：${valbig03}分`}</div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _Star
