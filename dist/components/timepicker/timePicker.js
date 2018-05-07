'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _picker = require('../picker/picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerTime = (_temp = _class = function (_Component) {
  _inherits(PickerTime, _Component);

  _createClass(PickerTime, null, [{
    key: 'generateM',
    value: function generateM(max) {
      var arr = [];
      for (var i = 0; i < max; i++) {
        var m = i * 5;
        arr.push((m < 10 ? '0' + m : m) + '\u5206');
      }
      return arr;
    }
  }, {
    key: '_compare',
    value: function _compare(startTime, endTime) {
      if (startTime && endTime) {
        var result = 0;
        startTime.forEach(function (item, i) {
          if (startTime[i] > endTime[i] && result === 0) {
            result = 1;
          } else if (startTime[i] < endTime[i] && result === 0) {
            result = 2;
          }
        });
        if (result === 2) return true;
        return false;
      }
      return true;
    }
  }, {
    key: '_getDay',
    value: function _getDay() {
      var today = new Date();
      return today;
    }
  }]);

  function PickerTime() {
    _classCallCheck(this, PickerTime);

    var _this = _possibleConstructorReturn(this, (PickerTime.__proto__ || Object.getPrototypeOf(PickerTime)).call(this));

    _this.initoptions = _this.initoptions.bind(_this);
    return _this;
  }
  // getDefaultProps: function() {
  //   return {
  //     options: 'default value'
  //   }
  // }

  _createClass(PickerTime, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props$options = this.props.options,
          scale = _props$options.scale,
          day = _props$options.day,
          open = _props$options.open;
      var _props$options2 = this.props.options,
          startTime = _props$options2.startTime,
          endTime = _props$options2.endTime,
          value = _props$options2.value;
      // 默认5分钟的刻度

      scale = scale || 5;
      day = day || 3;
      open = open || false;
      var dayarr = [];
      var marr = [];
      var harr = [];
      // options 全值
      for (var i = 0; i < day; i++) {
        switch (i) {
          case 0:
            dayarr.push('今日');
            break;
          case 1:
            dayarr.push('次日');
            break;
          case 2:
            dayarr.push('后天');
            break;
          default:
            dayarr.push(PickerTime._getDay());
            break;
        }
      }
      for (var _i = 0; _i < 60; _i++) {
        if (_i < 24) {
          harr.push((_i < 10 ? '0' + _i : _i) + '\u65F6');
        }
        if (!(_i % scale)) {
          marr.push((_i < 10 ? '0' + _i : _i) + '\u5206');
        }
      }
      var alloptions = [dayarr, harr, marr];
      this.setState({
        alloptions: alloptions
      });
      this._getoptionvalue(alloptions, startTime, endTime, scale, value, day, open);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      var startTime = nextprops.startTime;


      if (startTime) {
        this.setState({
          /* eslint-disable react/no-unused-state */
          startTime: startTime
          /* eslint-enable */
        });
        this.initoptions(startTime);
      }
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway() {
      this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
    }
  }, {
    key: 'onChange',
    value: function onChange(value, text, listIndex) {
      var val = this.state.value.slice(0);
      var options = this.state.options.slice(0);
      var len = this.state.options.length;
      var starttime = this.state.starttime;

      var newvalue = void 0;
      var daylength = options[0].length;
      var _state = this.state,
          alloptions = _state.alloptions,
          endtime = _state.endtime,
          scale = _state.scale;

      // day变化

      if (len === 3 && listIndex === 0) {
        // 天数的位置
        // day不可能只有一天 否则无change
        var dayindex = options[0].indexOf(value);
        if (dayindex === 0 && starttime) {
          // 第一天并且有start值并且最后一天和第一天不是同一天
          // let startTimeD = parseInt(starttime[0]);
          var startTimeH = parseInt(starttime[1], 10);
          var startTimeM = parseInt(starttime[2], 10);
          var lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
          if (lastmin < startTimeM) {
            startTimeH += 1;
            startTimeM = 0;
          }
          if (startTimeH > 23) {
            // startTimeD += 1;
            startTimeH = 0;
          }
          options = [options[0], alloptions[1].slice(startTimeH), alloptions[2].slice(Math.ceil(startTimeM / scale))];
        } else if (dayindex === daylength - 1 && endtime) {
          // 最后一天并且有end值
          var endTimeH = parseInt(endtime[1], 10);
          var endTimeM = parseInt(endtime[2], 10);
          options = [options[0], alloptions[1].slice(0, endTimeH + 1), alloptions[2].slice(0, Math.ceil((endTimeM + 1) / scale))];
        } else {
          // hour min为全值
          options = [options[0], alloptions[1], alloptions[2]];
        }
        newvalue = [value, options[1][0], options[2][0]];
        this.setState({
          options: options,
          value: newvalue
        });
      } else if (len === 3 && listIndex === 1 || len === 2 && listIndex === 0) {
        // hour变化
        var _dayindex = options[0].indexOf(val[0]);
        var hourindex = options[1].indexOf(val[1]);
        var hourlen = options[1].length;
        if (_dayindex === 0 && hourindex === 0 && starttime) {
          // 第一天 第一个hour 并且有start值
          var _startTimeM = parseInt(starttime[2], 10);
          var _lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
          if (_lastmin < _startTimeM) {
            _startTimeM = 0;
          }
          // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
          options = [options[0], options[1], alloptions[2].slice(Math.ceil(_startTimeM / scale))];
        } else if (_dayindex === daylength - 1 && hourindex === hourlen - 1 && endtime) {
          // 最后一天 最后一个hour 并且有end值
          var _endTimeM = parseInt(endtime[2], 10);
          options = [options[0], options[1], alloptions[2].slice(0, Math.ceil((_endTimeM + 1) / scale))];
          // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
        } else {
          // hour da不变 min为全值
          options = [options[0], options[1], alloptions[2]];
        }
        newvalue = [val[0], value, options[2][0]];
        this.setState({
          options: options,
          value: newvalue
        });
      }
    }
  }, {
    key: 'initoptions',
    value: function initoptions(startTime) {
      var startArr = startTime.split(':');
      var startTimeH = parseInt(startArr[0], 10);
      var startTimeM = parseInt(startArr[1], 10);
      var options = this.state.options.slice(0);

      var harr = [];
      var marr = [];
      // 选日的时候只触发时的重新渲染
      // 初始化一下最小值
      var minH = startTimeH;

      if (startTimeM === 55) {
        // 如果是55的话，则加小时往后加1
        minH += 1;
      }

      for (var i = minH; i < 24; i++) {
        // 初始化小时
        harr.push((i < 10 ? '0' + i : i) + '\u65F6');
      }

      if (startTimeM !== 55) {
        // 如果是第一项的话  并且上一项的分钟不是时间正常计算

        for (var _i2 = startTimeM / 5 + 1; _i2 < 12; _i2++) {
          // 初始化第一项的分钟
          var m = _i2 * 5;
          marr.push((m < 10 ? '0' + m : m) + '\u5206');
        }
        if (startTimeM === 0 && startTimeH === 0) {
          // 分钟和时间都为0的时候，不显示次日
          options[0] = ['当日'];
        } else {
          options[0] = ['当日', '次日'];
        }
      } else {
        // 如果时间是55
        // 如果小时等于23点
        if (startTimeH === 23) {
          // 那只能选次日
          options[0] = ['次日'];
          // 初始化小时
          for (var _i3 = 0; _i3 < 24; _i3++) {
            harr.push((_i3 < 10 ? '0' + _i3 : _i3) + '\u65F6');
          }
        }
        // 分钟按正常逻辑处理
        for (var _i4 = 0; _i4 < 12; _i4++) {
          var _m = _i4 * 5;
          marr.push((_m < 10 ? '0' + _m : _m) + '\u5206');
        }
      }

      options[1] = harr;
      options[2] = marr;
      this.setState({
        options: options,
        value: [options[0][0], harr[0], marr[0]]
      });
      // this.props.pickerAway([options[0][0], harr[0], marr[0]])
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.picker.show();
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.picker.show();
    }

    // 初始化iotions

  }, {
    key: '_getoptionvalue',
    value: function _getoptionvalue(alloptions, startTime, endTime, scale, value, day, open) {
      var options = void 0;
      var valuearr = void 0;
      var dayarr = void 0;
      var harr = void 0;
      var marr = void 0;
      // let dayarr = alloptions[0],harr = alloptions[1],marr = alloptions[2]
      // let alldayarr, allharr, allmarr

      if (startTime && !endTime) {
        var startTimeD = parseInt(startTime[0], 10);
        var startTimeH = parseInt(startTime[1], 10);
        var startTimeM = parseInt(startTime[2], 10);
        var lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
        if (lastmin < startTimeM) {
          startTimeH += 1;
          startTimeM = 0;
        }
        if (startTimeH > 23) {
          startTimeD += 1;
          startTimeH = 0;
        }
        dayarr = alloptions[0].slice(startTimeD);
        harr = alloptions[1].slice(startTimeH);
        marr = alloptions[2].slice(Math.ceil(startTimeM / scale));
      } else if (endTime && !startTime) {
        var endTimeD = parseInt(endTime[0], 10);
        var endTimeH = parseInt(endTime[1], 10);
        var endTimeM = parseInt(endTime[2], 10);
        dayarr = alloptions[0].slice(0, endTimeD);
        harr = alloptions[1].slice(0, endTimeH);
        marr = alloptions[2].slice(0, Math.ceil(endTimeM / scale));
      } else if (endTime && startTime) {
        if (PickerTime._compare(startTime, endTime)) {
          var _startTimeD = parseInt(startTime[0], 10);
          var _startTimeH = parseInt(startTime[1], 10);
          var _startTimeM2 = parseInt(startTime[2], 10);
          var _endTimeD = parseInt(endTime[0], 10);
          var _endTimeH = parseInt(endTime[1], 10);
          var _endTimeM2 = parseInt(endTime[2], 10);
          // 判断极端情况的开始值
          var _lastmin2 = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2), 10);
          if (_lastmin2 < _startTimeM2) {
            _startTimeH += 1;
            _startTimeM2 = 0;
          }
          if (_startTimeH > 23) {
            _startTimeD += 1;
            _startTimeH = 0;
          }
          // 分别判断同一天 同一小时的情况
          if (_startTimeD !== _endTimeD) {
            dayarr = alloptions[0].slice(_startTimeD, _endTimeD);
            harr = alloptions[1].slice(_startTimeH);
            marr = alloptions[2].slice(Math.ceil(_startTimeM2 / scale));
          } else if (_startTimeH !== _endTimeH) {
            dayarr = [alloptions[0][_startTimeD]];
            harr = alloptions[1].slice(_startTimeH, _endTimeH);
            marr = alloptions[2].slice(Math.ceil(_startTimeM2 / scale));
          } else {
            dayarr = [alloptions[0][_startTimeD]];
            harr = [alloptions[1][_startTimeH]];
            marr = alloptions[2].slice(Math.ceil(_startTimeM2 / scale), Math.ceil(_endTimeM2 / scale) + 1);
          }
        }
      } else {
        dayarr = alloptions[0];
        harr = alloptions[1];
        marr = alloptions[2];
      }

      if (dayarr.length > 0) {
        options = [dayarr, harr, marr];
      } else {
        options = [harr, marr];
      }

      if (value) {
        valuearr = value.splice(':');
      } else {
        valuearr = [options[0][0], options[1][0], options[2][0]];
      }

      this.setState({
        value: valuearr,
        alloptions: alloptions,
        options: options,
        starttime: startTime,
        endtime: endTime,
        scale: scale,
        open: open
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var textvalue = this.props.textvalue;


      if (!this.state) {

        // if(startTime){
        //   self.initoptions(startTime)
        // }
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'pickertime', onClick: this._onClick.bind(this), ref: 'pickertime' },
          textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'picker',
          value: this.state.value,
          options: this.state.options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this),
          open: this.state.open
        })
      );
    }
  }]);

  return PickerTime;
}(_react.Component), _class.propTypes = {
  // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  // options: PropTypes.array.isRequired,
  // onChange: PropTypes.func,
  // onShow: PropTypes.func,
  // onDismiss: PropTypes.func,
  // onClickAway: PropTypes.func,
  // width: PropTypes.string
  options: _propTypes2.default.object.isRequired
}, _temp);


module.exports = PickerTime;