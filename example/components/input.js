import React, { Component } from 'react'
import JIMU from './index'
const {Layouts,Inputs,Input} = JIMU,
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

// 表单组合 Inputs
const _Inputs = () => (
    <div className="example-wrap">
      <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
      <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
        <h2 className="page-title"><b>Input</b><span>文本输入</span></h2>
        <dl className="dl-list">
          <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>普通键盘</dt>
          <dd>
            <Layout>
              <Items className="jimu-items-list">
                <Item className="jimu-aside-flex">
                  <label className="jimu-item-label" htmlFor="input-default">普通键盘</label>
                  <div className="jimu-item-content"><Input name="input-default" placeholder="提示文字"/></div>
                </Item>

                <Item className="jimu-aside-flex">
                  <label className="jimu-item-label" htmlFor="input-number">数字键盘</label>
                  <div className="jimu-item-content"><Input name="input-number" type="number" placeholder="提示文字"/></div>
                </Item>

                <Item className="jimu-aside-flex">
                  <label className="jimu-item-label" htmlFor="input-default">密码输入</label>
                  <div className="jimu-item-content"><Input name="input-default" type="password"  placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>手机</dt>
          <dd>
            <Layout>
              <Items className="jimu-items-list">
                <Item className="jimu-aside-flex">
                  <label className="jimu-item-label" htmlFor="input-default">手机号码</label>
                  <div className="jimu-item-content"><Input name="input-default" type="tel" placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>标题长度</dt>
          <dd>
            <Layout>
              <Items className="jimu-items-list">
                <Item className="jimu-aside-flex">
                  <label className="jimu-item-label" htmlFor="input-default">最长六位文字</label>
                  <div className="jimu-item-content"><Input name="input-default" maxlength="6" placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>填写列表</dt>
          <dd>
            <Layout>
              <Items className="jimu-items-list">
                <Item className="jimu-item-oh jimu-aside-right">
                  <div className="jimu-itemaside"><Input type="text" placeholder="请填写金额"  style={{"textAlign":"right"}}/> 元</div>
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
      <div className="footer-name">
        <span className="footer-name-pic"></span>
      </div>
    </div>
)
module.exports = _Inputs
