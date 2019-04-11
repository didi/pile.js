import React from 'react';
import { shallow } from 'enzyme';
import Validator from '../src';

describe('Validator suite', () => {
  it('render a validator', () => {
    const wrapper = shallow(<Validator>{()=>{}}</Validator>);
    expect(wrapper).toMatchSnapshot();
  });
});
