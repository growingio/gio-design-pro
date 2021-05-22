import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Shortcut } from '../PastTimeSelector.stories';
import PastTimeSelector from '../PastTimeSelector';

describe('PastTimeSelector', () => {
  it('should to be add case', () => {
    const handleOnSelect = jest.fn();
    render(<Shortcut {...Shortcut.args} onSelect={handleOnSelect} />);
    expect(screen.getByText(/过去 7 天/)).toBeDefined();
    fireEvent.click(screen.getByText(/过去 7 天/));
    act(() => {
      fireEvent.click(screen.getByText('今日'));
    });
    expect(handleOnSelect).toHaveBeenCalledWith('day:1,0');
  });

  it('should to be canceled', () => {
    const handleOnCancel = jest.fn();
    render(<PastTimeSelector value="since:1620662400000" onCancel={handleOnCancel} />);
    fireEvent.click(screen.getByText('自 2021/05/11 至今日'));
    fireEvent.click(screen.getByText('取 消'));
    expect(handleOnCancel).toHaveBeenCalled();
  });
});
