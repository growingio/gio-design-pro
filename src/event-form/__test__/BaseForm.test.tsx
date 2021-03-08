/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form, Input } from '@gio-design/components';
import BaseForm from '../BaseForm';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('BaseForm', () => {
  it('can render item and default submit button,', async () => {
    render(
      <BaseForm
        initialValues={{ name: 'username' }}
        contentRender={(items, submitter) => (
          <>
            {items}
            {submitter}
          </>
        )}
      >
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
      </BaseForm>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('提 交'));
      jest.runAllTimers();
    });
    expect(screen.queryByText('名称')).toBeTruthy();
    expect(screen.getByDisplayValue('username')).toBeTruthy();
  });
  it('can click submit button and  call onFinish,', async () => {
    const handleFinish = jest.fn(async (value: any) => {
      console.log(value);
    });
    render(
      <BaseForm
        onFinish={handleFinish}
        initialValues={{ name: 'username' }}
        contentRender={(items, submitter) => (
          <>
            {items}
            {submitter}
          </>
        )}
      >
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
      </BaseForm>
    );
    await act(async () => {
      fireEvent.click(screen.getByText('提 交'));
      jest.runAllTimers();
    });

    expect(handleFinish).toHaveBeenLastCalledWith({
      name: 'username',
    });
    expect(handleFinish).toHaveBeenCalledTimes(1);

    expect(screen.queryByText('名称')).toBeTruthy();
    expect(screen.getByDisplayValue('username')).toBeTruthy();
  });
  it('should submit when pressing enter', async () => {
    const handleFinish = jest.fn(async (value: any) => {
      console.log(value);
    });
    const { container } = render(
      <BaseForm
        onFinish={handleFinish}
        initialValues={{ name: 'username' }}
        contentRender={(items, submitter) => (
          <>
            {items}
            {submitter}
          </>
        )}
      >
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
      </BaseForm>
    );
    // console.log(container.querySelector('#name'));
    await act(async () => {
      const input = container.querySelector('#name') as HTMLInputElement;
      input.focus();
      fireEvent.keyPress(container.querySelector('#name'), { key: 'Enter', keyCode: 13 });
      jest.runAllTimers();
    });
    expect(handleFinish).toHaveBeenCalledTimes(1);
  });
});
