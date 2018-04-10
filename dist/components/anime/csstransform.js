'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _anime = require('./anime.min');

var _anime2 = _interopRequireDefault(_anime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anime = function (_Component) {
  _inherits(Anime, _Component);

  function Anime(props) {
    _classCallCheck(this, Anime);

    var _this = _possibleConstructorReturn(this, (Anime.__proto__ || Object.getPrototypeOf(Anime)).call(this, props));

    _this.addTarget = function (newTarget) {
      _this.targets = [].concat(_toConsumableArray(_this.targets), [newTarget]);
    };

    _this.targets = [];
    return _this;
  }

  _createClass(Anime, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var animeProps = _extends({
        targets: this.targets
      }, this.props);
      delete animeProps.children;
      this.anime = (0, _anime2.default)(animeProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // let children = []
      // if (this.props.children) {
      //   if (Array.isArray(this.props.children)) children = this.props.children
      //   else children = [this.props.children]
      // }
      // return ( < g > {
      //   children.map((child, i) => (React.cloneElement(child, {
      //     key: i,
      //     ref: this.addTarget
      //   })))
      // } < /g>)

      return _react2.default.createElement(
        'g',
        null,
        _react2.default.Children.map(this.props.children, function (child, i) {
          if (!child) {
            return;
          }
          return _react2.default.cloneElement(child, {
            key: i,
            ref: _this2.addTarget
          });
        })
      );
    }
  }]);

  return Anime;
}(_react.Component);

exports.default = Anime;