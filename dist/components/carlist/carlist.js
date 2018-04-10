'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var carList = function (_Component) {
  _inherits(carList, _Component);

  function carList(props) {
    _classCallCheck(this, carList);

    var _this = _possibleConstructorReturn(this, (carList.__proto__ || Object.getPrototypeOf(carList)).call(this, props));

    _this.state = {
      selectCarType: null, // 已选择的车辆型号
      show: undefined
    };

    _this.listClick = _this.listClick.bind(_this);
    _this.colorClick = _this.colorClick.bind(_this);
    _this.wrapClick = _this.wrapClick.bind(_this);
    _this.initListData = _this.initListData.bind(_this);
    _this.initColorData = _this.initColorData.bind(_this);
    return _this;
  }

  _createClass(carList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      this.setState(nextprops);
    }
  }, {
    key: 'listClick',
    value: function listClick(e) {
      var ele = e.currentTarget;
      var obj = JSON.parse(ele.dataset.obj);
      this.setState({
        selectCarType: obj
      });
      this.state.onClick(obj);
    }
  }, {
    key: 'colorClick',
    value: function colorClick(e) {
      var ele = e.currentTarget;
      this.state.onClick(JSON.parse(ele.dataset.obj));
    }
  }, {
    key: 'initListData',
    value: function initListData() {
      var _this2 = this;

      var self = this;

      var _state = this.state,
          show = _state.show,
          width = _state.width,
          onClick = _state.onClick,
          listData = _state.listData,
          showWrap = _state.showWrap,
          dataAttrName = _state.dataAttrName,
          selectCarType = _state.selectCarType,
          other = _objectWithoutProperties(_state, ['show', 'width', 'onClick', 'listData', 'showWrap', 'dataAttrName', 'selectCarType']);

      if (!listData) {
        return null;
      }
      return listData.map(function (ele, index) {
        var isCheck = false;
        if (selectCarType && selectCarType.id && selectCarType[dataAttrName.id] === ele[dataAttrName.id]) {
          isCheck = true;
        }
        return _react2.default.createElement(
          'div',
          _extends({
            className: 'list ' + (isCheck ? 'select' : null),
            key: index,
            'data-obj': JSON.stringify(ele),
            onClick: _this2.listClick
          }, other),
          ele[self.props.dataAttrName.name]
        );
      });
    }
  }, {
    key: 'initColorData',
    value: function initColorData() {
      var _this3 = this;

      var self = this,
          colorData = this.state.colorData;

      if (!colorData) {
        return null;
      }
      return colorData.map(function (ele, index) {
        return _react2.default.createElement(
          'div',
          {
            key: index,
            className: 'list color',
            'data-obj': JSON.stringify(ele),
            onClick: _this3.colorClick
          },
          _react2.default.createElement('span', { className: 'iconColor', style: { backgroundColor: ele.color } }),
          ele[self.props.dataAttrName.name]
        );
      });
    }
  }, {
    key: 'wrapClick',
    value: function wrapClick() {
      this.setState({
        show: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          show = _state2.show,
          showWrap = _state2.showWrap,
          width = _state2.width;

      var dialogList = _react2.default.createElement(
        'div',
        { className: '\n          dialogList animated\n          ' + (show === undefined && ' none ') + '\n          ' + (show === false && ' slideOutRight ') + '\n          ' + (show === true && ' slideInRight ') + '\n          w' + width
        },
        this.initListData(),
        this.initColorData()
      );
      return showWrap ? _react2.default.createElement(
        'div',
        { className: 'dialogListWrap', onClick: this.wrapClick },
        dialogList
      ) : dialogList;
    }
  }]);

  return carList;
}(_react.Component);

module.exports = carList;