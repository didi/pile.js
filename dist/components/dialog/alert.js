'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by zhaojie on 16/06/12.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../mask/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alert = (_temp = _class = function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert(props) {
    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

    var _this$props = _this.props,
        iconHide = _this$props.iconHide,
        width = _this$props.width;

    _this.state = {
      iconHide: iconHide,
      width: width
    };
    _this.MaskClick = _this.MaskClick.bind(_this);
    return _this;
  }

  _createClass(Alert, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 居中
      var that = this;
      var dialog_alert = this.dialog_alert,
          didi_icon_alert = this.didi_icon_alert,
          title_font = this.title_font;

      dialog_alert.style.background = '#fff';
      dialog_alert.style.width = that.state.width || '267px';
      dialog_alert.style.textAlign = 'center';
      didi_icon_alert.style.margin = '0 0 16px';
      title_font.style.lineHeight = '22px';
      title_font.style.marginBottom = !this.props.children ? '20px' : '10px';
      title_font.style.fontSize = '16px';
      title_font.style.color = '#333';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.iconHide !== this.props.iconHide) {
        this.setState({
          iconHide: nextProps.iconHide
        });
      }
      var dialog_alert = this.dialog_alert,
          title_font = this.title_font;

      dialog_alert.style.width = nextProps.width || '267px';
      title_font.style.marginBottom = !nextProps.children ? '20px' : '10px';
    }
  }, {
    key: 'MaskClick',
    value: function MaskClick() {
      this.props.MaskClick && this.props.MaskClick();
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      return this.props.buttons.map(function (action, idx) {
        var type = action.type,
            className = action.className,
            label = action.label,
            others = _objectWithoutProperties(action, ['type', 'className', 'label']);

        var cls = (0, _classnames2.default)(_defineProperty({
          btn_orange: true
        }, className, className));
        return _react2.default.createElement(
          'a',
          _extends({
            key: idx
          }, others, {
            className: cls
          }),
          label
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          show = _props.show,
          children = _props.children,
          type = _props.type;
      var iconHide = this.state.iconHide;

      var className = (0, _classnames2.default)({
        // "didi_icon icon-popup_warning": !!type === false ||  type === 'warning',
        didi_icon_hide: iconHide,
        'didi_icon icon-popup_right': type === 'success',
        'didi_icon icon-popup_warning': type !== 'success'
      });
      return _react2.default.createElement(
        'div',
        { className: 'jimu-dialog' },
        _react2.default.createElement(
          'div',
          { className: 'didi_dialog_alert', style: { display: show ? 'block' : 'none' } },
          _react2.default.createElement(_index2.default, { onClick: this.MaskClick }),
          _react2.default.createElement(
            'div',
            { className: 'didi_dialog', ref: function ref(c) {
                _this2.dialog_alert = c;
              } },
            _react2.default.createElement('p', { className: className, ref: function ref(c) {
                _this2.didi_icon_alert = c;
              } }),
            _react2.default.createElement(
              'div',
              { className: 'd_tip title_font tips-title', ref: function ref(c) {
                  _this2.title_font = c;
                } },
              title
            ),
            children && _react2.default.createElement(
              'div',
              { className: 'dialog-alert-content' },
              children
            ),
            _react2.default.createElement(
              'div',
              { className: 'd_btns didi_btn_alert' },
              this.renderButtons()
            )
          )
        )
      );
    }
  }]);

  return Alert;
}(_react2.default.Component), _class.propTypes = {
  // buttons: PropTypes.array,
  show: _propTypes2.default.bool,
  title: _propTypes2.default.string
}, _class.defaultProps = {
  buttons: [],
  title: '',
  iconHide: false
}, _temp);
exports.default = Alert;