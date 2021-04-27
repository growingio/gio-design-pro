/* eslint-disable react/no-array-index-key */
import { keys } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { Button } from '@gio-design/components';
import classNames from 'classnames';
import { EventData } from './interfaces';
import List from '../list';
import Group from './Group';
import { GroupItemsProps } from './ListItem';
import CustomItem from './CustomItem';
// 类型与名称映射
export const nameMap: { [key: string]: string } = {
  history: '最近使用',
  custom: '埋点事件',
  simple: '无埋点事件',
  prepared: '预置计算指标',
  complex: '自定义计算指标',
  merged: '合成事件',
};
export interface Props extends Omit<GroupItemsProps, 'dataSource' | 'keyPrefix'> {
  dataSource: { history?: EventData[]; dataList: Record<string, EventData[]>; select?: EventData[] };
  // value: string[];
  onDeselectAll?: () => void;
  /**
   * 事件预览中展示图表的回调函数
   */
  onShowEventChart?: (event: EventData) => React.ReactNode;
  /**
   * 事件预览的自定义展示，用于 无埋点事件 详情展示
   */
  previewCustomRender?: (dataSource: EventData) => React.ReactNode;
  /**
   * 获取详情的方法
   */
  fetchDetailData?: (event: EventData) => Promise<EventData>;
}
const GroupList = (props: Props) => {
  const {
    dataSource: { history = [], dataList, select = [] },
    value = [],
    multiple,
    keyword,
    onDeselectAll,
    ...rest
  } = props;

  const getGroupName = (nodes: EventData[], type: string) => {
    const name = nameMap[type] || '未知类型';
    return `${name}(${nodes.length})`;
  };
  const handleCheckboxChange = (node: EventData, checked: boolean) => {
    rest.onCheckboxChange?.(node, checked);
    rest.onClick?.(node);
  };
  const handleItemClick = (node: EventData) => {
    if (!multiple) {
      rest.onClick?.(node);
    }
  };
  const listItems = (items: EventData[], selectValue: string[], keyPrefix = '') =>
    items.map((d: EventData) => {
      const data = (d || {}) as EventData;
      const isSelect = selectValue.includes(data.selectKey || '');
      const listNode = (
        <CustomItem
          dataSource={data}
          keyword={keyword}
          multiple={multiple}
          value={isSelect ? data.selectKey : undefined}
          onCheckboxChange={(node, checked) => {
            handleCheckboxChange(node, checked);
          }}
          disabled={data.disabled}
          ellipsis
          key={['item', keyPrefix, data.type, data.id].join('-')}
          className={classNames({ selected: isSelect && !multiple })}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(_: any) => handleItemClick(data)}
          detailVisibleDelay={rest.detailVisibleDelay}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onMouseEnter={(_) => rest.onMouseEnter?.(data)}
          onMouseLeave={() => rest.onMouseLeave?.()}
        />
      );
      return listNode;
    });
  const renderRecentlyNodes = useMemo(
    () =>
      history?.length > 0 && (
        <React.Fragment key="historyNodes">
          <Group groupKey="history" key="exp-group-history" title="最近使用">
            {listItems(history, value, 'history')}
          </Group>
          <List.Divider key="divider-group-history" />
        </React.Fragment>
      ),
    [history]
  );

  const handleClearAll = () => {
    onDeselectAll?.();
  };
  const renderSelectedDataNodes = useCallback(
    () =>
      select?.length > 0 && (
        <React.Fragment key="selectedNodes">
          <Group
            groupKey="selected"
            key="exp-group-selected"
            title={
              <div>
                <Button className="clear-button" size="small" type="link" onClick={() => handleClearAll()}>
                  清空全部已选
                </Button>
              </div>
            }
          >
            {listItems(select, value, 'selected')}
          </Group>
          <List.Divider key="divider-group-history" />
        </React.Fragment>
      ),
    [select, value]
  );

  // const groupData = useMemo(() => groupBy(dataList, getTabKey ?? 'type'), [dataList]);
  const groupDataNodes = keys(dataList).map((key, index) => {
    const items = dataList[key] || [];
    // getListItems(groupData[key]);
    const groupName = getGroupName(items, key);
    return (
      <React.Fragment key={`groupDataNodes-${index}`}>
        {index > 0 && <List.Divider key={`divider-group-${key}-${index}`} />}
        <Group key={`exp-group-${key}`} groupKey={`${key}`} title={groupName} {...rest}>
          {listItems(items, value)}
        </Group>
      </React.Fragment>
    );
  });

  return (
    <List>
      {multiple && renderSelectedDataNodes()}
      {!multiple && renderRecentlyNodes}
      {groupDataNodes}
    </List>
  );
};
export default GroupList;
