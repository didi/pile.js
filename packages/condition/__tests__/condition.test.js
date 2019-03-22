/**
 * @author renmaomin@126.com
 */
import React from 'react';
import { shallow } from 'enzyme';
import { IfComponent } from '../src';

describe('Condition suite', () => {
  it('render a Condition', () => {
    const wrapper = shallow(<IfComponent when>{() => <p>hello IfComponent</p>}</IfComponent>);
    expect(wrapper).toMatchSnapshot();
  });
});
