import React, { Component } from 'react';
import JIMU from './index';

const { Dialog, Button } = JIMU,
  { Toast } = Dialog;
// 对话框 _Dialog
const _Dialog = React.createClass({
  getInitialState() {
    return {
      toastShow: false,
      content: '成功类Toast',
      type: 'success',
    };
  },

  _toastshowsu() {
    this.setState({
      toastShow: true,
      type: 'success',
      content: '提交成功',
    });
  },

  _toastshowfail() {
    this.setState({
      toastShow: true,
      type: 'fail',
      content: '提交失败',
    });
  },

  _toastshowrong() {
    this.setState({
      toastShow: true,
      type: 'wrong',
      content: '操作错误',
    });
  },

  _toastshowmore() {
    this.setState({
      toastShow: true,
      type: 'success',
      content: '文字一行最多十二个字符文字一行最多十二个字符',
    });
  },

  _toastshowloading() {
    this.setState({
      toastShow: true,
      type: 'loading',
      content: '加载中…',
    });
  },

  _toasthide() { this.setState({ toastShow: false }); },

  render() {
    let self = this,
      { toastShow, content, type } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Toast</b><span>轻提示</span></h2>
          <div className="demo-show">
            <dl className="dialog-dl-list">
              <dt>轻提示</dt>
              <dd><Button className="demo-btn-type" onClick={this._toastshowsu}>成功类Toast</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._toastshowfail}>警告类Toast</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._toastshowrong}>错误类Toast</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._toastshowmore}>多行文字Toast</Button></dd>
              <dd><Button className="demo-btn-type" onClick={this._toastshowloading}>loading Toast</Button></dd>
            </dl>

          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
        <Toast
          content={content}
          toastShow={toastShow}
          type={type}
          time={3000}
          callback={self._toasthide}
        />
      </div>
    );
  },
});
module.exports = _Dialog;
