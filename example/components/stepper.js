import React from 'react'
import JIMU from './index'
const {Layouts,Stepper} = JIMU,
  {
    Layout,
    LayoutHd,
    LayoutHdTitle,
    LayoutHdAside,
    LayoutBd,
    LayoutFt,
    Items,
    Item,
    ItemAside,
    ItemContent,
    ItemTitle,
    ItemDesc,
    ItemHd,
    ItemBd,
    ItemFt,
    ItemLink
  } = Layouts
const _Stepper = React.createClass({
  getInitialState() {
    return {
      defaultstyle:{
        min: 0,
        max: 5,
        defaultVal:0,
        disabled : false
      },
      addstyle:{
        min: 0,
        max: 5,
        defaultVal:2,
        disabled : false
      },
      disabledstyle:{
        min: 0,
        max: 5,
        defaultVal:3,
        disabled : true
      }

    }
  },

  handleBack(o){
    console.log(o)
  },

  render() {
    let {defaultstyle,addstyle,disabledstyle} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Stepper</b><span>步进器</span></h2>
          <div>
            <dl className="dl-list">
              <dt style={{"margin":"0 10px 10px 10px","color":"#999"}}>步进器</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent"><Stepper {...defaultstyle} back={this.handleBack}/></div>
                      <div className="jimu-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>默认状态</div>
                    </Item>
                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent"><Stepper {...addstyle} back={this.handleBack}/></div>
                      <div className="jimu-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>有默认值状态</div>
                    </Item>

                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent"><Stepper {...addstyle} steps={3} max={10} back={this.handleBack}/></div>
                      <div className="jimu-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>每次进阶值3</div>
                    </Item>

                    <Item className="jimu-item-oh jimu-aside-left">
                      <div className="jimu-Itemcontent"><Stepper {...disabledstyle} back={this.handleBack}/></div>
                      <div className="jimu-itemaside" style={{"lineHeight":"25px","fontSize":"1.4rem"}}>Disabled 状态</div>
                    </Item>
                  </Items>
                </Layout>
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})
module.exports = _Stepper
