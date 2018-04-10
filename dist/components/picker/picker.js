'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _es6Viewpoint = require('es6-viewpoint');

var _es6Viewpoint2 = _interopRequireDefault(_es6Viewpoint);

var _index = require('../swipe/index');

var _index2 = _interopRequireDefault(_index);

var _getLocale = require('../localeprovider/getLocale');

var _zhCN = require('../localeprovider/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipeable = _index2.default.Swipeable;

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
// const Picker = React.createClass({
var Picker = (_temp = _class = function (_React$Component) {
  _inherits(Picker, _React$Component);

  function Picker(props) {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

    _this._onScroll = _this._onScroll.bind(_this);
    _this._handleOverlayTouchTap = _this._handleOverlayTouchTap.bind(_this);
    _this._okClick = _this._okClick.bind(_this);
    _this._cancelClick = _this._cancelClick.bind(_this);
    _this.state = {
      value: _this.props.value,
      options: _this.props.options,
      open: _this.props.open,
      optionHeight: 0,
      _scrollStartTop: [],
      _initValueIndexes: [],
      _scrollTimer: undefined,
      closeable: _this.props.open
    };
    _this.determine = true;
    return _this;
  }

  _createClass(Picker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var op = this.refs['op-0-0'],
          opHeight = 0;
      if (op) {
        opHeight = this.state.optionHeight = _reactDom2.default.findDOMNode(op).clientHeight;
      }
      this.state._initValueIndexes.forEach(function (vi, idx) {
        if (vi > 0) {
          var node = _this2.refs['list-' + idx]; // div, ReactDOM.findDOMNode( this.refs['list-'+idx] )
          node.scrollTop = _this2.state._scrollStartTop[idx] = vi * opHeight;
        }
      });
      // window.addEventListener('scroll', this._onPageScroll)
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var self = this,
          values = nextProps.value,
          opArr = nextProps.options,
          preValues = this.state.value,
          preOpArr = this.state.options,
          opHeight = this.state.optionHeight;
      if (!Array.isArray(values)) {
        values = [values];
        opArr = [opArr];
        preValues = [preValues];
        preOpArr = [preOpArr];
      }
      values.forEach(function (v, idx) {
        if (values[idx] !== preValues[idx] || opArr[idx] !== preOpArr[idx]) {
          var ops = opArr[idx],
              top = 0;
          for (var oi = 0; oi < ops.length; oi++) {
            var opv = typeof ops[oi] === 'string' || typeof ops[oi] === 'number' ? ops[oi] : ops[oi].value;
            if (String(opv) === String(v)) {
              top = oi * opHeight;
              break;
            }
          }
          var node = _this3.refs['list-' + idx]; // div, ReactDOM.findDOMNode( this.refs['list-'+idx] )

          setTimeout(function () {
            node.scrollTop = self.state._scrollStartTop[idx] = top;
          });
        }
      });
      this.setState({
        value: nextProps.value,
        options: nextProps.options
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // window.removeEventListener('scroll', this._onPageScroll);
      this.state._scrollTimer && window.clearTimeout(this.state._scrollTimer);
    }
  }, {
    key: 'value',
    value: function value() {
      return this.state.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var values = this.state.value,
          __options = this.state.options;
      if (!Array.isArray(values)) {
        values = [values];
        __options = [__options];
      }

      var initValueIndexes = [];
      var style = {
        width: 100 / __options.length + '%'
      };
      var i = -1; // counter for __options, for it is an array or key-map object
      var lists = __options.map(function (options) {
        if (!options) {
          return;
        }
        i++;
        var j = -1; // counter for options, for it is an array or key-map object
        return _react2.default.createElement(
          'div',
          {
            key: i,
            ref: 'list-' + i,
            'data-id': i,
            className: 'list-wrap',
            style: style,
            onScroll: isBrowser ? _this4._onScroll : undefined
          },
          _react2.default.createElement(
            'ul',
            null,
            options.map(function (op) {
              j++;
              if (typeof op === 'string' || typeof op === 'number') {
                op = {
                  text: op,
                  value: op
                };
              } else if ((typeof op === 'undefined' ? 'undefined' : _typeof(op)) !== 'object' || !op.text) {
                return;
              }
              if (typeof op.value !== 'string' && typeof op.value !== 'number') {
                op.value = '';
              }

              if (String(op.value) === String(values[i])) {
                initValueIndexes.push(j);
              }

              return _react2.default.createElement(
                Swipeable,
                {
                  key: j,
                  ref: 'op-' + i + '-' + j,
                  'data-id': i + '-' + j,
                  'data-value': JSON.stringify(op),
                  nodeName: 'li'
                },
                op.text
              );
            })
          )
        );
      });

      this.state._initValueIndexes = initValueIndexes;

      var popupStyle = {};
      if (this.props.width && _es6Viewpoint2.default && _es6Viewpoint2.default.width >= 768) {
        popupStyle.width = this.props.width;
      }
      var locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'Picker', function () {
        return _zhCN2.default.Picker;
      });
      var cancelBtnText = locale.cancelBtnText,
          okBtnText = locale.okBtnText;


      return _react2.default.createElement(
        'div',
        { className: ['jimu-picker', this.props.className].join(' ') },
        this.props.children,
        _react2.default.createElement(
          'div',
          { className: ['container', 'table', this.props.className, this.state.open ? 'show' : undefined].join(' ') },
          _react2.default.createElement(Swipeable, { className: 'overlay' }),
          _react2.default.createElement(
            'div',
            { className: 'cell' },
            _react2.default.createElement(
              'div',
              { className: ['popup', this.state.open ? 'show' : undefined].join(' '), style: popupStyle },
              _react2.default.createElement(
                'div',
                { className: 'top' },
                _react2.default.createElement(
                  'span',
                  { className: 'cancel', onClick: this._cancelClick },
                  cancelBtnText
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'ok', onClick: this._okClick },
                  okBtnText
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'title' },
                  this.props.titleName
                )
              ),
              lists,
              _react2.default.createElement('div', { className: 'cover upper' }),
              _react2.default.createElement('div', { className: 'cover lower' }),
              _react2.default.createElement('div', { className: 'cell-bg' })
            )
          )
        )
      );
    }
  }, {
    key: 'dismiss',
    value: function dismiss() {
      if (this.state.closeable) {
        this._onDismiss();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      // prevent rapid show/hide
      this._onShow();
    }
  }, {
    key: '_cancelClick',
    value: function _cancelClick() {
      this.setState({
        open: false,
        loading: false
      });
      this.props.onClickCancel && this.props.onClickCancel();
    }
  }, {
    key: '_okClick',
    value: function _okClick() {
      if (this.determine) {
        this._handleOverlayTouchTap(this.state.opValue, this.state.opText, this.state.idx);
      }
    }
  }, {
    key: '_handleOverlayTouchTap',
    value: function _handleOverlayTouchTap(value, text, idx) {
      if (this.state.closeable) {
        this._onDismiss();
        this.props.onClickAway && this.props.onClickAway(value, text, idx);
      }
    }
  }, {
    key: '_onShow',
    value: function _onShow() {
      var _this5 = this;

      setTimeout(function () {
        _this5.state.closeable = true;
      }, 250);
      this.setState({
        open: true
      });
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: '_onDismiss',
    value: function _onDismiss() {
      this.setState({
        open: false,
        loading: false
      });
      this.props.onDismiss && this.props.onDismiss();
    }
  }, {
    key: '_onPageScroll',
    value: function _onPageScroll(e) {}
  }, {
    key: '_onScroll',
    value: function _onScroll(e) {
      var _this6 = this;

      var el = e.target,
          idx = parseInt(el.dataset ? el.dataset.id : el.getAttribute('data-id'), 10),
          opHeight = this.state.optionHeight,
          scrollStartTop = this.state._scrollStartTop;

      window.clearTimeout(this.state._scrollTimer);
      this.state._scrollTimer = window.setTimeout(function () {
        if (typeof scrollStartTop[idx] !== 'number') {
          scrollStartTop[idx] = 0;
        }

        if (scrollStartTop[idx] === el.scrollTop) {
          return;
        }

        var scrollTop = el.scrollTop,
            mod = scrollTop % opHeight,
            percent = mod / opHeight;

        var toLowerItem = function toLowerItem() {
          var diff = opHeight - mod;
          scrollTop += diff;
          el.scrollTop += diff;
        };
        var toUpperItem = function toUpperItem() {
          scrollTop -= mod;
          el.scrollTop -= mod;
        };

        if (scrollTop > scrollStartTop[idx]) {
          percent > 0.46 ? toLowerItem() : toUpperItem();
        } else {
          percent < 0.64 ? toUpperItem() : toLowerItem();
        }
        scrollStartTop[idx] = scrollTop;
        var opname = 'op-' + idx + '-' + scrollTop / opHeight;
        if (_this6.refs[opname] && _reactDom2.default.findDOMNode(_this6.refs[opname]) && _reactDom2.default.findDOMNode(_this6.refs[opname]).getAttribute('data-value')) {
          var op = _reactDom2.default.findDOMNode(_this6.refs[opname]).getAttribute('data-value');
          if (!op) {
            return;
          }
          op = JSON.parse(op);

          var value = _this6.state.value;
          if (Array.isArray(value)) {
            value[idx] = op.value;
          } else {
            value = op.value;
          }
          _this6.setState({
            value: value,
            opValue: op.value,
            opText: op.text,
            idx: idx
          });
          _this6.props.onChange(op.value, op.text, idx);
          _this6.determine = true;
        } else {
          _this6.determine = false;
        }
      }, 250);
    }
  }, {
    key: '_clickOnOption',
    value: function _clickOnOption(e) {
      var el = e.target,
          value = el.dataset ? el.dataset.id : el.getAttribute('data-id');
      if (!value) {
        return;
      }

      var arr = value.split('-');
      if (arr.length < 2) {
        return;
      }

      var _list = this.refs['list-' + arr[0]];
      if (!_list) {
        return;
      }
      var list = _list; // div, ReactDOM.findDOMNode(_list)
      list.scrollTop = this.state.optionHeight * parseInt(arr[1], 10);
    }
  }]);

  return Picker;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array]).isRequired,
  options: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onClickAway: _propTypes2.default.func,
  width: _propTypes2.default.string
}, _class.defaultProps = {
  onChange: function onChange(value, text, idx) {}
}, _temp);

Picker.contextTypes = {
  jimuLocale: _propTypes2.default.object
};
exports.default = Picker;