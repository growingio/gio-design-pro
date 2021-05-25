/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form, Input } from '@gio-design/components';
import PathInput from '../components/PathInput';
import { AppType } from '../types';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('PathInput', () => {
  it('render PathInput', async () => {
    const handleChange = jest.fn();
    const { container } = render(<PathInput value={{ path: 'index', checked: undefined }} onChange={handleChange} />);
    expect(screen.queryByDisplayValue('/index')).toBeTruthy();
    expect(container.querySelector('div[aria-hidden="true"]')).toBeTruthy();
    await act(async () => {
      fireEvent.change(screen.queryByDisplayValue('/index'), { target: { value: '/index/page1' } });
    });
    expect(handleChange).toHaveBeenCalledWith({ path: '/index/page1', checked: true });
    await act(async () => {
      fireEvent.click(container.querySelector('div[aria-hidden="true"]'));
    });
    expect(handleChange).toHaveBeenCalledWith({ path: '/index/page1', checked: false });
    const { container: container2 } = render(<PathInput value={{ path: '', checked: true }} onChange={handleChange} />);
    expect(container2.querySelector('input[disabled]')).toBeTruthy();
  });
  it('render PathInput appType=MINP', async () => {
    const handleChange = jest.fn();
    // value={{ path: '/index', checked: true }}

    const { container } = render(<PathInput appType={AppType.MINP} onChange={handleChange} />);
    await act(async () => {
      fireEvent.click(container.querySelector('.gio-toggles'));
    });
    await act(async () => {
      fireEvent.change(screen.queryByRole('textbox'), {
        target: { value: '/index/page1' },
      });
      jest.runAllTimers();
    });
    expect(handleChange).toHaveBeenLastCalledWith({ path: 'index/page1', checked: true });
  });
});
