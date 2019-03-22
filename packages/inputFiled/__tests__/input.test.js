import React from 'react';
import { shallow } from 'enzyme';
import Input from '../src';

describe('Input suite', () => {
  it('render a input', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper).toMatchSnapshot();
  });
});
