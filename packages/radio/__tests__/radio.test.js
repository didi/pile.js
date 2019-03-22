import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../src';

describe('Radio suite', () => {
  it('render a radio', () => {
    const wrapper = shallow(<Radio />);
    expect(wrapper).toMatchSnapshot();
  });
});
