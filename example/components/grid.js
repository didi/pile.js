import React, { Component } from 'react'
import {Link} from 'react-router'

import Pile from './index'
const {Grid} = Pile

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
        <div className="example-back"><Link to="/"><span className="icon-pic-home"></span></Link></div>
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
