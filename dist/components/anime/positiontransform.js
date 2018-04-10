'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PositionSwitch = (_temp = _class = function (_Component) {
  _inherits(PositionSwitch, _Component);

  function PositionSwitch() {
    _classCallCheck(this, PositionSwitch);

    return _possibleConstructorReturn(this, (PositionSwitch.__proto__ || Object.getPrototypeOf(PositionSwitch)).apply(this, arguments));
  }

  _createClass(PositionSwitch, [{
    key: 'componentDidMount',


    // constructor(props) {
    //   super(props);
    // }

    value: function componentDidMount() {
      var orderArr = this.props.orderArr;

      this.transformMove(orderArr);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (nextprops.orderArr !== this.props.orderArr) {
        this.transformMove(nextprops.orderArr);
      }
    }
  }, {
    key: 'transformMove',
    value: function transformMove(obj) {
      var self = this;
      var _props = this.props,
          width = _props.width,
          itemsMoveBack = _props.itemsMoveBack;


      if (this.props.children.length !== obj.length) {
        return;
      }

      obj.map(function (re, idx) {
        self.refs['move_' + (re - 1)].style.webkitTransform = 'translate(' + width * (idx - re + 1) + 'px,0)';
      });
      itemsMoveBack && itemsMoveBack({ obj: obj });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          children = _props2.children;

      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-position-switch': true
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.Children.map(children, function (re, index) {
          return _react2.default.createElement(
            'div',
            {
              style: { width: width + 'px' },
              ref: 'move_' + index,
              className: 'jimu-move-item',
              key: index
            },
            re
          );
        })
      );
    }
  }]);

  return PositionSwitch;
}(_react.Component), _class.defaultProps = {
  width: 80, // 子元素移动的单位宽度
  orderArr: [1, 2, 3, 4], // 子元素排列的数组（数组个数需与自元素的个数一致）
  itemsMoveBack: function itemsMoveBack() {}
}, _temp);
exports.default = PositionSwitch;