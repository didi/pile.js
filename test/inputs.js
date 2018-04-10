import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import JIMU from '../src/index';

const { Inputs } = JIMU

describe('<Inputs></Inputs>', ()=> {
    ["left","right"].map(inputsAlign => {
        ["checkbox","radio"].map(asideType => {
            [undefined, null, '', 'custom_class'].map((clazz)=> {
                describe(`<Inputs asideType=${asideType} inputsAlign=${inputsAlign} className=${clazz}></Inputs>`, ()=> {
                    const wrapper = shallow(
                        <Inputs asideType={asideType}  inputsAlign={inputsAlign}  className={clazz} ></Inputs>
                    );

                    it(`should render <Inputs></Inputs> component`, ()=> {
                        assert(wrapper.find('.name-all').length > 0);
                    });


                    it(`check <Inputs /> class name`, ()=> {
                        if (inputsAlign === "left") {
                            assert(wrapper.find('.align-lf').length > 0);
                            assert(wrapper.find('.align-rt').length == 0);
                        }else{
                            assert(wrapper.find('.align-lf').length == 0);
                            assert(wrapper.find('.align-rt').length > 0);
                        }
                    });


                    // it(`check <Inputs /> type`, ()=> {
                    //     if (asideType === "checkbox") {
                    //         assert(wrapper.find('input').attr("type") === "checkbox");
                    //         // assert(wrapper.find('input[type="radio"]').length == 0);
                    //     }else{
                    //         // assert(wrapper.find('checkbox').length == 0);
                    //         // assert(wrapper.find('radio').length > 0);
                    //     }
                    // });


                    it(`should have custom class name ${clazz}`, ()=> {
                        if (clazz) {
                            assert(wrapper.hasClass(clazz));
                        }
                    });


                })
            })
        })
    });
});