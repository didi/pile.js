'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/04/10.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../button/index');

var _index2 = _interopRequireDefault(_index);

var _getLocale = require('../localeprovider/getLocale');

var _zhCN = require('../localeprovider/zh-CN');

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = (_temp = _class = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      text: '',
      focus: false
    };
    _this.submitHandle = _this.submitHandle.bind(_this);
    _this.focusHandle = _this.focusHandle.bind(_this);
    _this.blurHandle = _this.blurHandle.bind(_this);
    _this.changeHandle = _this.changeHandle.bind(_this);
    _this.clearHandle = _this.clearHandle.bind(_this);
    _this.cancelHandle = _this.cancelHandle.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'changeHandle',
    value: function changeHandle(e) {
      var text = e.target.value;
      if (this.props.onChangeHandle) this.props.onChangeHandle(text, e);
      this.setState({ text: text });
    }
  }, {
    key: 'cancelHandle',
    value: function cancelHandle(e) {
      this.setState({
        focus: false,
        text: ''
      });
      if (this.props.onCancelHandle) this.props.onCancelHandle(e);
    }
  }, {
    key: 'clearHandle',
    value: function clearHandle(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ text: '' });
      if (this.props.onClearHandle) this.props.onClearHandle(e);
      this.searchInput.focus();
    }
  }, {
    key: 'blurHandle',
    value: function blurHandle() {
      if (this.state.text === '') {
        this.setState({ focus: false });
      }

      this.props.onBlurHandle && this.props.onBlurHandle();
    }
  }, {
    key: 'focusHandle',
    value: function focusHandle() {
      this.setState({ focus: true });
      this.props.onFocusHandle && this.props.onFocusHandle();
    }
  }, {
    key: 'submitHandle',
    value: function submitHandle(e) {
      if (this.props.onSubmitHandle) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onSubmitHandle(this.state.text, e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          name = _props.name,
          onChangeHandle = _props.onChangeHandle,
          onClearHandle = _props.onClearHandle,
          onSubmitHandle = _props.onSubmitHandle,
          onFocusHandle = _props.onFocusHandle,
          onBlurHandle = _props.onBlurHandle,
          onCancelHandle = _props.onCancelHandle,
          others = _objectWithoutProperties(_props, ['className', 'name', 'onChangeHandle', 'onClearHandle', 'onSubmitHandle', 'onFocusHandle', 'onBlurHandle', 'onCancelHandle']);

      var cls = (0, _classnames2.default)(_defineProperty({
        'pile-search-bar': true,
        'pile-focusing': this.state.focus
      }, className, className));
      var locale = (0, _getLocale.getComponentLocale)(this.props, this.context, 'Search', function () {
        return _zhCN2.default.Search;
      });
      var cancelText = locale.cancelText,
          placeholder = locale.placeholder;

      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(
          'div',
          { className: 'pile-search-form' },
          _react2.default.createElement(
            'div',
            { className: 'pile-search-layout' },
            _react2.default.createElement('span', { className: 'pos-a icon-search', onClick: this.submitHandle }),
            _react2.default.createElement('input', _extends({
              ref: function ref(n) {
                _this2.searchInput = n;
              },
              type: 'text',
              className: 'pile-search-input',
              onFocus: this.focusHandle,
              onBlur: this.blurHandle,
              onInput: this.changeHandle,
              value: this.state.text

            }, others, {
              placeholder: placeholder
            })),
            _react2.default.createElement('span', { className: 'pos-a icon-del', onClick: this.clearHandle })
          )
        ),
        _react2.default.createElement(
          _index2.default,
          {
            className: 'cancel-btn',
            disabled: true,
            size: 'small',
            onClick: this.cancelHandle
          },
          cancelText
        )
      );
    }
  }]);

  return Search;
}(_react2.default.Component), _class.propTypes = {
  name: _propTypes2.default.string,
  onChangeHandle: _propTypes2.default.func,
  onClearHandle: _propTypes2.default.func,
  onSubmitHandle: _propTypes2.default.func,
  onFocusHandle: _propTypes2.default.func,
  onBlurHandle: _propTypes2.default.func,
  onCancelHandle: _propTypes2.default.func
}, _class.defaultProps = {
  name: 'pile-search',
  onChangeHandle: function onChangeHandle() {},
  onClearHandle: function onClearHandle() {},
  onCancelHandle: function onCancelHandle() {},
  onFocusHandle: function onFocusHandle() {},
  onBlurHandle: function onBlurHandle() {},
  onSubmitHandle: function onSubmitHandle() {}
}, _temp);


Search.contextTypes = {
  pileLocale: _propTypes2.default.object
};

exports.default = Search;