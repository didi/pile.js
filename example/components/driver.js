import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Driver} = Pile
// 司机 driver
const _Driver = () => (
  <div className="example-wrap">
    <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
    <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 106}px`}}>
      <h2 className="page-title"><b>Driver</b><span>司机</span></h2>
      <div className="demo-show">
        <h3 style={{marginBottom: "10px",color:"#999"}}>默认</h3>
        <Driver
          avatarUrl=""
          carColor="白"
          carType="大众速腾"
          card="京FA7318"
          cntOrder={174}
          company="车主之家-车主俱乐部望京店"
          isMaster={true}
          name="王师傅"
          phone="13910984703"
          star= "4.9"
        />

        <Driver
          avatarUrl=""
          carColor="白"
          carType="大众速腾"
          card="京FA7318"
          cntOrder={174}
          company="车主之家-车主俱乐部望京店"
          isMaster={false}
          name="王师傅"
          phone="13910984703"
          star= ""
        />
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic"></span>
    </div>
  </div>

)
module.exports = _Driver
