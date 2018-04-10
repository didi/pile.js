'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _picker = require('./picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerTime = function (_Component) {
  _inherits(PickerTime, _Component);

  function PickerTime() {
    _classCallCheck(this, PickerTime);

    var _this = _possibleConstructorReturn(this, (PickerTime.__proto__ || Object.getPrototypeOf(PickerTime)).call(this));

    _this.initoptions.bind(_this);
    return _this;
  }

  _createClass(PickerTime, [{
    key: 'onChange',
    value: function onChange(value, text, listIndex) {
      var val = this.state.value.slice(0);
      var options = this.state.options.slice(0);
      var len = this.state.options.length;
      var startTime = this.state.startTime;


      val[listIndex] = text;
      this.setState({
        vallue: val
      });
      // 首先判断一下是不是三列
      if (len === 3) {
        // 初始化小时的数组
        var harr = [];
        // 初始化分钟的数组
        var marr = [];
        // 把开始时间分解
        var startArr = startTime.split(':');
        // 获取到开始时间的小时
        var startTimeH = parseInt(startArr[0]);
        // 获取到开始时间的分钟
        var startTimeM = parseInt(startArr[1]);

        // 滑动的时候判读一下是不是第一项
        if (listIndex === 0) {
          // 如果是当日的话
          if (value === '当日') {
            // 选日的时候只触发时的重新渲染
            // 初始化一下最小值
            this.initoptions(startTime);
          } else if (value === '次日') {
            // 初始化一下最小值
            // 初始化开始小时
            var maxH = startTimeH;
            // 如果分钟为0的时候，最大小时数要减一
            if (startTimeM === 0) {
              maxH--;
            }
            // 开始初始化时小时数组
            for (var i = 0; i <= maxH; i++) {
              harr.push((i < 10 ? '0' + i : i) + '\u65F6');
            }
            // 开始初始化时小时数组
            if (maxH === 0) {
              if (startTimeM === 0) {
                marr = this.generateM(12);
              } else {
                marr = this.generateM(startTimeM / 5);
              }
            } else {
              marr = this.generateM(12);
            }
            options[1] = harr;
            options[2] = marr;
            this.setState({
              options: options,
              value: [options[0][1], harr[0], marr[0]]
            });
          }
          // 如果滑动的是小时的话
        } else if (listIndex === 1) {
          if (this.state.value[0] === '当日') {
            marr = this.generateM(12);
            // 如果是55则不用管，因为下一个是从00开始
            if (startTimeM != 55) {
              // 循环全部分钟值
              if (parseInt(value) == startTimeH) {
                marr = [];
                // 如果是第一项的话  并且上一项的分钟不是55
                for (var _i = startTimeM / 5 + 1; _i < 12; _i++) {
                  var m = _i * 5;
                  marr.push((m < 10 ? '0' + m : m) + '\u5206');
                }
              }
            }
          } else if (this.state.value[0] === '次日') {
            // 先按默认来循环一遍
            marr = this.generateM(12);
            if (startTimeM != 0) {
              if (parseInt(value) == startTimeH) {
                marr = this.generateM(startTimeM / 5);
              }
            }
          }
          var _val = this.state.value.splice(0);
          _val[2] = marr[0];
          options[2] = marr;
          this.setState({
            options: options,
            value: _val
          });
        }
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
        this.initoptions(startTime);
      }
    }
  }, {
    key: 'initoptions',
    value: function initoptions(startTime) {
      var startArr = startTime.split(':');
      var startTimeH = parseInt(startArr[0]);
      var startTimeM = parseInt(startArr[1]);
      var options = this.state.options.slice(0);

      var harr = [];
      var marr = [];
      // 选日的时候只触发时的重新渲染
      // 初始化一下最小值
      var minH = startTimeH;

      if (startTimeM === 55) {
        // 如果是55的话，则加小时往后加1
        minH++;
      }

      for (var i = minH; i < 24; i++) {
        // 初始化小时
        harr.push((i < 10 ? '0' + i : i) + '\u65F6');
      }

      if (startTimeM != 55) {
        // 如果是第一项的话  并且上一项的分钟不是时间正常计算

        for (var _i2 = startTimeM / 5 + 1; _i2 < 12; _i2++) {
          // 初始化第一项的分钟
          var m = _i2 * 5;
          marr.push((m < 10 ? '0' + m : m) + '\u5206');
        }
        if (startTimeM == 0 && startTimeH == 0) {
          // 分钟和时间都为0的时候，不显示次日
          options[0] = ['当日'];
        } else {
          options[0] = ['当日', '次日'];
        }
      } else {
        // 如果时间是55
        // 如果小时等于23点
        if (startTimeH == 23) {
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
    key: 'onClickAway',
    value: function onClickAway(value, text) {
      this.props.pickerAway && this.props.pickerAway(this.state.value);
    }
  }, {
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
    key: 'render',
    value: function render() {
      var self = this;
      var _props = this.props,
          options = _props.options,
          startTime = _props.startTime,
          textvalue = _props.textvalue;


      var valueArr = [];
      if (!this.state) {
        options.map(function (sr, index) {
          valueArr.push(arguments[0][0]);
        });
        this.state = {
          value: valueArr,
          startTime: startTime,
          options: this.props.options,
          pickerAway: this.props.pickerAway
        };
        if (startTime) {
          self.initoptions(startTime);
        }
      }
      return;
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'pickertime' },
          textvalue
        ),
        _react2.default.createElement(_picker2.default, {
          ref: 'picker',
          value: this.state.value,
          startTime: this.state.startTime,
          options: this.state.options,
          onChange: this.onChange.bind(this),
          onClickAway: this.onClickAway.bind(this)
        })
      );
    }
  }]);

  return PickerTime;
}(_react.Component);

module.exports = PickerTime;