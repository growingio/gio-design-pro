import React from 'react';
import { render } from 'enzyme';
import Expression from '../components/FilterList/Expression';

describe('expression test', () => {
  it('should match Expression snapshot.', () => {
    const wrapper = render(<Expression />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match FilterPicker base snapshot.', () => {
    const wrapper = render(<Expression />);
    expect(wrapper).toMatchSnapshot();
  });
});
