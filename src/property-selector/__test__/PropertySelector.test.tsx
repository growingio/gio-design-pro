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
  it('can select a property', async () => {
    const handleSelect = jest.fn();
    const props = {
      dataSource: insightDimensions as Dimension[],
      borderless: true,
      placeholder: '选择属性',
    };
    // const shouldUpdateRecentlyUsed = true;
    const { container } = render(<PropertySelector {...props} onSelect={handleSelect} />);
    // fireEvent.click(screen.getByText('全部'));
    fireEvent.click(screen.getByText('选择属性'));
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 15; i++) {
      act(() => {
        // for (let i = 0; i < 6; i++) {
        //   fireEvent.click(screen.getByText(props.dataSource[i].name || ''));
        // }
        fireEvent.click(screen.queryAllByText(props.dataSource[i].name)[0]);
      });
      // screen.getByTestId()
      fireEvent.click(container.querySelector('.gio-selector__item') as Element);
    }
    expect(screen.getByText('最近使用')).toBeTruthy();
  });
  it('can not be clicked in disabled state', () => {
    render(<PropertySelector {...defaultProps} disabled />);
    fireEvent.click(screen.getByText('选择属性'));
    expect(screen.queryByText('全部')).toBeNull();
  });
});
