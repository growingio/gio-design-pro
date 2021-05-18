import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import CustomItem from '../CustomItem';
import { simple, custom } from './eventDatas';

//
function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
describe('<CustomItem/> test', () => {
  it('render CustomItem', async () => {
    // jest.useFakeTimers();
    const handleItemMouseEnter = jest.fn();
    const handleItemClick = jest.fn();
    const handleCheckboxChange = jest.fn();
    const { container } = render(
      <CustomItem
        multiple
        dataSource={custom}
        onMouseEnter={handleItemMouseEnter}
        onClick={handleItemClick}
        onCheckboxChange={handleCheckboxChange}
        keyword={custom.name.slice(0, 2)}
      />
    );

    await act(async () => {
      fireEvent.mouseEnter(container.firstElementChild);
      await sleep(1);
    });
    act(() => {
      fireEvent.click(container.querySelector('input'));
    });

    expect(handleItemClick).toHaveBeenCalledTimes(1);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
  });
  it('show preview when mouseenter', async () => {
    const fetchDetailData = jest.fn((d) => d);
    const handleItemMouseEnter = jest.fn();
    const handleItemMouseLeave = jest.fn();
    const { container } = render(
      <CustomItem
        multiple
        dataSource={simple}
        onMouseEnter={handleItemMouseEnter}
        onMouseLeave={handleItemMouseLeave}
        detailVisibleDelay={0}
        showPreview
        fetchDetailData={fetchDetailData}
      />
    );

    await act(async () => {
      fireEvent.mouseEnter(container.firstElementChild);
      // jest.runOnlyPendingTimers();
      await sleep(1);
      fireEvent.mouseLeave(container.firstElementChild);
      await sleep(150);
    });
    expect(container.querySelector('.event-preview')).toBeTruthy();
    expect(fetchDetailData).toHaveBeenCalled();
    expect(handleItemMouseEnter).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.event-preview').getAttribute('style')).toBe('display: none;');
  });
});
