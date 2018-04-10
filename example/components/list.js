import React, { Component } from 'react'

import JIMU from './index'
const {Layouts,Switch} = JIMU,
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
  } = Layouts


const _List = React.createClass({
  getInitialState() {
    return {
      isOpen : true,
      disabled : true
    }
  },
  chengeState(){
    this.setState({
      isOpen : false,
      disabled : false
    })
  },
  render() {
    let {isOpen,disabled} = this.state
    return (
      <div className="example-wrap demo-page-list">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>List</b><span>列表</span></h2>
          <div>
            <dl className="dl-list">
              <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>普通列表</dt>
              <dd>
                <Layout>
                  <Items className="jimu-items-list">
                    <Item className="jimu-item-oh jimu-aside-right">
                      <div className="jimu-Itemcontent">普通列表</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>

              <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>选择列表</dt>
              <dd>
                <Layout>
                  <Items className="jimu-items-list">
                    <Item className="jimu-item-oh jimu-aside-right" href="javascript:;">
                      <div className="jimu-itemaside">选择 <span className="icon-jimu-right"></span></div>
                      <div className="jimu-Itemcontent">列表+操作</div>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-right" href="javascript:;">
                      <div className="jimu-itemaside"><span className="icon-jimu-location"></span> 地址 <span className="icon-jimu-right"></span></div>
                      <div className="jimu-Itemcontent">列表+操作</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>

              <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>填写列表</dt>
              <dd>
                <Layout>
                  <Items className="jimu-items-list">
                    <Item className="jimu-item-oh jimu-aside-right">
                      <div className="jimu-itemaside"><input type="text" placeholder="请填写金额"  style={{"textAlign":"right"}}/> 元</div>
                      <div className="jimu-Itemcontent">列表</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>

              <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>标题+文本列表</dt>
              <dd>
                <Layout>
                  <Items className="jimu-items-list jimu-items-list-banner">
                    <Item>
                      <div className="jimu-Item-title">列表标题文字</div>
                      <div className="jimu-Item-content">详细文本</div>
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
