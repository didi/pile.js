import React, { Component } from 'react'
import JIMU from './index'
const {Layouts,Form} = JIMU,
  {
    Layout,
    LayoutHd,
    LayoutHdTitle,
    LayoutHdAside,
    LayoutBd,
    LayoutFt,
    Items,
    Item,
    ItemAside,
    ItemContent,
    ItemTitle,
    ItemDesc,
    ItemHd,
    ItemBd,
    ItemFt,
    ItemLink
  } = Layouts,
  {Checkbox,Radio} = Form
const _List = React.createClass({
  getInitialState() {
    return {
      disabled : true,
      radio1 : 1,
      radio2 : 1
    }
  },
  chengeState(){
    this.setState({
      disabled : false
    })
  },
  render() {
    let {isOpen,disabled,radio1,radio2} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title" onClick={this.chengeState}><b>Radio</b><span>单选框</span></h2>
          <div className="demo-show-nopadd">
            <dl className="dl-list">
              <dt>默认样式</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="dis-inline"><Radio defaultChecked = {radio1 == 1} back={(o)=>{this.setState({radio1 : 1})}} label="选项一"/></div>
                      <div className="dis-inline ml-44"><Radio defaultChecked = {radio1 == 2} back={(o)=>{this.setState({radio1 : 2})}} label="选项二"/></div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>

            <dl className="dl-list mt-20">
              <dt>默认样式</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Radio className="jimu-checkbox-aside" defaultChecked = {radio2 == 1} back={(o)=>{this.setState({radio2 : 1})}} label="选项一"/>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Radio className="jimu-checkbox-aside" defaultChecked = {radio2 == 2} back={(o)=>{this.setState({radio2 : 2})}} label="选项二"/>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Radio className="jimu-checkbox-aside" defaultChecked = {radio2 == 3} disabled back={()=>{}} label="未选中不可点击"/>
                    </Item>

                    <Item className="jimu-item-oh jimu-aside-left jimu-check-item">
                      <Radio className="jimu-checkbox-aside" defaultChecked = {true} disabled back={()=>{}} label="选中不可点击"/>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _List
