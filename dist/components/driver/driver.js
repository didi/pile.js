'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * zhangjingwei 03/20/2017
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headpic = require('../../styles/image/img_driver_nor.png');

var Driver = (_temp = _class = function (_React$Component) {
  _inherits(Driver, _React$Component);

  function Driver() {
    _classCallCheck(this, Driver);

    return _possibleConstructorReturn(this, (Driver.__proto__ || Object.getPrototypeOf(Driver)).apply(this, arguments));
  }

  _createClass(Driver, [{
    key: 'render',


    /* <span className="fz10">{stars}</span> */
    /* <a className="jimu_driver_tel" href={`tel:`+phone}></a> */
    value: function render() {
      var _props = this.props,
          name = _props.name,
          avatarUrl = _props.avatarUrl,
          carType = _props.carType,
          carColor = _props.carColor,
          cntOrder = _props.cntOrder,
          card = _props.card,
          company = _props.company,
          phone = _props.phone,
          isMaster = _props.isMaster,
          star = _props.star,
          children = _props.children,
          others = _objectWithoutProperties(_props, ['name', 'avatarUrl', 'carType', 'carColor', 'cntOrder', 'card', 'company', 'phone', 'isMaster', 'star', 'children']);

      return _react2.default.createElement(
        'div',
        _extends({ className: 'jimu_driver' }, others),
        _react2.default.createElement(
          'div',
          { className: 'jimu_driver_avatar' },
          _react2.default.createElement('img', { src: avatarUrl || headpic, width: '50', height: '50', alt: '\u53F8\u673A\u5934\u50CF' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'jimu_driver_info' },
          _react2.default.createElement(
            'p',
            { className: 'jimu_driver_info_name fz14' },
            name,
            star && _react2.default.createElement(
              'b',
              { className: 'jimu_driver_star fz12' },
              _react2.default.createElement('span', { className: 'icon-trip_icon_star' }),
              star
            ),
            _react2.default.createElement(
              'span',
              { className: 'jimu_driver_orders fz12' },
              cntOrder,
              '\u5355'
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'jimu_driver_info_platenumber fz12' },
            _react2.default.createElement(
              'span',
              { className: 'jimu-driver-platenumber' },
              card
            ),
            ' ',
            _react2.default.createElement(
              'b',
              { className: 'jimu-car-color' },
              carColor,
              '\u8272'
            ),
            ' ',
            _react2.default.createElement(
              'b',
              { className: 'jimu-car-type' },
              carType
            )
          )
        ),
        isMaster && _react2.default.createElement(
          'div',
          { className: 'jimu_driver_telphone' },
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
    }
  }]);

  return Driver;
}(_react2.default.Component), _class.propTypes = {
  avatarUrl: _propTypes2.default.string,
  name: _propTypes2.default.string,
  card: _propTypes2.default.string,
  carType: _propTypes2.default.string,
  carColor: _propTypes2.default.string,
  cntOrder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  company: _propTypes2.default.string,
  phone: _propTypes2.default.string,
  isMaster: _propTypes2.default.bool
}, _class.defaultProps = {
  isMaster: false,
  star: '' }, _temp);
exports.default = Driver;