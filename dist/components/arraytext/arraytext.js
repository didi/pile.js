'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/04/10.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextList = function TextList(_ref) {
  var textlist = _ref.textlist;
  return _react2.default.createElement(
    'div',
    { className: 'text-list' },
    textlist
  );
};

var ArrayText = (_temp = _class = function (_React$Component) {
  _inherits(ArrayText, _React$Component);

  function ArrayText() {
    _classCallCheck(this, ArrayText);

    return _possibleConstructorReturn(this, (ArrayText.__proto__ || Object.getPrototypeOf(ArrayText)).apply(this, arguments));
  }

  _createClass(ArrayText, [{
    key: 'render',
    value: function render() {
      var text = this.props.text;

      return _react2.default.createElement(
        'div',
        { className: 'array-text' },
        !this.isArray(text) ? text : text.map(function (res, index) {
          return _react2.default.createElement(TextList, { textlist: res, key: index });
        })
      );
    }
  }], [{
    key: 'isArray',
    value: function isArray(obj) {
      return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor === Array;
    }
  }]);

  return ArrayText;
}(_react2.default.Component), _class.defaultProps = {
  text: '1234'
}, _temp);
exports.default = ArrayText;