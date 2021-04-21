import React from 'react';
import { mount, render } from 'enzyme';
import { noop } from 'lodash';
import RangePicker from '../DateRangePicker';

const VALUE = 'day:2,1';

const props = {
  value: VALUE,
  onChange: noop,
};

describe('DatePicker ui test', () => {
  const DatePickerInstance = () => <RangePicker {...props} />;

  it('should match snapshot', () => {
    const wrapper = render(DatePickerInstance());
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive props', () => {
    expect(() => {
      const wrapper = mount(DatePickerInstance());
      wrapper.setProps({ value: 'day:2,1' });
      wrapper.setProps({ onChange: noop });
      wrapper.unmount();
    }).not.toThrow();
  });
});
