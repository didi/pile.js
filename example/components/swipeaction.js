import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';

const { SwipeAction, Layouts } = Pile,
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
    ItemLink,
  } = Layouts,

  { SwipeItem, SwipeItems } = SwipeAction;

const _SwipeMove = React.createClass({
  getInitialState() {
    return {
      shows: [true, true, true],
      displacements: [false, false, false],
      disTouchs: [true, false, true],
      touchDefaults: [false, false, false],
      shows2: [true],
      displacements2: [false],
      disTouchs2: [true],
      touchDefaults2: [false, false, false],
      num: 3,
    };
  },

  singleStateVal(key, index, defaultkey) {
    this.state[key][index] = defaultkey;
    return this.state[key];
  },

  lotStateVal(len, key) {
    const newArr = [];
    for (let i = 0; i < len; i++) {
      const newKey = key;
      newArr.push(newKey);
    }
    return newArr;
  },

  otherStateVal(len, index, key, otherkey) {
    const newArr = [];
    for (let i = 0; i < len; i++) {
      const newKey = i == index ? key : otherkey;
      newArr.push(newKey);
    }
    return newArr;
  },

  _confirmdel(o) {
    const len = this.state.displacements.length;
    this.setState({
      shows: this.singleStateVal('shows', o, false),
      displacements: this.singleStateVal('displacements', o, true),
      touchDefaults: this.lotStateVal(len, false),
    });
  },
  _confirmcancel(o) {
    const len = this.state.displacements.length;
    this.setState({
      displacements: this.singleStateVal('displacements', o, false),
      touchDefaults: this.lotStateVal(len, false),
    });
  },

  _confirmcancel2(o) {
    alert('我是自定义按钮的点击事件');
  },

  _confirmdel2(o) {
    this.setState({
      shows2: this.singleStateVal('shows2', o, false),
      displacements2: this.singleStateVal('displacements2', o, true),
    });
  },

  _itemsTouchBack(o) {
    const len = this.state.displacements.length;
    this.setState({
      displacements: this.otherStateVal(len, o.index, o.touchState, false),
      touchDefaults: this.lotStateVal(len, o.touchState),
    });
  },
  _itemsTouchBack2(o) {
    const len = this.state.displacements2.length;
    this.setState({
      displacements2: this.otherStateVal(len, o.index, o.touchState, false),
      touchDefaults2: this.lotStateVal(len, o.touchState),
    });
  },

  changeState() {
    this.setState({
      num: 1,
    });
  },

  render() {
    let self = this,
      {
        shows, displacements, disTouchs, shows2, displacements2, disTouchs2, touchDefaults, touchDefaults2,
      } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>SwipeAction</b><span>滑动操作</span></h2>

          <div className="demo-show">
            <h3 className="demo-title">多列滑动操作</h3>
          </div>

          <div className="demo-content-del">
            <SwipeItems
              className="mt-10"
              shows={shows}
              displacements={displacements}
              touchDefaults={touchDefaults}
              itemsTouchBack={self._itemsTouchBack}
              disTouchs={disTouchs}
              buttons={[[
                  {
                    type: 'delet',
                    label: '删除',
                    onClick: self._confirmdel.bind(self, 0),
                  }, {
                    type: 'cancel',
                    label: '取消',
                    onClick: self._confirmcancel.bind(self, 0),
                  },
                ], [], [
                  {
                    type: 'delet',
                    label: '删除',
                    onClick: self._confirmdel.bind(self, 2),
                  },
                ]]}
            >
              <Item>
                <ItemHd>
                  <ItemTitle style={{ marginBottom: '0px' }}>向左滑动删除</ItemTitle>
                </ItemHd>
              </Item>

              <Item>
                <ItemHd>
                  <ItemTitle style={{ marginBottom: '0px' }}>我不可以滑动</ItemTitle>
                </ItemHd>
              </Item>

              <Item>
                <ItemHd>
                  <ItemTitle style={{ marginBottom: '0px' }}>向左滑动删除</ItemTitle>
                </ItemHd>
              </Item>
            </SwipeItems>
          </div>

          <div className="demo-show" style={{ marginTop: '30px' }}>
            <h3 className="demo-title">单列滑动操作</h3>
          </div>

          <div className="demo-content-del">
            <SwipeItems
              className="mt-10"
              itemsTouchBack={self._itemsTouchBack2}
              touchDefaults={touchDefaults2}
              shows={shows2}
              displacements={displacements2}
              disTouchs={disTouchs2}
              buttons={[[
                  {
                    type: 'delet',
                    label: '删除',
                    onClick: self._confirmdel2.bind(self, 0),
                  }, {
                    label: '自定义按钮',
                    onClick: self._confirmcancel2.bind(self, 0),
                  },
                ]]}
            >
              <Item>
                <ItemHd>
                  <ItemTitle style={{ marginBottom: '0px' }}>向左滑动删除</ItemTitle>
                </ItemHd>
              </Item>
            </SwipeItems>
          </div>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _SwipeMove;
