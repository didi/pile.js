import React, { Component } from 'react';
import JIMU from './index';

const {
    Dialog, Button, Layouts, Switch, Popover,
  } = JIMU,
  {
    Alert, Toast, Confirm, ContentTip, ToastLoad, NConfirm, Bubble,
  } = Dialog,
  { Tooltip } = Popover,
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

const _Switch = React.createClass({
  getInitialState() {
    return {
      top: '500px',
      left: '200px',
      direction: 'left',
      align: 0,
      closeBtnShow: true,
      show: false,
      width: 'auto',

      popleftshow: false,
      popleftmoreshow: false,
      poptopshow: false,
      popbottomshow: false,
      poprightshow: false,
    };
  },

  handleChange() {
    const {
      directionSel, topSel, leftSel, alignSel,
    } = this.refs;
    this.setState({
      top: topSel.value,
      left: leftSel.value,
      direction: directionSel.value,
      align: Number(alignSel.value),
    });
  },

  switchBack(o) {
    this.setState({
      closeBtnShow: o.isOpen,
    });
  },
  setCoordinate(x, y, dir) {
    this.setState({
      left: `${x}px`,
      top: `${y}px`,
      direction: dir,
      show: true,
      width: 'auto',
    });
  },

  render() {
    const {
      top, left, direction, align, closeBtnShow, show, width, popleftshow, poptopshow, popbottomshow, poprightshow, popleftmoreshow,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Popover</b><span>气泡</span></h2>

          <div className="demo-show">
            <dl className="dl-list" style={{ marginTop: '20px' }}>
              <dt>气泡</dt>
            </dl>
          </div>

          <Layout>
            <Items className="jimu-items-list">
              <Item className="jimu-aside-right popover-items">
                <Tooltip
                  overlay="说明文字"
                  placement="left"
                  isShow={popleftshow}
                  idName="newIndex"
                  setTooltipClose={() => { this.setState({ popleftshow: false }); }}
                >
                  <span className="tool-tip-btn" onClick={() => { this.setState({ popleftshow: true }); }}>指示内容在左侧</span>
                </Tooltip>
                <span className="tool-tip-btn" id="newIndex" />
              </Item>

              <Item className="jimu-aside-right popover-items">
                <Tooltip
                  overlay="说明文字"
                  placement="right"
                  isShow={poprightshow}
                  idName="newIndexright"
                  setTooltipClose={() => { this.setState({ poprightshow: false }); }}
                >
                  <span className="tool-tip-btn" onClick={() => { this.setState({ poprightshow: true }); }}>指示内容在右侧</span>
                </Tooltip>
                <span className="tool-tip-btn" id="newIndexright" />
              </Item>

              <Item className="jimu-aside-right popover-items">
                <Tooltip
                  overlay="说明文字"
                  placement="top"
                  isShow={poptopshow}
                  idName="newIndextop"
                  setTooltipClose={() => { this.setState({ poptopshow: false }); }}
                >
                  <span className="tool-tip-btn" onClick={() => { this.setState({ poptopshow: true }); }}>指示内容在顶部</span>
                </Tooltip>
                <span className="tool-tip-btn" id="newIndextop" />
              </Item>

              <Item className="jimu-aside-right popover-items">
                <Tooltip
                  overlay="说明文字"
                  placement="bottom"
                  isShow={popbottomshow}
                  idName="newIndexbottom"
                  setTooltipClose={() => { this.setState({ popbottomshow: false }); }}
                >
                  <span className="tool-tip-btn" onClick={() => { this.setState({ popbottomshow: true }); }}>指示内容在底部</span>
                </Tooltip>
                <span className="tool-tip-btn" id="newIndexbottom" />
              </Item>


              <Item className="jimu-aside-right popover-items">
                <Tooltip
                  overlay={<div className="popover-left-more"><p>内容折行显示</p><p>内容折行显示</p><p>内容折行显示</p><p>内容折行显示</p></div>}
                  placement="left"
                  isShow={popleftmoreshow}
                  idName="newIndexleftmore"
                  setTooltipClose={() => { this.setState({ popleftmoreshow: false }); }}
                >
                  <span className="tool-tip-btn" onClick={() => { this.setState({ popleftmoreshow: true }); }}>指示内容折行显示</span>
                </Tooltip>
                <span className="tool-tip-btn" id="newIndexleftmore" />
              </Item>

            </Items>
          </Layout>

          <Bubble top={top} width={width} left={left} direction={direction} align={align} closeBtnShow={closeBtnShow} show={show} closeBack={() => { this.setState({ show: false }); }}>奥北南区北门</Bubble>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _Switch;
