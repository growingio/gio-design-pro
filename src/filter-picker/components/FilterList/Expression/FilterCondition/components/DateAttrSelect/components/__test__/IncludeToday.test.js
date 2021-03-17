import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { act } from 'react-test-renderer';
import IncludeToday from '../IncludeToday';

describe('IncludeToday', () => {
  it('test', () => {
    const time = moment('2021-03-01');
    const onChange = jest.fn();
    const wrapper = mount(<IncludeToday time={time} onChange={onChange} />);
    expect(wrapper.render()).toMatchSnapshot();
    act(() => {
      wrapper.find('.gio-input__content').simulate('click');
    });
    act(() => {
      wrapper.find('.gio-date-picker-cell').at(2).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-date-picker-footer button').at(1).simulate('click');
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
