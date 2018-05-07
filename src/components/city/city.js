import React, { Component } from 'react';

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


class City extends Component {
  /* 解决锚点会产生历史记录，点后退，退不出当前页面的问题 */
  static fast_charClick(e) {
    const fastCharEle = e.currentTarget;
    const ele = document.querySelector(`#first_char_${fastCharEle.dataset.char}`);
    const cityCon = document.querySelector('._cityCon');
    cityCon.scrollTop = ele.offsetTop;
  }
  /* 点击头部已选城市的删除按钮 */
  static delSelect(a) {
    const { cityid } = a.currentTarget.dataset;
    const ele = document.getElementById(`city_${cityid}`);
    try {
      // oppo r8007 安卓4.3手机运行会报错
      ele.click();
    } catch (e) {
      const ev = document.createEvent('HTMLEvents');
      ev.initEvent('click', true, true);
      ele.dispatchEvent(ev);
    }
  }
  /* 点击定位城市的事件 */
  static positionAddrClick(e) {
    document.getElementById(`city_${e.currentTarget.dataset.cityid}`).click();
  }
  constructor(props) {
    super(props);
    let i = 0;
    const firstChar = [];
    // 把26个字母放进数组里
    while (i < 26) {
      firstChar.push(String.fromCharCode(i + 97).toLocaleUpperCase());
      i += 1;
    }

    this.fast_charTouchMove = this.fast_charTouchMove.bind(this);
    this.fast_charTouchEnd = this.fast_charTouchEnd.bind(this);
    this.delCity = this.delCity.bind(this);
    this.addCity = this.addCity.bind(this);
    this.cityClick = this.cityClick.bind(this);
    this.initSelectCityCon = this.initSelectCityCon.bind(this);
    this.initMaxChar = this.initMaxChar.bind(this);
    this.initPositionCon = this.initPositionCon.bind(this);
    this.initCityCon = this.initCityCon.bind(this);
    this.init_fast_char = this.init_fast_char.bind(this);

    this.state = {
      selectCity: [],
      isRadio: true,
      showMaxChar: false,
      firstChar,
    };
  }
  componentWillMount() {
    const self = this;
    let {
      cityArr,
    } = this.props;
    const {
      dataAttrName,
    } = this.props;
    if (cityArr) {
      // 如果是对象的话，需要转换一下
      if (!cityArr.length) {
        const cityObj = cityArr;
        cityArr = [];
        this.state.firstChar.forEach((char) => {
          if (cityObj[char]) {
            cityObj[char].forEach((ele) => {
              ele[self.props.dataAttrName.firstChar] = char;
              cityArr.push(ele);
            });
          }
        });
      }
      const Obj = {};
      /* 把城市分成数组，字母相同的在一组 */
      cityArr.forEach((ele, i) => {
        const firstChar = ele[dataAttrName.firstChar];
        if (!Obj[firstChar]) {
          Obj[firstChar] = [];
        }
        Obj[firstChar].push(cityArr[i]);
      });
      this.setState({ cityObj: Obj });
    }
  }
  componentDidUpdate() {
    const selectCon = document.getElementById('selectCon');
    if (selectCon) {
      selectCon.scrollTop = selectCon.scrollHeight;
    }
  }
  /* 初始化右侧字母栏 */
  init_fast_char() {
    const {
      fast_charTouchMove,
      fast_charTouchEnd,
      state,
    } = this;
    const {
      cityObj,
      firstChar,
    } = state;

    return (
      <div
        className="fast_char"
        onTouchMove={fast_charTouchMove}
        onTouchEnd={fast_charTouchEnd}
      >
        {firstChar.map((char, i) => {
          if (cityObj[char]) {
            return (
              <button
                data-char={char}
                key={i}
                onClick={City.fast_charClick}
              >{char}
              </button>
            );
          }
          return null;
        })}
      </div>
    );
  }

  /* 城市点击事件 */
  cityClick(e) {
    const {
      isRadio,
    } = this.state;
    const {
      callBack,
    } = this.props;
    const target = e.currentTarget;
    const target_class = target.className;
    const inp = target.querySelector('input');
    const { checked } = inp;
    const cityObj = JSON.parse(target.dataset.cityobj);

    if (isRadio) {
      callBack && callBack(cityObj);
      return;
    }
    if (checked) {
      inp.checked = false;

      target.className = (` ${target_class} `).replace(' select ', ' ');

      this.delCity(cityObj);
    } else {
      inp.checked = true;
      target.className += ' select';
      this.addCity(cityObj);
    }
  }
  /* 点击城市-城市是未选中的时候，走到这里，把城市ID放入已选城市的数组里 */
  addCity(cityData) {
    const selectCity = this.state.selectCity.slice(0);

    selectCity.push(cityData);

    this.setState({
      selectCity,
    });
  }
  /* 点击城市-城市是已选中的时候，走到这里，从已选城市的数组里删除城市ID */
  delCity(cityData) {
    const {
      dataAttrName,
    } = this.props;
    const cityId = cityData[dataAttrName.id];
    const selectCityArr = this.state.selectCity.slice(0);
    selectCityArr.forEach((ele, index) => {
      Number(cityId) === Number(ele[dataAttrName.id]) && selectCityArr.splice(index, 1);
    });
    this.setState({
      selectCity: selectCityArr,
    });
  }


  fast_charTouchMove(e) {
    const {
      clientX,
    } = e.targetTouches[0];
    const {
      clientY,
    } = e.targetTouches[0];
    const ele = document.elementFromPoint(clientX, clientY) || {};
    const { dataset } = ele;

    if (ele && dataset.char) {
      this.setState({
        maxChar: dataset.char,
        showMaxChar: true,
      });
      ele.click();
    }
    e.preventDefault();
  }
  fast_charTouchEnd() {
    this.setState({
      showMaxChar: false,
    });
  }
  initCityCon() {
    const self = this;
    const {
      cityObj,
      isRadio,
      selectCity,
    } = this.state;
    const {
      dataAttrName,
    } = this.props;
    if (!cityObj) {
      return null;
    }
    return (
      <ul className="cityCon">
        {
          (function init() {
            const arr = [];
            for (const a in cityObj) {
              if ({}.hasOwnProperty.call(cityObj, a)) {
              arr.push((
                <li key={a} id={`first_char_${a}`}>
                  <button className="first_char">{a}</button>
                  {
                    cityObj[a].map((ele, index) => {
                      let isCheck = false;
                      selectCity.forEach((_ele = {}) => {
                        if (Number(ele.city_id) === Number(_ele.city_id)) {
                          isCheck = true;
                        }
                      });
                      return (
                        <div
                          className={`list${isCheck ? ' select' : ''}`}
                          key={index}
                          id={`city_${ele.city_id}`}
                          data-cityobj={JSON.stringify(ele)}
                          onClick={self.cityClick}
                        >
                          <input
                            className="none"
                            defaultChecked={isCheck}
                            name="cityInp"
                            type="checkbox"
                          />
                          {
                            !isRadio && <span className="check"><span className="icon icon-popup_right" /></span>
                          }
                          <span
                            className="cityName"
                          >
                            {ele[dataAttrName.name]}
                          </span>
                        </div>
                      );
                    })
                  }
                </li>
                ));
            }
            }
            return arr;
          }())
        }
      </ul>
    );
  }
  initPositionCon() {
    const {
      position,
      dataAttrName,
    } = this.props;
    if (!position) {
      return null;
    }
    return (
      <div>
        <div className="selectTitle">定位城市</div>
        <div
          className="positionAddr"
          data-cityid={position.city_id}
          onClick={City.positionAddrClick}
        >
          <span className="icon icon-addr" />
          <span className="positionCityName">{position[dataAttrName.name]}</span>
        </div>
      </div>
    );
  }
  initMaxChar() {
    const {
      maxChar,
      showMaxChar,
    } = this.state;
    if (!showMaxChar) {
      return null;
    }
    return <div className="max_char">{maxChar}</div>;
  }
  initSelectCityCon() {
    const {

      selectCity,
    } = this.state;
    const {
      dataAttrName,
    } = this.props;
    if (!selectCity || !(selectCity && selectCity.length)) {
      return null;
    }
    return (
      <div className="selectCon" id="selectCon">
        {
          selectCity.map((ele, index) => (
            <div
              className="list"
              key={index}
            >
              <span
                className="icon icon-addr"
              />
              <span>
                {ele[dataAttrName.name]}
              </span>
              <button
                className="icon icon-close"
                data-cityid={ele.city_id}
                onClick={City.delSelect}
              />
            </div>
            ))
        }
      </div>
    );
  }
  render() {
    if (!this.state) {
      return null;
    }
    const {
      isRadio,
    } = this.state;
    const {
      position,
      show,
      ...other
    } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div className="selectCity">
        {/* 如果不是单选，显示已选择的城市 */}
        {!isRadio ? this.initSelectCityCon() : null}
        {/* <div className="selectTitle">请选择城市</div> */}
        {/* 滑动右侧字母时，中间显示的大字母 */}
        {this.initMaxChar()}

        {/* 城市列表 */}
        <div className="_cityCon" {...other} >
          {position ? this.initPositionCon() : null}
          {this.initCityCon()}
        </div>
        {/* 初始化右侧首字母 */}
        {this.init_fast_char()}
      </div>
    );
  }
}
City.defaultProps = {
  dataAttrName: {
    id: 'city_id',
    name: 'city_name',
    firstChar: 'first_char',
  },
  cityArr: [{
    first_char: 'A',
    city_name: '\u978d\u5c71',
    city_id: 64,
  }, {
    first_char: 'A',
    city_name: '\u5b89\u5e86',
    city_id: 149,
  }, {
    first_char: 'A',
    city_name: '\u5b89\u9633',
    city_id: 174,
  }, {
    first_char: 'A',
    city_name: '\u963f\u62c9\u5584\u76df',
    city_id: 202,
  }, {
    first_char: 'A',
    city_name: '\u5b89\u987a',
    city_id: 294,
  }, {
    first_char: 'A',
    city_name: '\u5b89\u5eb7',
    city_id: 320,
  }, {
    first_char: 'A',
    city_name: '\u963f\u514b\u82cf\u5730\u533a',
    city_id: 348,
  }, {
    first_char: 'A',
    city_name: '\u963f\u52d2\u6cf0\u5730\u533a',
    city_id: 355,
  }, {
    first_char: 'A',
    city_name: '\u963f\u62c9\u5c14',
    city_id: 356,
  }, {
    first_char: 'B',
    city_name: '\u5317\u4eac',
    city_id: 1,
  }, {
    first_char: 'B',
    city_name: '\u4fdd\u5b9a',
    city_id: 62,
  }, {
    first_char: 'B',
    city_name: '\u5305\u5934',
    city_id: 63,
  }, {
    first_char: 'B',
    city_name: '\u672c\u6eaa',
    city_id: 77,
  }, {
    first_char: 'B',
    city_name: '\u868c\u57e0',
    city_id: 100,
  }, {
    first_char: 'B',
    city_name: '\u5317\u6d77',
    city_id: 161,
  }, {
    first_char: 'B',
    city_name: '\u6ee8\u5dde',
    city_id: 166,
  }, {
    first_char: 'B',
    city_name: '\u5b9d\u9e21',
    city_id: 170,
  }, {
    first_char: 'B',
    city_name: '\u4eb3\u5dde',
    city_id: 189,
  }, {
    first_char: 'B',
    city_name: '\u5df4\u5f66\u6dd6\u5c14',
    city_id: 199,
  }, {
    first_char: 'B',
    city_name: '\u767d\u5c71',
    city_id: 208,
  }, {
    first_char: 'B',
    city_name: '\u767d\u57ce',
    city_id: 210,
  }, {
    first_char: 'B',
    city_name: '\u767e\u8272',
    city_id: 263,
  }, {
    first_char: 'B',
    city_name: '\u767d\u6c99\u9ece\u65cf\u81ea\u6cbb\u53bf',
    city_id: 278,
  }, {
    first_char: 'B',
    city_name: '\u5df4\u4e2d',
    city_id: 288,
  }, {
    first_char: 'B',
    city_name: '\u6bd5\u8282\u5730\u533a',
    city_id: 296,
  }, {
    first_char: 'B',
    city_name: '\u4fdd\u5c71',
    city_id: 301,
  }, {
    first_char: 'B',
    city_name: '\u767d\u94f6',
    city_id: 323,
  }, {
    first_char: 'B',
    city_name: '\u5df4\u97f3\u90ed\u695e\u5dde',
    city_id: 350,
  }, {
    first_char: 'B',
    city_name: '\u535a\u5c14\u5854\u62c9\u5dde',
    city_id: 352,
  }, {
    first_char: 'B',
    city_name: '\u4fdd\u4ead\u9ece\u65cf\u82d7\u65cf\u81ea\u6cbb\u53bf',
    city_id: 364,
  }, {
    first_char: 'C',
    city_name: '\u6210\u90fd',
    city_id: 17,
  }, {
    first_char: 'C',
    city_name: '\u91cd\u5e86',
    city_id: 18,
  }, {
    first_char: 'C',
    city_name: '\u957f\u6c99',
    city_id: 24,
  }, {
    first_char: 'C',
    city_name: '\u957f\u6625',
    city_id: 25,
  }, {
    first_char: 'C',
    city_name: '\u5e38\u5dde',
    city_id: 45,
  }, {
    first_char: 'C',
    city_name: '\u6ca7\u5dde',
    city_id: 59,
  }, {
    first_char: 'C',
    city_name: '\u627f\u5fb7',
    city_id: 72,
  }, {
    first_char: 'C',
    city_name: '\u5e38\u5fb7',
    city_id: 106,
  }, {
    first_char: 'C',
    city_name: '\u90f4\u5dde',
    city_id: 107,
  }, {
    first_char: 'C',
    city_name: '\u957f\u6cbb',
    city_id: 127,
  }, {
    first_char: 'C',
    city_name: '\u6ec1\u5dde',
    city_id: 148,
  }, {
    first_char: 'C',
    city_name: '\u6c60\u5dde',
    city_id: 187,
  }, {
    first_char: 'C',
    city_name: '\u8d64\u5cf0',
    city_id: 196,
  }, {
    first_char: 'C',
    city_name: '\u6f6e\u5dde',
    city_id: 257,
  }, {
    first_char: 'C',
    city_name: '\u5d07\u5de6',
    city_id: 267,
  }, {
    first_char: 'C',
    city_name: '\u6f84\u8fc8\u53bf',
    city_id: 274,
  }, {
    first_char: 'C',
    city_name: '\u695a\u96c4\u5dde',
    city_id: 308,
  }, {
    first_char: 'C',
    city_name: '\u660c\u90fd\u5730\u533a',
    city_id: 313,
  }, {
    first_char: 'C',
    city_name: '\u660c\u5409\u5dde',
    city_id: 351,
  }, {
    first_char: 'C',
    city_name: '\u660c\u6c5f\u9ece\u65cf\u81ea\u6cbb\u53bf',
    city_id: 363,
  }, {
    first_char: 'D',
    city_name: '\u5927\u8fde',
    city_id: 14,
  }, {
    first_char: 'D',
    city_name: '\u4e1c\u839e',
    city_id: 21,
  }, {
    first_char: 'D',
    city_name: '\u5927\u5e86',
    city_id: 48,
  }, {
    first_char: 'D',
    city_name: '\u4e1c\u8425',
    city_id: 73,
  }, {
    first_char: 'D',
    city_name: '\u5fb7\u5dde',
    city_id: 120,
  }, {
    first_char: 'D',
    city_name: '\u5927\u540c',
    city_id: 125,
  }, {
    first_char: 'D',
    city_name: '\u5927\u7406\u5dde',
    city_id: 136,
  }, {
    first_char: 'D',
    city_name: '\u4e39\u4e1c',
    city_id: 163,
  }, {
    first_char: 'D',
    city_name: '\u5fb7\u9633',
    city_id: 173,
  }, {
    first_char: 'D',
    city_name: '\u5927\u5174\u5b89\u5cad\u5730\u533a',
    city_id: 218,
  }, {
    first_char: 'D',
    city_name: '\u510b\u5dde',
    city_id: 270,
  }, {
    first_char: 'D',
    city_name: '\u4e1c\u65b9',
    city_id: 273,
  }, {
    first_char: 'D',
    city_name: '\u5b9a\u5b89\u53bf',
    city_id: 275,
  }, {
    first_char: 'D',
    city_name: '\u8fbe\u5dde',
    city_id: 285,
  }, {
    first_char: 'D',
    city_name: '\u5fb7\u5b8f\u5dde',
    city_id: 309,
  }, {
    first_char: 'D',
    city_name: '\u8fea\u5e86\u5dde',
    city_id: 311,
  }, {
    first_char: 'D',
    city_name: '\u5b9a\u897f',
    city_id: 330,
  }, {
    first_char: 'E',
    city_name: '\u9102\u5c14\u591a\u65af',
    city_id: 43,
  }, {
    first_char: 'E',
    city_name: '\u9102\u5dde',
    city_id: 230,
  }, {
    first_char: 'E',
    city_name: '\u6069\u65bd\u5dde',
    city_id: 235,
  }, {
    first_char: 'F',
    city_name: '\u798f\u5dde',
    city_id: 34,
  }, {
    first_char: 'F',
    city_name: '\u4f5b\u5c71',
    city_id: 36,
  }, {
    first_char: 'F',
    city_name: '\u629a\u987a',
    city_id: 66,
  }, {
    first_char: 'F',
    city_name: '\u961c\u65b0',
    city_id: 164,
  }, {
    first_char: 'F',
    city_name: '\u961c\u9633',
    city_id: 188,
  }, {
    first_char: 'F',
    city_name: '\u629a\u5dde',
    city_id: 223,
  }, {
    first_char: 'F',
    city_name: '\u9632\u57ce\u6e2f',
    city_id: 260,
  }, {
    first_char: 'G',
    city_name: '\u5e7f\u5dde',
    city_id: 3,
  }, {
    first_char: 'G',
    city_name: '\u8d35\u9633',
    city_id: 82,
  }, {
    first_char: 'G',
    city_name: '\u8d63\u5dde',
    city_id: 102,
  }, {
    first_char: 'G',
    city_name: '\u6842\u6797',
    city_id: 135,
  }, {
    first_char: 'G',
    city_name: '\u8d35\u6e2f',
    city_id: 262,
  }, {
    first_char: 'G',
    city_name: '\u5e7f\u5143',
    city_id: 280,
  }, {
    first_char: 'G',
    city_name: '\u5e7f\u5b89',
    city_id: 284,
  }, {
    first_char: 'G',
    city_name: '\u7518\u5b5c\u5dde',
    city_id: 291,
  }, {
    first_char: 'G',
    city_name: '\u7518\u5357\u5dde',
    city_id: 333,
  }, {
    first_char: 'G',
    city_name: '\u56fa\u539f',
    city_id: 336,
  }, {
    first_char: 'G',
    city_name: '\u679c\u6d1b\u5dde',
    city_id: 342,
  }, {
    first_char: 'H',
    city_name: '\u676d\u5dde',
    city_id: 5,
  }, {
    first_char: 'H',
    city_name: '\u5408\u80a5',
    city_id: 15,
  }, {
    first_char: 'H',
    city_name: '\u54c8\u5c14\u6ee8',
    city_id: 16,
  }, {
    first_char: 'H',
    city_name: '\u547c\u548c\u6d69\u7279',
    city_id: 41,
  }, {
    first_char: 'H',
    city_name: '\u90af\u90f8',
    city_id: 60,
  }, {
    first_char: 'H',
    city_name: '\u846b\u82a6\u5c9b',
    city_id: 70,
  }, {
    first_char: 'H',
    city_name: '\u8861\u6c34',
    city_id: 80,
  }, {
    first_char: 'H',
    city_name: '\u6d77\u53e3',
    city_id: 83,
  }, {
    first_char: 'H',
    city_name: '\u6e56\u5dde',
    city_id: 90,
  }, {
    first_char: 'H',
    city_name: '\u6dee\u5b89',
    city_id: 97,
  }, {
    first_char: 'H',
    city_name: '\u8861\u9633',
    city_id: 105,
  }, {
    first_char: 'H',
    city_name: '\u6c49\u4e2d',
    city_id: 115,
  }, {
    first_char: 'H',
    city_name: '\u83cf\u6cfd',
    city_id: 124,
  }, {
    first_char: 'H',
    city_name: '\u60e0\u5dde',
    city_id: 133,
  }, {
    first_char: 'H',
    city_name: '\u9ec4\u5c71',
    city_id: 141,
  }, {
    first_char: 'H',
    city_name: '\u6dee\u5357',
    city_id: 150,
  }, {
    first_char: 'H',
    city_name: '\u6dee\u5317',
    city_id: 183,
  }, {
    first_char: 'H',
    city_name: '\u547c\u4f26\u8d1d\u5c14',
    city_id: 198,
  }, {
    first_char: 'H',
    city_name: '\u5174\u5b89\u76df',
    city_id: 203,
  }, {
    first_char: 'H',
    city_name: '\u9e64\u5c97',
    city_id: 212,
  }, {
    first_char: 'H',
    city_name: '\u9ed1\u6cb3',
    city_id: 217,
  }, {
    first_char: 'H',
    city_name: '\u9ec4\u77f3',
    city_id: 227,
  }, {
    first_char: 'H',
    city_name: '\u9ec4\u5188',
    city_id: 232,
  }, {
    first_char: 'H',
    city_name: '\u6000\u5316',
    city_id: 244,
  }, {
    first_char: 'H',
    city_name: '\u9e64\u58c1',
    city_id: 247,
  }, {
    first_char: 'H',
    city_name: '\u6cb3\u6e90',
    city_id: 254,
  }, {
    first_char: 'H',
    city_name: '\u8d3a\u5dde',
    city_id: 264,
  }, {
    first_char: 'H',
    city_name: '\u6cb3\u6c60',
    city_id: 265,
  }, {
    first_char: 'H',
    city_name: '\u7ea2\u6cb3\u5dde',
    city_id: 306,
  }, {
    first_char: 'H',
    city_name: '\u6d77\u4e1c\u5730\u533a',
    city_id: 338,
  }, {
    first_char: 'H',
    city_name: '\u6d77\u5317\u5dde',
    city_id: 339,
  }, {
    first_char: 'H',
    city_name: '\u9ec4\u5357\u5dde',
    city_id: 340,
  }, {
    first_char: 'H',
    city_name: '\u6d77\u5357\u5dde',
    city_id: 341,
  }, {
    first_char: 'H',
    city_name: '\u6d77\u897f\u5dde',
    city_id: 344,
  }, {
    first_char: 'H',
    city_name: '\u54c8\u5bc6\u5730\u533a',
    city_id: 346,
  }, {
    first_char: 'H',
    city_name: '\u548c\u7530\u5730\u533a',
    city_id: 347,
  }, {
    first_char: 'I',
    city_name: '\u4f0a\u7281\u5dde',
    city_id: 353,
  }, {
    first_char: 'J',
    city_name: '\u6d4e\u5357',
    city_id: 12,
  }, {
    first_char: 'J',
    city_name: '\u9526\u5dde',
    city_id: 68,
  }, {
    first_char: 'J',
    city_name: '\u664b\u4e2d',
    city_id: 71,
  }, {
    first_char: 'J',
    city_name: '\u5409\u6797',
    city_id: 74,
  }, {
    first_char: 'J',
    city_name: '\u6d4e\u5b81',
    city_id: 79,
  }, {
    first_char: 'J',
    city_name: '\u91d1\u534e',
    city_id: 86,
  }, {
    first_char: 'J',
    city_name: '\u5609\u5174',
    city_id: 88,
  }, {
    first_char: 'J',
    city_name: '\u4e5d\u6c5f',
    city_id: 101,
  }, {
    first_char: 'J',
    city_name: '\u8346\u5dde',
    city_id: 109,
  }, {
    first_char: 'J',
    city_name: '\u666f\u5fb7\u9547',
    city_id: 151,
  }, {
    first_char: 'J',
    city_name: '\u6c5f\u95e8',
    city_id: 153,
  }, {
    first_char: 'J',
    city_name: '\u63ed\u9633',
    city_id: 154,
  }, {
    first_char: 'J',
    city_name: '\u7126\u4f5c',
    city_id: 175,
  }, {
    first_char: 'J',
    city_name: '\u664b\u57ce',
    city_id: 190,
  }, {
    first_char: 'J',
    city_name: '\u9e21\u897f',
    city_id: 211,
  }, {
    first_char: 'J',
    city_name: '\u4f73\u6728\u65af',
    city_id: 215,
  }, {
    first_char: 'J',
    city_name: '\u5409\u5b89',
    city_id: 221,
  }, {
    first_char: 'J',
    city_name: '\u8346\u95e8',
    city_id: 229,
  }, {
    first_char: 'J',
    city_name: '\u6d4e\u6e90',
    city_id: 252,
  }, {
    first_char: 'J',
    city_name: '\u91d1\u660c',
    city_id: 322,
  }, {
    first_char: 'J',
    city_name: '\u5609\u5cea\u5173',
    city_id: 324,
  }, {
    first_char: 'J',
    city_name: '\u9152\u6cc9',
    city_id: 328,
  }, {
    first_char: 'K',
    city_name: '\u6606\u660e',
    city_id: 19,
  }, {
    first_char: 'K',
    city_name: '\u5f00\u5c01',
    city_id: 110,
  }, {
    first_char: 'K',
    city_name: '\u5580\u4ec0\u5730\u533a',
    city_id: 179,
  }, {
    first_char: 'K',
    city_name: '\u514b\u62c9\u739b\u4f9d',
    city_id: 180,
  }, {
    first_char: 'K',
    city_name: '\u514b\u5b5c\u52d2\u82cf\u67ef\u5dde',
    city_id: 349,
  }, {
    first_char: 'L',
    city_name: '\u6d1b\u9633',
    city_id: 27,
  }, {
    first_char: 'L',
    city_name: '\u5170\u5dde',
    city_id: 30,
  }, {
    first_char: 'L',
    city_name: '\u5eca\u574a',
    city_id: 46,
  }, {
    first_char: 'L',
    city_name: '\u4e34\u6c82',
    city_id: 58,
  }, {
    first_char: 'L',
    city_name: '\u8fbd\u9633',
    city_id: 75,
  }, {
    first_char: 'L',
    city_name: '\u8fde\u4e91\u6e2f',
    city_id: 96,
  }, {
    first_char: 'L',
    city_name: '\u6cf8\u5dde',
    city_id: 117,
  }, {
    first_char: 'L',
    city_name: '\u83b1\u829c',
    city_id: 122,
  }, {
    first_char: 'L',
    city_name: '\u804a\u57ce',
    city_id: 123,
  }, {
    first_char: 'L',
    city_name: '\u67f3\u5dde',
    city_id: 134,
  }, {
    first_char: 'L',
    city_name: '\u4e3d\u6c5f',
    city_id: 137,
  }, {
    first_char: 'L',
    city_name: '\u4e3d\u6c34',
    city_id: 139,
  }, {
    first_char: 'L',
    city_name: '\u62c9\u8428',
    city_id: 178,
  }, {
    first_char: 'L',
    city_name: '\u516d\u5b89',
    city_id: 186,
  }, {
    first_char: 'L',
    city_name: '\u4e34\u6c7e',
    city_id: 193,
  }, {
    first_char: 'L',
    city_name: '\u5415\u6881',
    city_id: 194,
  }, {
    first_char: 'L',
    city_name: '\u8fbd\u6e90',
    city_id: 206,
  }, {
    first_char: 'L',
    city_name: '\u9f99\u5ca9',
    city_id: 226,
  }, {
    first_char: 'L',
    city_name: '\u5a04\u5e95',
    city_id: 245,
  }, {
    first_char: 'L',
    city_name: '\u6f2f\u6cb3',
    city_id: 248,
  }, {
    first_char: 'L',
    city_name: '\u6765\u5bbe',
    city_id: 266,
  }, {
    first_char: 'L',
    city_name: '\u4e34\u9ad8\u53bf',
    city_id: 277,
  }, {
    first_char: 'L',
    city_name: '\u4e50\u5c71',
    city_id: 283,
  }, {
    first_char: 'L',
    city_name: '\u51c9\u5c71\u5dde',
    city_id: 292,
  }, {
    first_char: 'L',
    city_name: '\u516d\u76d8\u6c34',
    city_id: 293,
  }, {
    first_char: 'L',
    city_name: '\u4e34\u6ca7',
    city_id: 304,
  }, {
    first_char: 'L',
    city_name: '\u6797\u829d\u5730\u533a',
    city_id: 317,
  }, {
    first_char: 'L',
    city_name: '\u9647\u5357',
    city_id: 331,
  }, {
    first_char: 'L',
    city_name: '\u4e34\u590f\u5dde',
    city_id: 332,
  }, {
    first_char: 'L',
    city_name: '\u9675\u6c34\u9ece\u65cf\u81ea\u6cbb\u53bf',
    city_id: 360,
  }, {
    first_char: 'L',
    city_name: '\u4e50\u4e1c\u9ece\u65cf\u81ea\u6cbb\u53bf',
    city_id: 362,
  }, {
    first_char: 'M',
    city_name: '\u7ef5\u9633',
    city_id: 50,
  }, {
    first_char: 'M',
    city_name: '\u9a6c\u978d\u5c71',
    city_id: 99,
  }, {
    first_char: 'M',
    city_name: '\u7261\u4e39\u6c5f',
    city_id: 129,
  }, {
    first_char: 'M',
    city_name: '\u8302\u540d',
    city_id: 155,
  }, {
    first_char: 'M',
    city_name: '\u6885\u5dde',
    city_id: 156,
  }, {
    first_char: 'M',
    city_name: '\u7709\u5c71',
    city_id: 286,
  }, {
    first_char: 'N',
    city_name: '\u5357\u4eac',
    city_id: 11,
  }, {
    first_char: 'N',
    city_name: '\u5b81\u6ce2',
    city_id: 20,
  }, {
    first_char: 'N',
    city_name: '\u5357\u5b81',
    city_id: 33,
  }, {
    first_char: 'N',
    city_name: '\u5357\u660c',
    city_id: 38,
  }, {
    first_char: 'N',
    city_name: '\u5357\u5145',
    city_id: 53,
  }, {
    first_char: 'N',
    city_name: '\u5357\u901a',
    city_id: 92,
  }, {
    first_char: 'N',
    city_name: '\u5357\u9633',
    city_id: 113,
  }, {
    first_char: 'N',
    city_name: '\u5b81\u5fb7',
    city_id: 144,
  }, {
    first_char: 'N',
    city_name: '\u5357\u5e73',
    city_id: 145,
  }, {
    first_char: 'N',
    city_name: '\u5185\u6c5f',
    city_id: 282,
  }, {
    first_char: 'N',
    city_name: '\u963f\u575d\u5dde',
    city_id: 290,
  }, {
    first_char: 'N',
    city_name: '\u6012\u6c5f\u5dde',
    city_id: 310,
  }, {
    first_char: 'N',
    city_name: '\u90a3\u66f2\u5730\u533a',
    city_id: 312,
  }, {
    first_char: 'P',
    city_name: '\u5e73\u9876\u5c71',
    city_id: 103,
  }, {
    first_char: 'P',
    city_name: '\u6500\u679d\u82b1',
    city_id: 119,
  }, {
    first_char: 'P',
    city_name: '\u8386\u7530',
    city_id: 143,
  }, {
    first_char: 'P',
    city_name: '\u76d8\u9526',
    city_id: 165,
  }, {
    first_char: 'P',
    city_name: '\u6fee\u9633',
    city_id: 176,
  }, {
    first_char: 'P',
    city_name: '\u840d\u4e61',
    city_id: 219,
  }, {
    first_char: 'P',
    city_name: '\u666e\u6d31',
    city_id: 303,
  }, {
    first_char: 'P',
    city_name: '\u5e73\u51c9',
    city_id: 327,
  }, {
    first_char: 'Q',
    city_name: '\u9752\u5c9b',
    city_id: 13,
  }, {
    first_char: 'Q',
    city_name: '\u6cc9\u5dde',
    city_id: 35,
  }, {
    first_char: 'Q',
    city_name: '\u79e6\u7687\u5c9b',
    city_id: 61,
  }, {
    first_char: 'Q',
    city_name: '\u9f50\u9f50\u54c8\u5c14',
    city_id: 65,
  }, {
    first_char: 'Q',
    city_name: '\u66f2\u9756',
    city_id: 138,
  }, {
    first_char: 'Q',
    city_name: '\u8862\u5dde',
    city_id: 140,
  }, {
    first_char: 'Q',
    city_name: '\u6e05\u8fdc',
    city_id: 157,
  }, {
    first_char: 'Q',
    city_name: '\u4e03\u53f0\u6cb3',
    city_id: 216,
  }, {
    first_char: 'Q',
    city_name: '\u6f5c\u6c5f',
    city_id: 238,
  }, {
    first_char: 'Q',
    city_name: '\u94a6\u5dde',
    city_id: 261,
  }, {
    first_char: 'Q',
    city_name: '\u743c\u6d77',
    city_id: 269,
  }, {
    first_char: 'Q',
    city_name: '\u9ed4\u897f\u5357\u5dde',
    city_id: 297,
  }, {
    first_char: 'Q',
    city_name: '\u9ed4\u4e1c\u5357\u5dde',
    city_id: 298,
  }, {
    first_char: 'Q',
    city_name: '\u9ed4\u5357\u5dde',
    city_id: 299,
  }, {
    first_char: 'Q',
    city_name: '\u5e86\u9633',
    city_id: 329,
  }, {
    first_char: 'Q',
    city_name: '\u743c\u4e2d\u9ece\u65cf\u82d7\u65cf\u81ea\u6cbb\u53bf',
    city_id: 365,
  }, {
    first_char: 'R',
    city_name: '\u65e5\u7167',
    city_id: 167,
  }, {
    first_char: 'S',
    city_name: '\u6df1\u5733',
    city_id: 2,
  }, {
    first_char: 'S',
    city_name: '\u4e0a\u6d77',
    city_id: 4,
  }, {
    first_char: 'S',
    city_name: '\u6c88\u9633',
    city_id: 8,
  }, {
    first_char: 'S',
    city_name: '\u77f3\u5bb6\u5e84',
    city_id: 22,
  }, {
    first_char: 'S',
    city_name: '\u82cf\u5dde',
    city_id: 23,
  }, {
    first_char: 'S',
    city_name: '\u4e09\u4e9a',
    city_id: 37,
  }, {
    first_char: 'S',
    city_name: '\u7ecd\u5174',
    city_id: 89,
  }, {
    first_char: 'S',
    city_name: '\u7ee5\u5316',
    city_id: 128,
  }, {
    first_char: 'S',
    city_name: '\u56db\u5e73',
    city_id: 130,
  }, {
    first_char: 'S',
    city_name: '\u5bbf\u8fc1',
    city_id: 147,
  }, {
    first_char: 'S',
    city_name: '\u6c55\u5934',
    city_id: 158,
  }, {
    first_char: 'S',
    city_name: '\u5546\u4e18',
    city_id: 177,
  }, {
    first_char: 'S',
    city_name: '\u77f3\u6cb3\u5b50',
    city_id: 181,
  }, {
    first_char: 'S',
    city_name: '\u5bbf\u5dde',
    city_id: 185,
  }, {
    first_char: 'S',
    city_name: '\u6714\u5dde',
    city_id: 191,
  }, {
    first_char: 'S',
    city_name: '\u677e\u539f',
    city_id: 209,
  }, {
    first_char: 'S',
    city_name: '\u53cc\u9e2d\u5c71',
    city_id: 213,
  }, {
    first_char: 'S',
    city_name: '\u4e0a\u9976',
    city_id: 224,
  }, {
    first_char: 'S',
    city_name: '\u4e09\u660e',
    city_id: 225,
  }, {
    first_char: 'S',
    city_name: '\u5341\u5830',
    city_id: 228,
  }, {
    first_char: 'S',
    city_name: '\u968f\u5dde',
    city_id: 234,
  }, {
    first_char: 'S',
    city_name: '\u795e\u519c\u67b6\u6797\u533a',
    city_id: 239,
  }, {
    first_char: 'S',
    city_name: '\u90b5\u9633',
    city_id: 240,
  }, {
    first_char: 'S',
    city_name: '\u4e09\u95e8\u5ce1',
    city_id: 249,
  }, {
    first_char: 'S',
    city_name: '\u97f6\u5173',
    city_id: 253,
  }, {
    first_char: 'S',
    city_name: '\u6c55\u5c3e',
    city_id: 255,
  }, {
    first_char: 'S',
    city_name: '\u9042\u5b81',
    city_id: 281,
  }, {
    first_char: 'S',
    city_name: '\u5c71\u5357\u5730\u533a',
    city_id: 314,
  }, {
    first_char: 'S',
    city_name: '\u65e5\u5580\u5219\u5730\u533a',
    city_id: 315,
  }, {
    first_char: 'S',
    city_name: '\u5546\u6d1b',
    city_id: 321,
  }, {
    first_char: 'S',
    city_name: '\u77f3\u5634\u5c71',
    city_id: 334,
  }, {
    first_char: 'S',
    city_name: '\u4e09\u6c99',
    city_id: 361,
  }, {
    first_char: 'T',
    city_name: '\u5929\u6d25',
    city_id: 7,
  }, {
    first_char: 'T',
    city_name: '\u592a\u539f',
    city_id: 26,
  }, {
    first_char: 'T',
    city_name: '\u5510\u5c71',
    city_id: 40,
  }, {
    first_char: 'T',
    city_name: '\u94c1\u5cad',
    city_id: 69,
  }, {
    first_char: 'T',
    city_name: '\u53f0\u5dde',
    city_id: 87,
  }, {
    first_char: 'T',
    city_name: '\u6cf0\u5dde',
    city_id: 95,
  }, {
    first_char: 'T',
    city_name: '\u6cf0\u5b89',
    city_id: 121,
  }, {
    first_char: 'T',
    city_name: '\u5929\u6c34',
    city_id: 169,
  }, {
    first_char: 'T',
    city_name: '\u94dc\u9675',
    city_id: 184,
  }, {
    first_char: 'T',
    city_name: '\u901a\u8fbd',
    city_id: 197,
  }, {
    first_char: 'T',
    city_name: '\u901a\u5316',
    city_id: 207,
  }, {
    first_char: 'T',
    city_name: '\u5929\u95e8',
    city_id: 237,
  }, {
    first_char: 'T',
    city_name: '\u5c6f\u660c\u53bf',
    city_id: 276,
  }, {
    first_char: 'T',
    city_name: '\u94dc\u4ec1\u5730\u533a',
    city_id: 295,
  }, {
    first_char: 'T',
    city_name: '\u94dc\u5ddd',
    city_id: 318,
  }, {
    first_char: 'T',
    city_name: '\u5410\u9c81\u756a\u5730\u533a',
    city_id: 345,
  }, {
    first_char: 'T',
    city_name: '\u5854\u57ce\u5730\u533a',
    city_id: 354,
  }, {
    first_char: 'U',
    city_name: '\u4e4c\u9c81\u6728\u9f50',
    city_id: 52,
  }, {
    first_char: 'W',
    city_name: '\u6b66\u6c49',
    city_id: 6,
  }, {
    first_char: 'W',
    city_name: '\u5a01\u6d77',
    city_id: 42,
  }, {
    first_char: 'W',
    city_name: '\u65e0\u9521',
    city_id: 47,
  }, {
    first_char: 'W',
    city_name: '\u6f4d\u574a',
    city_id: 81,
  }, {
    first_char: 'W',
    city_name: '\u6e29\u5dde',
    city_id: 85,
  }, {
    first_char: 'W',
    city_name: '\u829c\u6e56',
    city_id: 98,
  }, {
    first_char: 'W',
    city_name: '\u4e4c\u6d77',
    city_id: 195,
  }, {
    first_char: 'W',
    city_name: '\u4e4c\u5170\u5bdf\u5e03',
    city_id: 200,
  }, {
    first_char: 'W',
    city_name: '\u68a7\u5dde',
    city_id: 259,
  }, {
    first_char: 'W',
    city_name: '\u4e94\u6307\u5c71',
    city_id: 268,
  }, {
    first_char: 'W',
    city_name: '\u6587\u660c',
    city_id: 271,
  }, {
    first_char: 'W',
    city_name: '\u4e07\u5b81',
    city_id: 272,
  }, {
    first_char: 'W',
    city_name: '\u6587\u5c71\u5dde',
    city_id: 305,
  }, {
    first_char: 'W',
    city_name: '\u6e2d\u5357',
    city_id: 319,
  }, {
    first_char: 'W',
    city_name: '\u6b66\u5a01',
    city_id: 325,
  }, {
    first_char: 'W',
    city_name: '\u5434\u5fe0',
    city_id: 335,
  }, {
    first_char: 'X',
    city_name: '\u897f\u5b89',
    city_id: 10,
  }, {
    first_char: 'X',
    city_name: '\u897f\u5b81',
    city_id: 28,
  }, {
    first_char: 'X',
    city_name: '\u53a6\u95e8',
    city_id: 32,
  }, {
    first_char: 'X',
    city_name: '\u5f90\u5dde',
    city_id: 39,
  }, {
    first_char: 'X',
    city_name: '\u6e58\u6f6d',
    city_id: 55,
  }, {
    first_char: 'X',
    city_name: '\u90a2\u53f0',
    city_id: 67,
  }, {
    first_char: 'X',
    city_name: '\u8944\u9633',
    city_id: 108,
  }, {
    first_char: 'X',
    city_name: '\u65b0\u4e61',
    city_id: 111,
  }, {
    first_char: 'X',
    city_name: '\u8bb8\u660c',
    city_id: 112,
  }, {
    first_char: 'X',
    city_name: '\u54b8\u9633',
    city_id: 116,
  }, {
    first_char: 'X',
    city_name: '\u65b0\u4f59',
    city_id: 152,
  }, {
    first_char: 'X',
    city_name: '\u5ba3\u57ce',
    city_id: 182,
  }, {
    first_char: 'X',
    city_name: '\u5ffb\u5dde',
    city_id: 192,
  }, {
    first_char: 'X',
    city_name: '\u9521\u6797\u90ed\u52d2\u76df',
    city_id: 201,
  }, {
    first_char: 'X',
    city_name: '\u5b5d\u611f',
    city_id: 231,
  }, {
    first_char: 'X',
    city_name: '\u54b8\u5b81',
    city_id: 233,
  }, {
    first_char: 'X',
    city_name: '\u4ed9\u6843',
    city_id: 236,
  }, {
    first_char: 'X',
    city_name: '\u6e58\u897f\u5dde',
    city_id: 246,
  }, {
    first_char: 'X',
    city_name: '\u4fe1\u9633',
    city_id: 250,
  }, {
    first_char: 'X',
    city_name: '\u897f\u53cc\u7248\u7eb3\u5dde',
    city_id: 307,
  }, {
    first_char: 'Y',
    city_name: '\u70df\u53f0',
    city_id: 29,
  }, {
    first_char: 'Y',
    city_name: '\u94f6\u5ddd',
    city_id: 49,
  }, {
    first_char: 'Y',
    city_name: '\u5b9c\u660c',
    city_id: 51,
  }, {
    first_char: 'Y',
    city_name: '\u5cb3\u9633',
    city_id: 56,
  }, {
    first_char: 'Y',
    city_name: '\u8425\u53e3',
    city_id: 76,
  }, {
    first_char: 'Y',
    city_name: '\u626c\u5dde',
    city_id: 91,
  }, {
    first_char: 'Y',
    city_name: '\u76d0\u57ce',
    city_id: 94,
  }, {
    first_char: 'Y',
    city_name: '\u8fd0\u57ce',
    city_id: 104,
  }, {
    first_char: 'Y',
    city_name: '\u5b9c\u5bbe',
    city_id: 118,
  }, {
    first_char: 'Y',
    city_name: '\u9633\u6cc9',
    city_id: 126,
  }, {
    first_char: 'Y',
    city_name: '\u5ef6\u5409',
    city_id: 131,
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6797',
    city_id: 162,
  }, {
    first_char: 'Y',
    city_name: '\u5ef6\u5b89',
    city_id: 171,
  }, {
    first_char: 'Y',
    city_name: '\u6986\u6797',
    city_id: 172,
  }, {
    first_char: 'Y',
    city_name: '\u4f0a\u6625',
    city_id: 214,
  }, {
    first_char: 'Y',
    city_name: '\u9e70\u6f6d',
    city_id: 220,
  }, {
    first_char: 'Y',
    city_name: '\u5b9c\u6625',
    city_id: 222,
  }, {
    first_char: 'Y',
    city_name: '\u76ca\u9633',
    city_id: 242,
  }, {
    first_char: 'Y',
    city_name: '\u6c38\u5dde',
    city_id: 243,
  }, {
    first_char: 'Y',
    city_name: '\u9633\u6c5f',
    city_id: 256,
  }, {
    first_char: 'Y',
    city_name: '\u4e91\u6d6e',
    city_id: 258,
  }, {
    first_char: 'Y',
    city_name: '\u96c5\u5b89',
    city_id: 287,
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6eaa',
    city_id: 300,
  }, {
    first_char: 'Y',
    city_name: '\u7389\u6811\u5dde',
    city_id: 343,
  }, {
    first_char: 'Z',
    city_name: '\u90d1\u5dde',
    city_id: 9,
  }, {
    first_char: 'Z',
    city_name: '\u9075\u4e49',
    city_id: 44,
  }, {
    first_char: 'Z',
    city_name: '\u682a\u6d32',
    city_id: 54,
  }, {
    first_char: 'Z',
    city_name: '\u6dc4\u535a',
    city_id: 57,
  }, {
    first_char: 'Z',
    city_name: '\u5f20\u5bb6\u53e3',
    city_id: 78,
  }, {
    first_char: 'Z',
    city_name: '\u73e0\u6d77',
    city_id: 84,
  }, {
    first_char: 'Z',
    city_name: '\u9547\u6c5f',
    city_id: 93,
  }, {
    first_char: 'Z',
    city_name: '\u5468\u53e3',
    city_id: 114,
  }, {
    first_char: 'Z',
    city_name: '\u4e2d\u5c71',
    city_id: 132,
  }, {
    first_char: 'Z',
    city_name: '\u6f33\u5dde',
    city_id: 142,
  }, {
    first_char: 'Z',
    city_name: '\u821f\u5c71',
    city_id: 146,
  }, {
    first_char: 'Z',
    city_name: '\u6e5b\u6c5f',
    city_id: 159,
  }, {
    first_char: 'Z',
    city_name: '\u8087\u5e86',
    city_id: 160,
  }, {
    first_char: 'Z',
    city_name: '\u67a3\u5e84',
    city_id: 168,
  }, {
    first_char: 'Z',
    city_name: '\u5f20\u5bb6\u754c',
    city_id: 241,
  }, {
    first_char: 'Z',
    city_name: '\u9a7b\u9a6c\u5e97',
    city_id: 251,
  }, {
    first_char: 'Z',
    city_name: '\u81ea\u8d21',
    city_id: 279,
  }, {
    first_char: 'Z',
    city_name: '\u8d44\u9633',
    city_id: 289,
  }, {
    first_char: 'Z',
    city_name: '\u662d\u901a',
    city_id: 302,
  }, {
    first_char: 'Z',
    city_name: '\u5f20\u6396',
    city_id: 326,
  }, {
    first_char: 'Z',
    city_name: '\u4e2d\u536b',
    city_id: 337,
  }],
};

export default City;
