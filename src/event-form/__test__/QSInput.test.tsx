/* eslint-disable no-console */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Form } from '@gio-design/components';
import QSInput from '../components/QSInput';
import BaseForm from '../BaseForm';
// import { mount, shallow, render } from 'enzyme';

jest.useFakeTimers();

describe('QSInput', () => {
  it('render QSInput', async () => {
    const handleChange = jest.fn();
    // const defaultValue = [{ key: 'q1', value: '1' }];
    const defaultValue = {
      definition: {
        query: [
          { key: 'name', value: 'hello' },
          { key: 'a', value: '3' },
        ],
      },
    };

    const renderer = (
      <BaseForm initialValues={defaultValue} onValuesChange={(v, av) => handleChange(av)}>
        <Form.Item label="查询条件">
          <div className="query-input">
            <QSInput value={defaultValue.definition.query} />
          </div>
        </Form.Item>
      </BaseForm>
    );
    // const { container } = render(renderer);
    render(renderer);
    expect(screen.queryAllByPlaceholderText('请输入参数')).toHaveLength(2);
    expect(screen.queryAllByPlaceholderText('请输入参数值')).toHaveLength(2);

    expect(screen.queryByText('添加查询条件')).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.queryByText('添加查询条件'));
    });
    expect(screen.queryAllByPlaceholderText('请输入参数')).toHaveLength(3);
    expect(screen.queryAllByPlaceholderText('请输入参数值')).toHaveLength(3);
    expect(handleChange).toHaveBeenCalledTimes(1);
    await act(async () => {
      fireEvent.focus(screen.queryAllByPlaceholderText('请输入参数')[2]);
      fireEvent.change(screen.queryAllByPlaceholderText('请输入参数')[2], { target: { value: 'a' } });
      fireEvent.blur(screen.queryAllByPlaceholderText('请输入参数')[2]);
      jest.runOnlyPendingTimers();
      // fireEvent.change(screen.queryAllByPlaceholderText('请输入参数值')[2], { target: { value: '2' } });
    });
    // expect(screen.queryByText('参数不能重复')).toBeTruthy();
    // expect(container).toMatchSnapshot();
    await act(async () => {
      fireEvent.change(screen.queryAllByPlaceholderText('请输入参数')[2], { target: { value: 'b' } });
      fireEvent.change(screen.queryAllByPlaceholderText('请输入参数值')[2], { target: { value: '2' } });
    });
    await act(async () => {
      fireEvent.click(screen.queryAllByLabelText('plus-outlined')[0]);
    });
    // expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenLastCalledWith({
      definition: {
        query: [
          { key: 'a', value: '3' },
          { key: 'b', value: '2' },
        ],
      },
    });
  });
});
