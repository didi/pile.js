import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Slider} = Pile,
  {SliderLine,Sliders}= Slider

function slidecb(o){
  console.log(o.value)
}
// 滑动条组件 Slider
const _Slider = () => (
  <div className="example-wrap">
    <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
      <h2 className="page-title"><b>Slider</b><span>滑动条</span></h2>
      <div className="slider-layout" style={{margin:"0 30px"}}>
        <h3 className="demo-title" style={{marginLeft:"-15px"}}>SliderLine</h3>
        <dl className="dl-list slider-list">
          <dd><SliderLine onChangeBack={slidecb}/></dd>
          <dt>分段颜色展示</dt>
          <dd><SliderLine defaultValue={0} min={0} max={10} colorStageGroup={[4]} toFixed={1}  colorGroup={["#fc9153","#52bca3"]}/></dd>

          <dt>分段颜色渐变展示</dt>
          <dd><SliderLine defaultValue={0} min={0} max={10} colorStageGroup={[4]} toFixed={2}  colorGroup={["#fc9153","#52bca3"]} isShading={true}/></dd>

          <dt>带默认值禁止滑动</dt>
          <dd><SliderLine defaultValue={6} min={0} max={10} disabled={true}/></dd>
        </dl>

        <h3 className="demo-title mt-40" style={{marginLeft:"-15px"}}>Sliders</h3>
        <dl className="dl-list">
          <dt>纯色滑动</dt>
          <dd><Sliders upChangeBack={slidecb}  toFixed={0} defaultValue={4} min={0} max={10} titleBefore="自定义标题前 " titleAfter=" 自定义标题后" /></dd>
          <dt>分段颜色展示</dt>
          <dd><Sliders upChangeBack={slidecb}  colorStageGroup={[4]} colorGroup={["#fc9153","#52bca3"]} toFixed={1} defaultValue={4} min={0} max={10} titleBefore="自定义标题前 " titleAfter=" 自定义标题后" /></dd>

          <dt>分段颜色渐变展示</dt>
          <dd><Sliders upChangeBack={slidecb}  colorStageGroup={[4]} colorGroup={["#fc9153","#52bca3"]} toFixed={2} defaultValue={4} min={0} max={10} titleBefore="自定义标题前 " titleAfter=" 自定义标题后"  isShading={true} /></dd>

          <dt>带默认值禁止滑动</dt>
          <dd><Sliders defaultValue={6} min={0} max={10} disabled={true}  titleBefore="" titleAfter=""/></dd>
        </dl>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>

)
module.exports = _Slider
