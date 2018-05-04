import React, { Component } from 'react';
import { Link } from 'react-router'
import Pile from './index';
import enUS from '../../src/components/localeprovider/en_US';
import zhCN from '../../src/components/localeprovider/zh-CN';
const { Picker, Layouts ,LocaleProvider} = Pile,
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
    TimePicker, DatePicker, TimeGroupPicker, DatePeriodPicker, TimeDefaultPicker, DateRangePicker, Pickers, CarNumberPicker, DateTimePicker, TimePeriodPicker,TimeSectionPicker
  } = Picker;


const _Picker = React.createClass({
  getInitialState() {
    return {
      options: {
        endTime: [3, 9, 40],
        startTime: [0, 15, 5],
        scale: 30,
        day: 2,
        open: false,
      },
      pickerBeforeData: '',
      open: false,
      pickershow: false,
      // timeValue : '2015/04/04',
      beforeShow: false,

      section: {
        startData: '2017/12/21 23:55',
        defaultData: '2017/12/21 23:55',
        endData: '2018/1/8 01:20',
      },
      TimePickerValue: ['当前时间'],
      DateYearPickerValue: ['当前日期'],
      TimeGroupValue: ['', ''],
      PickerInstallValue: ['2017年', '12月', '29日 周五'],
      pickerBeforeValue: ['当前日期'],
      pickerNowValue: ['当前时间'],
      sectionPickerValue: ['2017年12月21日', '23点', '55分'],
      optOneArr: ['今天', '明天', '后天'],
      TimePeriodValue: ['09:00', '23:00'],
    };
  },

  onehandleTimePicker() {
    this.refs.mytimes.show();
  },

  handleDatePicker() {
    this.refs.DateYearPicker.show();
  },

  // handleTimeGroup
  handleTimeGroup() {
    this.refs.timeGroupref.show();
  },

  handleTimePeriod() {
    this.refs.timePeriodref.show();
  },

  handlePickerInstall() {
    this.refs.PickerInstallRef.show();
  },

  clickAway(o) {
    console.log(o);
  },

  clickCarAway(o) {
    console.log(o);
  },

  pickerFun(d, o, t) {
    this.setState({
      timeValue: t,
    });
  },

  render() {
    const {
      pickerBeforeData, optOneArr, options, open, pickershow, timeValue, beforeShow,
      TimePickerValue,DateYearPickerValue, TimeGroupValue, PickerInstallValue,
      pickerBeforeValue,pickerNowValue, sectionPickerValue, TimePeriodValue
    } = this.state;
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home" /></Link></div>
        <div className="libs-intr" style={{ minHeight: `${document.body.clientHeight - 94}px` }}>
          <h2 className="page-title"><b>DataPicker</b><span>日期选择器</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dt>基本</dt>
            </dl>
          </div>

            <Layout>
              <Items>
                <Item className="pile-item-oh pile-aside-left" onClick={this.handleTimePeriod}>
                  <ItemHd>
                    <ItemTitle>TimePeriodPicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">每日 {TimePeriodValue.join('-')} 可用</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>带分钟的时间段</div>
                  </div>
                </Item>

                <Item className="pile-item-oh pile-aside-left" onClick={this.handleTimeGroup}>
                  <ItemHd>
                    <ItemTitle>TimeGroupPicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">{TimeGroupValue.join('-')}</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>当天时间段</div>
                  </div>
                </Item>

                <Item className="pile-item-oh pile-aside-left" onClick={this.handlePickerInstall}>
                  <ItemHd>
                    <ItemTitle>DatePeriodPicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">{PickerInstallValue.join('-')}</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>日期按天数展示</div>
                  </div>
                </Item>


                <Item className="pile-item-oh pile-aside-left" onClick={() => { this.refs.pickerBefore.show(); }}>
                  <ItemHd>
                    <ItemTitle>DateRangePicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">{pickerBeforeValue.join('-')}</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>自定义年、月、日</div>
                  </div>
                </Item>


                <Item className="pile-item-oh pile-aside-left" onClick={() => { this.refs.pickerNowRef.show(); }}>
                  <ItemHd>
                    <ItemTitle>TimeDefaultPicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">{pickerNowValue.join('-')}</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>今日起月、日、时、分</div>
                  </div>
                </Item>

                <Item className="pile-item-oh pile-aside-left" onClick={() => { this.refs.sectionPickerRef.show(); }}>
                  <ItemHd>
                    <ItemTitle>DateTimePicker</ItemTitle>
                  </ItemHd>
                  <div className="pile-item-oh">
                    <div className="pile-Itemcontent ly-item-picker">{sectionPickerValue.join('-')}</div>
                    <div className="pile-itemaside" style={{ lineHeight: '25px', fontSize: '1.4rem' }}>自定义月、日、时、分</div>
                  </div>
                </Item>

              </Items>
            </Layout>

            <div className="data-picker-comp">
              <LocaleProvider  locale={zhCN}>
                <TimePeriodPicker
                  ref="timePeriodref"
                  textvalue=""
                  pickerAway={(o) => {
                    this.setState({
                      TimePeriodValue: o,
                    });
                  }}
                  delay={30}
                  open={false}
                  titleName="每日可用时间段"
                />
              </LocaleProvider>

              <TimeDefaultPicker
                textvalue=""
                pickerAway={(o, r, t, d) => {
                  console.log(o, r, t, d);
                  this.setState({
                    pickerNowValue: t,
                  });
                }}
                ref="pickerNowRef"
                len={3}
                open={false}
              />

              <DateTimePicker
                textvalue=""
                pickerAway={(o, t, p, d) => {
                  console.log(o, t, p, d);
                  this.setState({
                    sectionPickerValue: o,
                    section: {
                      startData: this.state.section.startData,
                      defaultData: t,
                      endData: this.state.section.endData,
                    },
                  });
                }}
                ref="sectionPickerRef"
                format={['MM月dd日', '点', '分']}
                optOneArr={['今天', '明天', '后天']}
                {...this.state.section}
                scale={10}
                titleName="当前时间"
                open={false}
              />

              <DateRangePicker
                pickerAway={(o, p, t, d) => {
                  console.log(o, p, t, d);
                  this.setState({
                    pickerBeforeValue: o,
                    pickerBeforeData: d.data.split(' ')[0],
                  });
                }}
                startData="1900/1/1"
                // endData ='2020/12/30'
                // valueData = {pickerBeforeData}
                valueData="2017/10/16"
                open={false}
                ref="pickerBefore"
              />

              <TimePicker
                ref="mytimes"
                textvalue=""
                options={{
                  endTime: [3, 9, 40],
                  startTime: [0, 15, 5],
                  scale: 30,
                  day: 6,
                  open: false,
                }}
                pickerAway={(o, p) => {
                  console.log(o, p);
                  this.setState({
                    TimePickerValue: o,
                  });
                }}
              />

              <DatePicker
                ref="DateYearPicker"
                textvalue=""
                options={{
                  year: 2,
                  showtoday: true,
                  open: false,
                }}
                pickerAway={(o, p, t) => {
                  console.log(o, p, t);
                  this.setState({
                    DateYearPickerValue: o,
                  });
                }}
              />

              <TimeGroupPicker
                ref="timeGroupref"
                textvalue=""
                pickerAway={(o) => {
                  this.setState({
                    TimeGroupValue: o,
                  });
                }}
                unit="点"
                open={false}
              />




              <DatePeriodPicker
                textvalue=""
                pickerAway={(o, t, p) => {
                  console.log(o, t, p);
                  this.setState({
                    PickerInstallValue: o,
                  });
                }}
                ref="PickerInstallRef"
                days={7}
                startData="2017/12/29"
                weekText={['周日', '周一', '周二', '周三', '周四', '周五', '周六']}
                open={false}
              />
            </div>

        </div>
        <div className="footer-name">
          <span className="footer-name-pic" />
        </div>
      </div>
    );
  },
});
module.exports = _Picker;

/*
<TimePicker ref="mytimes"
  textvalue="时间插件(今天明天、时、分)"
  options = {{
    endTime:[3,9,40],
    startTime:[0,15,5],
    scale:30,
    day: 2,
    open: true
  }}
  pickerAway = {function(e,t){
    console.log(e,t)
  }}
></TimePicker>

<DatePicker
  textvalue="请选择开始日期(年、月、日)"
  options = {{
    year : 2,
    showtoday : true,
    open : true
  }}
  pickerAway = {function(e,t){
    console.log(e,t)
  }}
></DatePicker>


<TimeSectionPicker
  open={true}
/>

*/
