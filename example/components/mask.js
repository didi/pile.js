import React from 'react'
import { Link } from 'react-router'
// 遮罩 Mask
import Pile from './index'
const {Button,Mask} = Pile

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
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
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

