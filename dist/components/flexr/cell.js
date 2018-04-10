'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _stilr = require('stilr');

var _stilr2 = _interopRequireDefault(_stilr);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ERGONOMICS = Object.keys(_utils.settings);

var cellStyles = _stilr2.default.create({
  base: {
    padding: '0 ' + _utils.variables.gutter
  },
  baseFlex: {
    flex: 1
  },
  flex: {
    display: 'flex'
  },
  top: {
    alignSelf: _utils.vertical.top
  },
  bottom: {
    alignSelf: _utils.vertical.bottom
  },
  center: {
    alignSelf: _utils.vertical.center
  }
}, _stylesheet2.default);

var Cell = (_temp = _class = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell(props, context) {
    _classCallCheck(this, Cell);

    var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props, context));

    _initialiseProps.call(_this);

    return _this;
  }

  _createClass(Cell, [{
    key: 'calcWidth',
    value: function calcWidth(size) {
      if (typeof size === 'number') {
        return {
          width: size < 1 ? Math.round(size * 10000) / 100 + '%' : size + 'px'
        };
      }

      var _ref = size ? size.split('/') : [],
          _ref2 = _slicedToArray(_ref, 2),
          numerator = _ref2[0],
          denominator = _ref2[1];

      return {
        width: 100 / denominator * numerator + '%'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          gutter = _props.gutter,
          flex = _props.flex,
          className = _props.className,
          align = _props.align,
          style = _props.style,
          children = _props.children,
          palm = _props.palm,
          lap = _props.lap,
          portable = _props.portable,
          desk = _props.desk,
          grow = _props.grow,
          rest = _objectWithoutProperties(_props, ['gutter', 'flex', 'className', 'align', 'style', 'children', 'palm', 'lap', 'portable', 'desk', 'grow']);

      var breakpoint = this.getMatchingBreakpoint();

      // Return early for performance
      if (breakpoint === 'hidden') {
        return null;
      }

      var flexSize = this.handleFlexSize(breakpoint);

      this.styles = (0, _utils.assign)({}, gutter ? { padding: '0 ' + gutter } : null, flexSize, style);

      var classes = [cellStyles.base, flexSize ? null : cellStyles.baseFlex, className, flex ? cellStyles.flex : null, align ? cellStyles[align] : null].filter(Boolean).join(' ');

      return _react2.default.createElement(
        'div',
        _extends({}, rest, {
          style: this.styles,
          className: classes }),
        children
      );
    }
  }]);

  return Cell;
}(_react2.default.Component), _class.propTypes = {
  grow: _propTypes2.default.oneOf([false, true, _propTypes2.default.number]),
  gutter: _propTypes2.default.string,
  flex: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(['top', 'center', 'bottom']),
  size: function size(props, propName) {
    var value = props[propName];
    if (value && !(typeof value === 'number' || typeof value === 'string' && /^[0-9]+\/[0-9]+$/.test(value))) {
      return new Error('Size should be a fraction (e.g. 1/6) or a number for fixed size');
    }
  }
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleFlexSize = function (breakpoint) {
    var _props2 = _this2.props,
        grow = _props2.grow,
        size = _props2.size;

    var growStyle = typeof grow === 'number' ? grow : grow === false ? 0 : undefined;

    return breakpoint && breakpoint !== 'hidden' ? _this2.calcWidth(breakpoint) : size ? _this2.calcWidth(size) : growStyle !== undefined ? { flex: growStyle + ' 1 auto',
      WebkitFlex: growStyle + ' 1 auto',
      msFlex: growStyle + ' 1 auto' } : null;
  };

  this.getDefinedBreakpoints = function () {
    var breakpoints = [];

    for (var i = 0, len = ERGONOMICS.length; i < len; i++) {
      if (_this2.props[ERGONOMICS[i]]) breakpoints.push(ERGONOMICS[i]);
    }

    return breakpoints;
  };

  this.getMatchingBreakpoint = function () {
    return _this2.props[_utils.findMatch.apply(null, _this2.getDefinedBreakpoints())];
  };
}, _temp);
exports.default = Cell;