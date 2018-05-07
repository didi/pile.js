/**
 * Created by zhaojiejane on 18/01/01.
 */
import React from 'react'
import { Link } from 'react-router'
import Pile from './index'

const { CanvasChart } = Pile,{ ChartLine ,ChartCircle} = CanvasChart


const _CanvasChart = React.createClass({
  getInitialState() {
    return {
      canvaslineopts:{
        value: 0.7,
        animation: false,
        size:220,
        fill: '#2ea9ff',
        el:`canvas_line`,
        final:null,
        canvas_height:20,
        canvas_width:220
      },
      canvaslineopts1:{
        value: 0.7,
        animation: false,
        size:220,
        fill: {
            gradient: ['#2ea9ff', '#2efaff']
        },
        el:`canvas_line1`,
        canvas_height:20,
        canvas_width:220
      },
      canvaslineopts2:{
        value: 0.7,
        animation: true,
        size:220,
        fill: {
            gradient: ['#2ea9ff', '#2efaff']
        },
        el:`canvas_line2`,
        canvas_height:20,
        canvas_width:220
      },
      canvaslineopts3:{
        value: 0.7,
        animation: true,
        size:220,
        reverse:true,
        fill: {
            gradient: ['#2ea9ff', '#2efaff']
        },
        el:`canvas_line3`,
        canvas_height:220,
        canvas_width:20
      },
      canvascircleopts:{
        value: 0.7,
        size: 168,
        startAngle: -Math.PI/2,
        thickness: 12,
        animation: false,
        final:null,
        fill: {
            color: 'rgba(0, 0, 0, .1)', // fallback color when image is not loaded
            image: require('../image/circle.png')
        },
        reverse: true,
        el: "canvas_circle"
      },
      canvascircleopts1:{
        value: 0.7,
        size: 168,
        startAngle: -Math.PI/2,
        thickness: 12,
        fill: {
            gradient:['#2ea9ff']
        },
        reverse: true,
        el: "canvas_circle1"
      }
    }
  },

  render() {
    let {canvaslineopts,canvaslineopts1,canvaslineopts2,canvaslineopts3,canvascircleopts,canvascircleopts1} = this.state
    return (
      <div className="example-wrap">
        <div className="example-back"><Link to="/"><span className="icon-pic-home"></span></Link></div>
        <div className="libs-intr" style={{"minHeight" : `${document.body.clientHeight - 94}px`}}>
          <h2 className="page-title"><b>CanvasChart</b><span>CanvasLine</span></h2>
          <div>
            <dl className="dl-list csstrans-dl-item">
              <dt>CanvasLine 横向无动画无渐变无圆角</dt>
              <dd style={{padding:"30px 15px"}}>
                <ChartLine {...canvaslineopts}>
                </ChartLine>
              </dd>
            </dl>
            <dl className="dl-list csstrans-dl-item">
              <dt>CanvasLine 横向无动画有渐变</dt>
              <dd style={{padding:"30px 15px"}}>
                <ChartLine {...canvaslineopts1}>
                </ChartLine>
              </dd>
            </dl>
            <dl className="dl-list csstrans-dl-item">
              <dt>CanvasLine 横向有动画</dt>
              <dd style={{padding:"30px 15px"}}>
                <ChartLine {...canvaslineopts2}>
                </ChartLine>
              </dd>
            </dl>
            <dl className="dl-list csstrans-dl-item">
              <dt>CanvasLine 纵向</dt>
              <dd style={{padding:"3px 50px"}}>
                <ChartLine {...canvaslineopts3}>
                </ChartLine>
              </dd>
            </dl>
          </div>
          <h2 className="page-title"><span>Canvascircle</span></h2>
          <dl className="dl-list csstrans-dl-item">
            <dt>CanvasCircle 图片为底色无圆角</dt>
            <dd style={{padding:"3px 50px"}}>
              <ChartCircle {...canvascircleopts}>
              </ChartCircle>
            </dd>
          </dl>
          <dl className="dl-list csstrans-dl-item">
            <dt>CanvasCircle 底色为单一颜色有圆角</dt>
            <dd style={{padding:"3px 50px"}}>
              <ChartCircle {...canvascircleopts1}>
              </ChartCircle>
            </dd>
          </dl>
        </div>
        <div className="footer-name">
          <span className="footer-name-pic"></span>
        </div>
      </div>
    )
  }
})

export default _CanvasChart
