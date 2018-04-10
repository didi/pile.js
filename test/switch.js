import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import JIMU from '../src/index';

const { Switch } = JIMU

describe('<Switch></Switch>', ()=> {
    [true,false].map(isOpen => {
        [true,false].map(disabled => {
            describe(`<Switch disabled=${disabled}  isOpen=${isOpen}  ></Switch>`, ()=> {
                let value ,
                    openVal = 0,
                    closeVal = 1,
                    cb = v => value = v
                const wrapper = shallow(
                    <Switch disabled={disabled}  isOpen={isOpen}  clickBack={cb} openVal={openVal} closeVal={closeVal}></Switch>
                );

                it(`should render <Switch></Switch> component`, ()=> {
                    assert(wrapper.find('.ui-switch').length > 0);
                });

                it(`查看 展开状态 class是否正确添加`, ()=>{
                    if (isOpen) {
                        assert(wrapper.find('.ui-switch').hasClass("switch-open"));
                        assert(!wrapper.find('.ui-switch').hasClass("switch-close"));
                    }else{
                        assert(wrapper.find('.ui-switch').hasClass("switch-close"));
                        assert(!wrapper.find('.ui-switch').hasClass("switch-open"));
                    }
                });


                it(`查看 禁用状态 class是否正确添加`, ()=>{
                    // 禁用状态
                    if (disabled) {
                        assert(wrapper.find('.ui-switch').hasClass("switch-disabled"));
                    }else{
                        assert(!wrapper.find('.ui-switch').hasClass("switch-disabled"));
                    }
                });

                // 尝试点击
                it(`尝试点击`, ()=>{
                    wrapper.find('.ui-switch').simulate('click');
                    if (!disabled){
                        assert(value.isOpen !== isOpen)

                        if (isOpen) {
                            assert(value.radioVal === closeVal)
                        }else{
                            assert(value.radioVal === openVal)
                        }
                    }
                });

            })
        })
    });
});