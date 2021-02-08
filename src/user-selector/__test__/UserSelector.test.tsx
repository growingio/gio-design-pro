import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSelector from '../UserSelector';
import { preparedSegments } from '../constant';
import { segments, currentUserId } from './data';

const defaultProps = {
  segments,
  userId: currentUserId,
  onCreateSegment: () => {},
  borderless: false,
  placeholder: '选择分群',
};

describe('UserSelector', () => {
  it('can be selected', () => {
    const handleSelect = jest.fn();
    render(<UserSelector {...defaultProps} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('选择分群'));
    act(() => {
      fireEvent.click(screen.getByText(preparedSegments[0].name));
    });

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(preparedSegments[0].id, preparedSegments[0]);
  });

  it('can not be clicked in disabled state', () => {
    render(<UserSelector {...defaultProps} disabled />);
    fireEvent.click(screen.getByText('选择分群'));
    expect(screen.queryByText('我的')).toBeNull();
  });
});
