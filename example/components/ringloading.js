import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { Ringloading } = Pile;
// import Ringloading from 'pile/dist/components/ringloading'
const _Ringloading = () => (
  <div className="example-wrap">
    <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
    <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
      <h2 className="page-title"><b>Ringloading</b><span>环形加载</span></h2>
      <div className="ring-demo-show">
        <dl className="dl-list">
          <dt>默认</dt>
          <dd><Ringloading /></dd>

          <dt>前端带指针</dt>
          <dd><Ringloading ballShow ballBgColor="#ff5722" width={176} ringTimer={30000} contentBgColor="#f0f0f0" borderColor="#ff8741" bottomRingBgColor="#d8dada" /></dd>

          <dt>样式自定义</dt>
          <dd><Ringloading width={140} text="loading…" border={2} borderColor="#1E96FA" contentBgColor="#fff" contentColor="#1E96FA" textSize="12px" /></dd>
        </dl>
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic" />
    </div>
  </div>
);
module.exports = _Ringloading;
