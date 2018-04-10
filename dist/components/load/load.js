'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loadcargit = require('../../styles/image/loadingcar.gif');

var Load = (_temp = _class = function (_React$Component) {
  _inherits(Load, _React$Component);

  /*
    Load 组件
      show: 是否展示组件
      loadType (string)
        carFace : 车子正面动图
        carSide : 车子侧面动图
        carRun : 车子跑动动图
        loadEffect : loading 菊花动图
        loadLogo : 嘀嘀出行logo转动加载
      className (string) 自定义class名称
      loadSize (string) loadicon 尺寸
      timeOut: 超时时长
  */
  function Load(props) {
    _classCallCheck(this, Load);

    var _this = _possibleConstructorReturn(this, (Load.__proto__ || Object.getPrototypeOf(Load)).call(this, props));

    _this.state = _this.props;
    _this._timeOut = _this._timeOut.bind(_this);
    return _this;
  }

  _createClass(Load, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._timeOut();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(nextProps);
      this._timeOut();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: '_timeOut',
    value: function _timeOut() {
      var self = this,
          timeOut = this.state.timeOut;


      if (timeOut) {
        self.timer = setTimeout(function () {
          self.setState({
            show: false
          });
          self.props.timeOutBack && self.props.timeOutBack();
        }, timeOut);
      }
    }
  }, {
    key: '_loadIcon',
    value: function _loadIcon() {
      var _props = this.props,
          loadType = _props.loadType,
          text = _props.text;

      switch (loadType) {
        case 'carFace':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer car-face' },
            _react2.default.createElement('div', { className: 'moveBox' })
          );

        case 'carRunNew':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer car-run-new' },
            _react2.default.createElement('div', { className: 'moveBox' })
          );

        case 'carSide':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer car-side' },
            _react2.default.createElement('div', { className: 'moveBox' })
          );
        case 'carRun':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer car-run' },
            _react2.default.createElement('img', { src: loadcargit, alt: 'loading' })
          );

        case 'loadEffect':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer load-effect' },
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null),
            _react2.default.createElement('span', null)
          );
        /*
          <div className="load-layer load-logo">
            <img src = {loadgif} />
          </div>
        */
        case 'loadLogo':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer jimu-load-loading' },
            _react2.default.createElement(
              'div',
              { className: 'load-spinner' },
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null)
            ),
            _react2.default.createElement(
              'p',
              { className: 'load-text' },
              text
            )
          );

        case 'loading':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer jimu-load-loading' },
            _react2.default.createElement(
              'div',
              { className: 'load-spinner' },
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null)
            ),
            _react2.default.createElement(
              'p',
              { className: 'load-text' },
              text
            )
          );

        case 'ballScale':
          return _react2.default.createElement(
            'div',
            { className: 'load-layer jimu-load-ball' },
            _react2.default.createElement(
              'div',
              { className: 'load-balls' },
              _react2.default.createElement('span', null),
              _react2.default.createElement('span', null),
              _react2.default.createElement('span', null)
            )
          );

        default:
          return _react2.default.createElement(
            'div',
            { className: 'load-layer jimu-load-loading' },
            _react2.default.createElement(
              'div',
              { className: 'load-spinner' },
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null),
              _react2.default.createElement('div', null)
            ),
            _react2.default.createElement(
              'p',
              { className: 'load-text' },
              text
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          loadSize = _props2.loadSize,
          showTypeTips = _props2.showTypeTips;
      var show = this.state.show;

      var cls = (0, _classnames2.default)({
        'mask-layout': showTypeTips,
        'dis-mask-layout': !showTypeTips
      });

      var loadClass = loadSize === 'small' ? 'size-small' : 'size-big';
      var _iconHtml = this._loadIcon();
      return _react2.default.createElement(
        'div',
        { className: className, style: { display: show ? 'block' : 'none' } },
        showTypeTips ? _react2.default.createElement(_mask2.default, null) : null,
        _react2.default.createElement(
          'div',
          { className: cls },
          _react2.default.createElement(
            'div',
            { className: loadClass },
            _iconHtml
          )
        )
      );
    }
  }]);

  return Load;
}(_react2.default.Component), _class.propTypes = {
  show: _propTypes2.default.bool,
  loadType: _propTypes2.default.string,
  className: _propTypes2.default.string,
  loadSize: _propTypes2.default.string,
  timeOut: _propTypes2.default.number,
  timeOutBack: _propTypes2.default.func,
  showTypeTips: _propTypes2.default.bool
}, _class.defaultProps = {
  show: true,
  loadType: 'loadLogo', // 展示方式 string ( carFace、 carSide、 carRun、loadEffect 、loadLogo、carRunNew、loading 、 ballScale)
  className: '', // 自定义class名称 string
  loadSize: 'small', // loadicon 尺寸 string (small、big)
  timeOut: null,
  timeOutBack: null,
  showTypeTips: true,
  text: '加载中...'
}, _temp);
exports.default = Load;