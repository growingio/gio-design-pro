import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableCard, TableCardSingle } from '../Panel.stories';

describe('Render Panel with default args', () => {
  it('should render multiple panel', () => {
    const onTabClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = render(<TableCard onChange={onChange} onTabClick={onTabClick} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render signle panel', () => {
    const onTabClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = render(<TableCardSingle onChange={onChange} onTabClick={onTabClick} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Panel', () => {
  it('should display corresponding tab on click', () => {
    const onTabClick = jest.fn();
    const onChange = jest.fn();
    const wrapper = render(<TableCard onChange={onChange} onTabClick={onTabClick} />);
    fireEvent.click(wrapper.getByText(/权限/i).parentNode);
    expect(document.getElementsByClassName('gio-tabnav')[0].children[1]).toHaveClass(
      'gio-tabnav-item gio-tabnav-item-active'
    );
  });
});