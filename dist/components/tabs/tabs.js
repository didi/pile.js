'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by yanshenshen on 17/11/2.
                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = (_temp = _class = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    var _this$props = _this.props,
        activeIndex = _this$props.activeIndex,
        children = _this$props.children;

    _this.state = {
      activeIndex: activeIndex > children.length ? children.length : activeIndex
    };
    if (activeIndex > children.length) {
      console.error('activeIndex值大于了元素个数');
    }

    _this.handleTabClick = _this.handleTabClick.bind(_this);
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setTabHdX(this.state.activeIndex);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeIndex !== this.props.activeIndex) {
        this.setState({
          activeIndex: nextProps.activeIndex
        });
        var activeIndex = nextProps.activeIndex,
            children = nextProps.children,
            newActiveIndex = activeIndex > children.length ? children.length : activeIndex;

        this.state = {
          activeIndex: newActiveIndex
        };
        if (activeIndex > children.length) {
          console.error('activeIndex值大于了元素个数');
        }

        this.setTabHdX(newActiveIndex);
      }
    }

    // 设置当前选中导航位置

  }, {
    key: 'setTabHdX',
    value: function setTabHdX(activeIndex) {
      var tabsHd = this.tabsHd,
          NavNode = this['tabsNav-' + activeIndex],
          TabsHdWidth = _reactDom2.default.findDOMNode(tabsHd).clientWidth,
          NodeLeft = _reactDom2.default.findDOMNode(NavNode).offsetLeft,
          NodeWidth = _reactDom2.default.findDOMNode(NavNode).clientWidth;

      if (NodeLeft + NodeWidth > TabsHdWidth) {
        _reactDom2.default.findDOMNode(tabsHd).scrollTo(NodeLeft, 0);
      }
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(activeIndex) {
      if (activeIndex === this.state.activeIndex) {
        return;
      }
      this.setState({ activeIndex: activeIndex });
      this.props.onChange({ activeIndex: activeIndex });
    }
  }, {
    key: 'renderTabNav',
    value: function renderTabNav() {
      var _this2 = this;

      var children = this.props.children,
          activeIndex = this.state.activeIndex;

      return _react2.default.createElement(
        'div',
        { className: 'jimu-tabs-hd', ref: function ref(n) {
            _this2.tabsHd = n;
          } },
        _react2.default.Children.map(children, function (child, i) {
          if (!child) {
            return;
          }
          var navCls = (0, _classnames2.default)({
            'jimu-tabs-nav': true,
            'jimu-tabs-nav-active': i == activeIndex - 1
          });
          return _react2.default.createElement(
            'div',
            {
              className: navCls,
              key: i,
              ref: function ref(n) {
                return _this2['tabsNav-' + (i + 1)] = n;
              },
              onClick: function onClick() {
                _this2.handleTabClick(i + 1);
              }
            },
            _react2.default.createElement(
              'b',
              { className: 'jimu-tabs-nav-bar' },
              child.props.tab
            )
          );
        })
      );
    }
  }, {
    key: 'renderTabContent',
    value: function renderTabContent() {
      var children = this.props.children,
          activeIndex = this.state.activeIndex;

      return _react2.default.createElement(
        'div',
        { className: 'jimu-tabs-bd' },
        _react2.default.Children.map(children, function (child, i) {
          if (!child) {
            return;
          }
          var contentCls = (0, _classnames2.default)({
            'jimu-tabs-content': true,
            'jimu-tabs-content-active': i === activeIndex - 1
          });
          return _react2.default.createElement(
            'div',
            { className: contentCls, key: i },
            child
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          isInLocal = _props.isInLocal;

      var cls = (0, _classnames2.default)(_defineProperty({
        'jimu-tabs': true,
        'jimu-tabs-in-local': isInLocal
      }, className, className));
      return _react2.default.createElement(
        'div',
        { className: cls },
        this.renderTabNav(),
        this.renderTabContent()
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component), _class.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  activeIndex: _propTypes2.default.number, // 默认索引
  isInLocal: _propTypes2.default.bool, // 默认索引
  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  activeIndex: 1,
  isInLocal: false,
  onChange: function onChange() {}
}, _temp);
exports.default = Tabs;
// onClick={self.handleTabClick.bind(this, i + 1)}