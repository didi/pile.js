import React, { Component } from 'react'
import JIMU from './index'

const {Rule} = JIMU,
  {RuleLine} = Rule

class _Rule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list1 : [{name:"150cm",value:150},{name:"160cm",value:160},{name:"170cm",value:170},{name:"180cm",value:180},{name:"190cm",value:190},{name:"200cm",value:200},{name:"210cm",value:210},{name:"220cm",value:220},{name:"230cm",value:230},{name:"240cm",value:240},{name:"250cm",value:250}],
      defaultValue1 : 170,
      defaultVal1 : 170,
      touchMin1 : 160, // 可拖动最小值
      touchMax1 : 240, // 可拖动最大值
      min1 : 140, // 最小值
      max1 : 250, // 最大值

      list2 : [{name:"20kg",value:20},{name:"40kg",value:40},{name:"60kg",value:60},{name:"80kg",value:80},{name:"100kg",value:100},{name:"120kg",value:120},{name:"140kg",value:140},{name:"160kg",value:160},{name:"180kg",value:180},{name:"200kg",value:200},{name:"220kg",value:220},{name:"240kg",value:240},{name:"260kg",value:260}],
      defaultValue2 : 75,
      defaultVal2 : 75,
      touchMin2 : 40, // 可拖动最小值
      touchMax2 : 240, // 可拖动最大值
      min2 : 20, // 最小值
      max2 : 300, // 最大值
    }
  }

  slidecb(o){
    let heightVal = this.refs.heightVal
    heightVal.innerHTML = `${o.value}cm`
  }

  changeList(){
    this.setState({
      list1 : [{name:"60cm",value:60},{name:"70cm",value:70},{name:"80cm",value:80},{name:"90cm",value:90},{name:"100cm",value:100},{name:"110cm",value:110},{name:"120cm",value:120},{name:"130cm",value:130},{name:"140cm",value:140},{name:"150cm",value:150},{name:"160cm",value:160},{name:"170cm",value:170},{name:"180cm",value:180},{name:"190cm",value:190},{name:"200cm",value:200},{name:"210cm",value:210}],
      defaultValue1 : 150,
      touchMin1 : 80, // 可拖动最小值
      touchMax1 : 190, // 可拖动最大值
      min1 : 20, // 最小值
      max1 : 330 // 最大值
    })
  }

  endback(o){
    console.log(o)
  }


  slide2cb(o){
    let weightVal = this.refs.weightVal
    weightVal.innerHTML = `${o.value}kg`
  }

  render() {
    let {value,list1,defaultValue1,touchMin1,touchMax1,min1,max1,list2,defaultValue2,touchMin2,touchMax2,min2,max2,defaultVal1,defaultVal2} = this.state
    return(
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>Rule</b><span>刻度尺</span></h2>
          <div className="">
            <dl className="dl-list">
              <dt style={{margin:"10px",color:"#999",fontSize:"1.2rem"}}>身高</dt>
              <dd style={{paddingTop: "15px",background :"#fff"}}><RuleLine  back={this.slidecb.bind(this)} endback={this.endback.bind(this)} unitAmount={5}/></dd>
              <dd style={{"textAlign" : "center","paddingBottom" : "35px","fontSize":"1.4rem",background :"#fff",color:"#999"}}>您的身高为 : <span ref="heightVal" style={{color:"#fc9153"}}>{defaultVal1}cm</span> </dd>

              <dt style={{margin:"20px 10px 10px 10px",color:"#999",fontSize:"1.2rem"}}>体重</dt>
              <dd style={{paddingTop: "15px",background :"#fff"}}><RuleLine list={list2} back={this.slide2cb.bind(this)} defaultValue={defaultValue2} touchMin={touchMin2} touchMax={touchMax2} min={min2} max={max2}/></dd>
              <dd style={{"textAlign" : "center","paddingBottom" : "35px","fontSize":"1.4rem",background :"#fff",color:"#999"}}>您的体重为 : <span ref="weightVal" style={{color:"#fc9153"}}>{defaultVal2}kg</span> </dd>
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
module.exports = _Rule
// list={list}
