import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import moment from 'moment';
import { noop } from 'lodash';
import Calendar from '../Calendar';
import { Mode } from '../DateRangePicker';
// import Button from '../../button/button';

const format = 'YYYY/MM/DD';

const VALUE = [moment([2015, 5, 1]), moment([2015, 5, 2])];
// const disabledDate = () => false;

const props = {
  value: VALUE,
  onChange: noop,
  format: 'YYYY/MM/DD',
  onConfirm: noop,
  onCancel: noop,
  showFooter: true,
};

describe('DatePicker ui test', () => {
  const DatePickerInstance = () => <Calendar {...props} mode={Mode.absolute} />;

  it('should match snapshot', () => {
    const wrapper = render(DatePickerInstance());
    expect(wrapper).toMatchSnapshot();
  });

  //   const DatePickerInstance1 = () => <Calendar {...props} mode={Mode.shortcut} />;

  //   it('should match snapshot', () => {
  //     const wrapper = render(DatePickerInstance1());
  //     expect(wrapper).toMatchSnapshot();
  //   });

  //   const DatePickerInstance2 = () => <Calendar {...props} mode={Mode.since} />;

  //   it('should match snapshot', () => {
  //     const wrapper = render(DatePickerInstance2());
  //     expect(wrapper).toMatchSnapshot();
  //   });

  it('should receive props', () => {
    expect(() => {
      const wrapper = mount(DatePickerInstance());
      wrapper.setProps({ disabledDate: noop });
      wrapper.setProps({ onChange: noop });
      wrapper.setProps({ mode: Mode.absolute });
      wrapper.setProps({ onConfirm: noop });
      wrapper.setProps({ onCancel: noop });
      wrapper.setProps({ format });
      wrapper.setProps({ showFooter: 'true' });
      wrapper.unmount();
    }).not.toThrow();
  });
});
