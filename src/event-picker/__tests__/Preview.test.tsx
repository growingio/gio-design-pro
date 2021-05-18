import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import Preview from '../preview';
import { prepared, simple, complex, custom, custom2 } from './eventDatas';

jest.useFakeTimers();

describe('<Preview/> test', () => {
  const onShowEventChart = jest.fn((data) => (
    <div data-testid="gio-chart">
      giochart<div>{data.id}</div>
    </div>
  ));
  it('render Preview of type custom', async () => {
    const { container } = render(<Preview dataSource={custom} onShowEventChart={onShowEventChart} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    expect(container.querySelector('.custom')).toBeTruthy();
    expect(screen.getByTestId('gio-chart')).toBeTruthy();

    const { container: container2 } = render(<Preview dataSource={custom2} onShowEventChart={onShowEventChart} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    expect(container2.querySelector('.item-models')).toBeTruthy();
  });
  it('render Preview of type simple', async () => {
    const { container } = render(<Preview dataSource={simple} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    expect(container.querySelector('.auto-track')).toBeTruthy();
  });
  it('render Preview of complex', async () => {
    const { container } = render(<Preview dataSource={complex} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    expect(container.querySelector('.complex')).toBeTruthy();
  });

  it('render Preview of prepared', async () => {
    const { container } = render(<Preview dataSource={prepared} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    expect(container.querySelector('.custom')).toBeTruthy();
  });
  it('render Preview content by previewCustomRender function ', async () => {
    const previewCustomRender = jest.fn((data) => (
      <div className="custom-render-wrapper">
        <div>{data.name}</div>
        <div>自定义渲染 previewCustomRender</div>
      </div>
    ));
    const { container } = render(<Preview dataSource={custom} previewCustomRender={previewCustomRender} />);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(container.querySelector('.custom-render-wrapper')).toBeTruthy();
    expect(screen.getByText(/自定义渲染/)).toBeTruthy();
  });
});
