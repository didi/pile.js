import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Switch,Anime,Button} = Pile,
  {PositionTransform} = Anime

// 加载 _Load
const _Anime = React.createClass({
  getInitialState() {
    return {
      myOrderArr : [1,2,3,4]
    }
  },

  render() {
    let {myOrderArr} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>PositionTransform</b><span>模块间位置切换</span></h2>
          <div>
            <dl className="dl-list csstrans-dl-item">
              <dt>模块间位置切换</dt>
              <dd style={{"paddingTop":"30px"}}>
                <PositionTransform ref="myPostionSwitch" width={60} orderArr={myOrderArr} itemsMoveBack={function(n){console.log(n)}}>
                  <div className="pile-demo-postion-test">1</div>
                  <div className="pile-demo-postion-test">2</div>
                  <div className="pile-demo-postion-test">3</div>
                  <div className="pile-demo-postion-test">4</div>
                </PositionTransform>
              </dd>

              <dd className="btn-margin" style={{"paddingBottom":"30px"}}>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.setState({myOrderArr : [4,3,1,2]})}}>4,3,1,2</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.setState({myOrderArr : [2,1,4,3]})}}>2,1,4,3</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.setState({myOrderArr : [3,2,1,4]})}}>3,2,1,4</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.setState({myOrderArr : [1,4,3,2]})}}>1,4,3,2</Button>
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _Anime
