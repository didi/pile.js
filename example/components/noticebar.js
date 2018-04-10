import React from 'react'
import JIMU from './index'

const { NoticeBar } = JIMU
// 按钮组件 Label
class _NoticeBar extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>NoticeBar</b><span>通告栏</span></h2>
          <div className="demo-content">
            <h2 className="demo-title">普通通栏：无icon通告栏，无关闭按钮 </h2>
            <div >
              <NoticeBar styleType="layout"  message="通告栏提示文本" />
            </div>

            <h2 className="demo-title">普通通栏：普通通告栏（带关闭按钮）</h2>
            <div >
              <NoticeBar iconHtml={<span className="icon-jimu-successful"></span>} styleType="layout"  message="通告栏提示文本" closeIconShow={true}/>
            </div>

            <h2 className="demo-title">普通通栏：横向滚动通告栏</h2>
            <div >
              <NoticeBar iconHtml={<span className="icon-jimu-information"></span>} styleType="layout"  message={["多列通告栏提示文本","多列通告栏提示文本","多列通告栏提示文本","多列通告栏提示文本"]} closeIconShow={false} speed={4}/>
            </div>

            <h2 className="demo-title">普通通栏：上下翻滚通告栏</h2>
            <div >
              <NoticeBar iconHtml={<span className="icon-jimu-error"></span>} styleType="layout"  message={["一、多行通告栏提示文本","二、多行通告栏提示文本","三、多行通告栏提示文本","四、多行通告栏提示文本"]} closeIconShow={false} speed={4} rollingUp={true} duration={.8}/>
            </div>

            <br />
            <br />

            <h2 className="demo-title">带阴影类型通栏：无icon通告栏，无关闭按钮</h2>
            <div >
              <NoticeBar isShadowStyle={true} styleType="layout"  message="通告栏提示文本" closeIconShow={true}/>
            </div>

            <h2 className="demo-title">带阴影类型通栏：普通通告栏（带关闭按钮）</h2>
            <div >
              <NoticeBar isShadowStyle={true} iconHtml={<span className="icon-jimu-successful"></span>} styleType="layout"  message="通告栏提示文本" closeIconShow={true}/>
            </div>

            <h2 className="demo-title">带阴影类型通栏：横向滚动通告栏</h2>
            <div >
              <NoticeBar isShadowStyle={true} iconHtml={<span className="icon-jimu-information"></span>} styleType="layout"  message={["多列通告栏提示文本","多列通告栏提示文本","多列通告栏提示文本","多列通告栏提示文本"]} closeIconShow={false} speed={4}/>
            </div>

            <h2 className="demo-title">带阴影类型通栏：上下翻滚通告栏</h2>
            <div >
              <NoticeBar isShadowStyle={true} iconHtml={<span className="icon-jimu-error"></span>} styleType="layout"  message={["一、多行通告栏提示文本","二、多行通告栏提示文本","三、多行通告栏提示文本","四、多行通告栏提示文本"]} closeIconShow={false} speed={4} rollingUp={true} duration={.8}/>
            </div>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
}
export default _NoticeBar
