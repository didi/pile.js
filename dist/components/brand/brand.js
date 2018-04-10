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

/*
<Brand
  cityArr={cityArr}  // 城市数组
  dataAttrName={   // 城市对象的默认属性为// city_id、city_name、first_char,如果对象不是这三个属性名，请把属性名传进去
    {
      id:'city_id',
      name:'city_name',
      firstChar:'first_char'
    }
  }
  callBack={this.selectCallBack.bind(this)}  选择完以后，回调函数
/>
*/

var Brand = function (_Component) {
  _inherits(Brand, _Component);

  function Brand(props) {
    _classCallCheck(this, Brand);

    var _this = _possibleConstructorReturn(this, (Brand.__proto__ || Object.getPrototypeOf(Brand)).call(this, props));

    var i = 0;
    var firstChar = [];
    // 把26个字母放进数组里
    while (i < 26) {
      firstChar.push(String.fromCharCode(i + 97).toLocaleUpperCase());
      i++;
    }

    _this.fast_charTouchMove = _this.fast_charTouchMove.bind(_this);
    _this.fast_charTouchEnd = _this.fast_charTouchEnd.bind(_this);
    _this.fast_charClick = _this.fast_charClick.bind(_this);
    _this.carClick = _this.carClick.bind(_this);
    _this.hotCarBrandClick = _this.hotCarBrandClick.bind(_this);
    _this.initMaxChar = _this.initMaxChar.bind(_this);
    _this.initHotCarBrandCon = _this.initHotCarBrandCon.bind(_this);
    _this.initCarBrandCon = _this.initCarBrandCon.bind(_this);
    _this.init_fast_char = _this.init_fast_char.bind(_this);

    _this.state = {
      selectBrand: null,
      max_char: 'A',
      showMaxChar: false,
      firstChar: firstChar
    };
    return _this;
  }

  _createClass(Brand, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          carArr = _props.carArr,
          dataAttrName = _props.dataAttrName;

      if (carArr) {
        // 如果是对象的话，需要转换一下
        if (!carArr.length) {
          var carObj = carArr;
          carArr = [];
          this.state.firstChar.map(function (char) {
            if (carObj[char]) {
              carObj[char].map(function (ele) {
                ele[dataAttrName.firstChar] = char;
                carArr.push(ele);
              });
            }
          });
        }
        var Obj = {};
        /* 把城市分成数组，字母相同的在一组 */
        carArr.map(function (ele, i) {
          var firstChar = ele[dataAttrName.firstChar];
          if (!Obj[firstChar]) {
            Obj[firstChar] = [];
          }
          Obj[firstChar].push(carArr[i]);
        });
        this.setState({ carObj: Obj });
      }
    }
    /* 初始化右侧字母栏 */

  }, {
    key: 'init_fast_char',
    value: function init_fast_char() {
      var self = this;
      var fast_charTouchMove = this.fast_charTouchMove,
          fast_charTouchEnd = this.fast_charTouchEnd,
          fast_charClick = this.fast_charClick,
          state = this.state;
      var carObj = state.carObj,
          firstChar = state.firstChar;


      return _react2.default.createElement(
        'div',
        {
          className: 'fast_char',
          onTouchMove: fast_charTouchMove,
          onTouchEnd: fast_charTouchEnd
        },
        firstChar.map(function (char, i) {
          if (carObj[char]) {
            return _react2.default.createElement(
              'a',
              {
                href: 'javascript:;',
                'data-char': char,
                key: i,
                onClick: fast_charClick
              },
              char
            );
          }
          return null;
        })
      );
    }
    /* 解决锚点会产生历史记录，点后退，退不出当前页面的问题 */

  }, {
    key: 'fast_charClick',
    value: function fast_charClick(e) {
      var fastCharEle = e.currentTarget;
      var ele = document.querySelector('#first_char_' + fastCharEle.dataset.char);
      var _carBrandCon = document.querySelector('._carBrandCon');
      _carBrandCon.scrollTop = ele.offsetTop;
    }
    /* 城市点击事件 */

  }, {
    key: 'carClick',
    value: function carClick(e) {
      var callBack = this.props.callBack;

      var carObj = JSON.parse(e.currentTarget.dataset.carobj);
      this.setState({
        selectBrand: carObj
      });
      callBack && callBack(carObj);
    }
  }, {
    key: 'fast_charTouchMove',
    value: function fast_charTouchMove(e) {
      var _e$targetTouches$ = e.targetTouches[0],
          clientX = _e$targetTouches$.clientX,
          clientY = _e$targetTouches$.clientY;

      var ele = document.elementFromPoint(clientX, clientY) || {};
      var dataset = ele.dataset;

      if (ele && dataset.char) {
        this.setState({
          maxChar: dataset.char,
          showMaxChar: true
        });
        ele.click();
      }
      e.preventDefault();
    }
  }, {
    key: 'fast_charTouchEnd',
    value: function fast_charTouchEnd() {
      this.setState({
        showMaxChar: false
      });
    }
  }, {
    key: 'initCarBrandCon',
    value: function initCarBrandCon() {
      var self = this;
      var _state = this.state,
          carObj = _state.carObj,
          selectBrand = _state.selectBrand;
      var dataAttrName = this.props.dataAttrName;

      if (!carObj) {
        return null;
      }
      return _react2.default.createElement(
        'ul',
        { className: 'carBrandCon' },
        function () {
          var arr = [];
          for (var a in carObj) {
            arr.push(_react2.default.createElement(
              'li',
              { key: a, id: 'first_char_' + a },
              _react2.default.createElement(
                'a',
                {
                  className: 'first_char',
                  href: 'javascript:;'
                },
                a
              ),
              carObj[a].map(function (ele, index) {
                var isCheck = false;
                if (selectBrand && selectBrand.id && selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
                  isCheck = true;
                }
                {/* div不用label是因为label click 会触发两次 */}
                return _react2.default.createElement(
                  'div',
                  {
                    className: 'list' + (isCheck ? ' select' : ''),
                    key: index,
                    id: 'car_' + ele[dataAttrName.id],
                    'data-carobj': JSON.stringify(ele),
                    onClick: self.carClick
                  },
                  _react2.default.createElement('img', { src: '' + self.props.staticImgURL + ele.id + '.png' }),
                  _react2.default.createElement(
                    'span',
                    {
                      className: 'carBrandName'
                    },
                    ele[dataAttrName.name]
                  )
                );
              })
            ));
          }
          return arr;
        }()
      );
    }
    /* 点击定位城市的事件 */

  }, {
    key: 'hotCarBrandClick',
    value: function hotCarBrandClick(e) {
      document.getElementById('car_' + e.currentTarget.dataset.carid).click();
    }
  }, {
    key: 'initHotCarBrandCon',
    value: function initHotCarBrandCon() {
      var _this2 = this;

      var _props2 = this.props,
          dataAttrName = _props2.dataAttrName,
          staticImgURL = _props2.staticImgURL,
          hotCarBrandData = _props2.hotCarBrandData;
      var selectBrand = this.state.selectBrand;

      if (!hotCarBrandData) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'selectTitle' },
          '\u70ED\u95E8\u8F66\u578B'
        ),
        _react2.default.createElement(
          'ul',
          {
            className: 'hotCarBrandCon clearfix'
          },
          hotCarBrandData.map(function (ele, index) {
            var isCheck = false;
            if (selectBrand && selectBrand.id && selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
              isCheck = true;
            }
            return _react2.default.createElement(
              'li',
              {
                key: index,
                className: 'hotCarBrandList ' + (isCheck ? 'select' : null),
                'data-carid': ele.id,
                onClick: _this2.hotCarBrandClick
              },
              _react2.default.createElement('img', { src: '' + staticImgURL + ele.id + '.png' }),
              _react2.default.createElement(
                'span',
                { className: 'hotCarBrandName block' },
                ele[dataAttrName.name]
              )
            );
          })
        )
      );
    }
  }, {
    key: 'initMaxChar',
    value: function initMaxChar() {
      var _state2 = this.state,
          maxChar = _state2.maxChar,
          showMaxChar = _state2.showMaxChar;

      if (!showMaxChar) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'max_char' },
        maxChar
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          carArr = _props3.carArr,
          dataAttrName = _props3.dataAttrName,
          callBack = _props3.callBack,
          show = _props3.show,
          hotCarBrandData = _props3.hotCarBrandData,
          other = _objectWithoutProperties(_props3, ['carArr', 'dataAttrName', 'callBack', 'show', 'hotCarBrandData']);

      if (!show) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'catBrandWrap' },
        this.initMaxChar(),
        _react2.default.createElement(
          'div',
          _extends({ className: '_carBrandCon' }, other),
          hotCarBrandData ? this.initHotCarBrandCon() : null,
          this.initCarBrandCon()
        ),
        this.init_fast_char()
      );
    }
  }]);

  return Brand;
}(_react.Component);

Brand.defaultProps = {
  dataAttrName: {
    id: 'id',
    name: 'name',
    firstChar: 'first_char'
  }
};
module.exports = Brand;