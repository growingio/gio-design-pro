/* eslint-disable no-undef */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPicker, { ExpandableGroupOrSubGroup } from '../PropertyPicker';
import { insightDimensions } from './data';
import { dimensionToPropertyItem, getShortPinyin } from '../util';
import IconRender from '../PropertyValueIconRender';
import { Dimension } from '../types';
import { ListItemProps } from '../../list/interfaces';
import { PropertyItem } from '../interfaces';

const defaultPicker = <PropertyPicker dataSource={insightDimensions as Dimension[]} />;
const defaultProps = {
  dataSource: insightDimensions as Dimension[],
};
const propertyItems = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
describe('PropertyPicker', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('renders PropertyPicker by  insightDimensions', () => {
    render(defaultPicker);
    expect(screen.queryByPlaceholderText('搜索属性名称')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryAllByText('事件属性')).not.toBe([]);
    expect(screen.queryAllByText('用户属性')).not.toBe([]);
    expect([]).toBeTruthy();
  });
  it('renders PropertyPicker by PropertyItem Array', () => {
    render(<PropertyPicker dataSource={propertyItems} />);
    expect(screen.queryByPlaceholderText('搜索属性名称')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryAllByText('事件属性')).not.toBe([]);
    expect(screen.queryAllByText('用户属性')).not.toBe([]);
    expect([]).toBeTruthy();
  });
  it('can change tab', () => {
    render(defaultPicker);
    const allPropertyCount = screen.queryAllByRole('option').length;
    fireEvent.click(screen.queryAllByText('用户属性')[0]);
    expect(screen.queryByText('预置用户属性')).not.toBeNull();
    expect(screen.queryByText('自定义用户属性')).not.toBeNull();
    const userPropertyCount = screen.queryAllByRole('option').length;
    expect(allPropertyCount).toBeGreaterThanOrEqual(userPropertyCount);
  });

  it('can select a property', async () => {
    const handleSelect = jest.fn();
    const tobeClickedNode = dimensionToPropertyItem(insightDimensions[0] as Dimension);
    tobeClickedNode.disabled = false;
    tobeClickedNode.itemIcon = () => <IconRender group={tobeClickedNode.groupId} />;
    tobeClickedNode.pinyinName = getShortPinyin(tobeClickedNode.label ?? '');
    const shouldUpdateRecentlyUsed = true;
    render(
      <PropertyPicker {...defaultProps} shouldUpdateRecentlyUsed={shouldUpdateRecentlyUsed} onSelect={handleSelect} />
    );

    fireEvent.click(screen.getByText(tobeClickedNode.label || ''));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByText(tobeClickedNode.name)).toHaveLength(1);
  });
  it('can hover a property and show the detail of property', async () => {
    jest.useFakeTimers();

    render(<PropertyPicker {...defaultProps} detailVisibleDelay={0} />);
    fireEvent.click(screen.getByText('全部'));
    const item = screen.queryAllByText(insightDimensions[0].name)[0];

    await act(async () => {
      fireEvent.mouseEnter(item);
      // jest.runAllTimers();
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText(insightDimensions[0].id)).toBeTruthy();

    // screen.debug(screen.queryByText(insightDimensions[0].id));
    fireEvent.mouseLeave(item);
    expect(screen.queryByText(insightDimensions[0].id)).toBeNull();
    jest.clearAllTimers();
  });

  it('can search a property by name', async () => {
    jest.useRealTimers();
    // jest.useFakeTimers();
    const dataSource = insightDimensions.slice(0, 5);
    const query = insightDimensions[0].name;
    // render(defaultPicker);
    render(<PropertyPicker {...defaultProps} dataSource={dataSource} />);
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('搜索属性名称'), {
        target: { value: query },
      });
    });

    // jest.runAllTimers();
    // jest.advanceTimersByTime(1000);
    await sleep(400);
    // await jest.advanceTimersByTime(400);
    // jest.runAllTimers();
    // jest.advanceTimersByTime(1000);
    expect(screen.queryAllByRole('option')).toHaveLength(1);
    // expect(screen.queryAllByText(query).length).toBeGreaterThan(0);
  });

  it(' can add to recentlyUsed', async () => {
    const handleSelect = jest.fn();
    const props = {
      dataSource: insightDimensions as Dimension[],
    };
    const picker = <PropertyPicker {...defaultProps} onSelect={handleSelect} shouldUpdateRecentlyUsed />;
    const { unmount } = render(picker);
    fireEvent.click(screen.getByText('展开全部', { exact: false }));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 12; i++) {
      fireEvent.click(screen.getByText(props.dataSource[i].name));
    }

    await act(() => {
      unmount();
    });

    render(picker);
    expect(screen.getByText('最近使用')).toBeTruthy();
  });
});
describe('ExpandableGroupOrSubGroup', () => {
  it('will render ExpandItem and expand when clicked', () => {
    const items = insightDimensions.slice(12).map((i) => dimensionToPropertyItem(i as Dimension));
    const listItems = items.map((data: PropertyItem) => {
      const itemProp: ListItemProps = {
        disabled: data.disabled,
        ellipsis: true,
        key: ['item', data.type, data.groupId, data.id].join('-'),
        children: <span>{data.label}</span>,
        onClick: jest.fn(),
        onMouseEnter: jest.fn(),
        onMouseLeave: jest.fn(),
      };
      return itemProp;
    });
    render(<ExpandableGroupOrSubGroup type="subgroup" items={listItems} />);
    fireEvent.click(screen.getByText('展开全部', { exact: false }));
    expect(screen.queryAllByRole('option').length).toBeGreaterThanOrEqual(12);
  });
});
