/**
 * @author renmaomin@126.com
 */
import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../src';

describe('Alert suite', () => {
  it('render a alert', () => {
    const wrapper = shallow(
      <Alert show btnText="确定" callBack={() => {}}>
        内容
      </Alert>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
