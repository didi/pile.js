'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * zhangjingwei 03/20/2017
                                                                                                                                                                                                                              */


var headpic = require('../../styles/image/img_driver_nor.png');

var Driver = function Driver(props) {
  var name = props.name,
      avatarUrl = props.avatarUrl,
      carType = props.carType,
      carColor = props.carColor,
      cntOrder = props.cntOrder,
      card = props.card,
      phone = props.phone,
      isMaster = props.isMaster,
      star = props.star,
      children = props.children,
      company = props.company,
      others = _objectWithoutProperties(props, ['name', 'avatarUrl', 'carType', 'carColor', 'cntOrder', 'card', 'phone', 'isMaster', 'star', 'children', 'company']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'pile_driver' }, others),
    _react2.default.createElement(
      'div',
      { className: 'pile_driver_avatar' },
      _react2.default.createElement('img', { src: avatarUrl || headpic, width: '50', height: '50', alt: '\u53F8\u673A\u5934\u50CF' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'pile_driver_info' },
      _react2.default.createElement(
        'p',
        { className: 'pile_driver_info_name fz14' },
        name,
        star && _react2.default.createElement(
          'b',
          { className: 'pile_driver_star fz12' },
          _react2.default.createElement('span', { className: 'icon-trip_icon_star' }),
          star
        ),
        _react2.default.createElement(
          'span',
          { className: 'pile_driver_orders fz12' },
          cntOrder,
          '\u5355'
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'pile_driver_info_platenumber fz12' },
        _react2.default.createElement(
          'span',
          { className: 'pile-driver-platenumber' },
          card
        ),
        ' ',
        _react2.default.createElement(
          'b',
          { className: 'pile-car-color' },
          carColor,
          '\u8272'
        ),
        ' ',
        _react2.default.createElement(
          'b',
          { className: 'pile-car-type' },
          carType
        )
      )
    ),
    isMaster && _react2.default.createElement(
      'div',
      { className: 'pile_driver_telphone' },
      _react2.default.createElement(
        'a',
        { href: 'tel:' + phone },
        _react2.default.createElement('span', { className: 'icon-trip_icon_phone' })
      )
    ),
    children && _react2.default.createElement(
      'div',
      { className: 'brd' },
      children
    )
  );
};

Driver.propTypes = {
  avatarUrl: _propTypes2.default.string,
  name: _propTypes2.default.string,
  card: _propTypes2.default.string,
  carType: _propTypes2.default.string,
  carColor: _propTypes2.default.string,
  cntOrder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  company: _propTypes2.default.string,
  phone: _propTypes2.default.string,
  isMaster: _propTypes2.default.bool
};

Driver.defaultProps = {
  isMaster: false,
  star: '',
  avatarUrl: '',
  name: '',
  card: '',
  carType: '',
  carColor: '',
  cntOrder: '',
  company: '',
  phone: ''
};

exports.default = Driver;