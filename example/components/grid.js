import React, { Component } from 'react'

import JIMU from './index'
const {Grid} = JIMU

const _List = React.createClass({
  getInitialState() {
    return {
      isOpen : true,
      disabled : true
    }
  },
  chengeState(){
    this.setState({
      isOpen : false,
      disabled : false
    })
  },
  render() {
    let {isOpen,disabled} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Grid</b><span>栅格</span></h2>
          <div className="demo-show demo-content demo-grid-layout">
            <h2 className="demo-title" style={{margin : 0}}>栅格</h2>
            <ul className="demo-grid-items">
              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>

              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>

              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>

              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>

              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>

              <li>
                <Grid flexCells>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                  <div className="demo-grid-cell"></div>
                </Grid>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _List
