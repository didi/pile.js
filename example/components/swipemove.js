import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'
const {Layouts,SwipeMove} = Pile,
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

const _SwipeMove = React.createClass({
  getInitialState() {
    return {
      height : "100%",
      width : "100%",
      direction :'bottom',
      align : 0
    }
  },
  handleChange() {
    let {heightSel,widthSel,directionSel,alignSel} = this.refs
    this.setState({
      height : heightSel.value,
      width : widthSel.value,
      direction : directionSel.value,
      align : Number(alignSel.value)
    })
  },
  render() {
    let {height,width,direction,align} = this.state

    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>SwipeMove</b><span>滑动弹层展示</span></h2>
          <div>
            <dl className="dl-list">
              <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>基本</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="directionSel" onChange={this.handleChange}>
                          <option value="bottom" >bottom</option>
                          <option value="top">top</option>
                          <option value="left">left</option>
                          <option value="right">right</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>方向</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="widthSel" onChange={this.handleChange}>
                          <option value="100%">100%</option>
                          <option value="200px">200px</option>
                          <option value="400px">400px</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>宽度</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="heightSel" onChange={this.handleChange}>
                          <option value="100%">100%</option>
                          <option value="300px">300px</option>
                          <option value="500px">500px</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>高度</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="alignSel" onChange={this.handleChange}>
                          <option value="0">居中或者垂直</option>
                          <option value="1">左对齐或者顶部对齐</option>
                          <option value="2">右对齐或者底部对齐</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>对齐方式</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>

            <SwipeMove height={height} width={width} direction={direction} align={align} back={(o)=>{console.log(o)}}>
              <div className="move-content" style={{"paddingTop":"40px"}}>
                <h2>弹层展示</h2>
                <p>内容自定义</p>
                <p>支持高度、宽度自定义</p>
                <p>支持方向自定义</p>
              </div>
            </SwipeMove>

          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _SwipeMove
