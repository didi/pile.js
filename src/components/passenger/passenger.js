/**
 * zhangjingwei 03/20/2017
 */
import React from 'react';

// city_id:"1"
// company_id:"7818735858256994946"
// create_time:"2017-03-22 10:29:06"
// departure_begintime:"2017-03-21 21:00:00"
// departure_endtime:"2017-03-21 21:15:00"
// driver_price:"0.00"
// end_address:"当代城市家园"
// end_lat:"40.945070000000"
// end_lng:"116.921470000000"
// end_time:"1970-01-01 00:00:00"
// id:"8937568324404404255"
// isMaster:false
// isNeed:false
// isPhone:false
// master_id:"8928308773675098325"
// order_id:"1234567890"
// order_status:"9"
// out_order_id:"2"
// passenger_num:"1"
// passenger_price:"0.00"
// price:"0.00"
// ride_type:"4"
// start_address:"数字山谷B区"
// start_lat:"40.043620000000"
// start_lng:"116.289740000000"
// status:"2"
// status_map:"已成单"
// update_time:"2017-03-22 14:56:42"
// use_car_srv:"206"
// user_id:"7818735858861236869"
// user_name:"13552090147"
// user_phone:"13552090147"
// user_type:"2"
// "company_pay": "120.00",
// "total_fee": "60.00",

const headpic = require('../../styles/image/default-avatar.png');
/* eslint-disable no-nested-ternary */
const Passenger = (props) => {
  const {
    start_address, end_address, user_name, departure_endtime, isMaster, isPhone,
    isNeed, user_phone, order_info, ride_type, avatarUrl, company_pay, total_fee, ...others
  } = props;
  return (
    <div className="pile_passenger" {...others}>
      <div className="pile_passenger_avatar">
        <img src={headpic} width="50" height="50" alt="头像" />
        {isNeed && (isMaster ? (<p>下单人</p>) : (<p>同行人</p>))}
      </div>
      <div className="pile_passenger_userinfo">
        <p>
          {user_name}
        </p>
        <ul>
          <li className="fz12 green">
            <span>{start_address.length > 12 ? `${start_address.substr(0, 12)}...` : start_address}</span>
          </li>
          <li className="fz12 red">
            <span>{end_address.length > 12 ? `${end_address.substr(0, 12)}...` : end_address}</span>
          </li>
        </ul>
        <p className="fz12">
          {departure_endtime}
        </p>
        {ride_type === 4 && order_info && (order_info.status === 0 || order_info.status === 1
         || order_info.status === 2 || order_info.status === 4) ?
             (
             order_info.total_fee !== 0 ? (
               <div className="price-layout green">
                 <span>预估费用 [总额: <b>{parseFloat(order_info.total_fee).toFixed(2)}</b>,</span>
                 <span>自费:
                   <b>{parseFloat(order_info.total_fee - order_info.company_pay).toFixed(2)}</b>
                 ]
                 </span>
               </div>
               ) : ''
             )
             : null}
      </div>
      {isPhone && (<div className="pile_passenger_telphone"><a href={`tel:${user_phone}`}><span className="icon-car-icons-phone" /></a></div>)}
      {props.children && (
        <div className="brd">
          {props.children}
        </div>
         )}
    </div>
  );
};

Passenger.defaultProps = {
  isMaster: false,
  isNeed: true,
  isPhone: true,
};

export default Passenger;
