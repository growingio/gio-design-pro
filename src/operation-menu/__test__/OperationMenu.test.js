import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { options } from './data';
import OperationMenu from '../OperationMenu';

describe('OperationMenu', () => {
  it('test operation-menu', () => {
    const onClickMock = jest.fn();
    const wrapper = render(<OperationMenu options={options} onClick={onClickMock} />);

    expect(wrapper).toMatchSnapshot();
    expect(screen.queryByText('修改站点角色')).toBeNull();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('修改站点角色')).toBeTruthy();

    fireEvent.click(screen.getByText('修改站点角色'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
