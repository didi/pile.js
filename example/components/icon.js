import React, { Component } from 'react'
import { Link } from 'react-router'

const _Icon = React.createClass({
  getInitialState() {
    return {
      iconArr : [
        "icon-pile-artboard-add",
        "icon-pile-artboard-reduce",
        "icon-pile-batch-export",
        "icon-pile-batch-import",
        "icon-pile-briefcase",
        "icon-pile-car",
        "icon-pile-check-normal",
        // "icon-pile-check",
        "icon-pile-company",
        "icon-pile-contact-phone",
        "icon-pile-coupons",
        // "icon-pile-del",
        "icon-pile-delete",
        "icon-pile-download",
        "icon-pile-editor",
        "icon-pile-error",
        "icon-pile-export",
        "icon-pile-fast",
        "icon-pile-import",
        "icon-pile-increase",
        "icon-pile-information",
        "icon-pile-left",
        "icon-pile-location",
        "icon-pile-message",
        "icon-pile-money",
        "icon-pile-one-way",
        "icon-pile-order",
        "icon-pile-password",
        "icon-pile-pay",
        "icon-pile-phone",
        "icon-pile-plane",
        // "icon-pile-popup-right",
        // "icon-pile-popup-warning",
        "icon-pile-print",
        "icon-pile-question",
        "icon-pile-radio-normal",
        // "icon-pile-radio",
        "icon-pile-reduce",
        "icon-pile-reimburse",
        "icon-pile-return",
        "icon-pile-right",
        "icon-pile-rules",
        "icon-pile-search-2",
        "icon-pile-search",
        "icon-pile-setup",
        "icon-pile-shut-down",
        "icon-pile-spinner2",
        "icon-pile-spinner3",
        "icon-pile-successful",
        "icon-pile-time",
        // "icon-pile-toast-right",
        // "icon-pile-toast-warning",
        // "icon-pile-toast-wrong",
        "icon-pile-travel",
        "icon-pile-user",
        "icon-pile-wallet",
        // "icon-pile-trip-phone",
        // "icon-pile-trip-star",
      ],
      iconArr2:[
        "icon-pile-del",
        "icon-pile-popup-right",
        "icon-pile-popup-warning",
        "icon-pile-check",
        "icon-pile-radio",
        "icon-pile-toast-right",
        "icon-pile-toast-warning",
        "icon-pile-toast-wrong",
        "icon-pile-trip-phone",
        "icon-pile-trip-star",
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
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
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
