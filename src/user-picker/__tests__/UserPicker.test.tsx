import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import UserPicker from '../UserPicker';
import { preparedSegments } from '../constant';
import { Resource } from '../../utils/interfaces';
import { segments, currentUserId } from './data';

jest.useFakeTimers();

const onShowSegmentChart = (resource: Resource) => <div>{`This is the trend chart of ${resource.name}.`}</div>;

const defaultPicker = (
  <UserPicker
    segments={segments}
    userId={currentUserId}
    onCreateSegment={() => { }}
    onShowSegmentChart={onShowSegmentChart}
  />
);
const defaultProps = {
  segments,
  userId: currentUserId,
  onCreateSegment: () => { },
  onShowSegmentChart,
};

describe('UserPicker', () => {
  it('renders segments', () => {
    render(defaultPicker);
    expect(screen.queryByPlaceholderText('搜索分群名')).toBeTruthy();
    expect(screen.queryByText('我的')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryByText('预定义')).toBeTruthy();
    expect(screen.queryByText('其他')).toBeTruthy();
    expect(screen.queryByText('新建分群')).toBeTruthy();
    expect(screen.queryAllByRole('option').length).toBeGreaterThan(0);
  });
  it('renders segments with diabled item', () => {
    const { container } = render(<UserPicker {...defaultProps} disabledValues={['y9pm1pme']} />);
    // gio-list__item--disabled
    expect(container.querySelector('.gio-list__item--disabled')).toBeTruthy();
  });
  it('can trigger create segment callback', () => {
    const handleCreateSegment = jest.fn();
    render(<UserPicker {...defaultProps} onCreateSegment={handleCreateSegment} />);
    fireEvent.click(screen.getByText('新建分群'));
    expect(handleCreateSegment).toHaveBeenCalledTimes(1);
  });

  it('can change tab', () => {
    render(defaultPicker);
    const mySegmentsCount = screen.queryAllByRole('option').length;
    fireEvent.click(screen.getByText('全部'));
    expect(screen.queryByText('预定义')).toBeNull();
    expect(screen.queryByText('其他')).toBeNull();
    const allSegmentsCount = screen.queryAllByRole('option').length;
    expect(allSegmentsCount).toBeGreaterThanOrEqual(mySegmentsCount);
  });

  it('can select a segment', () => {
    const handleSelect = jest.fn();
    render(<UserPicker {...defaultProps} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText(preparedSegments[0].name));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(preparedSegments[0].id, preparedSegments[0]);
    expect(screen.queryByText('最近使用')).toBeTruthy();
    expect(screen.queryAllByText(preparedSegments[0].name)).toHaveLength(2);

    fireEvent.click(screen.getByText('全部'));
    for (let i = 0; i < 5; i += 1) {
      fireEvent.click(screen.getByText(segments[i].name));
    }
    fireEvent.click(screen.getByText('我的'));
    expect(screen.queryAllByText(preparedSegments[0].name)).toHaveLength(1);
  });

  it('can hover a segment and show the detail of segment', () => {
    render(<UserPicker {...defaultProps} itemOnHoverDelay={0} />);
    fireEvent.click(screen.getByText('全部'));
    const item = screen.getByText(segments[0].name);
    act(() => {
      fireEvent.mouseEnter(item);
      jest.runAllTimers();
    });

    expect(screen.queryByText(segments[0].creator)).toBeTruthy();
    fireEvent.mouseLeave(item);
    expect(screen.queryByText(segments[0].creator)).toBeNull();
  });
  it('set showSegementCard false ,detail will not show when hover a segment', () => {
    render(<UserPicker {...defaultProps} showSegmentCard={false} itemOnHoverDelay={0} />);
    fireEvent.click(screen.getByText('全部'));
    const item = screen.getByText(segments[0].name);
    act(() => {
      fireEvent.mouseEnter(item);
      jest.runAllTimers();
    });

    expect(screen.queryByText(segments[0].creator)).toBeNull();
    fireEvent.mouseLeave(item);
    expect(screen.queryByText(segments[0].creator)).toBeNull();
  });
  it('can search a segment by name', () => {
    const query = segments[0].name;
    render(defaultPicker);
    fireEvent.change(screen.getByPlaceholderText('搜索分群名'), {
      target: { value: query },
    });
    expect(screen.queryAllByText(query)).toHaveLength(2);
  });
});
