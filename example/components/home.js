import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navShow: window.navShow || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  taggleClick(n, e) {
    const { navShow } = this.state;
    if (navShow[n] == 0) {
      this.changeNavShow(n, 1);
    } else {
      this.changeNavShow(n, 0);
    }
  }

  changeNavShow(n, t) {
    let { navShow } = this.state,
      setShowArr = navShow.map((e, i) => (i == n ? t : navShow[i]));
    this.setState({
      navShow: setShowArr,
    });
    window.navShow = setShowArr;
  }

  taggleTouchEnd() {
    const homePageTop = ReactDOM.findDOMNode(this.refs.homePage).scrollTop;
    window.homePageTop = homePageTop;
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.homePage).scrollTop = window.homePageTop;
  }

  render() {
    const { navShow } = this.state;
    return (
      <div className="examp-page home-page" ref="homePage" onTouchEnd={this.taggleTouchEnd.bind(this)}>
        <div className="page-title">
          <h1>pile Mobile</h1>
          <h2>积木组件库助力移动端开发</h2>
        </div>

        <div className="component-wrap">
          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 0)}>
              <h2><b>布局</b><span>Layout</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[0] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[0] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/grid"><b>栅格</b><span>Grid</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/layout"><b>图文混排</b><span>Word</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/list"><b>列表</b><span>List</span> <i className="icon-col-gt" /></Link></li>
                
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 1)}>
              <h2><b>导航</b><span>Navigation</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[1] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[1] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/navbar"><b>导航栏</b><span>NavBar</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/tabs"><b>页卡</b><span>Tabs</span> <i className="icon-col-gt" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 2)}>
              <h2><b>数据录入</b><span>Data Entry</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[2] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[2] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/upload"><b>上传</b><span>Upload</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/button"><b>按钮</b><span>Button</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/checkbox"><b>复选框</b><span>CheckBox</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/radio"><b>单选框</b><span>Radio</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/stepper"><b>步进器</b><span>Stepper</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/star"><b>评星</b><span>Star</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/textlink"><b>文字链</b><span>TextLink</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/switch"><b>开关</b><span>Switch</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/picker"><b>选择器</b><span>Picker</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/datapicker"><b>日期选择器</b><span>DataPicker</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/search"><b>搜索框</b><span>Search</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/fadeinup"><b>底部弹层</b><span>FadeInUp</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/fadein"><b>自定义弹层</b><span>FadeIn</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/inputs"><b>表单组合</b><span>Inputs</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/verification"><b>验证码</b><span>Verification</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/dialogLayout"><b>函数式引用对话框</b><span>DialogLayout</span> <i className="icon-col-gt" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 3)}>
              <h2><b>数据展示</b><span>Data Display</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[3] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[3] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/icon"><b>图标</b><span>Icon</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/label"><b>标签</b><span>Label</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/badge"><b>提示徽标</b><span>Badge</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/ringloading"><b>环形加载</b><span>Ringloading</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/radar"><b>雷达图</b><span>Radar</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/mask"><b>遮罩</b><span>Mask</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/load"><b>加载</b><span>Load</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/city"><b>城市选择</b><span>City</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/cartype"><b>车型选择</b><span>SelectCar</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/localeProvider"><b>国际化</b><span>LocaleProvider</span> <i className="icon-col-gt" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 4)}>
              <h2><b>反馈</b><span>Feedback</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[4] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[4] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/dialog"><b>对话框</b><span>Dialog</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/toast"><b>轻提示</b><span>Toast</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/popover"><b>气泡弹层</b><span>Popover</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/noticebar"><b>通告栏</b><span>NoticeBar</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/result"><b>结果页</b><span>Result</span> <i className="icon-col-gt" /></Link></li>

              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 5)}>
              <h2><b>手势</b><span>Gesture</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[5] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[5] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/infiniteloader"><b>滚动加载</b><span>InfiniteLoader</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/swipeaction"><b>滑动操作</b><span>SwipeAction</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/swipemove"><b>滑动弹层展示</b><span>SwipeMove</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/focus"><b>焦点图</b><span>Focus</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/rule"><b>刻度尺</b><span>Rule</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/Slider"><b>滑动条</b><span>Slider</span> <i className="icon-col-gt" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 6)}>
              <h2><b>卡片</b><span>Fragment</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[6] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[6] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/permissionscard"><b>权限卡片</b><span>PermissionsCard</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/record"><b>用车纪录</b><span>CarRecord</span> <i className="icon-col-gt" /></Link></li>
                {/*  */}<li><Link to="/passenger"><b>乘车人卡片</b><span>Passenger</span> <i className="icon-col-gt"></i></Link></li>
                <li><Link to="/driver"><b>司机卡片</b><span>Driver</span> <i className="icon-col-gt" /></Link></li>
                <li><Link to="/travel"><b>用车行程</b><span>Travel</span> <i className="icon-col-gt" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="component-layout">
            <div className="component-title" onClick={this.taggleClick.bind(this, 7)}>
              <h2><b>动画</b><span>Anime</span> <i className="icon-col-gt" style={{ WebkitTransform: `${navShow[7] == 0 ? 'rotate(0deg) translate(0, -50%)' : 'rotate(180deg) translate(0, -50%)'}` }} /></h2>
            </div>
            <div className="component-body" style={{ display: `${navShow[7] == 0 ? 'none' : 'block'}` }}>
              <ul className="component-items">
                <li><Link to="/csstransform"><b>css3过渡动画</b><span>CssTransform</span> <i className="icon-col-gt"></i></Link></li>
                <li><Link to="/positiontransform"><b>模块间位置切换</b><span>PositionTransform</span> <i className="icon-col-gt"></i></Link></li>
                <li><Link to="/canvaschart"><b>canvas图表</b><span>CanvasChart</span> <i className="icon-col-gt"></i></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
module.exports = Home;

// <li><Link to="/cartype"><b>车型</b><span>SelectCar</span> <i className="icon-col-gt"></i></Link></li>
