import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { act } from 'react-test-renderer';
import UserPicker from '..';
import { currentUserId, preparedSegments, segments } from './data';

describe('UserPicker', () => {
  const onCreateSegment = jest.fn();
  const defaultProps = {
    preparedSegments,
    segments,
    userId: currentUserId,
    onCreateSegment,
  };
  const defaultComponent = <UserPicker {...defaultProps} />;

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 320 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
  });

  it('render my segements', () => {
    expect(render(defaultComponent)).toMatchSnapshot();
  });

  it('render all segments', () => {
    const wrapper = mount(defaultComponent);
    act(() => {
      wrapper.find('.gio-tabnav-item').at(2).simulate('click');
    });
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('render with loading', () => {
    const wrapper = shallow(<UserPicker {...defaultProps} loading />);
    expect(wrapper.find('.gio-loading-wrapper')).toHaveLength(1);
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('can search segments', () => {
    const wrapper = mount(defaultComponent);
    const input = wrapper.find('input.gio-input-content');
    input.simulate('change', { target: { value: 'xxxxxx' } });
    expect(wrapper.find('.gio-empty-prompt')).toHaveLength(1);
    expect(render(wrapper)).toMatchSnapshot();

    input.simulate('change', { target: { value: 'x'.repeat(201) } });
    expect(wrapper.find('.gio-alert')).toHaveLength(1);
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('can select a segment', () => {
    const onSelect = jest.fn();
    const defaultWrapper = mount(defaultComponent);
    defaultWrapper.setProps({ onSelect });
    defaultWrapper.find('.gio-select-option').at(1).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });
});
