import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Search} = Pile
const _Search = React.createClass({

  render() {
    return(
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Search</b><span>搜索</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">搜索</h2>
            <div className="demo-component-nppadd component-bg-white">
              <Search
                onChangeHandle={function(text){console.log("change:" + text)}}
                onClearHandle={function(){console.log("clearHandle")}}
                onFocusHandle={function(){console.log("onFocusHandle")}}
                onBlurHandle={function(text){console.log("onBlurHandle")}}
              />
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
module.exports = _Search
