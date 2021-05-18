import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import EventPicker from '../EventPicker';
import { events } from './data';
import { EventPickerProps } from '../interfaces';

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
const defaultTabs = [
  { label: '事件', value: 'event' },
  { label: '计算指标', value: 'measurement' },
];
const defaultProps: EventPickerProps = {
  dataSource: events,
  showTabAll: true,
  multiple: false,
  tabs: defaultTabs,
  historyStoreKey: 'unit_test',
};
const defaultPicker = <EventPicker {...defaultProps} />;

describe('<EventPicker/> test', () => {
  beforeEach(() => {
    localStorage.clear();
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
  it(' can add to recentlyUsed when single select', async () => {
    const handleSelect = jest.fn();
    const datas = events;
    const picker = <EventPicker {...defaultProps} dataSource={datas} onSelect={handleSelect} shouldUpdate />;
    // const picker = <PropertyPicker {...defaultProps} onSelect={handleSelect} shouldUpdateRecentlyUsed />;
    const { unmount } = render(picker);
    // fireEvent.click(screen.getByText('展开全部', { exact: false }));
    fireEvent.click(screen.getByText('全部'));
    const all = screen.queryAllByRole('option');
    all.slice(0, 7).forEach((opt) => {
      fireEvent.click(opt);
    });
    // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < ; i++) {
    //   fireEvent.click(screen.getByText(datas[i].name));
    // }
    await act(async () => {
      fireEvent.click(screen.getByText('事件'));
    });
    const opts = screen.queryAllByRole('option');
    opts.slice(0, 5).forEach((opt) => {
      fireEvent.click(opt);
    });

    expect(localStorage.__GIO_EVENT_TARGET_PICK_HISTORY_unit_test).not.toBeNull();
    act(() => {
      unmount();
    });

    render(picker);
    expect(screen.getByText('最近使用')).toBeTruthy();
  });
  it(' will not add to recentlyUsed when multiple select', async () => {
    const handleSelect = jest.fn();
    const datas = events.slice(0, 9);
    const picker = <EventPicker {...defaultProps} dataSource={datas} onSelect={handleSelect} shouldUpdate multiple />;
    // const picker = <PropertyPicker {...defaultProps} onSelect={handleSelect} shouldUpdateRecentlyUsed />;
    const { unmount } = render(picker);
    // fireEvent.click(screen.getByText('展开全部', { exact: false }));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByText(datas[i].name));
    }
    expect(localStorage.__GIO_EVENT_TARGET_PICK_HISTORY_unit_test).not.toBeNull();
    act(() => {
      unmount();
    });

    render(picker);
    expect(screen.queryByText('最近使用')).toBeNull();
  });

  it(' cancel select at multiple mode', async () => {
    const handleSelect = jest.fn();
    const handleCancel = jest.fn();
    const datas = events.slice(0, 9);
    const picker = (
      <EventPicker
        {...defaultProps}
        dataSource={datas}
        onSelect={handleSelect}
        onCancel={handleCancel}
        shouldUpdate
        multiple
      />
    );
    render(picker);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByText(datas[i].name));
    }
    act(() => {
      fireEvent.click(screen.getByText('取 消'));
    });
    expect(handleSelect).toBeCalledTimes(0);
    expect(handleCancel).toBeCalledTimes(1);
  });
  it(' click ok button to select', async () => {
    const handleSelect = jest.fn();
    const handleCancel = jest.fn();
    const handleChange = jest.fn();
    const datas = events.slice(0, 9);
    const picker = (
      <EventPicker
        {...defaultProps}
        dataSource={datas}
        onSelect={handleSelect}
        onCancel={handleCancel}
        onChange={handleChange}
        shouldUpdate
        multiple
      />
    );
    render(picker);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getByText(datas[i].name));
    }
    act(() => {
      fireEvent.click(screen.getByText('确 定'));
    });
    expect(handleSelect).toBeCalledTimes(1);
    expect(handleChange).toBeCalledTimes(1);
    expect(handleCancel).toBeCalledTimes(0);
  });
  it(' can deselect', async () => {
    const handleSelect = jest.fn();
    const handleCancel = jest.fn();
    const handleChange = jest.fn();
    const datas = events.slice(0, 9);
    const selecValue = datas.slice(0, 2);
    const picker = (
      <EventPicker
        {...defaultProps}
        dataSource={datas}
        value={selecValue}
        historyStoreKey="unit_test"
        onSelect={handleSelect}
        onCancel={handleCancel}
        onChange={handleChange}
        shouldUpdate
        multiple
      />
    );
    render(picker);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getByText(selecValue[i].name));
    }
    act(() => {
      fireEvent.click(screen.getByText('确 定'));
    });
    expect(handleSelect).toBeCalledTimes(1);
    expect(handleChange).toBeCalledTimes(1);
    expect(handleCancel).toBeCalledTimes(0);
  });

  it('can deselect by click clearAll', async () => {
    const handleSelect = jest.fn();
    const handleChange = jest.fn((v) => console.log('value changed', v));
    const datas = events.slice(0, 9);
    const selecValue = datas.slice(0, 2);
    const picker = (
      <EventPicker
        {...defaultProps}
        dataSource={datas}
        value={selecValue}
        onSelect={handleSelect}
        onChange={handleChange}
        shouldUpdate
        multiple
      />
    );
    render(picker);

    await act(async () => {
      fireEvent.click(screen.getByText('清空全部已选'));
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.getByText('确 定'));
      jest.runAllTimers();
    });
    expect(handleSelect).toBeCalledTimes(1);
    expect(handleChange).toBeCalledTimes(1);
  });
  it('search options', async () => {
    const datas = events.slice(0, 2);
    const picker = <EventPicker {...defaultProps} dataSource={datas} />;
    render(picker);
    const searchBar = screen.getByPlaceholderText('搜索事件或指标名称');
    // await act(async () => {
    //   const query = 'no result';
    //   fireEvent.change(searchBar, { target: { value: query } });
    //   await sleep(305);
    // });
    // expect(screen.queryAllByRole('option')).toHaveLength(0);

    await act(async () => {
      const query2 = datas[0].name;
      fireEvent.change(searchBar, { target: { value: query2 } });
      await sleep(305);
    });
    expect(screen.queryAllByRole('option')).toHaveLength(1);
  });
  it('search options with no result', async () => {
    const datas = events.slice(0, 2);
    const picker = <EventPicker {...defaultProps} dataSource={datas} />;
    render(picker);
    const searchBar = screen.getByPlaceholderText('搜索事件或指标名称');
    await act(async () => {
      const query = 'no result';
      fireEvent.change(searchBar, { target: { value: query } });
      await sleep(305);
    });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });
});
