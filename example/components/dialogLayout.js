import React, { Component } from 'react'
import JIMU from './index'

const {Dialog,Button} = JIMU,
  { DialogLayout} = Dialog

// 对话框 _Dialog
const _Dialog = React.createClass({
	_alertshow(){
		window.alertDialog({
			msg:'alertDialog'
		})
	},
	_toastshow(){
  	window.toastDialog({
			msg:'我是jimu我是jimu我是jimu我是jimu我是jimu我是jimu我是jimu'
		})
  },
  _confirmshow(){
  	window.confirmDialog({
			msg:'confirmshow'
		})
  },
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>DialogLayout</b><span>函数式引用对话框</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>基本</dt>
              <dd><Button onClick={this._alertshow}>Alert</Button></dd>
              <dd><Button onClick={this._toastshow}>Toast</Button></dd>
              <dd><Button onClick={this._confirmshow}>Confirm</Button></dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
        <DialogLayout />
      </div>
    )
  }
})
module.exports = _Dialog
