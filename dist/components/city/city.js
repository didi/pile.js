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
<City
  cityArr={cityArr}  // 城市数组
  dataAttrName={   // 城市对象的默认属性为// city_id、city_name、first_char,如果对象不是这三个属性名，请把属性名传进去
    {
      id:'city_id',
      name:'city_name',
      firstChar:'first_char'
    }
  }
  position= {cityArr[0]}  定位城市
  callBack={this.selectCallBack.bind(this)}  选择完以后，回调函数
/>
*/

var City = function (_Component) {
  _inherits(City, _Component);

  function City(props) {
    _classCallCheck(this, City);

    var _this = _possibleConstructorReturn(this, (City.__proto__ || Object.getPrototypeOf(City)).call(this, props));

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
    _this.delCity = _this.delCity.bind(_this);
    _this.addCity = _this.addCity.bind(_this);
    _this.cityClick = _this.cityClick.bind(_this);
    _this.positionAddrClick = _this.positionAddrClick.bind(_this);
    _this.delSelect = _this.delSelect.bind(_this);
    _this.initSelectCityCon = _this.initSelectCityCon.bind(_this);
    _this.initMaxChar = _this.initMaxChar.bind(_this);
    _this.initPositionCon = _this.initPositionCon.bind(_this);
    _this.initCityCon = _this.initCityCon.bind(_this);
    _this.init_fast_char = _this.init_fast_char.bind(_this);

    _this.state = {
      selectCity: [],
      max_char: 'A',
      isRadio: true,
      showMaxChar: false,
      firstChar: firstChar
    };
    return _this;
  }

  _createClass(City, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var _props = this.props,
          cityArr = _props.cityArr,
          dataAttrName = _props.dataAttrName,
          aaa = _props.aaa;

      if (cityArr) {
        // 如果是对象的话，需要转换一下
        if (!cityArr.length) {
          var cityObj = cityArr;
          cityArr = [];
          this.state.firstChar.map(function (char, index) {
            if (cityObj[char]) {
              cityObj[char].map(function (ele, index) {
                ele[self.props.dataAttrName.firstChar] = char;
                cityArr.push(ele);
              });
            }
          });
        }
        var Obj = {};
        /* 把城市分成数组，字母相同的在一组 */
        cityArr.map(function (ele, i) {
          var firstChar = ele[dataAttrName.firstChar];
          if (!Obj[firstChar]) {
            Obj[firstChar] = [];
          }
          Obj[firstChar].push(cityArr[i]);
        });
        this.setState({ cityObj: Obj });
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
      var cityObj = state.cityObj,
          firstChar = state.firstChar;


      return _react2.default.createElement(
        'div',
        {
          className: 'fast_char',
          onTouchMove: fast_charTouchMove,
          onTouchEnd: fast_charTouchEnd
        },
        firstChar.map(function (char, i) {
          if (cityObj[char]) {
            return _react2.default.createElement(
              'a',
              {
                href: 'javascript:;',
                'data-char': char,
                key: i,
                onClick: fast_charClick.bind(self)
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
      var _cityCon = document.querySelector('._cityCon');
      _cityCon.scrollTop = ele.offsetTop;
    }
    /* 城市点击事件 */

  }, {
    key: 'cityClick',
    value: function cityClick(e) {
      var isRadio = this.state.isRadio;
      var callBack = this.props.callBack;
      var target = e.currentTarget,
          target_class = target.className,
          inp = target.querySelector('input'),
          checked = inp.checked,
          cityObj = JSON.parse(target.dataset.cityobj);
      /* if(!checked&&this.props.selectCity.length===10){
        return;
      } */
      if (isRadio) {
        callBack && callBack(cityObj);
        return;
      }
      if (checked) {
        inp.checked = false;

        target.className = (' ' + target_class + ' ').replace(' select ', ' ');

        this.delCity(cityObj);
      } else {
        inp.checked = true;
        target.className += ' select';
        this.addCity(cityObj);
      }
    }
    /* 点击城市-城市是未选中的时候，走到这里，把城市ID放入已选城市的数组里 */

  }, {
    key: 'addCity',
    value: function addCity(cityData) {
      var selectCity = this.state.selectCity.slice(0);

      selectCity.push(cityData);

      this.setState({
        selectCity: selectCity
      });
    }
    /* 点击城市-城市是已选中的时候，走到这里，从已选城市的数组里删除城市ID */

  }, {
    key: 'delCity',
    value: function delCity(cityData) {
      var dataAttrName = this.props.dataAttrName;

      var cityId = cityData[dataAttrName.id];
      var selectCityArr = this.state.selectCity.slice(0);
      selectCityArr.map(function (ele, index) {
        Number(cityId) === Number(ele[dataAttrName.id]) && selectCityArr.splice(index, 1);
      });
      this.setState({
        selectCity: selectCityArr
      });
    }
    /* 点击头部已选城市的删除按钮 */

  }, {
    key: 'delSelect',
    value: function delSelect(a) {
      var cityid = a.currentTarget.dataset.cityid;

      var ele = document.getElementById('city_' + cityid);
      try {
        // oppo r8007 安卓4.3手机运行会报错
        ele.click();
      } catch (e) {
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);
        ele.dispatchEvent(ev);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var selectCon = document.getElementById('selectCon');
      if (selectCon) {
        selectCon.scrollTop = selectCon.scrollHeight;
      }
    }
  }, {
    key: 'fast_charTouchMove',
    value: function fast_charTouchMove(e) {
      var clientX = e.targetTouches[0].clientX;
      var clientY = e.targetTouches[0].clientY;

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
    key: 'initCityCon',
    value: function initCityCon() {
      var self = this;
      var _state = this.state,
          cityObj = _state.cityObj,
          isRadio = _state.isRadio,
          selectCity = _state.selectCity;
      var dataAttrName = this.props.dataAttrName;

      if (!cityObj) {
        return null;
      }
      return _react2.default.createElement(
        'ul',
        { className: 'cityCon' },
        function () {
          var arr = [];
          for (var a in cityObj) {
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
              cityObj[a].map(function (ele, index) {
                var isCheck = false;
                selectCity.map(function () {
                  var _ele = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                  if (Number(ele.city_id) === Number(_ele.city_id)) {
                    isCheck = true;
                  }
                });
                {/* div不用label是因为label click 会触发两次 */}
                return _react2.default.createElement(
                  'div',
                  {
                    className: 'list' + (isCheck ? ' select' : ''),
                    key: index,
                    id: 'city_' + ele.city_id,
                    'data-cityobj': JSON.stringify(ele),
                    onClick: self.cityClick
                  },
                  _react2.default.createElement('input', {
                    className: 'none',
                    defaultChecked: isCheck,
                    name: 'cityInp',
                    type: 'checkbox'
                  }),
                  !isRadio && _react2.default.createElement(
                    'span',
                    {
                      className: 'check'
                    },
                    _react2.default.createElement('span', {
                      className: 'icon icon-popup_right'
                    })
                  ),
                  _react2.default.createElement(
                    'span',
                    {
                      className: 'cityName'
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
    key: 'positionAddrClick',
    value: function positionAddrClick(e) {
      document.getElementById('city_' + e.currentTarget.dataset.cityid).click();
    }
  }, {
    key: 'initPositionCon',
    value: function initPositionCon() {
      var _props2 = this.props,
          position = _props2.position,
          dataAttrName = _props2.dataAttrName;

      if (!position) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'selectTitle' },
          '\u5B9A\u4F4D\u57CE\u5E02'
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'positionAddr',
            'data-cityid': position.city_id,
            onClick: this.positionAddrClick
          },
          _react2.default.createElement('span', { className: 'icon icon-addr' }),
          _react2.default.createElement(
            'span',
            { className: 'positionCityName' },
            position[dataAttrName.name]
          )
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
    key: 'initSelectCityCon',
    value: function initSelectCityCon() {
      var _this2 = this;

      var selectCity = this.state.selectCity;
      var dataAttrName = this.props.dataAttrName;

      if (!selectCity || !(selectCity && selectCity.length)) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'selectCon', id: 'selectCon' },
        selectCity.map(function () {
          var ele = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var index = arguments[1];
          return _react2.default.createElement(
            'div',
            {
              className: 'list',
              key: index
            },
            _react2.default.createElement('span', {
              className: 'icon icon-addr'
            }),
            _react2.default.createElement(
              'span',
              null,
              ele[dataAttrName.name]
            ),
            _react2.default.createElement('a', {
              className: 'icon icon-close',
              'data-cityid': ele.city_id,
              onClick: _this2.delSelect,
              href: 'javascript:;'
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var isRadio = this.state.isRadio;

      var _props3 = this.props,
          position = _props3.position,
          cityArr = _props3.cityArr,
          dataAttrName = _props3.dataAttrName,
          callBack = _props3.callBack,
          show = _props3.show,
          other = _objectWithoutProperties(_props3, ['position', 'cityArr', 'dataAttrName', 'callBack', 'show']);

      if (!show) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'selectCity' },
        !isRadio ? this.initSelectCityCon() : null,
        this.initMaxChar(),
        _react2.default.createElement(
          'div',
          _extends({ className: '_cityCon' }, other),
          position ? this.initPositionCon() : null,
          this.initCityCon()
        ),
        this.init_fast_char()
      );
    }
  }]);

  return City;
}(_react.Component);

City.defaultProps = {
  dataAttrName: {
    id: 'city_id',
    name: 'city_name',
    firstChar: 'first_char'
  },
  cityArr: [{
    first_char: 'A',
    city_name: '\u978D\u5C71',
    city_id: 64
  }, {
    first_char: 'A',
    city_name: '\u5B89\u5E86',
    city_id: 149
  }, {
    first_char: 'A',
    city_name: '\u5B89\u9633',
    city_id: 174
  }, {
    first_char: 'A',
    city_name: '\u963F\u62C9\u5584\u76DF',
    city_id: 202
  }, {
    first_char: 'A',
    city_name: '\u5B89\u987A',
    city_id: 294
  }, {
    first_char: 'A',
    city_name: '\u5B89\u5EB7',
    city_id: 320
  }, {
    first_char: 'A',
    city_name: '\u963F\u514B\u82CF\u5730\u533A',
    city_id: 348
  }, {
    first_char: 'A',
    city_name: '\u963F\u52D2\u6CF0\u5730\u533A',
    city_id: 355
  }, {
    first_char: 'A',
    city_name: '\u963F\u62C9\u5C14',
    city_id: 356
  }, {
    first_char: 'B',
    city_name: '\u5317\u4EAC',
    city_id: 1
  }, {
    first_char: 'B',
    city_name: '\u4FDD\u5B9A',
    city_id: 62
  }, {
    first_char: 'B',
    city_name: '\u5305\u5934',
    city_id: 63
  }, {
    first_char: 'B',
    city_name: '\u672C\u6EAA',
    city_id: 77
  }, {
    first_char: 'B',
    city_name: '\u868C\u57E0',
    city_id: 100
  }, {
    first_char: 'B',
    city_name: '\u5317\u6D77',
    city_id: 161
  }, {
    first_char: 'B',
    city_name: '\u6EE8\u5DDE',
    city_id: 166
  }, {
    first_char: 'B',
    city_name: '\u5B9D\u9E21',
    city_id: 170
  }, {
    first_char: 'B',
    city_name: '\u4EB3\u5DDE',
    city_id: 189
  }, {
    first_char: 'B',
    city_name: '\u5DF4\u5F66\u6DD6\u5C14',
    city_id: 199
  }, {
    first_char: 'B',
    city_name: '\u767D\u5C71',
    city_id: 208
  }, {
    first_char: 'B',
    city_name: '\u767D\u57CE',
    city_id: 210
  }, {
    first_char: 'B',
    city_name: '\u767E\u8272',
    city_id: 263
  }, {
    first_char: 'B',
    city_name: '\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF',
    city_id: 278
  }, {
    first_char: 'B',
    city_name: '\u5DF4\u4E2D',
    city_id: 288
  }, {
    first_char: 'B',
    city_name: '\u6BD5\u8282\u5730\u533A',
    city_id: 296
  }, {
    first_char: 'B',
    city_name: '\u4FDD\u5C71',
    city_id: 301
  }, {
    first_char: 'B',
    city_name: '\u767D\u94F6',
    city_id: 323
  }, {
    first_char: 'B',
    city_name: '\u5DF4\u97F3\u90ED\u695E\u5DDE',
    city_id: 350
  }, {
    first_char: 'B',
    city_name: '\u535A\u5C14\u5854\u62C9\u5DDE',
    city_id: 352
  }, {
    first_char: 'B',
    city_name: '\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF',
    city_id: 364
  }, {
    first_char: 'C',
    city_name: '\u6210\u90FD',
    city_id: 17
  }, {
    first_char: 'C',
    city_name: '\u91CD\u5E86',
    city_id: 18
  }, {
    first_char: 'C',
    city_name: '\u957F\u6C99',
    city_id: 24
  }, {
    first_char: 'C',
    city_name: '\u957F\u6625',
    city_id: 25
  }, {
    first_char: 'C',
    city_name: '\u5E38\u5DDE',
    city_id: 45
  }, {
    first_char: 'C',
    city_name: '\u6CA7\u5DDE',
    city_id: 59
  }, {
    first_char: 'C',
    city_name: '\u627F\u5FB7',
    city_id: 72
  }, {
    first_char: 'C',
    city_name: '\u5E38\u5FB7',
    city_id: 106
  }, {
    first_char: 'C',
    city_name: '\u90F4\u5DDE',
    city_id: 107
  }, {
    first_char: 'C',
    city_name: '\u957F\u6CBB',
    city_id: 127
  }, {
    first_char: 'C',
    city_name: '\u6EC1\u5DDE',
    city_id: 148
  }, {
    first_char: 'C',
    city_name: '\u6C60\u5DDE',
    city_id: 187
  }, {
    first_char: 'C',
    city_name: '\u8D64\u5CF0',
    city_id: 196
  }, {
    first_char: 'C',
    city_name: '\u6F6E\u5DDE',
    city_id: 257
  }, {
    first_char: 'C',
    city_name: '\u5D07\u5DE6',
    city_id: 267
  }, {
    first_char: 'C',
    city_name: '\u6F84\u8FC8\u53BF',
    city_id: 274
  }, {
    first_char: 'C',
    city_name: '\u695A\u96C4\u5DDE',
    city_id: 308
  }, {
    first_char: 'C',
    city_name: '\u660C\u90FD\u5730\u533A',
    city_id: 313
  }, {
    first_char: 'C',
    city_name: '\u660C\u5409\u5DDE',
    city_id: 351
  }, {
    first_char: 'C',
    city_name: '\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF',
    city_id: 363
  }, {
    first_char: 'D',
    city_name: '\u5927\u8FDE',
    city_id: 14
  }, {
    first_char: 'D',
    city_name: '\u4E1C\u839E',
    city_id: 21
  }, {
    first_char: 'D',
    city_name: '\u5927\u5E86',
    city_id: 48
  }, {
    first_char: 'D',
    city_name: '\u4E1C\u8425',
    city_id: 73
  }, {
    first_char: 'D',
    city_name: '\u5FB7\u5DDE',
    city_id: 120
  }, {
    first_char: 'D',
    city_name: '\u5927\u540C',
    city_id: 125
  }, {
    first_char: 'D',
    city_name: '\u5927\u7406\u5DDE',
    city_id: 136
  }, {
    first_char: 'D',
    city_name: '\u4E39\u4E1C',
    city_id: 163
  }, {
    first_char: 'D',
    city_name: '\u5FB7\u9633',
    city_id: 173
  }, {
    first_char: 'D',
    city_name: '\u5927\u5174\u5B89\u5CAD\u5730\u533A',
    city_id: 218
  }, {
    first_char: 'D',
    city_name: '\u510B\u5DDE',
    city_id: 270
  }, {
    first_char: 'D',
    city_name: '\u4E1C\u65B9',
    city_id: 273
  }, {
    first_char: 'D',
    city_name: '\u5B9A\u5B89\u53BF',
    city_id: 275
  }, {
    first_char: 'D',
    city_name: '\u8FBE\u5DDE',
    city_id: 285
  }, {
    first_char: 'D',
    city_name: '\u5FB7\u5B8F\u5DDE',
    city_id: 309
  }, {
    first_char: 'D',
    city_name: '\u8FEA\u5E86\u5DDE',
    city_id: 311
  }, {
    first_char: 'D',
    city_name: '\u5B9A\u897F',
    city_id: 330
  }, {
    first_char: 'E',
    city_name: '\u9102\u5C14\u591A\u65AF',
    city_id: 43
  }, {
    first_char: 'E',
    city_name: '\u9102\u5DDE',
    city_id: 230
  }, {
    first_char: 'E',
    city_name: '\u6069\u65BD\u5DDE',
    city_id: 235
  }, {
    first_char: 'F',
    city_name: '\u798F\u5DDE',
    city_id: 34
  }, {
    first_char: 'F',
    city_name: '\u4F5B\u5C71',
    city_id: 36
  }, {
    first_char: 'F',
    city_name: '\u629A\u987A',
    city_id: 66
  }, {
    first_char: 'F',
    city_name: '\u961C\u65B0',
    city_id: 164
  }, {
    first_char: 'F',
    city_name: '\u961C\u9633',
    city_id: 188
  }, {
    first_char: 'F',
    city_name: '\u629A\u5DDE',
    city_id: 223
  }, {
    first_char: 'F',
    city_name: '\u9632\u57CE\u6E2F',
    city_id: 260
  }, {
    first_char: 'G',
    city_name: '\u5E7F\u5DDE',
    city_id: 3
  }, {
    first_char: 'G',
    city_name: '\u8D35\u9633',
    city_id: 82
  }, {
    first_char: 'G',
    city_name: '\u8D63\u5DDE',
    city_id: 102
  }, {
    first_char: 'G',
    city_name: '\u6842\u6797',
    city_id: 135
  }, {
    first_char: 'G',
    city_name: '\u8D35\u6E2F',
    city_id: 262
  }, {
    first_char: 'G',
    city_name: '\u5E7F\u5143',
    city_id: 280
  }, {
    first_char: 'G',
    city_name: '\u5E7F\u5B89',
    city_id: 284
  }, {
    first_char: 'G',
    city_name: '\u7518\u5B5C\u5DDE',
    city_id: 291
  }, {
    first_char: 'G',
    city_name: '\u7518\u5357\u5DDE',
    city_id: 333
  }, {
    first_char: 'G',
    city_name: '\u56FA\u539F',
    city_id: 336
  }, {
    first_char: 'G',
    city_name: '\u679C\u6D1B\u5DDE',
    city_id: 342
  }, {
    first_char: 'H',
    city_name: '\u676D\u5DDE',
    city_id: 5
  }, {
    first_char: 'H',
    city_name: '\u5408\u80A5',
    city_id: 15
  }, {
    first_char: 'H',
    city_name: '\u54C8\u5C14\u6EE8',
    city_id: 16
  }, {
    first_char: 'H',
    city_name: '\u547C\u548C\u6D69\u7279',
    city_id: 41
  }, {
    first_char: 'H',
    city_name: '\u90AF\u90F8',
    city_id: 60
  }, {
    first_char: 'H',
    city_name: '\u846B\u82A6\u5C9B',
    city_id: 70
  }, {
    first_char: 'H',
    city_name: '\u8861\u6C34',
    city_id: 80
  }, {
    first_char: 'H',
    city_name: '\u6D77\u53E3',
    city_id: 83
  }, {
    first_char: 'H',
    city_name: '\u6E56\u5DDE',
    city_id: 90
  }, {
    first_char: 'H',
    city_name: '\u6DEE\u5B89',
    city_id: 97
  }, {
    first_char: 'H',
    city_name: '\u8861\u9633',
    city_id: 105
  }, {
    first_char: 'H',
    city_name: '\u6C49\u4E2D',
    city_id: 115
  }, {
    first_char: 'H',
    city_name: '\u83CF\u6CFD',
    city_id: 124
  }, {
    first_char: 'H',
    city_name: '\u60E0\u5DDE',
    city_id: 133
  }, {
    first_char: 'H',
    city_name: '\u9EC4\u5C71',
    city_id: 141
  }, {
    first_char: 'H',
    city_name: '\u6DEE\u5357',
    city_id: 150
  }, {
    first_char: 'H',
    city_name: '\u6DEE\u5317',
    city_id: 183
  }, {
    first_char: 'H',
    city_name: '\u547C\u4F26\u8D1D\u5C14',
    city_id: 198
  }, {
    first_char: 'H',
    city_name: '\u5174\u5B89\u76DF',
    city_id: 203
  }, {
    first_char: 'H',
    city_name: '\u9E64\u5C97',
    city_id: 212
  }, {
    first_char: 'H',
    city_name: '\u9ED1\u6CB3',
    city_id: 217
  }, {
    first_char: 'H',
    city_name: '\u9EC4\u77F3',
    city_id: 227
  }, {
    first_char: 'H',
    city_name: '\u9EC4\u5188',
    city_id: 232
  }, {
    first_char: 'H',
    city_name: '\u6000\u5316',
    city_id: 244
  }, {
    first_char: 'H',
    city_name: '\u9E64\u58C1',
    city_id: 247
  }, {
    first_char: 'H',
    city_name: '\u6CB3\u6E90',
    city_id: 254
  }, {
    first_char: 'H',
    city_name: '\u8D3A\u5DDE',
    city_id: 264
  }, {
    first_char: 'H',
    city_name: '\u6CB3\u6C60',
    city_id: 265
  }, {
    first_char: 'H',
    city_name: '\u7EA2\u6CB3\u5DDE',
    city_id: 306
  }, {
    first_char: 'H',
    city_name: '\u6D77\u4E1C\u5730\u533A',
    city_id: 338
  }, {
    first_char: 'H',
    city_name: '\u6D77\u5317\u5DDE',
    city_id: 339
  }, {
    first_char: 'H',
    city_name: '\u9EC4\u5357\u5DDE',
    city_id: 340
  }, {
    first_char: 'H',
    city_name: '\u6D77\u5357\u5DDE',
    city_id: 341
  }, {
    first_char: 'H',
    city_name: '\u6D77\u897F\u5DDE',
    city_id: 344
  }, {
    first_char: 'H',
    city_name: '\u54C8\u5BC6\u5730\u533A',
    city_id: 346
  }, {
    first_char: 'H',
    city_name: '\u548C\u7530\u5730\u533A',
    city_id: 347
  }, {
    first_char: 'I',
    city_name: '\u4F0A\u7281\u5DDE',
    city_id: 353
  }, {
    first_char: 'J',
    city_name: '\u6D4E\u5357',
    city_id: 12
  }, {
    first_char: 'J',
    city_name: '\u9526\u5DDE',
    city_id: 68
  }, {
    first_char: 'J',
    city_name: '\u664B\u4E2D',
    city_id: 71
  }, {
    first_char: 'J',
    city_name: '\u5409\u6797',
    city_id: 74
  }, {
    first_char: 'J',
    city_name: '\u6D4E\u5B81',
    city_id: 79
  }, {
    first_char: 'J',
    city_name: '\u91D1\u534E',
    city_id: 86
  }, {
    first_char: 'J',
    city_name: '\u5609\u5174',
    city_id: 88
  }, {
    first_char: 'J',
    city_name: '\u4E5D\u6C5F',
    city_id: 101
  }, {
    first_char: 'J',
    city_name: '\u8346\u5DDE',
    city_id: 109
  }, {
    first_char: 'J',
    city_name: '\u666F\u5FB7\u9547',
    city_id: 151
  }, {
    first_char: 'J',
    city_name: '\u6C5F\u95E8',
    city_id: 153
  }, {
    first_char: 'J',
    city_name: '\u63ED\u9633',
    city_id: 154
  }, {
    first_char: 'J',
    city_name: '\u7126\u4F5C',
    city_id: 175
  }, {
    first_char: 'J',
    city_name: '\u664B\u57CE',
    city_id: 190
  }, {
    first_char: 'J',
    city_name: '\u9E21\u897F',
    city_id: 211
  }, {
    first_char: 'J',
    city_name: '\u4F73\u6728\u65AF',
    city_id: 215
  }, {
    first_char: 'J',
    city_name: '\u5409\u5B89',
    city_id: 221
  }, {
    first_char: 'J',
    city_name: '\u8346\u95E8',
    city_id: 229
  }, {
    first_char: 'J',
    city_name: '\u6D4E\u6E90',
    city_id: 252
  }, {
    first_char: 'J',
    city_name: '\u91D1\u660C',
    city_id: 322
  }, {
    first_char: 'J',
    city_name: '\u5609\u5CEA\u5173',
    city_id: 324
  }, {
    first_char: 'J',
    city_name: '\u9152\u6CC9',
    city_id: 328
  }, {
    first_char: 'K',
    city_name: '\u6606\u660E',
    city_id: 19
  }, {
    first_char: 'K',
    city_name: '\u5F00\u5C01',
    city_id: 110
  }, {
    first_char: 'K',
    city_name: '\u5580\u4EC0\u5730\u533A',
    city_id: 179
  }, {
    first_char: 'K',
    city_name: '\u514B\u62C9\u739B\u4F9D',
    city_id: 180
  }, {
    first_char: 'K',
    city_name: '\u514B\u5B5C\u52D2\u82CF\u67EF\u5DDE',
    city_id: 349
  }, {
    first_char: 'L',
    city_name: '\u6D1B\u9633',
    city_id: 27
  }, {
    first_char: 'L',
    city_name: '\u5170\u5DDE',
    city_id: 30
  }, {
    first_char: 'L',
    city_name: '\u5ECA\u574A',
    city_id: 46
  }, {
    first_char: 'L',
    city_name: '\u4E34\u6C82',
    city_id: 58
  }, {
    first_char: 'L',
    city_name: '\u8FBD\u9633',
    city_id: 75
  }, {
    first_char: 'L',
    city_name: '\u8FDE\u4E91\u6E2F',
    city_id: 96
  }, {
    first_char: 'L',
    city_name: '\u6CF8\u5DDE',
    city_id: 117
  }, {
    first_char: 'L',
    city_name: '\u83B1\u829C',
    city_id: 122
  }, {
    first_char: 'L',
    city_name: '\u804A\u57CE',
    city_id: 123
  }, {
    first_char: 'L',
    city_name: '\u67F3\u5DDE',
    city_id: 134
  }, {
    first_char: 'L',
    city_name: '\u4E3D\u6C5F',
    city_id: 137
  }, {
    first_char: 'L',
    city_name: '\u4E3D\u6C34',
    city_id: 139
  }, {
    first_char: 'L',
    city_name: '\u62C9\u8428',
    city_id: 178
  }, {
    first_char: 'L',
    city_name: '\u516D\u5B89',
    city_id: 186
  }, {
    first_char: 'L',
    city_name: '\u4E34\u6C7E',
    city_id: 193
  }, {
    first_char: 'L',
    city_name: '\u5415\u6881',
    city_id: 194
  }, {
    first_char: 'L',
    city_name: '\u8FBD\u6E90',
    city_id: 206
  }, {
    first_char: 'L',
    city_name: '\u9F99\u5CA9',
    city_id: 226
  }, {
    first_char: 'L',
    city_name: '\u5A04\u5E95',
    city_id: 245
  }, {
    first_char: 'L',
    city_name: '\u6F2F\u6CB3',
    city_id: 248
  }, {
    first_char: 'L',
    city_name: '\u6765\u5BBE',
    city_id: 266
  }, {
    first_char: 'L',
    city_name: '\u4E34\u9AD8\u53BF',
    city_id: 277
  }, {
    first_char: 'L',
    city_name: '\u4E50\u5C71',
    city_id: 283
  }, {
    first_char: 'L',
    city_name: '\u51C9\u5C71\u5DDE',
    city_id: 292
  }, {
    first_char: 'L',
    city_name: '\u516D\u76D8\u6C34',
    city_id: 293
  }, {
    first_char: 'L',
    city_name: '\u4E34\u6CA7',
    city_id: 304
  }, {
    first_char: 'L',
    city_name: '\u6797\u829D\u5730\u533A',
    city_id: 317
  }, {
    first_char: 'L',
    city_name: '\u9647\u5357',
    city_id: 331
  }, {
    first_char: 'L',
    city_name: '\u4E34\u590F\u5DDE',
    city_id: 332
  }, {
    first_char: 'L',
    city_name: '\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF',
    city_id: 360
  }, {
    first_char: 'L',
    city_name: '\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF',
    city_id: 362
  }, {
    first_char: 'M',
    city_name: '\u7EF5\u9633',
    city_id: 50
  }, {
    first_char: 'M',
    city_name: '\u9A6C\u978D\u5C71',
    city_id: 99
  }, {
    first_char: 'M',
    city_name: '\u7261\u4E39\u6C5F',
    city_id: 129
  }, {
    first_char: 'M',
    city_name: '\u8302\u540D',
    city_id: 155
  }, {
    first_char: 'M',
    city_name: '\u6885\u5DDE',
    city_id: 156
  }, {
    first_char: 'M',
    city_name: '\u7709\u5C71',
    city_id: 286
  }, {
    first_char: 'N',
    city_name: '\u5357\u4EAC',
    city_id: 11
  }, {
    first_char: 'N',
    city_name: '\u5B81\u6CE2',
    city_id: 20
  }, {
    first_char: 'N',
    city_name: '\u5357\u5B81',
    city_id: 33
  }, {
    first_char: 'N',
    city_name: '\u5357\u660C',
    city_id: 38
  }, {
    first_char: 'N',
    city_name: '\u5357\u5145',
    city_id: 53
  }, {
    first_char: 'N',
    city_name: '\u5357\u901A',
    city_id: 92
  }, {
    first_char: 'N',
    city_name: '\u5357\u9633',
    city_id: 113
  }, {
    first_char: 'N',
    city_name: '\u5B81\u5FB7',
    city_id: 144
  }, {
    first_char: 'N',
    city_name: '\u5357\u5E73',
    city_id: 145
  }, {
    first_char: 'N',
    city_name: '\u5185\u6C5F',
    city_id: 282
  }, {
    first_char: 'N',
    city_name: '\u963F\u575D\u5DDE',
    city_id: 290
  }, {
    first_char: 'N',
    city_name: '\u6012\u6C5F\u5DDE',
    city_id: 310
  }, {
    first_char: 'N',
    city_name: '\u90A3\u66F2\u5730\u533A',
    city_id: 312
  }, {
    first_char: 'P',
    city_name: '\u5E73\u9876\u5C71',
    city_id: 103
  }, {
    first_char: 'P',
    city_name: '\u6500\u679D\u82B1',
    city_id: 119
  }, {
    first_char: 'P',
    city_name: '\u8386\u7530',
    city_id: 143
  }, {
    first_char: 'P',
    city_name: '\u76D8\u9526',
    city_id: 165
  }, {
    first_char: 'P',
    city_name: '\u6FEE\u9633',
    city_id: 176
  }, {
    first_char: 'P',
    city_name: '\u840D\u4E61',
    city_id: 219
  }, {
    first_char: 'P',
    city_name: '\u666E\u6D31',
    city_id: 303
  }, {
    first_char: 'P',
    city_name: '\u5E73\u51C9',
    city_id: 327
  }, {
    first_char: 'Q',
    city_name: '\u9752\u5C9B',
    city_id: 13
  }, {
    first_char: 'Q',
    city_name: '\u6CC9\u5DDE',
    city_id: 35
  }, {
    first_char: 'Q',
    city_name: '\u79E6\u7687\u5C9B',
    city_id: 61
  }, {
    first_char: 'Q',
    city_name: '\u9F50\u9F50\u54C8\u5C14',
    city_id: 65
  }, {
    first_char: 'Q',
    city_name: '\u66F2\u9756',
    city_id: 138
  }, {
    first_char: 'Q',
    city_name: '\u8862\u5DDE',
    city_id: 140
  }, {
    first_char: 'Q',
    city_name: '\u6E05\u8FDC',
    city_id: 157
  }, {
    first_char: 'Q',
    city_name: '\u4E03\u53F0\u6CB3',
    city_id: 216
  }, {
    first_char: 'Q',
    city_name: '\u6F5C\u6C5F',
    city_id: 238
  }, {
    first_char: 'Q',
    city_name: '\u94A6\u5DDE',
    city_id: 261
  }, {
    first_char: 'Q',
    city_name: '\u743C\u6D77',
    city_id: 269
  }, {
    first_char: 'Q',
    city_name: '\u9ED4\u897F\u5357\u5DDE',
    city_id: 297
  }, {
    first_char: 'Q',
    city_name: '\u9ED4\u4E1C\u5357\u5DDE',
    city_id: 298
  }, {
    first_char: 'Q',
    city_name: '\u9ED4\u5357\u5DDE',
    city_id: 299
  }, {
    first_char: 'Q',
    city_name: '\u5E86\u9633',
    city_id: 329
  }, {
    first_char: 'Q',
    city_name: '\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF',
    city_id: 365
  }, {
    first_char: 'R',
    city_name: '\u65E5\u7167',
    city_id: 167
  }, {
    first_char: 'S',
    city_name: '\u6DF1\u5733',
    city_id: 2
  }, {
    first_char: 'S',
    city_name: '\u4E0A\u6D77',
    city_id: 4
  }, {
    first_char: 'S',
    city_name: '\u6C88\u9633',
    city_id: 8
  }, {
    first_char: 'S',
    city_name: '\u77F3\u5BB6\u5E84',
    city_id: 22
  }, {
    first_char: 'S',
    city_name: '\u82CF\u5DDE',
    city_id: 23
  }, {
    first_char: 'S',
    city_name: '\u4E09\u4E9A',
    city_id: 37
  }, {
    first_char: 'S',
    city_name: '\u7ECD\u5174',
    city_id: 89
  }, {
    first_char: 'S',
    city_name: '\u7EE5\u5316',
    city_id: 128
  }, {
    first_char: 'S',
    city_name: '\u56DB\u5E73',
    city_id: 130
  }, {
    first_char: 'S',
    city_name: '\u5BBF\u8FC1',
    city_id: 147
  }, {
    first_char: 'S',
    city_name: '\u6C55\u5934',
    city_id: 158
  }, {
    first_char: 'S',
    city_name: '\u5546\u4E18',
    city_id: 177
  }, {
    first_char: 'S',
    city_name: '\u77F3\u6CB3\u5B50',
    city_id: 181
  }, {
    first_char: 'S',
    city_name: '\u5BBF\u5DDE',
    city_id: 185
  }, {
    first_char: 'S',
    city_name: '\u6714\u5DDE',
    city_id: 191
  }, {
    first_char: 'S',
    city_name: '\u677E\u539F',
    city_id: 209
  }, {
    first_char: 'S',
    city_name: '\u53CC\u9E2D\u5C71',
    city_id: 213
  }, {
    first_char: 'S',
    city_name: '\u4E0A\u9976',
    city_id: 224
  }, {
    first_char: 'S',
    city_name: '\u4E09\u660E',
    city_id: 225
  }, {
    first_char: 'S',
    city_name: '\u5341\u5830',
    city_id: 228
  }, {
    first_char: 'S',
    city_name: '\u968F\u5DDE',
    city_id: 234
  }, {
    first_char: 'S',
    city_name: '\u795E\u519C\u67B6\u6797\u533A',
    city_id: 239
  }, {
    first_char: 'S',
    city_name: '\u90B5\u9633',
    city_id: 240
  }, {
    first_char: 'S',
    city_name: '\u4E09\u95E8\u5CE1',
    city_id: 249
  }, {
    first_char: 'S',
    city_name: '\u97F6\u5173',
    city_id: 253
  }, {
    first_char: 'S',
    city_name: '\u6C55\u5C3E',
    city_id: 255
  }, {
    first_char: 'S',
    city_name: '\u9042\u5B81',
    city_id: 281
  }, {
    first_char: 'S',
    city_name: '\u5C71\u5357\u5730\u533A',
    city_id: 314
  }, {
    first_char: 'S',
    city_name: '\u65E5\u5580\u5219\u5730\u533A',
    city_id: 315
  }, {
    first_char: 'S',
    city_name: '\u5546\u6D1B',
    city_id: 321
  }, {
    first_char: 'S',
    city_name: '\u77F3\u5634\u5C71',
    city_id: 334
  }, {
    first_char: 'S',
    city_name: '\u4E09\u6C99',
    city_id: 361
  }, {
    first_char: 'T',
    city_name: '\u5929\u6D25',
    city_id: 7
  }, {
    first_char: 'T',
    city_name: '\u592A\u539F',
    city_id: 26
  }, {
    first_char: 'T',
    city_name: '\u5510\u5C71',
    city_id: 40
  }, {
    first_char: 'T',
    city_name: '\u94C1\u5CAD',
    city_id: 69
  }, {
    first_char: 'T',
    city_name: '\u53F0\u5DDE',
    city_id: 87
  }, {
    first_char: 'T',
    city_name: '\u6CF0\u5DDE',
    city_id: 95
  }, {
    first_char: 'T',
    city_name: '\u6CF0\u5B89',
    city_id: 121
  }, {
    first_char: 'T',
    city_name: '\u5929\u6C34',
    city_id: 169
  }, {
    first_char: 'T',
    city_name: '\u94DC\u9675',
    city_id: 184
  }, {
    first_char: 'T',
    city_name: '\u901A\u8FBD',
    city_id: 197
  }, {
    first_char: 'T',
    city_name: '\u901A\u5316',
    city_id: 207
  }, {
    first_char: 'T',
    city_name: '\u5929\u95E8',
    city_id: 237
  }, {
    first_char: 'T',
    city_name: '\u5C6F\u660C\u53BF',
    city_id: 276
  }, {
    first_char: 'T',
    city_name: '\u94DC\u4EC1\u5730\u533A',
    city_id: 295
  }, {
    first_char: 'T',
    city_name: '\u94DC\u5DDD',
    city_id: 318
  }, {
    first_char: 'T',
    city_name: '\u5410\u9C81\u756A\u5730\u533A',
    city_id: 345
  }, {
    first_char: 'T',
    city_name: '\u5854\u57CE\u5730\u533A',
    city_id: 354
  }, {
    first_char: 'U',
    city_name: '\u4E4C\u9C81\u6728\u9F50',
    city_id: 52
  }, {
    first_char: 'W',
    city_name: '\u6B66\u6C49',
    city_id: 6
  }, {
    first_char: 'W',
    city_name: '\u5A01\u6D77',
    city_id: 42
  }, {
    first_char: 'W',
    city_name: '\u65E0\u9521',
    city_id: 47
  }, {
    first_char: 'W',
    city_name: '\u6F4D\u574A',
    city_id: 81
  }, {
    first_char: 'W',
    city_name: '\u6E29\u5DDE',
    city_id: 85
  }, {
    first_char: 'W',
    city_name: '\u829C\u6E56',
    city_id: 98
  }, {
    first_char: 'W',
    city_name: '\u4E4C\u6D77',
    city_id: 195
  }, {
    first_char: 'W',
    city_name: '\u4E4C\u5170\u5BDF\u5E03',
    city_id: 200
  }, {
    first_char: 'W',
    city_name: '\u68A7\u5DDE',
    city_id: 259
  }, {
    first_char: 'W',
    city_name: '\u4E94\u6307\u5C71',
    city_id: 268
  }, {
    first_char: 'W',
    city_name: '\u6587\u660C',
    city_id: 271
  }, {
    first_char: 'W',
    city_name: '\u4E07\u5B81',
    city_id: 272
  }, {
    first_char: 'W',
    city_name: '\u6587\u5C71\u5DDE',
    city_id: 305
  }, {
    first_char: 'W',
    city_name: '\u6E2D\u5357',
    city_id: 319
  }, {
    first_char: 'W',
    city_name: '\u6B66\u5A01',
    city_id: 325
  }, {
    first_char: 'W',
    city_name: '\u5434\u5FE0',
    city_id: 335
  }, {
    first_char: 'X',
    city_name: '\u897F\u5B89',
    city_id: 10
  }, {
    first_char: 'X',
    city_name: '\u897F\u5B81',
    city_id: 28
  }, {
    first_char: 'X',
    city_name: '\u53A6\u95E8',
    city_id: 32
  }, {
    first_char: 'X',
    city_name: '\u5F90\u5DDE',
    city_id: 39
  }, {
    first_char: 'X',
    city_name: '\u6E58\u6F6D',
    city_id: 55
  }, {
    first_char: 'X',
    city_name: '\u90A2\u53F0',
    city_id: 67
  }, {
    first_char: 'X',
    city_name: '\u8944\u9633',
    city_id: 108
  }, {
    first_char: 'X',
    city_name: '\u65B0\u4E61',
    city_id: 111
  }, {
    first_char: 'X',
    city_name: '\u8BB8\u660C',
    city_id: 112
  }, {
    first_char: 'X',
    city_name: '\u54B8\u9633',
    city_id: 116
  }, {
    first_char: 'X',
    city_name: '\u65B0\u4F59',
    city_id: 152
  }, {
    first_char: 'X',
    city_name: '\u5BA3\u57CE',
    city_id: 182
  }, {
    first_char: 'X',
    city_name: '\u5FFB\u5DDE',
    city_id: 192
  }, {
    first_char: 'X',
    city_name: '\u9521\u6797\u90ED\u52D2\u76DF',
    city_id: 201
  }, {
    first_char: 'X',
    city_name: '\u5B5D\u611F',
    city_id: 231
  }, {
    first_char: 'X',
    city_name: '\u54B8\u5B81',
    city_id: 233
  }, {
    first_char: 'X',
    city_name: '\u4ED9\u6843',
    city_id: 236
  }, {
    first_char: 'X',
    city_name: '\u6E58\u897F\u5DDE',
    city_id: 246
  }, {
    first_char: 'X',
    city_name: '\u4FE1\u9633',
    city_id: 250
  }, {
    first_char: 'X',
    city_name: '\u897F\u53CC\u7248\u7EB3\u5DDE',
    city_id: 307
  }, {
    first_char: 'Y',
    city_name: '\u70DF\u53F0',
    city_id: 29
  }, {
    first_char: 'Y',
    city_name: '\u94F6\u5DDD',
    city_id: 49
  }, {
    first_char: 'Y',
    city_name: '\u5B9C\u660C',
    city_id: 51
  }, {
    first_char: 'Y',
    city_name: '\u5CB3\u9633',
    city_id: 56
  }, {
    first_char: 'Y',
    city_name: '\u8425\u53E3',
    city_id: 76
  }, {
    first_char: 'Y',
    city_name: '\u626C\u5DDE',
    city_id: 91
  }, {
    first_char: 'Y',
    city_name: '\u76D0\u57CE',
    city_id: 94
  }, {
    first_char: 'Y',
    city_name: '\u8FD0\u57CE',
    city_id: 104
  }, {
    first_char: 'Y',
    city_name: '\u5B9C\u5BBE',
    city_id: 118
  }, {
    first_char: 'Y',
    city_name: '\u9633\u6CC9',
    city_id: 126
  }, {
    first_char: 'Y',
    city_name: '\u5EF6\u5409',
    city_id: 131
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6797',
    city_id: 162
  }, {
    first_char: 'Y',
    city_name: '\u5EF6\u5B89',
    city_id: 171
  }, {
    first_char: 'Y',
    city_name: '\u6986\u6797',
    city_id: 172
  }, {
    first_char: 'Y',
    city_name: '\u4F0A\u6625',
    city_id: 214
  }, {
    first_char: 'Y',
    city_name: '\u9E70\u6F6D',
    city_id: 220
  }, {
    first_char: 'Y',
    city_name: '\u5B9C\u6625',
    city_id: 222
  }, {
    first_char: 'Y',
    city_name: '\u76CA\u9633',
    city_id: 242
  }, {
    first_char: 'Y',
    city_name: '\u6C38\u5DDE',
    city_id: 243
  }, {
    first_char: 'Y',
    city_name: '\u9633\u6C5F',
    city_id: 256
  }, {
    first_char: 'Y',
    city_name: '\u4E91\u6D6E',
    city_id: 258
  }, {
    first_char: 'Y',
    city_name: '\u96C5\u5B89',
    city_id: 287
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6EAA',
    city_id: 300
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6811\u5DDE',
    city_id: 343
  }, {
    first_char: 'Z',
    city_name: '\u90D1\u5DDE',
    city_id: 9
  }, {
    first_char: 'Z',
    city_name: '\u9075\u4E49',
    city_id: 44
  }, {
    first_char: 'Z',
    city_name: '\u682A\u6D32',
    city_id: 54
  }, {
    first_char: 'Z',
    city_name: '\u6DC4\u535A',
    city_id: 57
  }, {
    first_char: 'Z',
    city_name: '\u5F20\u5BB6\u53E3',
    city_id: 78
  }, {
    first_char: 'Z',
    city_name: '\u73E0\u6D77',
    city_id: 84
  }, {
    first_char: 'Z',
    city_name: '\u9547\u6C5F',
    city_id: 93
  }, {
    first_char: 'Z',
    city_name: '\u5468\u53E3',
    city_id: 114
  }, {
    first_char: 'Z',
    city_name: '\u4E2D\u5C71',
    city_id: 132
  }, {
    first_char: 'Z',
    city_name: '\u6F33\u5DDE',
    city_id: 142
  }, {
    first_char: 'Z',
    city_name: '\u821F\u5C71',
    city_id: 146
  }, {
    first_char: 'Z',
    city_name: '\u6E5B\u6C5F',
    city_id: 159
  }, {
    first_char: 'Z',
    city_name: '\u8087\u5E86',
    city_id: 160
  }, {
    first_char: 'Z',
    city_name: '\u67A3\u5E84',
    city_id: 168
  }, {
    first_char: 'Z',
    city_name: '\u5F20\u5BB6\u754C',
    city_id: 241
  }, {
    first_char: 'Z',
    city_name: '\u9A7B\u9A6C\u5E97',
    city_id: 251
  }, {
    first_char: 'Z',
    city_name: '\u81EA\u8D21',
    city_id: 279
  }, {
    first_char: 'Z',
    city_name: '\u8D44\u9633',
    city_id: 289
  }, {
    first_char: 'Z',
    city_name: '\u662D\u901A',
    city_id: 302
  }, {
    first_char: 'Z',
    city_name: '\u5F20\u6396',
    city_id: 326
  }, {
    first_char: 'Z',
    city_name: '\u4E2D\u536B',
    city_id: 337
  }]
};
module.exports = City;