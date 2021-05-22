import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Options } from '../SelectList.stories';

describe('SelectList', () => {
  fit('render options and can be selected', () => {
    const handleOnSelect = jest.fn();
    render(<Options {...Options.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByRole('option')).toHaveLength(4);

    fireEvent.click(screen.getAllByRole('option')[0]);
    expect(handleOnSelect).toHaveBeenCalled();
    expect(handleOnSelect).toHaveBeenCalledWith('shortcut');
  });
});
