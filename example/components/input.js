import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'
const {Layouts,Inputs,Input} = Pile,
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
      <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
      <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
        <h2 className="page-title"><b>Input</b><span>文本输入</span></h2>
        <dl className="dl-list">
          <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>普通键盘</dt>
          <dd>
            <Layout>
              <Items className="pile-items-list">
                <Item className="pile-aside-flex">
                  <label className="pile-item-label" htmlFor="input-default">普通键盘</label>
                  <div className="pile-item-content"><Input name="input-default" placeholder="提示文字"/></div>
                </Item>

                <Item className="pile-aside-flex">
                  <label className="pile-item-label" htmlFor="input-number">数字键盘</label>
                  <div className="pile-item-content"><Input name="input-number" type="number" placeholder="提示文字"/></div>
                </Item>

                <Item className="pile-aside-flex">
                  <label className="pile-item-label" htmlFor="input-default">密码输入</label>
                  <div className="pile-item-content"><Input name="input-default" type="password"  placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>手机</dt>
          <dd>
            <Layout>
              <Items className="pile-items-list">
                <Item className="pile-aside-flex">
                  <label className="pile-item-label" htmlFor="input-default">手机号码</label>
                  <div className="pile-item-content"><Input name="input-default" type="tel" placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>标题长度</dt>
          <dd>
            <Layout>
              <Items className="pile-items-list">
                <Item className="pile-aside-flex">
                  <label className="pile-item-label" htmlFor="input-default">最长六位文字</label>
                  <div className="pile-item-content"><Input name="input-default" maxlength="6" placeholder="提示文字"/></div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>填写列表</dt>
          <dd>
            <Layout>
              <Items className="pile-items-list">
                <Item className="pile-item-oh pile-aside-right">
                  <div className="pile-itemaside"><Input type="text" placeholder="请填写金额"  style={{"textAlign":"right"}}/> 元</div>
                  <div className="pile-Itemcontent">列表</div>
                </Item>
              </Items>
            </Layout>
          </dd>

          <dt style={{"margin":"17px 10px 10px 10px","color":"#999"}}>标题+文本列表</dt>
          <dd>
            <Layout>
              <Items className="pile-items-list pile-items-list-banner">
                <Item>
                  <div className="pile-Item-title">列表标题文字</div>
                  <div className="pile-Item-content">详细文本</div>
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
