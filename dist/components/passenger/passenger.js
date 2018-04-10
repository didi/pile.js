'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * zhangjingwei 03/20/2017
                                                                                                                                                                                                                              */


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

var headpic = require('../../styles/image/default-avatar.png');

var Passenger = function Passenger(props) {
  var start_address = props.start_address,
      end_address = props.end_address,
      user_name = props.user_name,
      departure_endtime = props.departure_endtime,
      avatarUrl = props.avatarUrl,
      isMaster = props.isMaster,
      isPhone = props.isPhone,
      isNeed = props.isNeed,
      user_phone = props.user_phone,
      company_pay = props.company_pay,
      total_fee = props.total_fee,
      order_info = props.order_info,
      ride_type = props.ride_type,
      others = _objectWithoutProperties(props, ['start_address', 'end_address', 'user_name', 'departure_endtime', 'avatarUrl', 'isMaster', 'isPhone', 'isNeed', 'user_phone', 'company_pay', 'total_fee', 'order_info', 'ride_type']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'jimu_passenger' }, others),
    _react2.default.createElement(
      'div',
      { className: 'jimu_passenger_avatar' },
      _react2.default.createElement('img', { src: headpic, width: '50', height: '50', alt: '\u5934\u50CF' }),
      isNeed && (isMaster ? _react2.default.createElement(
        'p',
        null,
        '\u4E0B\u5355\u4EBA'
      ) : _react2.default.createElement(
        'p',
        null,
        '\u540C\u884C\u4EBA'
      ))
    ),
    _react2.default.createElement(
      'div',
      { className: 'jimu_passenger_userinfo' },
      _react2.default.createElement(
        'p',
        null,
        user_name
      ),
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          { className: 'fz12 green' },
          _react2.default.createElement(
            'span',
            null,
            start_address.length > 12 ? start_address.substr(0, 12) + '...' : start_address
          )
        ),
        _react2.default.createElement(
          'li',
          { className: 'fz12 red' },
          _react2.default.createElement(
            'span',
            null,
            end_address.length > 12 ? end_address.substr(0, 12) + '...' : end_address
          )
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'fz12' },
        departure_endtime
      ),
      ride_type === 4 && order_info && (order_info.status === 0 || order_info.status === 1 || order_info.status === 2 || order_info.status === 4) ? order_info.total_fee !== 0 ? _react2.default.createElement(
        'div',
        { className: 'price-layout green' },
        _react2.default.createElement(
          'span',
          null,
          '\u9884\u4F30\u8D39\u7528 [\u603B\u989D: ',
          _react2.default.createElement(
            'b',
            null,
            parseFloat(order_info.total_fee).toFixed(2)
          ),
          ','
        ),
        _react2.default.createElement(
          'span',
          null,
          '\u81EA\u8D39: ',
          _react2.default.createElement(
            'b',
            null,
            parseFloat(order_info.total_fee - order_info.company_pay).toFixed(2)
          ),
          ']'
        )
      ) : '' : null
    ),
    isPhone && _react2.default.createElement(
      'div',
      { className: 'jimu_passenger_telphone' },
      _react2.default.createElement(
        'a',
        { href: 'tel:' + user_phone },
        _react2.default.createElement('span', { className: 'icon-car-icons-phone' })
      )
    ),
    props.children && _react2.default.createElement(
      'div',
      { className: 'brd' },
      props.children
    )
  );
};

Passenger.defaultProps = {
  isMaster: false,
  isNeed: true,
  isPhone: true
};

exports.default = Passenger;