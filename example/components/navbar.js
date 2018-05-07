import React from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { NavBar } = Pile,
  { NavItem } = NavBar;
// 按钮组件 Label
class _NavBar extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>NavBar</b><span>导航栏</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">导航栏-多个标签</h2>
            <div className="demo-component-nppadd component-bg-white">
              <NavBar activeIndex={2}>
                <NavItem ><a href="javascript:;">快车</a></NavItem>
                <NavItem onClick={function () { console.log('点击了专车,可以自定义事件'); }} >专车</NavItem>
              </NavBar>
            </div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  }
}
export default _NavBar;
