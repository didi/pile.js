'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _align = require('../align');

var _align2 = _interopRequireDefault(_align);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.state = {
      isHide: false,
      points: ['', '']
    };
    _this.closeTip = _this.closeTip.bind(_this);
    _this.renderTipContent = _this.renderTipContent.bind(_this);
    _this.getTarget = _this.getTarget.bind(_this);
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          placement = _props.placement,
          isShow = _props.isShow;

      this.handleShowTip(isShow);
      if (placement === 'top') {
        this.setState({
          triangleStyle: 'tb-background-bottom',
          points: ['bc', 'tc'],
          offset: [0, -5]
        });
      } else if (placement === 'bottom') {
        this.setState({
          triangleStyle: 'tb-background-top',
          points: ['tc', 'bc'],
          offset: [0, 5]
        });
      } else if (placement === 'left') {
        this.setState({
          triangleStyle: 'tb-background-right',
          points: ['cr', 'cl'],
          offset: [-5, 0]
        });
      } else if (placement === 'right') {
        this.setState({
          triangleStyle: 'tb-background-left',
          points: ['cl', 'cr'],
          offset: [5, 0]
        });
      } else if (placement === 'topLeft') {
        this.setState({
          triangleStyle: 'tb-background-topLeft',
          points: ['br', 'tl'],
          offset: [20, -5]
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._layer = document.createElement('div');
      var idName = this.props.idName;

      if (idName) {
        document.getElementById(idName).appendChild(this._layer);
      } else {
        document.body.appendChild(this._layer);
      }
      this.renderTipContent();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isShow = nextProps.isShow;

      this.handleShowTip(isShow);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderTipContent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2.default.unmountComponentAtNode(this._layer);
    }
  }, {
    key: 'getTarget',
    value: function getTarget() {
      return _reactDom2.default.findDOMNode(this);
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
    key: 'renderTipContent',
    value: function renderTipContent() {
      var placement = this.props.placement,
          _state = this.state,
          triangleStyle = _state.triangleStyle,
          isHide = _state.isHide,
          points = _state.points,
          offset = _state.offset;

      _reactDom2.default.render(_react2.default.createElement(
        _align2.default,
        {
          target: this.getTarget,
          align: { points: points, offset: offset },
          monitorWindowResize: true
        },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('tooltip-box', isHide ? 'hide' : '', ['jimu-popover-' + placement]) },
          _react2.default.createElement(
            'span',
            null,
            this.props.overlay
          ),
          _react2.default.createElement(
            'div',
            { className: 'tip-close', onClick: this.closeTip },
            _react2.default.createElement('i', { className: 'car-icons-shut icon-del' })
          ),
          _react2.default.createElement('div', { className: (0, _classnames2.default)('triangle-border', triangleStyle) })
        )
      ), this._layer);
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
      var children = this.props.children;

      var child = _react2.default.Children.only(children);
      return child;
    }
  }]);

  return Tooltip;
}(_react.Component);

exports.default = Tooltip;