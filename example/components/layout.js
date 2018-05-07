import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from './index'
const {Layouts} = Pile,
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

const appMsgIcon = <img src={require('../image/logo-icon.png')}/>

const _Layouts = React.createClass({
  render() {
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr">
          <h2 className="page-title"><b>Layout</b><span>图文混排</span></h2>
          <div className="demo-show2">
            <Layout>
              <LayoutHd>
                <LayoutHdTitle>图文混排列表一</LayoutHdTitle>
                <LayoutHdAside href="javascript:;">更多</LayoutHdAside>
              </LayoutHd>
              <LayoutBd>
                <Items>
                  <Item href="javascript:;">
                    <ItemBd>
                      <ItemAside>{appMsgIcon}</ItemAside>
                      <ItemContent>
                        <ItemTitle>我是标题文字</ItemTitle>
                        <ItemDesc>详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理</ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>

                  <Item href="javascript:;">
                    <ItemBd>
                      <ItemAside>{appMsgIcon}</ItemAside>
                      <ItemContent>
                        <ItemTitle>我是标题文字</ItemTitle>
                        <ItemDesc>详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理</ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>
                </Items>
              </LayoutBd>
              <LayoutFt>
                <ItemLink>2015-12-29 15:03 周三</ItemLink>
                <ItemLink>专车</ItemLink>
                <ItemLink diff>企业支付</ItemLink>
              </LayoutFt>
            </Layout>

            <Layout>
              <LayoutHd>
                <LayoutHdTitle>图文混排列表二</LayoutHdTitle>
                <LayoutHdAside href="javascript:;">更多</LayoutHdAside>
              </LayoutHd>
              <LayoutBd>
                <Items>
                  <Item href="javascript:;">
                    <ItemHd>
                      <ItemTitle>我是标题文字，文字建议不超过一行</ItemTitle>
                    </ItemHd>
                    <ItemBd>
                      <ItemAside>{appMsgIcon}</ItemAside>
                      <ItemContent>
                        <ItemDesc clamp={3}>详细文字描述，一般建议不超过三行文字，超过两行文字做截断处理，详细文字描述，一般建议不超过三行文字，详细文字描述，一般建议不超过三行文字.</ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>

                  <Item href="javascript:;">
                    <ItemHd>
                      <ItemTitle>我是标题文字，文字建议不超过一行</ItemTitle>
                    </ItemHd>
                    <ItemBd>
                      <ItemAside>{appMsgIcon}</ItemAside>
                      <ItemContent>
                        <ItemDesc clamp={3}>详细文字描述，一般建议不超过三行文字，超过两行文字做截断处理，详细文字描述，一般建议不超过三行文字，详细文字描述，一般建议不超过三行文字.</ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>
                </Items>
              </LayoutBd>
              <LayoutFt>
                <ItemLink>2015-12-29 15:03 周三</ItemLink>
                <ItemLink>专车</ItemLink>
                <ItemLink diff>企业支付</ItemLink>
              </LayoutFt>
            </Layout>

            <Layout>
              <LayoutHd>
                <LayoutHdTitle>文字组合</LayoutHdTitle>
                <LayoutHdAside href="javascript:;">更多</LayoutHdAside>
              </LayoutHd>
              <LayoutBd>
                <Items>
                  <Item href="javascript:;">
                    <ItemHd>
                      <ItemTitle>我是标题文字，文字建议不超过一行</ItemTitle>
                    </ItemHd>
                    <ItemBd>
                      <ItemContent>
                        <ItemDesc>详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理</ItemDesc>
                        <ItemDesc className="mt-8">
                          <ItemLink>2015-12-29 15:03 周三</ItemLink>
                          <ItemLink>专车</ItemLink>
                          <ItemLink diff>企业支付</ItemLink>
                        </ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>

                  <Item href="javascript:;">
                    <ItemHd>
                      <ItemTitle>我是标题文字，文字建议不超过一行</ItemTitle>
                    </ItemHd>
                    <ItemBd>
                      <ItemContent>
                        <ItemDesc>详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理详细文字描述，一般建议不超过两行文字，超过两行文字做截断处理，截断方式为超过两行文字做截断处理</ItemDesc>
                        <ItemDesc className="mt-8">
                          <ItemLink>2015-12-29 15:03 周三</ItemLink>
                          <ItemLink>专车</ItemLink>
                          <ItemLink diff>企业支付</ItemLink>
                        </ItemDesc>
                      </ItemContent>
                    </ItemBd>
                  </Item>
                </Items>
              </LayoutBd>
            </Layout>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>

    )
  }
})
module.exports = _Layouts
