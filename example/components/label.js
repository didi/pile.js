import React from 'react'
// import JIMU from '../../src/index'
import JIMU from './index'

const { Label } = JIMU

// 按钮组件 Label
class _Label extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Label</b><span>标签</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">标签</h2>
            <div className="demo-component-show component-bg-white">
              <span className="de-mr-10 di-inblok"><Label type="success">成功类标签</Label> </span>
              <span className="de-mr-10 di-inblok"><Label type="warning">提醒类标签</Label> </span>
              <span className="de-mr-10 di-inblok"><Label type="fail">取消类标签</Label> </span>
            </div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
}

export default _Label
