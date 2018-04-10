import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import JIMU from '../src/index';

const { FadeIn,Button} = JIMU;

describe('<FadeIn></FadeIn>', () => {
  describe(`<FadeIn direction="bottom"></FadeIn>`, ()=> {
    let wrapper = shallow(
      <FadeIn direction="bottom">ok</FadeIn>
    );
  });

  ['bottom','top','left','right'].map((direction)=> {
    [true, false].map((show)=> {
      ["100%","300px"].map((width)=> {
        ["auto","100%","300px"].map((height) => {
          [0,1,2].map((align)=>{
            ['', 'test_class'].map((clazz)=>{
              describe(`<FadeIn show="${show}" direction="${direction}" width="${width}" height="${height}" align="${align}" className="${clazz}"></FadeIn>`, ()=> {
                const label = '内容自定义';
                let wrapper = shallow(
                  <FadeIn show={show} direction={direction} width={width} height={height} align={align} className={clazz}>{label}</FadeIn>
                )

                it('should render <FadeIn></FadeIn> component', () => {
                  assert(wrapper.instance() instanceof FadeIn);
                });

                it('方向样式检测', ()=> {
                  if (direction) {
                    assert(wrapper.hasClass(`jimu-fade-${direction}`));
                  }
                });

                it(`should have custom class name ${clazz}`, ()=>{
                  if (clazz) {
                    assert(wrapper.hasClass(`${clazz}`));
                  }
                });

                // it(`测试高度赋值`, ()=> {
                //   const contems = wrapper.find('.up-layout');
                //   // assert(contems.style.height === height);
                // })

              });
            });
          });
        });
      });
    });
  });

});
