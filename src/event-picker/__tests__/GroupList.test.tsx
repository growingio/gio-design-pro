import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import GroupList from '../GroupList';
import { withSelectKey, getGroupName } from '../helper';
import { events } from './data';
import { EventData } from '../interfaces';
import TypeIcon from '../TypeIcon';

jest.useFakeTimers();
const customEvents = withSelectKey((events.filter((e) => e.type === 'custom').slice(0, 15) as unknown) as EventData[]);
describe('<GroupList/> test', () => {
  const onShowEventChart = jest.fn((data) => (
    <div data-testid="gio-chart">
      giochart<div>{data.id}</div>
    </div>
  ));
  const getTypeIcon = (type: string) => <TypeIcon size="14px" className="item-content-icon" type={type || ''} />;

  it('render GroupList', async () => {
    render(
      <GroupList
        getGroupName={getGroupName}
        getTypeIcon={getTypeIcon}
        dataSource={{ dataList: { custom: customEvents } }}
        onShowEventChart={onShowEventChart}
      />
    );

    expect(screen.getByText(/展开全部/)).toBeTruthy();
    act(() => {
      fireEvent.click(screen.getByText(/展开全部/));
    });
    expect(screen.getAllByRole('option')).toHaveLength(customEvents.length);
  });
  it('render multiple select GroupList ', async () => {
    const handleCheckboxChange = jest.fn();
    const handleClick = jest.fn();
    render(
      <GroupList
        multiple
        getGroupName={getGroupName}
        getTypeIcon={getTypeIcon}
        dataSource={{ dataList: { custom: customEvents } }}
        onCheckboxChange={handleCheckboxChange}
        onClick={handleClick}
        onShowEventChart={onShowEventChart}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/展开全部/));
    });
    const opts = screen.getAllByRole('option');
    act(() => {
      fireEvent.click(opts[0]);
      fireEvent.click(opts[1]);
    });
    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(2);
  });
  it('trigger mouse event ', async () => {
    const handleItemMouseEnter = jest.fn();
    const handleItemMouseLeave = jest.fn();
    render(
      <GroupList
        getGroupName={getGroupName}
        getTypeIcon={getTypeIcon}
        dataSource={{ dataList: { custom: customEvents } }}
        onMouseEnter={handleItemMouseEnter}
        onMouseLeave={handleItemMouseLeave}
      />
    );

    const opts = screen.getAllByRole('option');
    act(() => {
      fireEvent.mouseEnter(opts[0]);
    });
    act(() => {
      fireEvent.mouseLeave(opts[0]);
    });
    expect(handleItemMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleItemMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('can  deselect all  ', async () => {
    const onDeselectAll = jest.fn();
    const handleCheckboxChange = jest.fn();
    const select = customEvents.slice(0, 2);
    const groupdata = { custom: customEvents.slice(2) };
    render(
      <GroupList
        multiple
        getGroupName={getGroupName}
        getTypeIcon={getTypeIcon}
        dataSource={{ dataList: groupdata, select }}
        onDeselectAll={onDeselectAll}
        onCheckboxChange={handleCheckboxChange}
      />
    );
    act(() => {
      fireEvent.click(screen.getByText('清空全部已选'));
    });

    expect(onDeselectAll).toHaveBeenCalledTimes(1);
  });
});
