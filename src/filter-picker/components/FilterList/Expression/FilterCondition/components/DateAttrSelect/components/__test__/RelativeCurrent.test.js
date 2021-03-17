/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import RelativeCurrent from '../RelativeCurrent';

describe('RelativeCurrent', () => {
  const onChange = () => {};
  const values = ['relativeTime:-1,0'];
  it('-1, 0 values', () => {
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('1, 0 values', () => {
    const values = ['relativeTime:1,0'];
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('0, 0 values', () => {
    const values = ['relativeTime:0,0'];
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('not values', () => {
    const values = [];
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('select1', () => {
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    act(() => {
      wrapper.find('.gio-select-selector').at(0).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-select-list-option').at(1).simulate('click');
    });
  });

  it('select2', () => {
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    act(() => {
      wrapper.find('.gio-select-selector').at(1).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-select-list-option').at(1).simulate('click');
    });
  });

  it('input number', () => {
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '2' } });
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('input not number', () => {
    const wrapper = mount(<RelativeCurrent attrSelect="relativeCurrent" onChange={onChange} values={values} />);
    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '' } });
    });
    expect(wrapper.render()).toMatchSnapshot();
  });
});
