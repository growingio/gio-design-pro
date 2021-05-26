/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PagePicker from '../components/page-picker';
import { AppType, PageInfo } from '../types';
// import { mount, shallow, render } from 'enzyme';
import { pageInfo, definedPages } from './pagePicker.data';
import { TagElement } from '../TagElement';
import { matchQuery } from '../utils';

const searchPageRule1 = (page: PageInfo, tag: TagElement): boolean => {
  const tagDef = tag.definition as any;
  return (
    tag.docType === 'page' &&
    page.domain === tagDef.domain &&
    ((!page.path && !tagDef.path) || page.path === tagDef.path) &&
    matchQuery(page.query as any, tagDef.query, true)
  );
};
const currentPageTags = definedPages.filter((v) => searchPageRule1(pageInfo, v));

jest.useFakeTimers();
describe('PagePicker', () => {
  const defaultProps = {
    currentPageTags,
    dataSource: definedPages,
  };
  it('render PagePicker can click define new page', async () => {
    const handleChange = jest.fn();
    const handleActionButtonClick = jest.fn();
    const handleSearch = jest.fn();
    const handleSelect = jest.fn();
    const { container } = render(
      <PagePicker
        {...defaultProps}
        value={definedPages[0]}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onChange={handleChange}
        actionButton={{ onClick: handleActionButtonClick }}
      />
    );
    // 点击显示下啦选择列表
    expect(screen.queryByPlaceholderText('请选择所属页面')).toBeTruthy();
    await act(async () => {
      fireEvent.mouseOver(screen.queryByPlaceholderText('请选择所属页面'));
    });
    expect(container.querySelector('.gio-input--focus')).toBeTruthy();
    await act(async () => {
      fireEvent.mouseOut(screen.queryByPlaceholderText('请选择所属页面'));
    });
    expect(container.querySelector('.gio-input--focus')).toBeNull();

    await act(async () => {
      fireEvent.focus(screen.queryByPlaceholderText('请选择所属页面'));
    });
    expect(container.querySelector('.gio-input--focus')).toBeTruthy();
    await act(async () => {
      fireEvent.blur(screen.queryByPlaceholderText('请选择所属页面'));
    });
    expect(container.querySelector('.gio-input--focus')).toBeNull();

    await act(async () => {
      fireEvent.click(screen.queryByPlaceholderText('请选择所属页面'));
      jest.runAllTimers();
    });
    // 可以点击 定义新页面按钮
    expect(screen.getByText('定义新页面')).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByText('定义新页面'));
      jest.runAllTimers();
    });
    expect(handleActionButtonClick).toHaveBeenCalled();
  });
  it('render PagePicker can search and select ', async () => {
    const handleChange = jest.fn();
    const handleActionButtonClick = jest.fn();
    const handleSearch = jest.fn();
    const handleSelect = jest.fn();
    render(
      <PagePicker
        {...defaultProps}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onChange={handleChange}
        actionButton={{ onClick: handleActionButtonClick }}
      />
    );

    // 展开下啦选择
    await act(async () => {
      fireEvent.click(screen.queryByPlaceholderText('请选择所属页面'));
      jest.runAllTimers();
    });
    expect(screen.queryAllByRole('option').length).toBe(definedPages.length);

    // 可以搜索
    await act(async () => {
      fireEvent.change(screen.queryByPlaceholderText('搜索页面名称'), { target: { value: 'page1' } });
    });
    expect(screen.queryAllByRole('option').length).toBeGreaterThan(0);
    expect(handleSearch).toHaveBeenCalled();
    // 点击选择
    await act(async () => {
      fireEvent.click(screen.queryByText(/page1/));
    });
    expect(handleSelect).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });
});
