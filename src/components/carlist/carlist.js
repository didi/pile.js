import React, { Component } from 'react';

class carList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCarType: null, // 已选择的车辆型号
      show: undefined,
    };

    this.listClick = this.listClick.bind(this);
    this.colorClick = this.colorClick.bind(this);
    this.wrapClick = this.wrapClick.bind(this);
    this.initListData = this.initListData.bind(this);
    this.initColorData = this.initColorData.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.setState(nextprops);
  }
  listClick(e) {
    const ele = e.currentTarget;
    const obj = JSON.parse(ele.dataset.obj);
    this.setState({
      selectCarType: obj,
    });
    this.state.onClick(obj);
  }
  colorClick(e) {
    const ele = e.currentTarget;

    this.state.onClick(JSON.parse(ele.dataset.obj));
  }
  initListData() {
    const self = this;
    const {
      listData, dataAttrName, selectCarType, ...other
    } = this.state;
    if (!listData) {
      return null;
    }
    return listData.map((ele, index) => {
      let isCheck = false;
      if ((selectCarType && selectCarType.id) &&
      selectCarType[dataAttrName.id] === ele[dataAttrName.id]) {
        isCheck = true;
      }

      return (
        <div
          {...other}
          key={index}
          onClick={self.listClick}
          data-obj={JSON.stringify(ele)}
          className={`list ${isCheck ? 'select' : null}`}

        >
          {/* <img src={ele.imgurl} alt=""/> */}
          {ele[self.props.dataAttrName.name]}
        </div>
      );
    });
  }

  initColorData() {
    const self = this;
    const { colorData } = this.state;
    if (!colorData) {
      return null;
    }
    return colorData.map((ele, index) => (
      <div
        key={index}
        className="list color"
        data-obj={JSON.stringify(ele)}
        onClick={this.colorClick}
      >
        <span className="iconColor" style={{ backgroundColor: ele.color }} />
        {ele[self.props.dataAttrName.name]}
      </div>
    ));
  }
  wrapClick() {
    this.setState({
      show: false,
    });
  }
  render() {
    const { show, showWrap, width } = this.state;
    const dialogList = (
      <div className={`
          dialogList animated
          ${show === undefined && ' none '}
          ${show === false && ' slideOutRight '}
          ${show === true && ' slideInRight '}
          w${width}`}
      >
        {this.initListData()}
        {this.initColorData()}
      </div>
    );
    return showWrap ? (
      <div className="dialogListWrap" onClick={this.wrapClick}>
        {dialogList}
      </div>
    ) : dialogList;
  }
}

export default carList;
