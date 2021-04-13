import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import RelativeBetween from '../RelativeBetween';

describe('RelativeBetween', () => {
  it('-1, -1 values', () => {
    const values = ['relativeTime:-1,-1'];
    const wrapper = mount(<RelativeBetween values={values} attrSelect="relativeBetween" onChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('1, 2 values', () => {
    const values = ['relativeTime:1,2'];
    const wrapper = mount(<RelativeBetween values={values} attrSelect="relativeBetween" onChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('1, 2 values', () => {
    const values = ['relativeTime:1,2'];
    const wrapper = mount(<RelativeBetween values={values} attrSelect="relativeBetween" onChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('select', () => {
    const wrapper = mount(<RelativeBetween values={[]} attrSelect="relativeBetween" onChange={() => {}} />);
    act(() => {
      wrapper.find('.gio-select-selector').simulate('click');
    });
    act(() => {
      wrapper.find('.gio-select-list-option').at(1).simulate('click');
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('select number', () => {
    const wrapper = mount(<RelativeBetween values={[]} attrSelect="relativeBetween" onChange={() => {}} />);
    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '2' } });
      wrapper
        .find('input')
        .at(1)
        .simulate('change', { target: { value: '4' } });
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('select not number', () => {
    const wrapper = mount(<RelativeBetween values={[]} attrSelect="relativeBetween" onChange={() => {}} />);
    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '' } });
      wrapper
        .find('input')
        .at(1)
        .simulate('change', { target: { value: '' } });
    });
    expect(wrapper.render()).toMatchSnapshot();
  });
});
