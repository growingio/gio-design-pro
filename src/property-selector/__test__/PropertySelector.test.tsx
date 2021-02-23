import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertySelector from '../PropertySelector';
import { insightDimensions } from './data';
import { dimensionToPropertyItem } from '../util';

const defaultProps = {
  dataSource: insightDimensions,
  borderless: true,
  placeholder: '选择属性',
};

describe('PropertySelector', () => {
  it('can be selected', () => {
    const handleSelect = jest.fn();
    const tobeClickedNode = dimensionToPropertyItem(insightDimensions[0]);
    render(<PropertySelector {...defaultProps} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('选择属性'));
    act(() => {
      fireEvent.click(screen.getByText(tobeClickedNode.name));
    });

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(tobeClickedNode);
  });

  it('can not be clicked in disabled state', () => {
    render(<PropertySelector {...defaultProps} disabled />);
    fireEvent.click(screen.getByText('选择属性'));
    expect(screen.queryByText('全部')).toBeNull();
  });
});
