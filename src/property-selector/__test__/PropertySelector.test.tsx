import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertySelector from '../PropertySelector';
import { insightDimensions } from './data';
import { dimensionToPropertyItem } from '../util';
import { Dimension } from '../types';
import localStorageMock from './localStorageMock';

const defaultProps = {
  dataSource: insightDimensions as Dimension[],
  borderless: true,
  placeholder: '选择属性',
};
jest.useFakeTimers();
describe('PropertySelector', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock(),
      writable: true,
    });
  });

  it('can be selected', () => {
    const handleSelect = jest.fn();
    const tobeClickedNode = dimensionToPropertyItem(insightDimensions[0] as Dimension);
    render(<PropertySelector {...defaultProps} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('选择属性'));
    act(() => {
      fireEvent.click(screen.getByText(tobeClickedNode.name));
    });

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('选择属性')).toBeNull();
    // expect(handleSelect).toHaveBeenCalledWith(tobeClickedNode);
  });

  it('can not be clicked in disabled state', () => {
    render(<PropertySelector {...defaultProps} disabled />);
    fireEvent.click(screen.getByText('选择属性'));
    expect(screen.queryByText('全部')).toBeNull();
  });
  it('render with  props of placeholder', () => {
    render(<PropertySelector {...defaultProps} placeholder="请选择" />);
    expect(screen.queryByText('请选择')).toBeTruthy();
  });
});
