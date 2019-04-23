import React from 'react';
import { shallow } from 'enzyme';
import Filed from '../src';

describe('Filed suite', () => {
  it('render a Filed', () => {
    const wrapper = shallow(<Filed />);
    expect(wrapper).toMatchSnapshot();
  });
});
