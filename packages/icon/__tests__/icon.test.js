/**
 * @author renmaomin@126.com
 */
import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../src';

describe('Icon suite', () => {
  it('render a Icon', () => {
    const wrapper = shallow(<Icon type="delete" />);
    expect(wrapper).toMatchSnapshot();
  });
});
