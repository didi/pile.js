import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import ToastContent from '../src/toasContent';

describe('test toast component', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });
  it('snapshot toast ui', () => {
    const wrapper = shallow(<ToastContent content="hi,you" iconType="success" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('', () => {

  });
});
