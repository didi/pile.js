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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextLink = (_temp = _class = function (_React$Component) {
  _inherits(TextLink, _React$Component);

  function TextLink() {
    _classCallCheck(this, TextLink);

    return _possibleConstructorReturn(this, (TextLink.__proto__ || Object.getPrototypeOf(TextLink)).apply(this, arguments));
  }

  _createClass(TextLink, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          className = _props.className,
          iconFloat = _props.iconFloat,
          children = _props.children,
          iconClassName = _props.iconClassName,
          others = _objectWithoutProperties(_props, ['type', 'className', 'iconFloat', 'children', 'iconClassName']);

      var Component = this.props.href ? 'a' : 'span';
      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-link': true,
        'jimu-link-normal': type === 'normal',
        'jimu-link-danger': type === 'danger',
        'jimu-link-disabled': type === 'disabled',
        'jimu-link-left': iconFloat === 'left' && iconClassName,
        'jimu-link-right': iconFloat === 'right' && iconClassName
      }, className, className));

      return _react2.default.createElement(
        Component,
        _extends({}, others, { className: cls }),
        iconClassName && iconFloat === 'left' && _react2.default.createElement('i', { className: iconClassName }),
        children,
        iconClassName && iconFloat === 'right' && _react2.default.createElement('i', { className: iconClassName })
      );
    }
  }]);

  return TextLink;
}(_react2.default.Component), _class.propTypes = {
  type: _propTypes2.default.string,
  href: _propTypes2.default.string,
  iconClassName: _propTypes2.default.string,
  iconFloat: _propTypes2.default.string
}, _class.defaultProps = {
  type: '', // normal 普通  ， danger 危险提示 ，disabled 禁止
  href: '',
  iconClassName: '',
  iconFloat: 'left'
}, _temp);
exports.default = TextLink;