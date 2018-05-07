import React from 'react'
import { Link } from 'react-router'
import Pile from './index'

const {Layouts,TextLink} = Pile,
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

// 按钮组件 Button
class _Button extends React.Component {
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>TextLink</b><span>文字链</span></h2>
          <div>
            <dl className="dl-list">
              <dt  style={{"margin":"0 10px 10px 10px","color":"#999"}}>文字链</dt>
              <dd>
                <Layout>
                  <Items>
                    <Item>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;">文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" iconClassName="icon-pile-pay toast_icon" >文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" iconClassName="icon-pile-pay toast_icon" iconFloat="right">文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>

                    </Item>
                    <Item>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="danger">文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="danger" iconClassName="icon-pile-pay toast_icon" >文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="danger" iconClassName="icon-pile-pay toast_icon" iconFloat="right">文字按钮</TextLink> </span>
                    </Item>
                    <Item>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="normal">文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="normal" iconClassName="icon-pile-pay toast_icon" >文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink href="javascript:;" type="normal" iconClassName="icon-pile-pay toast_icon" iconFloat="right">文字按钮</TextLink> </span>
                    </Item>
                    <Item>
                      <span className="de-mr-20 di-inblok"><TextLink type="disabled">文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink type="disabled" iconClassName="icon-pile-pay toast_icon" >文字按钮</TextLink> </span> <b style={{padding:"0 10px"}}></b>
                      <span className="de-mr-20 di-inblok"><TextLink type="disabled" iconClassName="icon-pile-pay toast_icon" iconFloat="right">文字按钮</TextLink> </span>
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
}

export default _Button
