import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Selector from '../Selector';

const defaultProps = {
  dropdownRender: () => <div>custom dropdown</div>,
  valueRender: () => <div>custom value</div>,
};

describe('Selector', () => {
  it('renders with default props', () => {
    render(<Selector {...defaultProps} />);
    expect(screen.queryByText(/custom value/)).toBeDefined();
    fireEvent.click(screen.getByText(/custom value/));
    expect(screen.queryByText(/custom dropdown/)).toBeDefined();
  });

  it('renders as disabled', () => {
    const handleDropdownVisible = jest.fn();
    render(<Selector {...defaultProps} disabled onDropdownVisibleChange={handleDropdownVisible} />);
    fireEvent.click(screen.getByText(/custom value/));
    expect(handleDropdownVisible).toHaveBeenCalledTimes(0);
  });

  it('renders as borderless', () => {
    const { container } = render(<Selector {...defaultProps} borderless />);
    expect(container.getElementsByClassName('gio-selector--borderless')).toHaveLength(1);
  });
});
