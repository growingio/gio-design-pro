import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import CustomItem from '../CustomItem';
import { simple, custom } from './eventDatas';
import TypeIcon from '../TypeIcon';

//
function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
describe('<CustomItem/> test', () => {
  const getTypeIcon = (type: string) => <TypeIcon size="14px" className="item-content-icon" type={type || ''} />;
  it('render CustomItem', async () => {
    // jest.useFakeTimers();
    const handleItemMouseEnter = jest.fn();
    const handleItemClick = jest.fn();
    const handleCheckboxChange = jest.fn();
    const { container } = render(
      <CustomItem
        multiple
        getTypeIcon={getTypeIcon}
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
        getTypeIcon={getTypeIcon}
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
      await sleep(152);
    });
    expect(container.querySelector('.event-preview')).toBeTruthy();
    expect(fetchDetailData).toHaveBeenCalled();
    expect(handleItemMouseEnter).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.event-preview').getAttribute('style')).toBe('display: none;');
  });
});
