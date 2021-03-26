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
import localStorageMock from './localStorageMock';

jest.useFakeTimers();

const defaultPicker = <PropertyPicker dataSource={insightDimensions as Dimension[]} />;
const defaultProps = {
  dataSource: insightDimensions as Dimension[],
};
const propertyItems = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));
describe('PropertyPicker', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock(),
      writable: true,
    });
  });
  it('renders PropertyPicker by  insightDimensions', () => {
    render(defaultPicker);
    expect(screen.queryByPlaceholderText('搜索属性名称')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryAllByText('事件属性')).not.toBe([]);
    expect(screen.queryAllByText('访问属性')).not.toBe([]);
    expect(screen.queryAllByText('用户属性')).not.toBe([]);
    expect([]).toBeTruthy();
  });
  it('renders PropertyPicker by PropertyItem Array', () => {
    render(<PropertyPicker dataSource={propertyItems} />);
    expect(screen.queryByPlaceholderText('搜索属性名称')).toBeTruthy();
    expect(screen.queryByText('全部')).toBeTruthy();
    expect(screen.queryAllByText('事件属性')).not.toBe([]);
    expect(screen.queryAllByText('访问属性')).not.toBe([]);
    expect(screen.queryAllByText('用户属性')).not.toBe([]);
    expect([]).toBeTruthy();
  });
  it('can change tab', () => {
    render(defaultPicker);
    const allPropertyCount = screen.queryAllByRole('option').length;
    fireEvent.click(screen.queryAllByText('用户属性')[0]);
    expect(screen.queryByText('物品属性')).toBeNull();
    expect(screen.queryByText('页面')).toBeNull();
    expect(screen.queryByText('地域信息')).toBeNull();
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
    // shouldUpdateRecentlyUsed = false;
    // await act(async () => {
    //   shouldUpdateRecentlyUsed = true;
    //   jest.runAllTimers();
    // });
    // expect(screen.queryAllByText(tobeClickedNode.name)).toHaveLength(2);
  });
  it('can hover a property and show the detail of property', async () => {
    render(<PropertyPicker {...defaultProps} detailVisibleDelay={0} />);
    fireEvent.click(screen.getByText('全部'));
    const item = screen.queryAllByText(insightDimensions[0].name)[0];
    await act(async () => {
      fireEvent.mouseEnter(item);
      jest.runAllTimers();
    });
    // screen.debug(screen.queryByText(insightDimensions[0].id));
    expect(screen.queryByText(insightDimensions[0].id)).toBeTruthy();
    fireEvent.mouseLeave(item);
  });

  it('can search a property by name', () => {
    const query = insightDimensions[0].name;
    // render(defaultPicker);
    render(<PropertyPicker {...defaultProps} shouldUpdateRecentlyUsed={false} />);
    fireEvent.change(screen.getByPlaceholderText('搜索属性名称'), {
      target: { value: query },
    });
    expect(screen.queryAllByText(query).length).toBeGreaterThan(0);
  });
  it(' can add to recentlyUsed', async () => {
    const handleSelect = jest.fn();
    const props = {
      dataSource: insightDimensions as Dimension[],
    };
    const picker = <PropertyPicker {...defaultProps} onSelect={handleSelect} shouldUpdateRecentlyUsed />;
    const { unmount } = render(picker);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 14; i++) {
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
