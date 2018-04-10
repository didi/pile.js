import React from 'react'

// 遮罩 Mask
import JIMU from './index'
const {Button,Mask} = JIMU

// 遮罩 Mask
const _Mask = React.createClass({
  getInitialState() {
    return {maskshow : true};
  },
  render() {
    let {maskshow} = this.state
    console.log(maskshow)
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Mask</b><span>遮罩</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>遮罩</dt>
              <dd><Button onClick={()=>{this.setState({maskshow: false})}} float>点击展现</Button></dd>
            </dl>
          </div>
          <Mask transparent={false} hidden={maskshow} onClick={()=>{this.setState({maskshow: true})}}></Mask>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>

        <div className="mask-show-text" style={{display: maskshow ? "none" : "block"}}>点击任意地方关闭</div>
      </div>
    )
  }
})
module.exports = _Mask

