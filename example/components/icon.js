import React, { Component } from 'react'

const _Icon = React.createClass({
  getInitialState() {
    return {
      iconArr : [
        "icon-jimu-artboard-add",
        "icon-jimu-artboard-reduce",
        "icon-jimu-batch-export",
        "icon-jimu-batch-import",
        "icon-jimu-briefcase",
        "icon-jimu-car",
        "icon-jimu-check-normal",
        // "icon-jimu-check",
        "icon-jimu-company",
        "icon-jimu-contact-phone",
        "icon-jimu-coupons",
        // "icon-jimu-del",
        "icon-jimu-delete",
        "icon-jimu-download",
        "icon-jimu-editor",
        "icon-jimu-error",
        "icon-jimu-export",
        "icon-jimu-fast",
        "icon-jimu-import",
        "icon-jimu-increase",
        "icon-jimu-information",
        "icon-jimu-left",
        "icon-jimu-location",
        "icon-jimu-message",
        "icon-jimu-money",
        "icon-jimu-one-way",
        "icon-jimu-order",
        "icon-jimu-password",
        "icon-jimu-pay",
        "icon-jimu-phone",
        "icon-jimu-plane",
        // "icon-jimu-popup-right",
        // "icon-jimu-popup-warning",
        "icon-jimu-print",
        "icon-jimu-question",
        "icon-jimu-radio-normal",
        // "icon-jimu-radio",
        "icon-jimu-reduce",
        "icon-jimu-reimburse",
        "icon-jimu-return",
        "icon-jimu-right",
        "icon-jimu-rules",
        "icon-jimu-search-2",
        "icon-jimu-search",
        "icon-jimu-setup",
        "icon-jimu-shut-down",
        "icon-jimu-spinner2",
        "icon-jimu-spinner3",
        "icon-jimu-successful",
        "icon-jimu-time",
        // "icon-jimu-toast-right",
        // "icon-jimu-toast-warning",
        // "icon-jimu-toast-wrong",
        "icon-jimu-travel",
        "icon-jimu-user",
        "icon-jimu-wallet",
        // "icon-jimu-trip-phone",
        // "icon-jimu-trip-star",
      ],
      iconArr2:[
        "icon-jimu-del",
        "icon-jimu-popup-right",
        "icon-jimu-popup-warning",
        "icon-jimu-check",
        "icon-jimu-radio",
        "icon-jimu-toast-right",
        "icon-jimu-toast-warning",
        "icon-jimu-toast-wrong",
        "icon-jimu-trip-phone",
        "icon-jimu-trip-star",
      ],
      onActive : ""
    }
  },
  setActive(re){
    this.setState({
      onActive : re
    })
  },
  render() {
    let self = this,
      {isOpen,disabled,iconArr,iconArr2,onActive} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Icon</b><span>图标</span></h2>

          <div className="on-active-iconname">{onActive}</div>
          <div className="demo-content">
            <div className="component-bg-white">
              <ul className="demo-icon-items">
                {iconArr.map(function(re,index){
                  return (
                    <li key={index} className={re == onActive ? "on-active" : ""} onClick={self.setActive.bind(self,re)}>
                      <p className="icons-show"><span className={re}></span></p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>


          <div className="demo-content" style={{marginTop : "20px"}}>
            <div className="component-bg-white">
              <ul className="demo-icon-items">
                {iconArr2.map(function(re,index){
                  return (
                    <li key={index} className={re == onActive ? "on-active" : ""} onClick={self.setActive.bind(self,re)}>
                      <p className="icons-show"><span className={re}></span></p>
                    </li>
                  )
                })}
              </ul>
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
module.exports = _Icon
