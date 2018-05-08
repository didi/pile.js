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

var Travel = (_temp = _class = function (_Component) {
  _inherits(Travel, _Component);

  function Travel() {
    _classCallCheck(this, Travel);

    return _possibleConstructorReturn(this, (Travel.__proto__ || Object.getPrototypeOf(Travel)).apply(this, arguments));
  }

  _createClass(Travel, [{
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
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          create_time = _props.create_time,
          className = _props.className,
          weekShow = _props.weekShow,
          end_name = _props.end_name,
          start_name = _props.start_name,
          stateHtml = _props.stateHtml,
          remarksHtml = _props.remarksHtml,
          weekFormat = _props.weekFormat,
          dateFormat = _props.dateFormat,
          others = _objectWithoutProperties(_props, ['create_time', 'className', 'weekShow', 'end_name', 'start_name', 'stateHtml', 'remarksHtml', 'weekFormat', 'dateFormat']);

      var timeObj = new Date(create_time * 1000);
      var data = !weekShow ? Travel.setDateFormat(timeObj, this.props.dateFormat) : Travel.setDateFormat(timeObj, this.props.dateFormat) + ' ' + this.setWeekFormat(timeObj);
      var cls = (0, _classnames2.default)(_defineProperty({
        'car-record-list': true,
        'pile-app-v2': true,
        'pile-travel': true
      }, className, className));
      var Wrapper = this.props.href ? 'a' : 'div';
      return _react2.default.createElement(
        Wrapper,
        _extends({ className: cls }, others),
        _react2.default.createElement(
          'div',
          { className: 'record-head' },
          _react2.default.createElement('span', { className: 'icon-time icon-pile-time' }),
          _react2.default.createElement(
            'span',
            { className: 'timer fz12' },
            data
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'wrapper wrapper-from-hook' },
          _react2.default.createElement('span', { className: 'pile-icon pile-icon-location-point' }),
          _react2.default.createElement(
            'span',
            { className: 'fz14 txt-from txt-from-hook default ml5' },
            start_name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'wrapper wrapper-from-hook' },
          _react2.default.createElement('span', { className: 'pile-icon pile-icon-location-point-red' }),
          _react2.default.createElement(
            'span',
            { className: 'fz14 txt-from txt-from-hook default ml5' },
            end_name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'car-travel-state' },
          stateHtml
        ),
        _react2.default.createElement(
          'div',
          { className: 'car-travel-remarks' },
          remarksHtml
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

  return Travel;
}(_react.Component), _class.propTypes = {
  weekFormat: _propTypes2.default.string,
  weekShow: _propTypes2.default.bool,
  dateFormat: _propTypes2.default.string
}, _class.defaultProps = {
  weekFormat: 'zh', // 星期名称格式 string (zh、en、enlong)
  weekShow: true, // 星期是否展示 bool
  dateFormat: 'yyyy-MM-dd hh:mm' // 日期格式 string ( yyyy-MM-dd hh:mm 、 yyyy/mm/dd hh:mm、 yyyy-MM-dd、 yyyy/mm/dd)
}, _temp);
exports.default = Travel;


module.exports = Travel;