import React, { Component } from 'react'
import JIMU from './index'

const {Switch,Anime,Button} = JIMU,
  {CssTransform,PositionSwitch} = Anime

// 加载 _Load
const _Anime = React.createClass({
  getInitialState() {
    return {
      moveAlone : {
        targets: '.anime-move-demo-alone',
        left: '240px',
        backgroundColor: '#1E96FA',
        borderRadius: 30,
        loop: false,
        delay: 300,
        autoplay: true,
        easing: 'easeInOutQuad'
      },
      moveMore : {
        targets: '.anime-move-demo',
        translateX: 250,
        direction: 'alternate',
        loop: false,
        delay: 500,
        autoplay: true,
        elasticity: (el, i, l) => {
          return (200 + i * 200);
        }
      },
      moveAloneCont : {
        targets: '.anime-cont-demo-alone',
        left: '240px',
        backgroundColor: '#343C5C',
        borderRadius: 30,
        loop: false,
        delay: 300,
        autoplay: false,
        easing: 'easeInOutQuad'
      },
      moveMoreCont : {
        targets: '.anime-cont-demo',
        translateX: 250,
        direction: 'alternate',
        loop: false,
        delay: 500,
        autoplay: false,
        elasticity: (el, i, l) => {
          return (200 + i * 200);
        }
      },

      moveMorelag: {
        targets: '.anime-move-lag',
        direction: 'alternate',
        translateX: [ { value: 80 }, { value: 160 }, { value: 250 } ],
        duration: 3000
        // loop: true
      },
      myOrderArr : [1,2,3,4]
    }
  },

  render() {
    let {moveMore,moveAlone,moveAloneCont,moveMoreCont,moveMorelag,myOrderArr} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><a href="http://es-static.xiaojukeji.com/static/web/activity/jimudemo3/index.html#/?_k=qn72wa"><span className="icon-pic-home"></span></a></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>CssTransform</b><span>css3过渡动画</span></h2>
          <div>
            <dl className="dl-list csstrans-dl-item">
              <dt>单个动画</dt>
              <dd style={{padding:"30px 15px"}}>
                <CssTransform {...moveAlone}>
                  <div><div className="anime-move-demo-alone"></div></div>
                </CssTransform>
              </dd>

              <dt>多组动画</dt>
              <dd style={{padding:"30px 15px"}}>
                <CssTransform {...moveMore}>
                  <div><div className="anime-move-demo"></div></div>
                  <div><div className="anime-move-demo"></div></div>
                  <div><div className="anime-move-demo"></div></div>
                </CssTransform>
              </dd>

              <dt>可控的单个动画</dt>
              <dd style={{paddingTop:"30px"}}>
                <CssTransform {...moveAloneCont} ref="contAlone">
                  <div><div className="anime-cont-demo-alone"></div></div>
                </CssTransform>
              </dd>

              <dd className="btn-margin" style={{paddingBottom:"30px"}}>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contAlone.anime.play()}} >play</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contAlone.anime.pause()}} >pause</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contAlone.anime.restart()}} >restart</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contAlone.anime.reverse()}} >reverse</Button>
              </dd>

              <dt>可控的多组动画</dt>
              <dd style={{paddingTop:"30px"}}>
                <CssTransform {...moveMoreCont} ref="contMore">
                  <div><div className="anime-cont-demo"></div></div>
                  <div><div className="anime-cont-demo"></div></div>
                  <div><div className="anime-cont-demo"></div></div>
                </CssTransform>
              </dd>

              <dd className="btn-margin" style={{paddingBottom:"30px"}}>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contMore.anime.play()}} >play</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contMore.anime.pause()}} >pause</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contMore.anime.restart()}} >restart</Button>
                <Button className="csstrans-highlight" size="small" onClick={()=>{this.refs.contMore.anime.reverse()}} >reverse</Button>
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
module.exports = _Anime
