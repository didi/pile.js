'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  inputsAlign: _propTypes2.default.string,
  asideType: _propTypes2.default.string,
  asideVal: _propTypes2.default.string,
  asideName: _propTypes2.default.string,
  asideId: _propTypes2.default.string,
  mainValue: _propTypes2.default.string,
  mainClassName: _propTypes2.default.string,
  mainFocusClass: _propTypes2.default.string,
  mainBlurClass: _propTypes2.default.string,
  mainMaxlength: _propTypes2.default.number
};

var defaultProps = {
  inputsAlign: '', // 设置侧边单选框、复选框位置 （left、right）
  asideType: '', // 设置侧边input类型 （checkbox、radio）
  asideVal: '', // 侧边input value值
  asideName: '', // 侧边input name值
  asideId: '', // 侧边input id 名称
  mainValue: '', // input输入框 默认值
  mainClassName: '', // input输入框  class名称
  mainFocusClass: 'focus', // input输入框 focus class名称
  mainBlurClass: 'blur', // input输入框 blur class名称
  mainMaxlength: 99999 // input输入框 最大输入字符
};

var Inputs = function Inputs(props) {
  var _classNames;

  var className = props.className,
      inputsAlign = props.inputsAlign,
      asideType = props.asideType,
      asideVal = props.asideVal,
      asideName = props.asideName,
      asideId = props.asideId,
      mainValue = props.mainValue,
      mainClassName = props.mainClassName,
      mainFocusClass = props.mainFocusClass,
      mainBlurClass = props.mainBlurClass,
      mainMaxlength = props.mainMaxlength,
      mainName = props.mainName,
      mainId = props.mainId,
      others = _objectWithoutProperties(props, ['className', 'inputsAlign', 'asideType', 'asideVal', 'asideName', 'asideId', 'mainValue', 'mainClassName', 'mainFocusClass', 'mainBlurClass', 'mainMaxlength', 'mainName', 'mainId']);

  var aligncls = inputsAlign === 'left' ? 'align-lf' : 'align-rt';
  var cls = (0, _classnames2.default)((_classNames = {
    'name-all': true,
    'jimu-inputs': true
  }, _defineProperty(_classNames, aligncls, aligncls), _defineProperty(_classNames, className, className), _classNames));

  var clsinput = (0, _classnames2.default)({
    'main-input': asideType !== '',
    'main-input-base': asideType === ''
  });

  return _react2.default.createElement(
    'div',
    { className: cls },
    inputsAlign === 'left' && _react2.default.createElement(
      'span',
      { className: 'aside-input' },
      _react2.default.createElement(_input2.default, {
        id: asideId,
        type: asideType,
        value: asideVal,
        name: asideName
      })
    ),
    _react2.default.createElement(
      'div',
      { className: clsinput },
      _react2.default.createElement(_input2.default, _extends({
        id: mainId,
        name: mainName,
        defaultValue: mainValue,
        className: mainClassName,
        maxLength: mainMaxlength,
        focusClass: mainFocusClass,
        blurClass: mainBlurClass
      }, others))
    ),
    inputsAlign === 'right' && _react2.default.createElement(
      'span',
      { className: 'aside-input' },
      _react2.default.createElement(_input2.default, {
        id: asideId,
        type: asideType,
        value: asideVal,
        name: asideName
      })
    )
  );
};

Inputs.propTypes = propTypes;
Inputs.defaultProps = defaultProps;

exports.default = Inputs;