import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPicker from '../PropertyPicker';
import { insightDimensions } from './data';
import { dimensionToPropertyItem, getShortPinyin } from '../util';
import IconRender from '../PropertyValueIconRender';

jest.useFakeTimers();

const defaultPicker = <PropertyPicker dataSource={insightDimensions} />;
const defaultProps = {
  dataSource: insightDimensions,
};

describe('PropertyPicker', () => {
  it('renders PropertyPicker by  insightDimensions', () => {
    render(defaultPicker);
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

  it('can select a property', () => {
    const handleSelect = jest.fn();
    const tobeClickedNode = dimensionToPropertyItem(insightDimensions[0]);
    tobeClickedNode.disabled = false;
    tobeClickedNode.itemIcon = () => IconRender(tobeClickedNode.groupId);
    tobeClickedNode.pinyinName = getShortPinyin(tobeClickedNode.label ?? '');
    render(<PropertyPicker {...defaultProps} onSelect={handleSelect} />);

    fireEvent.click(screen.getByText(tobeClickedNode.label));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByText(tobeClickedNode.name)).toHaveLength(1);
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
    fireEvent.change(screen.getByPlaceholderText('搜索属性名称'), { target: { value: query } });
    expect(screen.queryAllByText(query).length).toBeGreaterThan(0);
  });
});
