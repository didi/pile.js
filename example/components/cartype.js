import React, { Component } from 'react'
import { Link } from 'react-router'
import Pile from '../../src/index'

const {Button,SelectCar} = Pile
class CarType extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectCar: null,
      selectCarShow:false
    }
  }
  brandClick(obj){
    console.log(obj)
  }
  cityClick(){
    this.setState({
      selectCarShow:true
    })
  }
  carTypeClick(objArr){
    console.log(objArr)
  }
  carColorClick(objArr){
    console.log(objArr)
    this.setState({
      selectCarShow:false,
      selectCar: `${objArr[0].name} - ${objArr[1].name} - ${objArr[2].name}`
    })

  }
  render() {
    const {
      cityArr,
      selectCarShow,
      selectCar,
      typeList,
      colorArr
    } = this.state

    return (
      <div className="example-wrap">
        <div className="example-back">
          <Link to="/">
            <span className="icon-pic-home"></span>
          </Link>
        </div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>SelectCar</b><span>车型</span></h2>
          <div className="demo-show">
            <dl className="dl-list">
              <dd><Button onClick={this.cityClick.bind(this)} float className="select-type">{selectCar  ?(<b>车型： <span className="city-name">{`${selectCar}`}</span></b>) : `选择车型`}</Button></dd>
            </dl>
          </div>
        </div>
        <SelectCar
          show={selectCarShow}
          brandClick={this.brandClick.bind(this)}
          carTypeClick={this.carTypeClick.bind(this)}
          carColorClick={this.carColorClick.bind(this)}
        />
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
}
module.exports = CarType
