'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by zhaojie on 16/11/21.
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

var NConfirm = (_temp = _class = function (_React$Component) {
  _inherits(NConfirm, _React$Component);

  function NConfirm() {
    _classCallCheck(this, NConfirm);

    return _possibleConstructorReturn(this, (NConfirm.__proto__ || Object.getPrototypeOf(NConfirm)).apply(this, arguments));
  }

  _createClass(NConfirm, [{
    key: 'renderButtons',
    value: function renderButtons() {
      return this.props.buttons.map(function (action, idx) {
        var type = action.type,
            label = action.label,
            className = action.className,
            others = _objectWithoutProperties(action, ['type', 'label', 'className']);

        var cls = (0, _classnames2.default)(_defineProperty({
          didi_btn_nconfirm: true,
          default: type === 'default',
          primary: type === 'primary'
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
          title = _props.title,
          show = _props.show,
          hide = _props.hide,
          transparent = _props.transparent;

      return _react2.default.createElement(
        'div',
        { className: 'jimu-dialog' },
        _react2.default.createElement(
          'div',
          { className: ['didi_dialog_nconfirm', show ? 'show' : undefined].join(' ') },
          _react2.default.createElement(_index2.default, { transparent: transparent }),
          _react2.default.createElement(
            'div',
            { className: ['didi_nconfirm', show ? 'show' : undefined].join(' ') },
            _react2.default.createElement(
              'div',
              { className: 'didi_nconfirm_hd' },
              _react2.default.createElement(
                'strong',
                { className: 'didi_nconfirm_title' },
                title
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'didi_nconfirm_bd' },
              this.renderButtons()
            ),
            _react2.default.createElement(
              'div',
              { className: 'didi_nconfirm_ft' },
              _react2.default.createElement(
                'a',
                { className: 'btn-orange', onClick: hide },
                '\u53D6\u6D88'
              )
            )
          )
        )
      );
    }
  }]);

  return NConfirm;
}(_react2.default.Component), _class.propTypes = {
  buttons: _propTypes2.default.array,
  show: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  transparent: _propTypes2.default.bool
}, _class.defaultProps = {
  buttons: [],
  show: false,
  title: '',
  transparent: false
}, _temp);
exports.default = NConfirm;