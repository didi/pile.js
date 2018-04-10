'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by jf on 15/10/27.
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

var Confirm = (_temp = _class = function (_React$Component) {
  _inherits(Confirm, _React$Component);

  function Confirm(props) {
    _classCallCheck(this, Confirm);

    var _this = _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, props));

    var iconHide = _this.props.iconHide;

    _this.state = { iconHide: iconHide };
    _this.MaskClick = _this.MaskClick.bind(_this);
    return _this;
  }

  _createClass(Confirm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.iconHide !== this.props.iconHide) {
        this.state = {
          iconHide: nextProps.iconHide
        };
      }
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
            label = action.label,
            className = action.className,
            others = _objectWithoutProperties(action, ['type', 'label', 'className']);

        var cls = (0, _classnames2.default)(_defineProperty({
          btn_white: type !== 'default',
          btn_orange: type === 'default'
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
      var _props = this.props,
          type = _props.type,
          title = _props.title,
          show = _props.show,
          children = _props.children,
          iconHide = this.state.iconHide;

      var className = (0, _classnames2.default)({
        didi_icon: true,
        didi_icon_hide: iconHide,
        'icon-popup_warning': type !== 'success',
        'icon-popup_right': type === 'success'
      });
      return _react2.default.createElement(
        'div',
        { className: 'jimu-dialog' },
        _react2.default.createElement(
          'div',
          { className: 'didi_dialog_confirm', style: { display: show ? 'block' : 'none' } },
          _react2.default.createElement(_index2.default, { onClick: this.MaskClick }),
          _react2.default.createElement(
            'div',
            { className: 'didi_dialog' },
            _react2.default.createElement('p', { className: className }),
            _react2.default.createElement(
              'div',
              { className: 'd_tip title_font tips-content' },
              title
            ),
            children && _react2.default.createElement(
              'div',
              { className: 'dialog-confirm-content' },
              children
            ),
            _react2.default.createElement(
              'div',
              { className: 'd_btns didi_btn_confirm' },
              this.renderButtons()
            )
          )
        )
      );
    }
  }]);

  return Confirm;
}(_react2.default.Component), _class.propTypes = {
  buttons: _propTypes2.default.array,
  show: _propTypes2.default.bool,
  title: _propTypes2.default.string
}, _class.defaultProps = {
  buttons: [],
  title: '',
  iconHide: false
}, _temp);
exports.default = Confirm;