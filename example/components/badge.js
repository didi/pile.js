import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'
const {Layouts,Badge} = Pile,
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


const _Badge = React.createClass({
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
      <div className="example-wrap demo-page-badge">
        <div className="example-back"><Link to="/"><span className="icon-pic-home"></span></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Badge</b><span>提示徽标</span></h2>

          <div className="demo-content">
            <h2 className="demo-title">徽标</h2>
            <dl className="dl-list">
              <dd>
                <Layout>
                  <Items>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent"></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}> <div className="pile-mark-box box-size-18 de-mr-10"><Badge type="small"/></div> 徽标点</div>
                    </Item>

                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent" style={{"lineHeight":"25px"}}><Badge number="99"/></div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}><div className="pile-mark-box box-size-18 de-mr-10"></div> 徽标数</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>
          </div>

          <div className="demo-content de-mt-20">
            <h2 className="demo-title">徽标点示例</h2>
            <div className="component-bg-white de-padd-20">
              <div className="layout-lat">
                <div className="di-inblok de-wid-90 valingbtm">
                  <div className="pile-mark-box box-size-60"><Badge type="big"/></div>
                </div>

                <div className="di-inblok de-wid-80 valingbtm">
                  <div className="pile-mark-box box-size-50"><Badge type="big"/></div>
                </div>

                <div className="di-inblok valingbtm">
                  <div className="pile-mark-box box-size-40"><Badge type="big"/></div>
                </div>

              </div>

              <div className="layout-lat">
                <div className="di-inblok de-wid-90 valingbtm">
                  <div className="pile-mark-box box-size-32"><Badge type="middle"/></div>
                </div>

                <div className="di-inblok de-wid-80 valingbtm">
                  <div className="pile-mark-box box-size-32"><Badge type="middle"/></div>
                </div>

                <div className="di-inblok de-mr-30 valingbtm">
                  <div className="pile-mark-box box-size-32"><Badge type="middle"/></div>
                </div>
              </div>

              <div className="layout-lat">
                <div className="di-inblok de-wid-90 valingbtm">
                  <div className="pile-mark-box box-size-24"><Badge type="small"/></div>
                </div>

                <div className="di-inblok de-wid-80 valingbtm">
                  <div className="pile-mark-box box-size-24"><Badge type="small"/></div>
                </div>

                <div className="di-inblok de-mr-30 valingbtm">
                  <div className="pile-mark-box box-size-24"><Badge type="small"/></div>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-content de-mt-20">
            <h2 className="demo-title">徽标数示例</h2>
            <div className="component-bg-white de-padd-20">
              <div className="layout-lat">
                <div className="di-inblok de-mr-30 valingbtm">
                  <Badge number="9"/>
                </div>
                <div className="di-inblok de-mr-30 valingbtm">
                  <Badge number="99"/>
                </div>
                <div className="di-inblok de-mr-30 valingbtm">
                  <Badge number="99+"/>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _Badge
