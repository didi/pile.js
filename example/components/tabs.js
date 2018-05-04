import React from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { Tabs } = Pile,
  { TabPane } = Tabs;
// 按钮组件 Label
class _NavBar extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>Tabs</b><span>页卡</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">局部标签</h2>
            <div className="component-bg-white de-padd-20">
              <Tabs activeIndex={1} onChange={(n) => { console.log(n); }} isInLocal>
                <TabPane tab="Tab1"><div className="tabs-test-style">Tab1 内容</div></TabPane>
                <TabPane tab="Tab2"><div className="tabs-test-style">Tab2 内容</div></TabPane>
                <TabPane tab="Tab3"><div className="tabs-test-style">Tab3 内容</div></TabPane>
              </Tabs>
            </div>

            <h2 className="demo-title" style={{ marginTop: '20px' }}>全局标签切换</h2>
            <Tabs activeIndex={1} onChange={(n) => { console.log(n); }}>
              <TabPane tab="Tab1"><div className="tabs-test-style">Tab1 内容</div></TabPane>
              <TabPane tab="Tab2"><div className="tabs-test-style">Tab2 内容</div></TabPane>
              <TabPane tab="Tab3"><div className="tabs-test-style">Tab3 内容</div></TabPane>
            </Tabs>

            <h2 className="demo-title" style={{ marginTop: '20px' }}>全局标签切换+多个标签组合</h2>
            <Tabs activeIndex={3} onChange={(n) => { console.log(n); }}>
              <TabPane tab="Tab1"><div className="tabs-test-style">Tab1 内容</div></TabPane>
              <TabPane tab="Tab2"><div className="tabs-test-style">Tab2 内容</div></TabPane>
              <TabPane tab="Tab3"><div className="tabs-test-style">Tab3 内容</div></TabPane>
              <TabPane tab="Tab4"><div className="tabs-test-style">Tab4 内容</div></TabPane>
              <TabPane tab="Tab5"><div className="tabs-test-style">Tab5 内容</div></TabPane>
              <TabPane tab="Tab6"><div className="tabs-test-style">Tab6 内容</div></TabPane>
              <TabPane tab="Tab7"><div className="tabs-test-style">Tab7 内容</div></TabPane>
              <TabPane tab="Tab8"><div className="tabs-test-style">Tab8 内容</div></TabPane>
            </Tabs>
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
