import React from 'react';
import { mount } from 'enzyme';
import EmptySVG from '../EmptySVG';

describe('EmptySVG', () => {
  it('render with default props', () => {
    const wrapper = mount(<EmptySVG />);
    expect(wrapper).toMatchSnapshot();
  });
});
