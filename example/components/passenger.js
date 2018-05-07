import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { Passenger } = Pile;
// 乘车人 passenger
const _Passenger = () => (
  <div className="example-wrap">
    <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
    <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 106}px` }}>
      <h2 className="page-title"><b>Passenger</b><span>乘车人</span></h2>
      <div className="demo-show">
        <Passenger
          start_address="数字山谷B区"
          end_address="当代城市家园"
          user_name="13552090147"
          departure_endtime="2017-03-21 21:15:00"
          avatarUrl=""
          isMaster={false}
          isPhone={false}
          isNeed={false}
          user_phone="13552090147"
          company_pay="120.00"
          total_fee="60.00"
          ride_type="4"
        />
      </div>
    </div>
    <div className="footer-name">
      <span className="footer-name-pic" />
    </div>
  </div>
);
module.exports = _Passenger;
