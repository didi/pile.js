'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * yanshenshen 06/20/2017
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dialog = require('../dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _getLocale = require('../localeprovider/getLocale');

var _zhCN = require('../localeprovider/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentTip = _dialog2.default.ContentTip;
var Code = (_temp = _class = function (_React$Component) {
  _inherits(Code, _React$Component);

  function Code(props) {
    _classCallCheck(this, Code);

    var _this = _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).call(this, props));

    var show = props.show,
        timer = props.timer,
        phone = props.phone,
        len = props.len,
        inputsArr = Array(len).fill(0);


    _this.state = {
      show: show,
      timer: timer,
      phone: phone,
      len: len,
      inputsArr: inputsArr,
      codeValue: '',
      once: true
    };

    _this.closeClick = _this.closeClick.bind(_this);
    _this.reSetClick = _this.reSetClick.bind(_this);
    _this.focusClick = _this.focusClick.bind(_this);
    _this.focusHandle = _this.focusHandle.bind(_this);
    _this.blurHandle = _this.blurHandle.bind(_this);
    _this.changeHandle = _this.changeHandle.bind(_this);
    return _this;
  }

  _createClass(Code, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          timeStart = _props.timeStart,
          timer = _props.timer;

      if (timeStart) {
        this.timeDown(timer);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.show) {
        this.setState({
          show: nextprops.show,
          once: true
        });
      }

      if (nextprops.len !== this.props.len) {
        this.mytimer && clearTimeout(this.mytimer);
        var len = nextprops.len;

        var inputsArr = [];
        for (var i = 0; i < len; i++) {
          inputsArr.push(i);
        }
        this.setState({
          len: len,
          inputsArr: inputsArr
        });

        this.timeDown(nextprops.timer);
      }

      if (nextprops.phone !== this.props.phone) {
        this.mytimer && clearTimeout(this.mytimer);
        this.setState({
          phone: nextprops.phone,
          timer: nextprops.timer,
          codeValue: '',
          codeFocus: false
        });

        this.timeDown(nextprops.timer);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mytimer && clearTimeout(this.mytimer);
    }
  }, {
    key: 'timeDown',
    value: function timeDown(timer) {
      var self = this,
          timeEndBack = this.props.timeEndBack;

      this.mytimer = setTimeout(function () {
        if (timer > 0) {
          timer--;
          self.setState({ timer: timer });
          self.timeDown(timer);
        } else {
          clearTimeout(this.mytimer);
          if (timeEndBack) {
            timeEndBack();
          }
        }
      }, 1000);
    }
  }, {
    key: 'reSetClick',
    value: function reSetClick() {
      var self = this,
          _props2 = this.props,
          resetBack = _props2.resetBack,
          timer = _props2.timer;

      this.setState({
        timer: timer
      });

      setTimeout(function () {
        self.timeDown(timer);
      });

      if (resetBack) {
        resetBack();
      }
    }
  }, {
    key: 'closeClick',
    value: function closeClick() {
      var closeBack = this.props.closeBack;

      this.setState({
        show: false,
        codeValue: '',
        codeFocus: false
      });
      if (closeBack) {
        closeBack();
      }
    }
  }, {
    key: 'changeHandle',
    value: function changeHandle() {
      var _state = this.state,
          len = _state.len,
          focus = _state.focus,
          once = _state.once,
          _props3 = this.props,
          inputBack = _props3.inputBack,
          inputBegin = _props3.inputBegin,
          codeInput = this.codeInput;


      this.setState({
        codeValue: codeInput.value
      });

      once === true && codeInput.value.length === 1 && inputBegin && inputBegin(codeInput.value);

      if (codeInput.value > 1) {
        this.setState({
          once: false
        });
      }

      if (codeInput.value.length >= len && focus) {
        if (inputBack) {
          inputBack(codeInput.value);
        }
      }
    }
  }, {
    key: 'focusClick',
    value: function focusClick() {
      this.setState({
        codeFocus: true
      });
    }
  }, {
    key: 'blurHandle',
    value: function blurHandle() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: 'focusHandle',
    value: function focusHandle() {
      this.setState({
        focus: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this,
          _state2 = this.state,
          show = _state2.show,
          timer = _state2.timer,
          phone = _state2.phone,
          codeValue = _state2.codeValue,
          inputsArr = _state2.inputsArr,
          len = _state2.len,
          codeFocus = _state2.codeFocus,
          _props4 = this.props,
          inputType = _props4.inputType,
          className = _props4.className,
          formatPhone = phone.substring(0, 3) + ' ' + phone.substring(3, 7) + ' ' + phone.substring(7, 11),
          cls = (0, _classnames2.default)(_defineProperty({
        'jimu-code': true,
        'jimu-code-more': len > 4,
        'jimu-code-focus': codeFocus
      }, className, className));

      var locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'Verification', function () {
        return _zhCN2.default.Verification;
      });
      var verTitleText = locale.verTitleText,
          sendToText = locale.sendToText,
          reoccurrenceText = locale.reoccurrenceText,
          resendText = locale.resendText;

      return _react2.default.createElement(
        ContentTip,
        { show: show, className: 'jimu-code-tip', MaskClick: this.closeClick },
        _react2.default.createElement(
          'div',
          { className: cls },
          _react2.default.createElement(
            'div',
            { className: 'jimu-code-hd' },
            _react2.default.createElement('span', { className: 'code-icon-del icon-del', onClick: this.closeClick }),
            _react2.default.createElement(
              'h2',
              { className: 'hd-title' },
              verTitleText
            ),
            _react2.default.createElement(
              'div',
              { className: 'code-intr' },
              sendToText,
              ' ',
              formatPhone
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'jimu-code-bd' },
            _react2.default.createElement(
              'div',
              { className: 'time-down' },
              timer !== 0 ? _react2.default.createElement(
                'span',
                { className: 'code-number' },
                timer,
                ' ',
                reoccurrenceText
              ) : _react2.default.createElement(
                'span',
                { className: 'reset-code', onClick: this.reSetClick },
                resendText
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'jimu-code-inputs', onClick: this.focusClick },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'code-values' },
                  inputsArr.map(function (re, index) {
                    if (codeValue.length >= index) {
                      if (index === codeValue.length) {
                        return _react2.default.createElement(
                          'div',
                          { key: index, className: 'layout-code code-focus' },
                          _react2.default.createElement(
                            'span',
                            null,
                            codeValue[index]
                          )
                        );
                      }
                      return _react2.default.createElement(
                        'div',
                        { key: index, className: 'layout-code code-focus no-focus-line' },
                        _react2.default.createElement(
                          'span',
                          null,
                          codeValue[index]
                        )
                      );
                    }
                    return _react2.default.createElement(
                      'div',
                      { key: index, className: 'layout-code' },
                      _react2.default.createElement(
                        'span',
                        null,
                        codeValue[index]
                      )
                    );
                  })
                ),
                _react2.default.createElement('input', {
                  ref: function ref(n) {
                    _this2.codeInput = n;
                  },
                  maxLength: len,
                  type: inputType,
                  className: 'code-input',
                  onFocus: self.focusHandle,
                  onBlur: self.blurHandle,
                  onInput: self.changeHandle,
                  value: codeValue
                })
              )
            )
          )
        )
      );
    }
  }]);

  return Code;
}(_react2.default.Component), _class.propTypes = {}, _class.defaultProps = {
  show: false, // 是否展示
  phone: '13222229999', // 电话号码
  timer: 30, // 倒计时
  inputBack: function inputBack() {},
  // 输入完成后的回调
  inputBegin: function inputBegin() {},
  // 输入开始的回调
  closeBack: function closeBack() {},
  // 关闭后的回调
  resetBack: function resetBack() {},
  // 点击重新发送后的回调
  timeEndBack: function timeEndBack() {},
  // 点击重新发送后的回调
  inputType: 'tel', // 小键盘类型
  len: 4, // 验证码数
  timeStart: false // 倒计时开始计时
}, _temp);

Code.contextTypes = {
  jimuLocale: _propTypes2.default.object
};
exports.default = Code;