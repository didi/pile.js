import React, { Component } from 'react';

import JIMU from './index';
// import JIMU from 'jimu-mobile'
const { Layouts, Picker } = JIMU,
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
  {
    TimePicker, DatePicker, TimeGroupPicker, DatePickerInstall, DatePickerNow, DataPickerBefore, ColumnPicker, CarNumberPicker, TimeSectionPicker, Pickers,
  } = Picker;

const _Picker = React.createClass({
  getInitialState() {
    return {
      oneShow: false,
      onevalue: [2017],
      oneopt: [[2015, 2016, 2017, 2018, 2019]],

      twoShow: false,
      twovalue: [2017, '7月'],
      twoopt: [[2015, 2016, 2017, 2018, 2019], ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']],

      carValue: ['京', 'A'],
      Pickersvalue: '家',
    };
  },

  handleCarChange() {
    this.refs.carPicker.show();
  },

  handleChangepickers() {
    this.refs.twopickers.show();
  },

  onehandleChangepickers() {
    this.refs.onePickers.show();
  },

  changeOpt() {
    this.setState({
      oneopt: [[1, 2, 3, 4, 5]],
      onevalue: [3],
    });
  },

  changeOpt2() {
    this.setState({
      onevalue: [2017],
      oneopt: [[2015, 2016, 2017, 2018, 2019]],
    });
  },

  clickAway(o) {
    console.log(o);
    this.setState({
      onevalue: o,
    });
  },

  twoclickAway(o) {
    console.log(o);
    this.setState({
      twovalue: o,
    });
  },

  clickCarAway(o) {
    console.log(o);
    this.setState({
      carValue: o,
    });
  },

  render() {
    const {
      options01, onValue01, opt1, show01, oneShow, onevalue, oneopt, twoShow, twovalue, twoopt, carValue, Pickersvalue,
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home" /></a></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title" onClick={this.changeOpt2}><b>Picker</b><span>选择器</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt onClick={this.changeOpt}>基本</dt>
            </dl>
          </div>

          <Layout>
            <Items>
              <Item className="jimu-item-oh jimu-aside-left" onClick={this.onehandleChangepickers}>
                <ItemHd>
                  <ItemTitle>ColumnPicker</ItemTitle>
                </ItemHd>
                <div className="jimu-item-oh">
                  <div className="jimu-Itemcontent ly-item-picker">{onevalue.join('-')}</div>
                  <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>单列不联动</div>
                </div>
              </Item>

              <Item className="jimu-item-oh jimu-aside-left" onClick={this.handleChangepickers}>
                <ItemHd>
                  <ItemTitle>ColumnPicker</ItemTitle>
                </ItemHd>
                <div className="jimu-item-oh">
                  <div className="jimu-Itemcontent ly-item-picker">{twovalue.join('-')}</div>
                  <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>两列不联动</div>
                </div>
              </Item>

              <Item className="jimu-item-oh jimu-aside-left" onClick={this.handleCarChange}>
                <ItemHd>
                  <ItemTitle>CarNumberPicker</ItemTitle>
                </ItemHd>
                <div className="jimu-item-oh">
                  <div className="jimu-Itemcontent ly-item-picker">{carValue.join('-')}</div>
                  <div className="jimu-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>车牌号码</div>
                </div>
              </Item>
            </Items>
          </Layout>


          <ColumnPicker
            value={onevalue}
            options={oneopt}
            open={oneShow}
            pickerAway={this.clickAway}
            ref="onePickers"
          />

          <ColumnPicker
            value={twovalue}
            options={twoopt}
            open={twoShow}
            pickerAway={this.twoclickAway}
            ref="twopickers"
          />

          <CarNumberPicker
            textvalue=""
            open={false}
            pickerAway={this.clickCarAway}
            ref="carPicker"
            value={carValue}
          />
          {/*
          <div onClick={() => {
            this.refs.myPickers.show();
            this.setState({
              Pickersvalue: '公司',
              Pickersopen: true,
            });
          }}
          >change
          </div>


          <Pickers
            value={[Pickersvalue]}
            options={[['家', '公司', '常用']]}
            open
            ref="myPickers"
            clickCancel={() => { console.log(4444); }}
            pickerAway={this.pickerAway}
          />
           */}



        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _Picker;

