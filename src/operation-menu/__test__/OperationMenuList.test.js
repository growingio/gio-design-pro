import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { options } from './data';
import OperationMenuList from '../OperationMenuList';

describe('OperationMenuList', () => {
  it('test operation-menu list', () => {
    const onClickMock = jest.fn();
    const wrapper = render(<OperationMenuList width={100} options={options} onClick={onClickMock} />);

    expect(wrapper).toMatchSnapshot();
    fireEvent.click(screen.getByText('修改站点角色'));
    expect(onClickMock).toBeCalled();
  });

  it('test operation-menu list without width', () => {
    const wrapper = render(<OperationMenuList options={options} />);

    expect(wrapper).toMatchSnapshot();
  });
});
