import React from 'react'
// 遮罩 Mask
import JIMU from './index'
const {Result} = JIMU
// 遮罩 Mask
const _Result = React.createClass({
  getInitialState() {
    return {title : "成功"};
  },
  render() {
    let {title} =  this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Result</b><span>结果页</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">类型一</h2>
            <div className="demo-component-show component-bg-white demo-component-nppadd" style={{"padding":"20px 0"}}>
              <Result size="middle" title="成功" message="用于表示操作成功" iconHtml={<span className="icon-jimu-toast-right"></span>}/>
              <Result size="middle" title="警告" message="用于表示警告提示" iconHtml={<span className="icon-jimu-toast-warning"></span>}/>
              <Result size="middle" title="错误" message="用于表示错误提示" iconHtml={<span className="icon-jimu-toast-wrong"></span>}/>
            </div>

            <h2 className="demo-title" style={{"paddingTop":"20px"}}>类型二</h2>
            <div className="demo-component-show component-bg-white demo-component-nppadd" style={{"padding":"20px 0"}}>
              <Result size="small" title="成功" message="用于表示操作成功" iconHtml={<span className="icon-jimu-successful"></span>}/>
              <Result size="small" title="警告" message="用于表示警告提示" iconHtml={<span className="icon-jimu-information"></span>}/>
              <Result size="small" title="错误" message="用于表示错误提示" iconHtml={<span className="icon-jimu-error"></span>}/>
            </div>

            <h2 className="demo-title" style={{"paddingTop":"20px"}}>类型三</h2>
            <div className="demo-component-show component-bg-white demo-component-nppadd" style={{"padding":"0 20px"}}>
              <Result size="big" title="成功" message="用于表示操作成功" iconHtml={<span className="icon-jimu-toast-right"></span>}/>
              <Result size="big" title="警告" message="用于表示警告提示" iconHtml={<span className="icon-jimu-toast-warning"></span>}/>
              <Result size="big" title="错误" message="用于表示错误提示" iconHtml={<span className="icon-jimu-toast-wrong"></span>}/>
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
module.exports = _Result
