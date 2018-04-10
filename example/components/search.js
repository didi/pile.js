import React, { Component } from 'react'
import JIMU from './index'

const {Search} = JIMU
const _Search = React.createClass({

  render() {
    return(
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
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
