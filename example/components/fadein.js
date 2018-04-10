import React, { Component } from 'react';
import JIMU from './index';

const {
    Layouts, Load, Switch, FadeIn, Button,
  } = JIMU,
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
      fadeInshow: false,
      direction: 'bottom',
      align: 0,
    };
  },
  handleChange() {
    const {
      directionSel, heightSel, widthSel, alignSel,
    } = this.refs;
    this.setState({
      direction: directionSel.value,
      height: heightSel.value,
      width: widthSel.value,
      align: Number(alignSel.value),
      fadeInshow: false,
    });
  },

  fadeShow2() {
    this.setState({ fadeInshow: true });
  },

  render() {
    const {
      direction, height, width, align, fadeInshow,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>FadeIn</b><span>自定义弹层</span></h2>
          <div>
            <dl className="dl-list">
              <dt className="de-m-0-15 de-mb-10">自定义弹层</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent">
                        <select ref="directionSel" onChange={this.handleChange}>
                          <option value="bottom">底部</option>
                          <option value="top" >顶部</option>
                          <option value="left">左侧</option>
                          <option value="right">右侧</option>
                        </select>
                      </div>
                      <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>方向</div>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent">
                        <select ref="heightSel" onChange={this.handleChange}>
                          <option value="auto">auto</option>
                          <option value="100%">100%</option>
                          <option value="300px">300px</option>
                        </select>
                      </div>
                      <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }} >height</div>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent">
                        <select ref="widthSel" onChange={this.handleChange}>
                          <option value="100%">100%</option>
                          <option value="300px">300px</option>
                        </select>
                      </div>
                      <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }} >width</div>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent">
                        <select ref="alignSel" onChange={this.handleChange}>
                          <option value="0">水平或者垂直居中</option>
                          <option value="1">左对齐或者顶部对齐</option>
                          <option value="2">右对齐或者底部对齐</option>
                        </select>
                      </div>
                      <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>对齐方式</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
              <dd className="de-m-0-15 de-mt-20"><Button float onClick={this.fadeShow2}>点击展现</Button></dd>
            </dl>

            <FadeIn show={fadeInshow} closeShow={false} direction={direction} height={height} width={width} align={align} contentPadding={false} showBack={() => { console.log('open'); }} closeBack={() => { console.log('close'); }}>
              <div className="fadeInUp-demo">
                <p>随心所欲的添加</p>
              </div>
            </FadeIn>
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
