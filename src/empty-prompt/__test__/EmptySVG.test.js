import React from 'react';
import { render } from 'enzyme';
import EmptySVG from '../EmptySVG';

describe('EmptySVG', () => {
  it('render with default props', () => {
    const wrapper = render(<EmptySVG />);
    expect(wrapper).toMatchSnapshot();
  });
});
