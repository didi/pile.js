'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarRecord = (_temp = _class = function (_Component) {
  _inherits(CarRecord, _Component);

  function CarRecord() {
    _classCallCheck(this, CarRecord);

    return _possibleConstructorReturn(this, (CarRecord.__proto__ || Object.getPrototypeOf(CarRecord)).apply(this, arguments));
  }

  _createClass(CarRecord, [{
    key: 'setWeekFormat',


    // 设置星期格式
    value: function setWeekFormat(time) {
      var week = {
        zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        enlong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      };
      var dayCn = week[this.props.weekFormat][time.getDay()];
      return dayCn;
    }

    // 地址文字截取

  }, {
    key: 'subFontChar',
    value: function subFontChar(name) {
      var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.drsFontLen;

      var re = /[0-9]|[a-z]|[A-Z]|\./;
      var length = 0;
      var i = void 0;
      if (name.length <= num) {
        return name;
      }
      for (i = 0; i < name.length; i++) {
        if (length > num) {
          break;
        }
        if (re.test(name[i])) {
          length += 0.5;
        } else {
          length += 1;
        }
      }
      return length > num ? name.substr(0, i - 1) + '...' : name;
    }

    // 名字文字截取

  }, {
    key: 'changeName',
    value: function changeName(name) {
      var fontLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.nameFontLen;
      var subNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.nameSubstrLen;

      return name.length >= fontLen ? name.substr(0, subNum) + '...' : name;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          start_name = _props.start_name,
          end_name = _props.end_name,
          filedMap = _props.filedMap,
          create_time = _props.create_time,
          className = _props.className,
          use_car_type = _props.use_car_type,
          require_level = _props.require_level,
          pay_type = _props.pay_type,
          real_pay = _props.real_pay,
          tip_fee = _props.tip_fee,
          other_fee = _props.other_fee,
          realname = _props.realname,
          superAdmin = _props.superAdmin,
          weekShow = _props.weekShow,
          others = _objectWithoutProperties(_props, ['start_name', 'end_name', 'filedMap', 'create_time', 'className', 'use_car_type', 'require_level', 'pay_type', 'real_pay', 'tip_fee', 'other_fee', 'realname', 'superAdmin', 'weekShow']);

      var username = this.changeName(realname);
      var timeObj = new Date(create_time * 1000);
      var data = !weekShow ? CarRecord.setDateFormat(timeObj, this.props.dateFormat) : CarRecord.setDateFormat(timeObj, this.props.dateFormat) + ' ' + this.setWeekFormat(timeObj);
      var startName = start_name && this.subFontChar(start_name);
      var endName = end_name && this.subFontChar(end_name);
      var cls = (0, _classnames2.default)(_defineProperty({
        'car-record-list': true
      }, className, className));
      var Wapper = this.props.href ? 'a' : 'div';
      return _react2.default.createElement(
        Wapper,
        _extends({ className: cls }, others),
        _react2.default.createElement(
          'div',
          { className: 'record-head' },
          _react2.default.createElement('span', { className: 'icon-time icon-pile-time' }),
          _react2.default.createElement(
            'span',
            { className: 'timer fz12' },
            data
          ),
          superAdmin === 1 && _react2.default.createElement(
            'span',
            { className: 'remark fz16' },
            username
          ),
          use_car_type !== '2' && _react2.default.createElement(
            'span',
            { className: 'remark fz11' },
            filedMap.use_car_type[use_car_type]
          ),
          use_car_type === '2' && _react2.default.createElement(
            'span',
            { className: 'remark fz11' },
            filedMap.require_level[require_level]
          ),
          pay_type !== '0' && _react2.default.createElement(
            'span',
            { className: 'remark fz11' },
            filedMap.pay_type[pay_type]
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'wrapper wrapper-from-hook' },
          _react2.default.createElement('span', { className: 'pile-icon pile-icon-location-point' }),
          _react2.default.createElement(
            'span',
            { className: 'fz14 txt-from txt-from-hook default ml5' },
            startName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'wrapper wrapper-from-hook' },
          _react2.default.createElement('span', { className: 'pile-icon pile-icon-location-point-red' }),
          _react2.default.createElement(
            'span',
            { className: 'fz14 txt-from txt-from-hook default ml5' },
            endName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'car-record-cost' },
          _react2.default.createElement(
            'p',
            { className: 'main-cost fz16' },
            _react2.default.createElement(
              'span',
              null,
              real_pay
            ),
            '\u5143'
          ),
          Number(tip_fee) > 0 && _react2.default.createElement(
            'p',
            { className: 'fz11' },
            '\u5C0F\u8D39',
            tip_fee,
            '\u5143'
          ),
          Number(other_fee) > 0 && _react2.default.createElement(
            'p',
            { className: 'fz11' },
            '\u9644\u52A0\u8D39',
            other_fee,
            '\u5143'
          )
        )
      );
    }
  }], [{
    key: 'setDateFormat',

    // 日期格式化   yyyy-MM-dd hh:mm ; yyyy/mm/dd hh:mm
    value: function setDateFormat(date, fmt) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
      return fmt;
    }
  }]);

  return CarRecord;
}(_react.Component), _class.propTypes = {
  drsFontLen: _propTypes2.default.number,
  nameFontLen: _propTypes2.default.number,
  nameSubstrLen: _propTypes2.default.number,
  weekFormat: _propTypes2.default.string,
  weekShow: _propTypes2.default.bool,
  dateFormat: _propTypes2.default.string,

  start_name: _propTypes2.default.string.isRequired,
  end_name: _propTypes2.default.string.isRequired,
  filedMap: _propTypes2.default.object.isRequired,
  create_time: _propTypes2.default.number.isRequired,
  use_car_type: _propTypes2.default.number.isRequired,
  require_level: _propTypes2.default.number.isRequired,
  pay_type: _propTypes2.default.number.isRequired,
  real_pay: _propTypes2.default.number.isRequired,
  tip_fee: _propTypes2.default.number.isRequired,
  other_fee: _propTypes2.default.number.isRequired,
  realname: _propTypes2.default.string.isRequired

}, _class.defaultProps = {
  drsFontLen: 15, // 地址文字截取数 number
  nameFontLen: 5, // 人名文字截取判断数 number
  nameSubstrLen: 3, // 人名文字截取拼接数 number
  weekFormat: 'zh', // 星期名称格式 string (zh、en、enlong)
  weekShow: true, // 星期是否展示 bool
  dateFormat: 'yyyy-MM-dd hh:mm' // 日期格式 string ( yyyy-MM-dd hh:mm 、 yyyy/mm/dd hh:mm、 yyyy-MM-dd、 yyyy/mm/dd)
}, _temp);
exports.default = CarRecord;