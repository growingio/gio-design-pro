import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSelector from '../UserSelector';
import { preparedSegmentsCN } from '../../user-picker/constant';
import { Resource } from '../../utils/interfaces';
import { segments, currentUserId } from '../../user-picker/__tests__/data';

const onShowSegmentChart = (resource: Resource) => <div>{`This is the trend chart of ${resource.name}.`}</div>;

const defaultProps = {
  segments,
  userId: currentUserId,
  onCreateSegment: () => {},
  borderless: false,
  placeholder: '选择分群',
  onShowSegmentChart,
};

describe('UserSelector', () => {
  it('can be selected', () => {
    const handleSelect = jest.fn();
    render(<UserSelector {...defaultProps} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('选择分群'));
    act(() => {
      fireEvent.click(screen.getByText(preparedSegmentsCN[0].name));
    });

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(preparedSegmentsCN[0].id, preparedSegmentsCN[0]);
  });

  it('can not be clicked in disabled state', () => {
    render(<UserSelector {...defaultProps} disabled />);
    fireEvent.click(screen.getByText('选择分群'));
    expect(screen.queryByText('我的')).toBeNull();
  });
});
