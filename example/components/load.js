import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { Layouts, Load, Switch } = Pile,
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
    ItemLink,
  } = Layouts;


// 加载 _Load
const _Load = React.createClass({
  getInitialState() {
    return {
      show: true,
      timeOut: 3000,
      loadType: 'loadLogo',
      loadSize: 'small',
      showTypeTips: true,
    };
  },
  handleChange() {
    const { timeOutSel, loadTypeSel, loadSizeSel } = this.refs;
    this.setState({
      loadType: loadTypeSel.value,
      loadSize: loadSizeSel.value,
      show: true,
    });
  },
  handleShowChange(o) {
    this.setState({
      showTypeTips: o.isOpen,
      show: true,
    });
  },
  render() {
    const {
      timeOut, loadType, loadSize, showTypeTips, show,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Load</b><span>加载</span></h2>
          <div>
            <dl className="dl-list">
              <dt className="de-m-0-15 de-mb-10">基本</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="loadTypeSel" onChange={this.handleChange}>
                          <option value="loadLogo" >loadLogo</option>
                          <option value="carFace">carFace</option>
                          <option value="carSide">carSide</option>
                          <option value="carRun">carRun</option>
                          <option value="loadEffect">loadEffect</option>
                          <option value="carRunNew">carRunNew</option>
                          <option value="loading">loading</option>
                          <option value="ballScale">ballScale</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>展现方式</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="loadSizeSel" onChange={this.handleChange}>
                          <option value="small">small</option>
                          <option value="big">big</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>尺寸</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <select ref="timeOutSel">
                          <option value="3000" >3秒后消失</option>
                          <option value="0" disabled>永久</option>
                        </select>
                      </div>
                      <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>展现时间</div>
                    </Item>
                    <Item className="pile-item-oh pile-aside-left">
                      <div className="pile-Itemcontent">
                        <Switch isOpen={show} clickBack={this.handleShowChange} />
                      </div>
                      <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>是否需要弹层展示</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>
            <div style={{ margin: '15px', paddingTop: '50px', textAlign: 'center' }}>
              <Load show={show} timeOut={timeOut} loadType={loadType} loadSize={loadSize} showTypeTips={showTypeTips} timeOutBack={()=>{console.log(123)}}/>
            </div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _Load;

//

// <select ref="showTypeTipsSel" onChange={this.handleChange}>
//   <option value="0">是</option>
//   <option value="1">否</option>
// </select>
