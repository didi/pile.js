'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _picker = require('../picker/picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerDate = function (_Component) {
  _inherits(PickerDate, _Component);

  function PickerDate() {
    _classCallCheck(this, PickerDate);

    return _possibleConstructorReturn(this, (PickerDate.__proto__ || Object.getPrototypeOf(PickerDate)).call(this));
  }

  _createClass(PickerDate, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props$options = this.props.options,
          year = _props$options.year,
          endTime = _props$options.endTime,
          showtoday = _props$options.showtoday,
          open = _props$options.open;

      open = open || false;
      endTime, year = year || 2;
      showtoday = showtoday || true;
      var currentdate = new Date(),
          alloptions = void 0,
          yeararr = [],
          marr = [],
          darr = [];
      var currentyear = currentdate.getFullYear(),
          cunrrentmonth = currentdate.getMonth() + 1,
          currentday = currentdate.getDate();
      var startTime = [currentyear, cunrrentmonth, currentday],
          days = this._getDay(startTime[0], startTime[1]),
          tomorrow = void 0;

      if (startTime[2] < days) {
        tomorrow = [startTime[0], startTime[1], startTime[2] + 1];
      } else if (startTime[1] < 12) {
        tomorrow = [startTime[0], startTime[1] + 1, 1];
      } else {
        tomorrow = [startTime[0] + 1, 1, 1];
      }
      // let startTime = [currentyear,cunrrentmonth,currentday]
      // options 全值
      // set year month day
      for (var i = 0; i < 31; i++) {
        if (i < year) {
          yeararr.push(startTime[0] + i);
        }
        if (i < 12) {
          marr.push(i + 1 + '月');
        }
        if (i < 31) {
          darr.push(i + 1 + '日');
        }
      }
      alloptions = [yeararr, marr, darr];

      this._getoptionvalue(alloptions, startTime, endTime, year, open);

      this.setState({
        today: startTime,
        isshowhanzi: showtoday,
        tomorrow: tomorrow,
        alloptions: alloptions,
        open: open });
    }
  }, {
    key: 'onChange',
    value: function onChange(value, text, listIndex) {
      var val = this.state.value.slice(0),
          options = this.state.options.slice(0),
          starttime = this.state.starttime,
          newvalue = void 0,
          yearlength = options[0].length;
      var _state = this.state,
          alloptions = _state.alloptions,
          year = _state.year;

      // 在有年值得时候转化成数字

      if (typeof val[0] != 'number') {
        val[0] = Number(val[0].match('^[0-9]*'));
      }
      if (listIndex != 2) {
        // day变化不做任何处理
        if (listIndex === 0) {
          // year变化
          // year的位置
          // year不可能只有一个 否则无change
          var yearindex = options[0].indexOf(value);
          if (yearindex === 0 && starttime) {
            // 第一年并且有start值并且最后一年和第一年不是同一年
            var startTimeY = parseInt(starttime[0]),
                startTimeM = parseInt(starttime[1]),
                startTimeD = parseInt(starttime[2]),
                days = this._getDay(options[0][0], Number(alloptions[1].slice(startTimeM - 1)[0].replace(/[^0-9]/ig, '')));
            options = [options[0], alloptions[1].slice(startTimeM - 1), alloptions[2].slice(startTimeD - 1, days)];
          } else {
            // month day为全值
            var _days = this._getDay(options[0][0], 1);
            options = [options[0], alloptions[1], alloptions[2].slice(0, _days)];
          }
          newvalue = [value, options[1][0], options[2][0]];
        } else if (listIndex === 1) {
          // month变化
          var _yearindex = options[0].indexOf(val[0]),
              monthindex = options[1].indexOf(val[1]),
              daylen = options[1].length;
          if (_yearindex === 0 && monthindex === 0 && starttime) {
            // 第一年 第一个month 并且有start值
            var _startTimeY = parseInt(starttime[0]),
                _startTimeM = parseInt(starttime[1]),
                _startTimeD = parseInt(starttime[2]),
                _days2 = this._getDay(options[0][0], Number(options[1][0].replace(/[^0-9]/ig, '')));
            // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
            options = [options[0], options[1], alloptions[2].slice(_startTimeD - 1, _days2)];
          } else {
            // YEAR MONTH不变 DAY为全值
            var _days3 = this._getDay(Number(val[0]), Number(val[1].replace(/[^0-9]/ig, '')));
            options = [options[0], options[1], alloptions[2].slice(0, _days3)];
          }

          newvalue = [val[0], value, options[2][0]];
        }
        if (this.state.isshowhanzi) {
          options = this._showHanzi(options, newvalue);
        }
        this.setState({
          options: options,
          value: newvalue
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      var startTime = nextprops.startTime;
      if (startTime) {
        this.setState({
          startTime: startTime
        });
      }
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      var value = this.state.value,
          dataString = '';

      dataString += value[0] + '/';
      dataString += value[1].split('月')[0] + '/';
      dataString += value[2].split('日')[0];

      var fmt = new Date(dataString + ' 00:00').getTime();
      this.props.pickerAway && this.props.pickerAway(value, this.refs.pickertime, {
        fmt: fmt,
        data: dataString
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var textvalue = this.props.textvalue;

      if (!this.state) {}

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this._onClick.bind(this), ref: 'pickertime' },
          textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'date_picker',
          value: this.state.value,
          options: this.state.options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: this.state.open })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.date_picker.show();
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.date_picker.show();
    }
  }, {
    key: '_compare',
    value: function _compare(startTime, endTime) {
      if (startTime && endTime) {
        var result = 0;
        startTime.forEach(function (item, i) {
          if (startTime[i] > endTime[i] && result == 0) {
            result = 1;
          } else if (startTime[i] < endTime[i] && result == 0) {
            result = 2;
          }
        });
        if (result == 2) return true;else return false;
      } else {
        return true;
      }
    }
  }, {
    key: '_setTimeForStart',
    value: function _setTimeForStart(startTime, options) {}
  }, {
    key: '_getDay',
    value: function _getDay(year, month) {
      return new Date(year, month, 0).getDate();
    }
  }, {
    key: '_showHanzi',
    value: function _showHanzi(options, value) {
      var first = [value[0], Number(value[1].replace(/[^0-9]/ig, ''))],
          today = this.state.today,
          tomorrow = this.state.tomorrow;
      if (first[0] == today[0] && first[1] == today[1]) {
        options[2][0] = options[2][0] + '（今日）';
        if (options[2].length > 1) {
          options[2][1] = options[2][1] + '（明日）';
        }
      } else if (first[0] == tomorrow[0] && first[1] == tomorrow[1]) {
        options[2][0] = options[2][0] + '（明日）';
      }
      return options;
    }
    // 初始化iotions

  }, {
    key: '_getoptionvalue',
    value: function _getoptionvalue(alloptions, startTime, endTime, year, open) {
      var options = void 0,
          valuearr = [],
          yeararr = void 0,
          marr = void 0,
          darr = void 0,
          showtoday = this.props.options.showtoday;
      showtoday = showtoday || true;

      if (startTime && !endTime) {
        var startTimeY = parseInt(startTime[0]),
            startTimeM = parseInt(startTime[1]),
            startTimeD = parseInt(startTime[2]),
            days = this._getDay(startTimeY, startTimeM);
        yeararr = alloptions[0];
        marr = alloptions[1].slice(startTimeM - 1);
        darr = alloptions[2].slice(startTimeD - 1, days);
        if (showtoday) {
          darr[0] = darr[0] + '（今日）';
          if (darr.length > 1) {
            darr[1] = darr[1] + '（明日）';
          }
        }
      }

      options = [yeararr, marr, darr];
      valuearr = [options[0][0], options[1][0], options[2][0]];
      this.setState({
        value: valuearr,
        alloptions: alloptions,
        options: options,
        starttime: startTime,
        year: year,
        pickerAway: this.props.pickerAway,
        open: open });
    }
  }]);

  return PickerDate;
}(_react.Component);

module.exports = PickerDate;