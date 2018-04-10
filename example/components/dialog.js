import React, { Component } from 'react'
import JIMU from './index'
import Button from 'jimu-mobile/dist/components/button'
const {Dialog} = JIMU,
  { Alert, Toast,Confirm,ContentTip,ToastLoad,NConfirm} = Dialog
// 对话框 _Dialog
const _Dialog = React.createClass({
  getInitialState() {
    return {
      alertShow:false,
      alertShow2:false,
      toastShow:false,
      confirmShow:false,
      confirmShow2:false,
      contentTipshow:false,
      shownConfirm:false,
      alertType:"success",
      alertIconHide : false,
      alertChild : "带有标题+文字对话框",
      confirmChild : "",

      confirmType:"success",
      confirmIconHide : false,

      nconfirm: {
        title: '设置为该用户为',
        buttons: [
          {
            type: 'default',
            label: '超级管理员',
            onClick: this.hidenConfirm
          },
          {
            type: 'default',
            label: '一般管理员',
            onClick: this.hidenConfirm
          },
          {
            type: 'default',
            label: '普通用户',
            onClick: this.hidenConfirm
          }
        ],
        CancelClick : this.hidenConfirm
      }
    }
  },
  _alertshow(){this.setState({alertShow : true,width : null})},
  _alertshow2(){this.setState({alertShow2 : true})},
  _alertshowpt(){
    this.setState({
      alertShow : true,
      alertType:"success",
      alertIconHide : true,
      alertChild : "辅助说明文字辅助说明文字,辅助说明文字辅助说明文字"
    }
  )},

  _alertshowfail(){
    this.setState({
      alertShow : true,
      alertType:"fail",
      alertIconHide : false,
      alertChild :  "辅助说明文字辅助说明文字,辅助说明文字辅助说明文字"
    }
  )},

  _alertshowsu(){
    this.setState({
      alertShow : true,
      alertType:"success",
      alertIconHide : false,
      alertChild :  "辅助说明文字辅助说明文字,辅助说明文字辅助说明文字"
    }
  )},

  _alerthide(){this.setState({alertShow : false})},
  _alerthide2(){this.setState({alertShow2 : false});console.log(34)},
  _toastshow(){this.setState({
    toastShow : true,
    content : "标题文字",
    confirmChild : "带有标题+文字对话框"
  })},
  _toastshow2(){this.setState({
    toastShow : true,
    content : "辅助说明文字辅助说明文字,辅助说明文字辅助说明文字"
  })},
  _toasthide(){this.setState({toastShow : false})},
  _confirmshow2(){this.setState({confirmShow2 : true})},

  _confirmshowpt(){
    this.setState({
      confirmShow : true,
      confirmType : "success",
      confirmIconHide : true
    })
  },

  _confirmshowsu(){
    this.setState({
      confirmShow : true,
      confirmType : "success",
      confirmIconHide : false,
      confirmChild : ""
    })
  },

  _confirmshowfail(){
    this.setState({
      confirmShow : true,
      confirmType : "fail",
      confirmIconHide : false
    })
  },

  _confirmhide(){this.setState({confirmShow : false})},
  _confirmhide2(){this.setState({confirmShow2 : false})},
  _contentTiphide(){this.setState({contentTipshow : false})},
  _contentTipshow(){this.setState({contentTipshow : true})},

  shownConfirm(){
    this.setState({shownConfirm: true})
  },

  hidenConfirm(){
    this.setState({shownConfirm: false})
  },

  render() {
    let self = this,
      {alertShow,toastShow,confirmShow,contentTipshow,toastloadshow,content,width,alertIconHide,alertType,alertShow2,confirmType,confirmIconHide,confirmShow2,alertChild,confirmChild} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Dialog</b><span>对话框</span></h2>
          <div className="demo-show">
            <dl className="dialog-dl-list">
              <dt>Alert</dt>
              <dd><Button className="demo-btn-type" onClick={this._alertshowpt}>带有标题+文字对话框</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._alertshowsu}>成功提示</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._alertshowfail}>警告提示</Button></dd>
            </dl>

            <dl className="dialog-dl-list">
              <dt>Confirm</dt>
              <dd><Button className="demo-btn-type" onClick={this._confirmshowpt}>带有标题+文字对话框</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._confirmshowsu}>成功提示</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._confirmshowfail}>警告提示</Button></dd>
            </dl>

            <dl className="dialog-dl-list">
              <dt>弹层类</dt>
              <dd><Button className="demo-btn-type"  onClick={this._contentTipshow}>自定义内容弹层</Button></dd>
              <dd><Button className="demo-btn-type"  onClick={this.shownConfirm}>带有操作按钮弹层</Button></dd>
            </dl>

          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>

        <Alert
         show={alertShow}
         type={alertType}
         title="标题文字"
         iconHide = {alertIconHide}
         buttons={[
           {
             label: '好的',
             onClick: self._alerthide
           }
         ]}
         width = {width}
         MaskClick = {self._alerthide}>
         {alertChild}
        </Alert>

        <Confirm
          show={confirmShow}
          type={confirmType}
          iconHide = {confirmIconHide}
          title='标题文字标题文字标题文字标题文字标题文字'
          buttons={[
            {
              label: '取消',
              onClick: self._confirmhide
            },
            {
              type: 'default',
              label: '确定',
              onClick: self._confirmhide
            }
          ]}
          MaskClick = {self._confirmhide}>
          {confirmChild}
        </Confirm>

        <ContentTip show ={contentTipshow}  hideEvent={self._contentTiphide} className="novice-tip">
          <div className="hd" style={{"paddingTop":"20px"}}>
            <h2 className="title">用车助手版是啥？</h2>
          </div>
          <div className="bd">
            <p>1.同时持续呼叫两个车型，为您挑选最快接驾车辆</p>
            <p>2.您可以设置心理价位加钱坐专车，符合价位时才叫车，费用可控更安心</p>
          </div>
          <div className="ft">
            <Button type="highlight" onClick={self._contentTiphide}>开始体验</Button>
          </div>
        </ContentTip>

        <NConfirm
          show={this.state.shownConfirm}
          title={this.state.nconfirm.title}
          buttons={this.state.nconfirm.buttons}
          hide = {this.state.nconfirm.CancelClick}>
        </NConfirm>
      </div>

    )
  }
})
module.exports = _Dialog
