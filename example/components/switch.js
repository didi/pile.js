import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'
const {Layouts,Switch} = Pile,
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

const _Switch = React.createClass({
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
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Switch</b><span>开关</span></h2>
          <div>
            <dl className="dl-list">
              <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>开关样式</dt>
              <dd style={{"margin":"0 10px"}}>
                <Switch isOpen={false} isSmall/><b style={{padding:"0 10px"}}></b><Switch isOpen={true} isSmall/>
              </dd>
            </dl>

            <dl className="dl-list" style={{"marginTop":"20px"}}>
              <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>展示效果</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent"><Switch isOpen  isSmall/></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>开启状态</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent"><Switch isOpen={false} isSmall clickBack={(o)=>{console.log(o)}}/></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>关闭状态</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent"><Switch  disabled  isSmall isOpen  /></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>开启状态 disabled</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent"><Switch  disabled  isSmall isOpen={false}/></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>关闭状态 disabled</div>
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
module.exports = _Switch
