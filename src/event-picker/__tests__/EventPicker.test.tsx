import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import EventPicker from '../EventPicker';
import localStorageMock from '../../__mock__/localStorageMock';
import { events } from './data';
import { EventPickerProps } from '../interfaces';

jest.useFakeTimers();

const defaultTabs = [
  { label: '事件', value: 'event' },
  { label: '计算指标', value: 'measurement' },
];
const defaultProps: EventPickerProps = {
  dataSource: events,
  showTabAll: true,
  multiple: false,
  tabs: defaultTabs,
  // searchBar: { placeholder: '搜索事件或指标名称' },
};
const defaultPicker = <EventPicker {...defaultProps} />;

describe('<EventPicker/> test', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock(),
      writable: true,
    });
  });
  it('renders EventPicker', () => {
    render(defaultPicker);
    expect(screen.queryByPlaceholderText('搜索事件或指标名称')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryAllByText('计算指标')).not.toBe([]);
    expect(screen.queryAllByText('事件')).not.toBe([]);
    expect(screen.queryAllByRole('option').length).toBeGreaterThan(0);
  });
  it('can change tab', () => {
    render(<EventPicker {...defaultProps} dataSource={events.slice(0, 9)} />);
    fireEvent.click(screen.getByText('事件'));
    expect(screen.queryByText('自定义计算指标', { exact: false })).toBeNull();
    const eventsCount = screen.queryAllByRole('option').length;
    fireEvent.click(screen.getByText('全部'));
    const allCount = screen.queryAllByRole('option').length;
    expect(allCount).toBeGreaterThanOrEqual(eventsCount);
  });
  it(' can add to recentlyUsed', async () => {
    const handleSelect = jest.fn();
    const datas = events.slice(0, 9);
    const picker = <EventPicker {...defaultProps} dataSource={datas} onSelect={handleSelect} shouldUpdate />;
    // const picker = <PropertyPicker {...defaultProps} onSelect={handleSelect} shouldUpdateRecentlyUsed />;
    const { unmount } = render(picker);
    // fireEvent.click(screen.getByText('展开全部', { exact: false }));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText(datas[i].name));
    }

    await act(() => {
      unmount();
    });

    render(picker);
    expect(screen.getByText('最近使用')).toBeTruthy();
  });
});
