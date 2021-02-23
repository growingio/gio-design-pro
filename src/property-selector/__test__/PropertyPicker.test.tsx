import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPicker from '../PropertyPicker';
import { insightDimensions } from './data';
import { dimensionToPropertyItem } from '../util';

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
    expect(screen.queryByText('事件属性')).toBeTruthy();
    expect(screen.queryByText('访问属性')).toBeTruthy();
    expect(screen.queryByText('用户属性')).toBeTruthy();
  });

  it('can change tab', () => {
    render(defaultPicker);
    const allPropertyCount = screen.queryAllByRole('option').length;
    fireEvent.click(screen.getByText('用户属性'));
    expect(screen.queryByText('物品属性')).toBeNull();
    expect(screen.queryByText('页面')).toBeNull();
    expect(screen.queryByText('地域信息')).toBeNull();
    const userPropertyCount = screen.queryAllByRole('option').length;
    expect(allPropertyCount).toBeGreaterThanOrEqual(userPropertyCount);
  });

  it('can select a property', () => {
    const handleSelect = jest.fn();
    const tobeClickedNode = dimensionToPropertyItem(insightDimensions[0]);
    render(<PropertyPicker {...defaultProps} onSelect={handleSelect} />);

    fireEvent.click(screen.getByText(tobeClickedNode.label));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(tobeClickedNode);
    expect(screen.queryByText('最近使用')).toBeTruthy();
    expect(screen.queryAllByText(tobeClickedNode.name)).toHaveLength(2);
  });

  it('can hover a property and show the detail of property', () => {
    render(<PropertyPicker {...defaultProps} detailVisibleDelay={0} />);
    fireEvent.click(screen.getByText('全部'));
    const item = screen.getByText(insightDimensions[0].name);
    act(() => {
      fireEvent.mouseEnter(item);
      jest.runAllTimers();
    });

    expect(screen.queryByText(insightDimensions[0].id)).toBeTruthy();
    fireEvent.mouseLeave(item);
    expect(screen.queryByText(insightDimensions[0].id)).toBeNull();
  });

  it('can search a property by name', () => {
    const query = insightDimensions[0].name;
    render(defaultPicker);
    fireEvent.change(screen.getByPlaceholderText('搜索属性名称'), { target: { value: query } });
    expect(screen.queryAllByText(query)).toHaveLength(1);
  });
});
