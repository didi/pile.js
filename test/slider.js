/*global before*/
import React from 'react';
import ReactDOM from 'react-dom';
import { mount,shallow } from 'enzyme';
import assert from 'assert';
import JIMU from '../src/index';
var jsdom = require('jsdom');
const { Slider } = JIMU;
let {SliderLine} = Slider

describe('<SliderLine></SliderLine>', ()=>{
  before(() => {
      global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
      global.window = document.defaultView;
  });

  //mocking touch
  const simulateTouch = (wrapper, distance, ogX = 500)=> {
      const $handler = wrapper.find('.slider-bnt');

      $handler.simulate('touchStart', {
        targetTouches: [
          {
            identifier: 'test',
            pageX: ogX
          }
        ]
      })

      $handler.simulate('touchMove', {
        targetTouches: [
          {
            identifier: 'test',
            pageX: ogX + distance
          }
        ]
      })

      $handler.simulate('touchEnd')
  }

  it('render a SliderLine with jimu-slider wrapper', ()=>{
      const wrapper = shallow(<SliderLine />);

      assert(wrapper.instance() instanceof SliderLine);
      assert(wrapper.find('.jimu-slider').length > 0);
      // console.log(wrapper.find('.jimu-slider').length)
  })

  it('can slide left/right and trigger onChangeBack', ()=>{
      // let value = 1,
      //     // cb = v => value = v
      //     cb = v => value = v.value

      // const wrapper = mount(
      //   <SliderLine
      //     min={1}
      //     max={100}
      //     defaultValue={50}
      //     onChangeBack={ cb }
      //   />
      // );

      // let $node = ReactDOM.findDOMNode(wrapper.instance())
      // let $renderedBar = $node.querySelector('.line-light');

      // $renderedBar.clientWidth = 500

      // checking touch move right
      // simulateTouch(wrapper, 49)
      // assert(value === 60)
      // console.log(value)

      // //checking touch move left
      // simulateTouch(wrapper, -100)
      // // assert(value === 40)
      // console.log(value)
  })

  // it('should void changes with disabled', ()=>{
  //     let value = 50,
  //         cb = v => value = v

  //     const wrapper = mount(
  //       <Slider
  //         min={1}
  //         max={100}
  //         step={1}
  //         defaultValue={50}
  //         onChangeBack={ cb }
  //         disabled
  //       />
  //     );

  //     let $node = ReactDOM.findDOMNode(wrapper.instance())
  //     let $renderedBar = $node.querySelector('.slider-bnt');

  //     $renderedBar.clientWidth = 500

  //     //checking touch move right
  //     simulateTouch(wrapper, 50)
  //     assert(value === 50)
  // })

  // it('should render value with showValue', ()=>{
  //     [true, false].map(showValue=>{
  //       const wrapper = mount(
  //         <Slider
  //           min={1}
  //           max={100}
  //           step={1}
  //           showValue={showValue}
  //         />
  //       );

  //       if(showValue){
  //         assert(wrapper.find('.weui-slider-box__value').length > 0)
  //       }else{
  //         assert(wrapper.find('.weui-slider-box__value').length == 0)
  //       }
  //     })
  // })

})