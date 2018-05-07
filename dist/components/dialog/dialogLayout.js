'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _alert = require('./alert');

var _alert2 = _interopRequireDefault(_alert);

var _toast = require('./toast');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogLayout = function (_Component) {
  _inherits(DialogLayout, _Component);

  function DialogLayout() {
    _classCallCheck(this, DialogLayout);

    /* eslint-disable react/no-unused-state */
    var _this = _possibleConstructorReturn(this, (DialogLayout.__proto__ || Object.getPrototypeOf(DialogLayout)).call(this));

    _this.state = {
      confirmShow: false,
      iconHide: false,
      confirmType: 'fail',
      confirmBtnType: 'default',
      confirmTitle: 'null',
      confirmcancelBtnText: '取消',
      confirmBtnText: '确定',
      confirmChildren: null,

      toastShow: false,
      toastContent: 'null',
      toastType: 'success',
      toastTime: 3000,
      toastCallBack: null,

      alertShow: false,
      alertType: 'fail',
      alertChildren: null,
      alertTitleText: 'null',
      alertLabelText: '我知道了',
      MaskClick: null
    };
    /* eslint-enable react/no-unused-state */
    var self = _this;
    function alertDialog() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var obj = {
        alertWidth: config.width,
        alertShow: config.show === undefined ? true : config.show,
        alertIconHide: config.iconHide || false,
        alertType: config.type || 'fail',
        alertTitleText: config.msg || 'null',
        alertChildren: config.children || null,
        alertLabelText: config.btnText || '我知道了',
        alertBeforeCallBack: config.beforeCallBack,
        alertCallBack: config.callBack,
        MaskClick: config.isMaskClick ? function mask() {
          self.setState({
            alertShow: false
          });
        } : null
      };
      self.setState(obj);
    }
    function toastDialog() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var obj = {
        toastShow: config.show === undefined ? true : config.show,
        toastType: config.type || 'success',
        toastContent: config.msg || 'null',
        toastTime: config.time === undefined ? 3000 : config.time,
        toastCallBack: config.callBack
      };

      self.setState(obj);
    }
    function confirmDialog() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var obj = {
        confirmShow: config.show === undefined ? true : config.show,
        confirmIconHide: config.iconHide || false,
        confirmType: config.type || 'fail',
        confirmChildren: config.children || null,
        confirmBtnType: config.btnType || 'default',
        confirmTitle: config.msg || 'null',
        confirmcancelBtnText: config.cancelText || '取消',
        confirmBtnText: config.btnText || '确定',
        confirmCancelBeforeCallBack: config.cancelBeforeCallBack,
        confirmCancelCallBack: config.cancelCallBack,
        confirmCallBack: config.callBack,
        confirmBeforeCallBack: config.beforeCallBack
      };
      self.setState(obj);
    }

    window.confirmDialog = confirmDialog;
    window.toastDialog = toastDialog;
    window.alertDialog = alertDialog;
    return _this;
  }

  _createClass(DialogLayout, [{
    key: 'alertClick',
    value: function alertClick() {
      var confirmShow = false;
      var _state = this.state,
          alertCallBack = _state.alertCallBack,
          alertBeforeCallBack = _state.alertBeforeCallBack;


      if (alertBeforeCallBack) {
        var power = alertBeforeCallBack();
        if (!power) {
          confirmShow = true;
        }
      } else {
        alertCallBack && alertCallBack();
      }
      this.setState({
        alertShow: confirmShow
      });
    }
  }, {
    key: 'toastHide',
    value: function toastHide() {
      var toastCallBack = this.state.toastCallBack;

      toastCallBack && toastCallBack();
      this.setState({
        toastShow: false
      });
    }
  }, {
    key: 'confirmCancelClick',
    value: function confirmCancelClick() {
      var confirmShow = false;
      var _state2 = this.state,
          confirmCancelCallBack = _state2.confirmCancelCallBack,
          confirmCancelBeforeCallBack = _state2.confirmCancelBeforeCallBack;


      var power = confirmCancelBeforeCallBack && confirmCancelBeforeCallBack();
      if (power === false) {
        confirmShow = true;
      } else {
        confirmCancelCallBack && confirmCancelCallBack();
      }
      this.setState({
        confirmShow: confirmShow
      });
    }
  }, {
    key: 'confirmClick',
    value: function confirmClick() {
      var confirmShow = false;
      var _state3 = this.state,
          confirmCallBack = _state3.confirmCallBack,
          confirmBeforeCallBack = _state3.confirmBeforeCallBack;

      if (confirmBeforeCallBack) {
        var power = confirmBeforeCallBack();
        if (!power) {
          confirmShow = true;
        }
      } else {
        confirmCallBack && confirmCallBack();
      }
      this.setState({
        confirmShow: confirmShow
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          toastShow = _state4.toastShow,
          toastContent = _state4.toastContent,
          toastType = _state4.toastType,
          toastTime = _state4.toastTime,
          alertShow = _state4.alertShow,
          alertIconHide = _state4.alertIconHide,
          alertType = _state4.alertType,
          alertChildren = _state4.alertChildren,
          alertTitleText = _state4.alertTitleText,
          alertLabelText = _state4.alertLabelText,
          confirmShow = _state4.confirmShow,
          confirmIconHide = _state4.confirmIconHide,
          confirmType = _state4.confirmType,
          confirmChildren = _state4.confirmChildren,
          confirmBtnType = _state4.confirmBtnType,
          confirmTitle = _state4.confirmTitle,
          confirmcancelBtnText = _state4.confirmcancelBtnText,
          confirmBtnText = _state4.confirmBtnText,
          alertWidth = _state4.alertWidth,
          MaskClick = _state4.MaskClick;


      return _react2.default.createElement(
        'div',
        { className: 'dialogLayout' },
        _react2.default.createElement(
          _alert2.default,
          {
            show: alertShow,
            type: alertType,
            iconHide: alertIconHide,
            title: alertTitleText,
            MaskClick: MaskClick,
            width: alertWidth,
            buttons: [{ label: alertLabelText, onClick: this.alertClick.bind(this) }]
          },
          alertChildren
        ),
        _react2.default.createElement(_toast2.default, {
          content: toastContent,
          toastShow: toastShow,
          type: toastType,
          time: toastTime,
          callback: this.toastHide.bind(this)
        }),
        _react2.default.createElement(
          _confirm2.default,
          {
            show: confirmShow,
            iconHide: confirmIconHide,
            type: confirmType,
            title: confirmTitle,
            buttons: [{
              label: confirmcancelBtnText,
              onClick: this.confirmCancelClick.bind(this)
            }, { type: confirmBtnType, label: confirmBtnText, onClick: this.confirmClick.bind(this) }]
          },
          confirmChildren
        )
      );
    }
  }]);

  return DialogLayout;
}(_react.Component);

exports.default = DialogLayout;