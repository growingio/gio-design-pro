/* eslint-disable react/no-array-index-key */
import { keys } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { Button } from '@gio-design/components';
import { EventData } from './interfaces';
import List from '../list';
import Group from './Group';
import GetGroupItemsProps, { GroupItemsProps } from './GetGroupItemsProps';
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
}
const GroupList = (props: Props) => {
  const {
    dataSource: { history = [], dataList, select = [] },
    value = [],
    onDeselectAll,
    ...rest
  } = props;

  const getGroupName = (nodes: EventData[], type: string) => {
    const name = nameMap[type] || '未知类型';
    return `${name}(${nodes.length})`;
  };
  const renderRecentlyNodes = useMemo(
    () =>
      history?.length > 0 && (
        <React.Fragment key="historyNodes">
          <Group
            groupKey="history"
            key="exp-group-history"
            title="最近使用"
            items={GetGroupItemsProps({ ...rest, dataSource: history, keyPrefix: 'history' })}
          />
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
                <Button className="clear-button" size="small" type="text" onClick={() => handleClearAll()}>
                  清空全部已选
                </Button>
              </div>
            }
            items={GetGroupItemsProps({ ...rest, dataSource: select, value, keyPrefix: 'selected' })}
          />
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
        <Group
          key={`exp-group-${key}`}
          groupKey={`${key}`}
          title={groupName}
          items={GetGroupItemsProps({ ...rest, value, dataSource: items, keyPrefix: '' })}
        />
      </React.Fragment>
    );
  });

  return (
    <List>
      {rest.multiple && renderSelectedDataNodes()}
      {!rest.multiple && renderRecentlyNodes}
      {groupDataNodes}
    </List>
  );
};
export default GroupList;
