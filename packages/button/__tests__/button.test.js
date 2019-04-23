/**
 * @author renmaomin@126.com
 */
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src';

describe('Button suite', () => {
  it('render a button', () => {
    const wrapper = shallow(<Button>default</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
