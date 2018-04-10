'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuideTooltip = function (_Component) {
  _inherits(GuideTooltip, _Component);

  function GuideTooltip(props) {
    _classCallCheck(this, GuideTooltip);

    var _this = _possibleConstructorReturn(this, (GuideTooltip.__proto__ || Object.getPrototypeOf(GuideTooltip)).call(this, props));

    _this.state = {
      isHide: false
    };
    _this.closeTip = _this.closeTip.bind(_this);
    return _this;
  }

  _createClass(GuideTooltip, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          placement = _props.placement,
          isShow = _props.isShow,
          right = _props.right;

      this.handleShowTip(isShow);
      if (placement === 'top') {
        this.setState({
          triangleStyle: 'tb-background-bottom'
        });
      } else if (placement === 'bottom') {
        this.setState({
          triangleStyle: 'tb-background-top'
        });
      } else if (placement === 'left') {
        this.setState({
          triangleStyle: 'tb-background-right'
        });
      } else if (placement === 'right') {
        this.setState({
          triangleStyle: 'tb-background-left'
        });
      }
      if (right) {
        this.setState({
          tooltipStyle: {
            position: 'absolute',
            right: right
          }
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isShow = nextProps.isShow;

      this.handleShowTip(isShow);
    }
  }, {
    key: 'handleShowTip',
    value: function handleShowTip(isShow) {
      if (isShow || typeof isShow === 'undefined') {
        this.setState({
          isHide: false
        });
      } else {
        this.setState({
          isHide: true
        });
      }
    }
  }, {
    key: 'closeTip',
    value: function closeTip() {
      this.setState({
        isHide: true
      });
      if (typeof this.props.setTooltipClose === 'function') {
        this.props.setTooltipClose();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          triangleStyle = _state.triangleStyle,
          isHide = _state.isHide,
          tooltipStyle = _state.tooltipStyle;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('tooltip-box', isHide ? 'hide' : ''), style: tooltipStyle },
        _react2.default.createElement(
          'span',
          null,
          this.props.overlay
        ),
        _react2.default.createElement(
          'div',
          { className: 'tip-close', onClick: this.closeTip },
          _react2.default.createElement('i', { className: 'car-icons-shut icon-close-style' })
        ),
        _react2.default.createElement('div', { className: (0, _classnames2.default)('triangle-border', triangleStyle) })
      );
    }
  }]);

  return GuideTooltip;
}(_react.Component);

exports.default = GuideTooltip;