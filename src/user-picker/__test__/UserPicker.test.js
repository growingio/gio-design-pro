import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
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

  it('render my segements', () => {
    const wrapper = mount(defaultComponent);
    wrapper.simulate('click');
    expect(render(wrapper)).toMatchSnapshot();
    const dropdown = document.body.querySelector('.gio-picker-dropdown');
    expect(dropdown).not.toBeNull();
    expect(dropdown).toMatchSnapshot();
  });

  it('render all segments', () => {
    const wrapper = mount(defaultComponent);
    wrapper.simulate('click');
    const dropdown = document.body.querySelector('.gio-picker-dropdown');
    const tabs = dropdown.querySelectorAll('.gio-tabnav-item');
    expect(tabs).toHaveLength(2);
    act(() => {
      tabs[1].click();
    });
    expect(dropdown).toMatchSnapshot();
  });

  it('can select a segment', () => {
    const onSelect = (s) => {
      expect(s).not.toBeNull();
    };
    const wrapper = mount(defaultComponent);
    wrapper.setProps({ onSelect });
    wrapper.simulate('click');
    act(() => {
      document.querySelector('.gio-picker__list .cascader-menu-item').click();
    });
  });
});
