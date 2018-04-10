'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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
          startTime = _props$options.startTime,
          endTime = _props$options.endTime,
          scale = _props$options.scale,
          value = _props$options.value,
          day = _props$options.day,
          open = _props$options.open;
      // 默认5分钟的刻度

      scale = scale || 5;
      day = day || 3;
      open = open || false;
      var alloptions = void 0,
          dayarr = [],
          marr = [],
          harr = [];
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
            dayarr.push(this._getDay(i));
            break;
        }
      }
      for (var _i = 0; _i < 60; _i++) {
        if (_i < 24) {
          harr.push((_i < 10 ? '0' + _i : _i) + '时');
        }
        if (!(_i % scale)) {
          marr.push((_i < 10 ? '0' + _i : _i) + '分');
        }
      }
      alloptions = [dayarr, harr, marr];
      this.setState({
        alloptions: alloptions
      });
      this._getoptionvalue(alloptions, startTime, endTime, scale, value, day, open);
    }
  }, {
    key: 'generateM',
    value: function generateM(max) {
      var arr = [];
      for (var i = 0; i < max; i++) {
        var m = i * 5;
        arr.push((m < 10 ? '0' + m : m) + '分');
      }
      return arr;
    }
  }, {
    key: 'generateH',
    value: function generateH(ax) {}
  }, {
    key: 'onChange',
    value: function onChange(value, text, listIndex) {
      var val = this.state.value.slice(0),
          options = this.state.options.slice(0),
          len = this.state.options.length,
          starttime = this.state.starttime,
          newvalue = void 0,
          daylength = options[0].length;
      var _state = this.state,
          alloptions = _state.alloptions,
          endtime = _state.endtime,
          scale = _state.scale,
          day = _state.day;

      // day变化

      if (len === 3 && listIndex === 0) {
        // 天数的位置
        // day不可能只有一天 否则无change
        var dayindex = options[0].indexOf(value);
        if (dayindex === 0 && starttime) {
          // 第一天并且有start值并且最后一天和第一天不是同一天
          var startTimeD = parseInt(starttime[0]),
              startTimeH = parseInt(starttime[1]),
              startTimeM = parseInt(starttime[2]);
          var lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2));
          if (lastmin < startTimeM) {
            startTimeH++;
            startTimeM = 0;
          }
          if (startTimeH > 23) {
            startTimeD++;
            startTimeH = 0;
          }
          options = [options[0], alloptions[1].slice(startTimeH), alloptions[2].slice(Math.ceil(startTimeM / scale))];
        } else if (dayindex === daylength - 1 && endtime) {
          // 最后一天并且有end值
          var endTimeD = parseInt(endtime[0]),
              endTimeH = parseInt(endtime[1]),
              endTimeM = parseInt(endtime[2]);
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
        var _dayindex = options[0].indexOf(val[0]),
            hourindex = options[1].indexOf(val[1]),
            hourlen = options[1].length;
        if (_dayindex === 0 && hourindex === 0 && starttime) {
          // 第一天 第一个hour 并且有start值
          var _startTimeD = parseInt(starttime[0]),
              _startTimeH = parseInt(starttime[1]),
              _startTimeM = parseInt(starttime[2]);
          var _lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2));
          if (_lastmin < _startTimeM) {
            _startTimeH++;
            _startTimeM = 0;
          }
          if (_startTimeH > 23) {
            _startTimeD++;
            _startTimeH = 0;
          }
          // newvalue = [val[0] ,alloptions[1][0],alloptions[2]]
          options = [options[0], options[1], alloptions[2].slice(Math.ceil(_startTimeM / scale))];
        } else if (_dayindex === daylength - 1 && hourindex === hourlen - 1 && endtime) {
          // 最后一天 最后一个hour 并且有end值
          var _endTimeM = parseInt(endtime[2]);
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
      // val[listIndex]=text
      // this.setState({
      //   value:val
      // })
      // 首先判断一下是不是三列
      // if(len===3){
      //   //初始化小时的数组
      //   let harr=[]
      //   //初始化分钟的数组
      //   let marr=[]
      //   //把开始时间分解
      //   const startArr=startTime.split(":")
      //   //获取到开始时间的小时
      //   const startTimeH=parseInt(startArr[0])
      //   //获取到开始时间的分钟
      //   const startTimeM=parseInt(startArr[1])
      //
      //   //滑动的时候判读一下是不是第一项
      //   if(listIndex===0){
      //     //如果是当日的话
      //     if(value==="当日"){
      //       //选日的时候只触发时的重新渲染
      //       //初始化一下最小值
      //       this.initoptions(startTime)
      //     }else if (value === "次日"){
      //       //初始化一下最小值
      //       //初始化开始小时
      //       let maxH=startTimeH
      //       //如果分钟为0的时候，最大小时数要减一
      //       if(startTimeM===0){
      //         maxH--
      //       }
      //       //开始初始化时小时数组
      //       for(let i=0;i<=maxH;i++){
      //         harr.push((i<10?"0"+i:i)+"时")
      //       }
      //       //开始初始化时小时数组
      //       if(maxH === 0){
      //         if(startTimeM===0){
      //           marr=this.generateM(12)
      //         }else{
      //           marr=this.generateM((startTimeM/5))
      //         }
      //       }else{
      //         marr=this.generateM(12)
      //       }
      //       options[1]=harr
      //       options[2]=marr
      //       this.setState({
      //         options:options,
      //         value:[options[0][1], harr[0], marr[0]]
      //       })
      //     }
      //   //如果滑动的是小时的话
      //   }else if (listIndex===1){
      //     if(this.state.value[0]==="当日"){
      //       marr=this.generateM(12)
      //       //如果是55则不用管，因为下一个是从00开始
      //       if(startTimeM!=55){
      //         //循环全部分钟值
      //         if(parseInt(value)==startTimeH){
      //           marr=[]
      //           //如果是第一项的话  并且上一项的分钟不是55
      //           for(let i=(startTimeM/5+1);i<12;i++){
      //             const m=i*5
      //             marr.push((m<10?"0"+m:m)+"分")
      //           }
      //         }
      //       }
      //     }else if (this.state.value[0]==="次日"){
      //       //先按默认来循环一遍
      //       marr=this.generateM(12)
      //       if(startTimeM!=0){
      //         if(parseInt(value)==startTimeH){
      //           marr=this.generateM((startTimeM/5))
      //         }
      //       }
      //     }
      //     let _val=this.state.value.splice(0)
      //     _val[2]=marr[0]
      //     options[2]=marr
      //     this.setState({
      //       options:options,
      //       value:_val
      //     })
      //   }
      // }
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
        harr.push((i < 10 ? '0' + i : i) + '时');
      }

      if (startTimeM != 55) {

        // 如果是第一项的话  并且上一项的分钟不是时间正常计算

        for (var _i2 = startTimeM / 5 + 1; _i2 < 12; _i2++) {
          // 初始化第一项的分钟
          var m = _i2 * 5;
          marr.push((m < 10 ? '0' + m : m) + '分');
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
            harr.push((_i3 < 10 ? '0' + _i3 : _i3) + '时');
          }
        }
        // 分钟按正常逻辑处理
        for (var _i4 = 0; _i4 < 12; _i4++) {
          var _m = _i4 * 5;
          marr.push((_m < 10 ? '0' + _m : _m) + '分');
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
    value: function onClickAway(value, text, listIndex) {
      this.props.pickerAway && this.props.pickerAway(this.state.value, this.refs.pickertime);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
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
          open: this.state.open })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.refs.picker.show();
    }
  }, {
    key: 'show',
    value: function show() {
      this.refs.picker.show();
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
    value: function _getDay(i) {
      var today = new Date();
    }
    // 初始化iotions

  }, {
    key: '_getoptionvalue',
    value: function _getoptionvalue(alloptions, startTime, endTime, scale, value, day, open) {
      var options = void 0,
          valuearr = [];
      var dayarr = void 0,
          harr = void 0,
          marr = void 0;
      // let dayarr = alloptions[0],harr = alloptions[1],marr = alloptions[2]
      // let alldayarr, allharr, allmarr

      if (startTime && !endTime) {
        var startTimeD = parseInt(startTime[0]),
            startTimeH = parseInt(startTime[1]),
            startTimeM = parseInt(startTime[2]);
        var lastmin = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2));
        if (lastmin < startTimeM) {
          startTimeH++;
          startTimeM = 0;
        }
        if (startTimeH > 23) {
          startTimeD++;
          startTimeH = 0;
        }
        dayarr = alloptions[0].slice(startTimeD);
        harr = alloptions[1].slice(startTimeH);
        marr = alloptions[2].slice(Math.ceil(startTimeM / scale));
      } else if (endTime && !startTime) {
        var endTimeD = parseInt(endTime[0]),
            endTimeH = parseInt(endTime[1]),
            endTimeM = parseInt(endTime[2]);
        dayarr = alloptions[0].slice(0, endTimeD);
        harr = alloptions[1].slice(0, endTimeH);
        marr = alloptions[2].slice(0, Math.ceil(endTimeM / scale));
      } else if (endTime && startTime) {
        if (this._compare(startTime, endTime)) {
          var _startTimeD2 = parseInt(startTime[0]),
              _startTimeH2 = parseInt(startTime[1]),
              _startTimeM2 = parseInt(startTime[2]),
              _endTimeD = parseInt(endTime[0]),
              _endTimeH = parseInt(endTime[1]),
              _endTimeM2 = parseInt(endTime[2]);
          // 判断极端情况的开始值
          var _lastmin2 = parseInt(alloptions[2][alloptions[2].length - 1].substr(0, 2));
          if (_lastmin2 < _startTimeM2) {
            _startTimeH2++;
            _startTimeM2 = 0;
          }
          if (_startTimeH2 > 23) {
            _startTimeD2++;
            _startTimeH2 = 0;
          }
          // 分别判断同一天 同一小时的情况
          if (_startTimeD2 != _endTimeD) {
            dayarr = alloptions[0].slice(_startTimeD2, _endTimeD);
            harr = alloptions[1].slice(_startTimeH2);
            marr = alloptions[2].slice(Math.ceil(_startTimeM2 / scale));
          } else if (_startTimeH2 != _endTimeH) {
            dayarr = [alloptions[0][_startTimeD2]];
            harr = alloptions[1].slice(_startTimeH2, _endTimeH);
            marr = alloptions[2].slice(Math.ceil(_startTimeM2 / scale));
          } else {
            dayarr = [alloptions[0][_startTimeD2]];
            harr = [alloptions[1][_startTimeH2]];
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
        day: day,
        open: open,
        pickerAway: this.props.pickerAway
      });
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