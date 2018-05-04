import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {FadeInUp,Button,FadeIn} = Pile
// 底部弹出展示 FadeInUp
const _FadeInUp = React.createClass({
  getInitialState() {
    return {
      show : false,
      fadeInshow :false,
      documentH : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight
    }
  },

  fadeShow(){
    let self = this
    setTimeout(function(){
      self.setState({show : true})
    },200)
  },


  fadeShow2(){
    let self = this
    setTimeout(function(){
      self.setState({fadeInshow : true})
    },200)
  },

  fadeHide(){
    this.setState({show : false})
  },

  render() {
    let {show,fadeInshow} = this.state
    return(
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>FadeInUp</b><span>底部弹层</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>底部弹层</dt>
              <dd><Button float onClick={this.fadeShow}>点击展现</Button></dd>
            </dl>
          </div>
          <FadeInUp show={show} closeShow={false} changeFun={this.fadeHide} contentPadding={false} showBack={()=>{console.log("open")}} closeBack={()=>{console.log("close")}} >
            <div className="fadeInUp-demo">
              <p>随心所欲的添加</p>
            </div>
          </FadeInUp>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _FadeInUp
