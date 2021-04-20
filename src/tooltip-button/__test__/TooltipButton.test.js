import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TooltipButton from '../index';

describe('Testing tooltip button', () => {
  it('normal', () => {
    const onClickMock = jest.fn();
    render(<TooltipButton onClick={onClickMock}>添加</TooltipButton>);
    fireEvent.click(screen.getByText('添 加'));
    expect(onClickMock).toBeCalled();
  });

  it('disabled', () => {
    const onClickMock = jest.fn();
    render(
      <TooltipButton disabled tooltipProps={{ title: '无权限' }} onClick={onClickMock}>
        添加
      </TooltipButton>
    );
    fireEvent.click(screen.getByText('添 加'));
    expect(onClickMock).not.toBeCalled();
  });
});
