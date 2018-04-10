import React, { Component } from 'react'
import JIMU from './index'

const {City,Button} = JIMU
class AllCitys extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectCity: null,
      cityShow:false
    }
  }
  cityClick(){
    this.setState({
      cityShow:true
    })
  }
  selectCallBack(obj){
    this.setState({
      cityShow:false,
      selectCity:obj
    })
  }
  render() {
    const {
      cityArr,
      cityShow,
      selectCity
    } = this.state
    const styleObj = {
      'height':'100px',
      'lineHeight':'100px',
      'fontSize':'20px',
      'textAlign':'center'
    }
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>City</b><span>城市选择</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dd><Button onClick={this.cityClick.bind(this)} float className="select-type">{selectCity && selectCity.city_name ?(<b>您选择的城市是： <span className="city-name">{`${selectCity.city_name}`}</span></b>) : `选择城市`}</Button></dd>
            </dl>
          </div>
        </div>

        <City
          show={cityShow}
          position= {{
            "first_char": "A",
            "city_name": "\u978d\u5c71",
            "city_id": 64
          }}
          callBack={this.selectCallBack.bind(this)}
        />

        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>


    )
  }
}
module.exports = AllCitys
