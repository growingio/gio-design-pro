import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import GroupList from '../GroupList';
import { withSelectKey, getGroupName } from '../helper';
import { events } from './data';
import { EventData } from '../interfaces';
import TypeIcon from '../TypeIcon';

jest.useFakeTimers();
const customEvents = withSelectKey(events.filter((e) => e.type === 'custom').slice(0, 15) as unknown as EventData[]);
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
  it('render list by custom sort function', async () => {
    const groupdata = {
      prepared: [
        {
          id: 'pv',
          name: '页面浏览量',
          description: '用户实际浏览过的网页数量，简称 PV',
          instruction: '',
          platforms: ['all'],
          selectKey: '-pv',
          groups: ['prepared'],
          type: 'prepared',
        },
      ],
      simple: [
        {
          id: 'WlGkX4Da',
          name: '1217定义元素圈选',
          type: 'simple',
          action: 'clck',
          elementId: 'WlGkX4Da',
          valueType: '',
          platforms: ['web'],
          favorites: false,
          __typename: 'Measurable',
          selectKey: 'simple-WlGkX4Da',
          groups: ['unknown'],
        },
      ],
      custom: [
        {
          id: 'oNGzwEDg',
          name: '按钮点击测试',
          type: 'custom',
          elementId: '',
          valueType: 'counter',
          platforms: ['all'],
          favorites: false,
          __typename: 'Measurable',
          selectKey: 'custom-oNGzwEDg',
        },
      ],
    };
    const sortMap: { [key: string]: number } = {
      custom: 1,
      simple: 2,
      prepared: 3,
    };
    const { container } = render(
      <GroupList
        groupSort={(a: any, b: any) => (sortMap[a] || 0) - (sortMap[b] || 0)}
        getGroupName={getGroupName}
        getTypeIcon={getTypeIcon}
        dataSource={{ dataList: groupdata, select: [] }}
      />
    );

    expect(container.querySelectorAll('.gio-list__item-group__title')).toMatchSnapshot();
  });
});
