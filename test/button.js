import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import JIMU from '../src/index';

const { Button } = JIMU;

describe('<Button></Button>', () => {
    describe(`<Button type="highlight"></Button>`, ()=> {
        let wrapper = shallow(
            <Button type="highlight">ok</Button>
        );
    });

    ['primary'].map((type)=> {
        ['normal', 'small'].map((size)=> {
            [true, false].map((disabled)=> {
                [true, false].map((isHyperLink) => {
                    [undefined, null, '', 'custom_class'].map((clazz)=>{
                        describe(`<Button type="${type}" size="${size}" disabled="${disabled}" href="${isHyperLink}" className="${clazz}"></Button>`, ()=> {
                            const label = 'ok';
                            const href = 'https://es.xiaojukeji.com';
                            let wrapper;
                            if (isHyperLink) {
                                wrapper = shallow(
                                    <Button type={type} size={size} disabled={disabled} href={href} className={clazz}>{label}</Button>
                                );
                            }else {
                                wrapper = shallow(
                                    <Button type={type} size={size} disabled={disabled} className={clazz}>{label}</Button>
                                );
                            }

                            it('should render <Button></Button> component', () => {
                                assert(wrapper.instance() instanceof Button);
                            });

                            it('should render be a button without `href` attribute', ()=> {
                                if (!isHyperLink) {
                                    assert(wrapper.type() === 'button');
                                }
                            });

                            it('should render be a `a` with `href` attribute', ()=> {
                                if (isHyperLink) {
                                    assert(wrapper.type() === 'a');
                                    assert(wrapper.prop('href') === href);
                                }
                            });

                            it(`should have custom class name ${clazz}`, ()=>{
                                if (clazz) {
                                    assert(wrapper.hasClass(`${clazz}`));
                                }
                            });

                            it(`should have text ${label}`, ()=> {
                                assert(wrapper.text() === label);
                            });
                        });
                    });
                });
            });
        });
    });

});
