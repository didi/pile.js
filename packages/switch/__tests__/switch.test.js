import React from 'react';
import { shallow } from 'enzyme';
import { expect as cExpect } from 'chai';
import sinon from 'sinon';
import Switch from '../src';


describe('Switch suite', () => {
  it('should render a Switch', () => {
    const wrapper = shallow(<Switch />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should default the checked property to false.', () => {
    const wrapper = shallow(<Switch />);
    cExpect(wrapper.instance().props.checked).to.equal(false);
  });
  it('click Swtich, checked attribute becomes true, by onChange callback', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<Switch onChange={onChange} />);
    wrapper.find('[role="switch"]').simulate('click');
    cExpect(onChange).to.have.property('callCount', 1);
  });

  it('switch has disabled state, in the disabled state, onChange event invalid clicks', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<Switch disabled onChange={onChange} />);
    wrapper.find('[role="switch"]').simulate('click');
    cExpect(onChange).to.have.property('callCount', 0);
  });
});
