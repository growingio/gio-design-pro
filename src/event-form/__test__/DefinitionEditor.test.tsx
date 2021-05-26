/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form, Input } from '@gio-design/components';
import DefinitionEditor from '../components/definition-condition/DefinitionEditor';
import { AppType } from '../types';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('DefinitionEditor', () => {
  it('render DefinitionEditor', async () => {
    const handleChange = jest.fn();
    const limit = {
      contentChecked: true,
      content: '限定内容',
      index: '1',
      indexChecked: true,
      hrefChecked: true,
      href: '/link',
    };
    const { container } = render(<DefinitionEditor value={limit} onChange={handleChange} />);
    expect(screen.queryByText('元素内容')).toBeTruthy();
    expect(screen.queryByText(/元素位置第/)).toBeTruthy();
    expect(screen.queryByText('跳转链接')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.queryByText(/元素位置第/).parentElement);
    });
    expect(handleChange).toHaveBeenLastCalledWith({
      contentChecked: true,
      content: '限定内容',
      index: '1',
      indexChecked: false,
      hrefChecked: true,
      href: '/link',
    });
    await act(async () => {
      fireEvent.click(screen.queryByText(/跳转链接/).parentElement);
    });
    await act(async () => {
      fireEvent.click(screen.queryByText(/元素内容/).parentElement);
    });
    expect(handleChange).toHaveBeenLastCalledWith({
      contentChecked: false,
      content: '限定内容',
      index: '1',
      indexChecked: false,
      hrefChecked: false,
      href: '/link',
    });
    await act(async () => {
      fireEvent.click(screen.queryByText(/跳转链接/).parentElement);
    });
    await act(async () => {
      fireEvent.click(screen.queryByText(/元素内容/).parentElement);
    });
    await act(async () => {
      fireEvent.mouseOver(screen.queryByText('元素内容'));
    });
    expect(container.querySelector('.action-btn')).toBeTruthy();
    await act(async () => {
      fireEvent.click(container.querySelector('.action-btn'));
    });
    expect(screen.queryByText('编辑元素内容')).toBeTruthy();
    await act(async () => {
      fireEvent.change(screen.queryByPlaceholderText('请填写元素内容'), { target: { value: '限定内容2' } });
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.click(screen.queryByText('保 存'));
      jest.runAllTimers();
    });
    expect(handleChange).toHaveBeenLastCalledWith({
      contentChecked: true,
      content: '限定内容2',
      index: '1',
      indexChecked: false,
      hrefChecked: true,
      href: '/link',
    });
    expect(screen.queryByText('编辑元素内容')).toBeNull();
    await act(async () => {
      fireEvent.mouseLeave(screen.queryByText('元素内容'));
    });
    expect(container.querySelector('.action-btn')).toBeNull();

    await act(async () => {
      fireEvent.mouseOver(screen.queryByText('跳转链接'));
    });
    expect(container.querySelector('.action-btn')).toBeTruthy();
    await act(async () => {
      fireEvent.click(container.querySelector('.action-btn'));
    });
    expect(screen.queryByText('编辑跳转链接')).toBeTruthy();
    await act(async () => {
      fireEvent.change(screen.queryByPlaceholderText('请填写跳转链接'), { target: { value: '/index/link' } });
      fireEvent.click(screen.queryByText('保 存'));
      jest.runAllTimers();
    });
    expect(handleChange).toHaveBeenLastCalledWith({
      contentChecked: true,
      content: '限定内容2',
      index: '1',
      indexChecked: false,
      hrefChecked: true,
      href: '/index/link',
    });
  });
  it('render DefinitionEditor and no change value', async () => {
    const handleChange = jest.fn();
    const limit = {
      contentChecked: true,
      content: '限定内容',
      index: '1',
      indexChecked: true,
      hrefChecked: true,
      href: '/link',
    };
    const { container } = render(<DefinitionEditor value={limit} isNative onChange={handleChange} />);
    expect(screen.queryByText('元素内容')).toBeTruthy();
    expect(screen.queryByText(/元素位置第2/)).toBeTruthy();
    expect(screen.queryByText('跳转链接')).toBeTruthy();
    await act(async () => {
      fireEvent.mouseOver(screen.queryByText('元素内容'));
    });
    expect(container.querySelector('.action-btn')).toBeTruthy();
    await act(async () => {
      fireEvent.click(container.querySelector('.action-btn'));
    });
    await act(async () => {
      fireEvent.click(screen.queryByText('取 消'));
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.mouseLeave(screen.queryByText('元素内容'));
    });

    await act(async () => {
      fireEvent.mouseOver(screen.queryByText('跳转链接'));
    });
    expect(container.querySelector('.action-btn')).toBeTruthy();
    await act(async () => {
      fireEvent.click(container.querySelector('.action-btn'));
    });
    await act(async () => {
      fireEvent.click(screen.queryByText('取 消'));
      jest.runAllTimers();
    });
    await act(async () => {
      fireEvent.mouseLeave(screen.queryByText('跳转链接'));
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      contentChecked: true,
      content: '限定内容',
      index: '1',
      indexChecked: true,
      hrefChecked: true,
      href: '/link',
    });
  });
});
