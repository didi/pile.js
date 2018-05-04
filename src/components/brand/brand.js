import React, { Component } from 'react';

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

class Brand extends Component {
  /* 解决锚点会产生历史记录，点后退，退不出当前页面的问题 */
  static fast_charClick(e) {
    const fastCharEle = e.currentTarget;
    const ele = document.querySelector(`#first_char_${fastCharEle.dataset.char}`);
    const carBrandCon = document.querySelector('._carBrandCon');
    carBrandCon.scrollTop = ele.offsetTop;
  }
  /* 点击定位城市的事件 */
  static hotCarBrandClick(e) {
    document.getElementById(`car_${e.currentTarget.dataset.carid}`).click();
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
    this.carClick = this.carClick.bind(this);
    this.initMaxChar = this.initMaxChar.bind(this);
    this.initHotCarBrandCon = this.initHotCarBrandCon.bind(this);
    this.initCarBrandCon = this.initCarBrandCon.bind(this);
    this.init_fast_char = this.init_fast_char.bind(this);

    this.state = {
      selectBrand: null,
      showMaxChar: false,
      firstChar,
    };
  }
  componentWillMount() {
    const { dataAttrName } = this.props;
    let { carArr } = this.props;

    if (carArr) {
      // 如果是对象的话，需要转换一下
      if (!carArr.length) {
        const carObj = carArr;
        carArr = [];
        this.state.firstChar.forEach((char) => {
          if (carObj[char]) {
            carObj[char].forEach((ele) => {
              const cloneEle = { ...ele };
              cloneEle[dataAttrName.firstChar] = char;
              carArr.push(cloneEle);
            });
          }
        });
      }
      const Obj = {};
      /* 把城市分成数组，字母相同的在一组 */
      carArr.forEach((ele, i) => {
        const firstChar = ele[dataAttrName.firstChar];
        if (!Obj[firstChar]) {
          Obj[firstChar] = [];
        }
        Obj[firstChar].push(carArr[i]);
      });
      this.setState({ carObj: Obj });
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
      carObj,
      firstChar,
    } = state;

    return (
      <div
        className="fast_char"
        onTouchMove={fast_charTouchMove}
        onTouchEnd={fast_charTouchEnd}
      >
        {firstChar.map((char, i) => {
          if (carObj[char]) {
            return (
              <button
                data-char={char}
                key={i}
                onClick={Brand.fast_charClick}
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
  carClick(e) {
    const {
      callBack,
    } = this.props;
    const carObj = JSON.parse(e.currentTarget.dataset.carobj);
    this.setState({
      selectBrand: carObj,
    });
    callBack && callBack(carObj);
  }
  fast_charTouchMove(e) {
    const { clientX, clientY } = e.targetTouches[0];
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
  initCarBrandCon() {
    const self = this;
    const {
      carObj,
      selectBrand,
    } = this.state;
    const {
      dataAttrName,
    } = this.props;
    if (!carObj) {
      return null;
    }
    return (
      <ul className="carBrandCon">
        {
          (function init() {
            const arr = [];
            for (const a in carObj) {
              if ({}.hasOwnProperty.call(carObj, a)) {
              arr.push((
                <li key={a} id={`first_char_${a}`}>
                  <button className="first_char">{a}</button>
                  {
                    carObj[a].map((ele, index) => {
                      let isCheck = false;
                      if ((selectBrand && selectBrand.id)
                        && selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
                        isCheck = true;
                      }
                      return (
                        <div
                          className={`list${isCheck ? ' select' : ''}`}
                          key={index}
                          id={`car_${ele[dataAttrName.id]}`}
                          data-carobj={JSON.stringify(ele)}
                          onClick={self.carClick}
                          role="button"
                          tabIndex={index}
                        >
                          <img src={`${self.props.staticImgURL}${ele.id}.png`} alt="" />
                          <span
                            className="carBrandName"
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
  initHotCarBrandCon() {
    const {
      dataAttrName,
      // brandStaticURL,
      staticImgURL,
      hotCarBrandData,
    } = this.props;
    const {
      selectBrand,
    } = this.state;
    if (!hotCarBrandData) {
      return null;
    }
    return (
      <div>
        <div className="selectTitle">热门车型</div>
        <ul
          className="hotCarBrandCon clearfix"
        >
          {
            hotCarBrandData.map((ele, index) => {
              let isCheck = false;
              if ((selectBrand && selectBrand.id) &&
              selectBrand[dataAttrName.id] === ele[dataAttrName.id]) {
                isCheck = true;
              }
              return (
                <li
                  key={index}
                  className={`hotCarBrandList ${isCheck ? 'select' : null}`}
                  data-carid={ele.id}
                  onClick={Brand.hotCarBrandClick}

                >
                  <img src={`${staticImgURL}${ele.id}.png`} alt="" />
                  <span className="hotCarBrandName block">{ele[dataAttrName.name]}</span>
                </li>
              );
            })
          }
        </ul>
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
  render() {
    const {
      show,
      hotCarBrandData,
      ...other
    } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div className="catBrandWrap">
        {/* <div className="selectTitle">请选择城市</div> */}
        {/* 滑动右侧字母时，中间显示的大字母 */}
        {this.initMaxChar()}

        {/* 城市列表 */}
        <div className="_carBrandCon" {...other} >
          {hotCarBrandData ? this.initHotCarBrandCon() : null}
          {this.initCarBrandCon()}
        </div>
        {/* 初始化右侧首字母 */}
        {this.init_fast_char()}
      </div>
    );
  }
}
Brand.defaultProps = {
  dataAttrName: {
    id: 'id',
    name: 'name',
    firstChar: 'first_char',
  },
};

export default Brand;
