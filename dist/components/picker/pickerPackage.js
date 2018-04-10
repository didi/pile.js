'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _picker = require('./picker.js');

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerPackage = function (_Component) {
  _inherits(PickerPackage, _Component);

  function PickerPackage() {
    _classCallCheck(this, PickerPackage);

    var _this = _possibleConstructorReturn(this, (PickerPackage.__proto__ || Object.getPrototypeOf(PickerPackage)).call(this));

    _this.getCarSeries.bind(_this);
    return _this;
  }

  _createClass(PickerPackage, [{
    key: 'onChange',
    value: function onChange(value, text, listIndex) {
      var options = this.state.options.slice(0);
      var stateValueArray = this.state.stateValueArray.slice(0);

      if (typeof options[0][0] === "string") {
        stateValueArray[0] = value;
        this.setState({
          stateValueArray: stateValueArray
        });
      } else {
        var valueArray = this.state.valueArray.slice(0);
        var series = this.getCarSeries(value);
        var i = 0;
        //先把当前项重置，因为这要传到回调里
        stateValueArray[listIndex] = value;
        valueArray[listIndex] = {
          value: value,
          text: text
        };
        while (series) {
          if (series[0].series) {
            //重置下一项的系列
            options[listIndex + i + 1] = series;
            //下一项的系列重置了，每一项的默认值也要重置
            stateValueArray[listIndex + i + 1] = series[0].value;
            valueArray[listIndex + i + 1] = {
              value: series[0].value,
              text: series[0].text
              //循环重置值
            };series = series[0].series;
            i++;
          } else {
            //如果直接是最后一项了，则只重置最后一项
            options[listIndex + i + 1] = series;
            stateValueArray[listIndex + i + 1] = series[0].value;
            valueArray[listIndex + i + 1] = {
              value: series[0].value,
              text: series[0].text
            };
            series = null;
          }
        }
        //set 更新状态
        this.setState({
          options: options,
          stateValueArray: stateValueArray,
          valueArray: valueArray
        });
      }
    }
    //获取到某一个ID下的Series，并返回

  }, {
    key: 'getCarSeries',
    value: function getCarSeries(value) {
      var cont = this.props.options;
      var obj = [];
      function getseries(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].value === value) {
            obj = arr[i].series;
          } else {
            if (arr[i].series) {
              getseries(arr[i].series);
            }
          }
        }
      };
      getseries(cont);
      return obj;
    }
    //获取到某一个ID下的Series，并返回

  }, {
    key: 'getOptions',
    value: function getOptions(value) {
      var cont = this.props.options;
      var data = null;
      function getseries(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].value === value) {
            data = arr[i];
          } else {
            if (arr[i].series) {
              getseries(arr[i].series);
            }
          }
        }
      };
      getseries(cont);
      return data;
    }
    //获取到某一个ID下的Series，并返回

  }, {
    key: 'getValText',
    value: function getValText(value) {
      var cont = this.props.options;
      var str = null;
      function getseries(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].value == value) {
            str = arr[i].text;
          } else {
            if (arr[i].series) {
              getseries(arr[i].series);
            }
          }
        }
      };
      getseries(cont);
      return str;
    }
  }, {
    key: 'onClickAway',
    value: function onClickAway(value, text, listIndex) {
      //如明有值，说明滑动过
      if (value) {
        //先把原来的数组复制一份
        var arr = this.state.stateValueArray.slice(0);
        //索引校正
        var index = listIndex || 0;
        //赋值
        arr[index] = value;
        //如果是只有一项的话
        if (typeof this.props.options[0][0] === "string") {
          this.setState({
            stateValueArray: arr,
            value: [value]
          });
        }
      }
      if (typeof this.props.options[0][0] === "string") {
        this.props.pickerAway && this.props.pickerAway(this.state.stateValueArray);
      } else {
        this.props.pickerAway && this.props.pickerAway(this.state.valueArray);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      //初始化值
      if (!this.state) {
        var _props = this.props,
            options = _props.options,
            value = _props.value;

        var len = void 0,
            stateValueArray = void 0,
            //存着每一级id值
        seriesArray = void 0,
            //options里每一级的系列值
        valueArray = void 0; //value的值
        //如果数组第一项是字符串，说明是单列，则初始化把每一级的每一项放到stateValueArray数组里。并初始化serieArray;
        if (typeof options[0] === "string") {
          stateValueArray = [options[0]];
          seriesArray = [options];
        } else {
          //如果是对象，则递归第一个对象，和第一个对象下series下的第一个对象，组成默认值
          len = options.length;
          stateValueArray = [];
          valueArray = [];
          seriesArray = [];
          var series = options;
          if (value) {
            valueArray = [this.getOptions(value[0]), this.getOptions(value[1]), this.getOptions(value[2])];
            seriesArray = [this.props.options, this.getCarSeries(value[0]), this.getCarSeries(value[1])];
            stateValueArray = value;
          } else {
            while (series) {
              seriesArray.push(series);
              stateValueArray.push(series[0].value);
              valueArray.push(series[0]);
              //如果还有下一项，则继续递归
              if (series[0].series) {
                series = series[0].series;
              } else {
                //如果没有跳出循环
                series = null;
                break;
              }
            }
          }
        }
        this.state = {
          stateValueArray: stateValueArray,
          valueArray: valueArray,
          value: stateValueArray,
          options: seriesArray,
          pickerAway: this.props.pickerAway
        };
      }
      return _react2.default.createElement(_picker2.default, {
        ref: 'picker',
        value: this.state.value,
        options: this.state.options,
        onChange: this.onChange.bind(this),
        onClickAway: this.onClickAway.bind(this)
      });
    }
  }]);

  return PickerPackage;
}(_react.Component);

module.exports = PickerPackage;