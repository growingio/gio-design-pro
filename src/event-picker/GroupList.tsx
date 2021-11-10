/* eslint-disable react/no-array-index-key */
import { isFunction, keys } from 'lodash';
import React, { useCallback, useMemo, useContext } from 'react';
import { Link } from '@gio-design/components';
import classNames from 'classnames';
import { useLocale, DesignContext } from '@gio-design/utils';
import { EventData, EventPickerProps } from './interfaces';
import List from '../list';
import Group from './Group';
import { GroupItemsProps } from './GroupListItemProps';
import CustomItem from './CustomItem';
import defaultLocale from './locales/zh-CN';
// 类型与名称映射
// export const nameMap: { [key: string]: string } = {
//   history: '最近使用',
//   custom: '埋点事件',
//   simple: '无埋点事件',
//   prepared: '预置计算指标',
//   complex: '自定义计算指标',
//   merged: '合成事件',
// };
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
  /**
   * 是否显示preview 弹出面板
   */
  showPreview?: boolean;
  getGroupName: EventPickerProps['getGroupName'];
  getTypeIcon: EventPickerProps['getTypeIcon'];
  /**
   * 分组的排序方法
   */
  groupSort?: EventPickerProps['groupSort'];
}
const GroupList = (props: Props) => {
  const {
    dataSource: { history = [], dataList, select = [] },
    value = [],
    multiple,
    keyword,
    getGroupName,
    onDeselectAll,
    getTypeIcon,
    groupSort,
    ...rest
  } = props;

  const { locale: { code = 'zh-CN' } = { code: 'zh-CN' } } = useContext(DesignContext);
  const locale = useLocale('EventPicker');
  const { notKnown, rencentUse, clearAllText } = { ...defaultLocale, ...locale } as any;

  const getGroupNameInner = (nodes: EventData[], type: string) => {
    const name = getGroupName?.(type, code) || notKnown;
    return `${name}(${nodes.length})`;
  };
  const handleCheckboxChange = (node: EventData, checked: boolean) => {
    rest.onCheckboxChange?.(node, checked);
  };
  const handleItemClick = (node: EventData) => {
    rest.onClick?.(node);
  };
  const listItems = (items: EventData[], selectValue: string[], keyPrefix = '') =>
    items.map((d: EventData) => {
      const data = (d || {}) as EventData;
      const isSelect = selectValue.includes(data.selectKey || '');
      const listNode = (
        <CustomItem
          {...rest}
          getTypeIcon={getTypeIcon}
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
          showPreview={rest.showPreview}
          onShowEventChart={rest.onShowEventChart}
        />
      );
      return listNode;
    });
  /**
   * 最近使用分组列表，只展示 没有选中状态
   */
  const renderRecentlyNodes = useMemo(
    () =>
      history?.length > 0 && (
        <React.Fragment key="historyNodes">
          <Group groupKey="history" key="exp-group-history" title={rencentUse}>
            {listItems(history, [], 'history')}
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
                <Link // eslint-disable-line
                  className="clear-button"
                  component="span"
                  onClick={() => handleClearAll()}
                >
                  {clearAllText}
                </Link>
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
  const orderWeight: { [key: string]: number } = {
    prepared: 90,
    preparedComplex: 80,
    custom: 70,
    simple: 60,
    complex: 50,
  };
  const orderSort = isFunction(groupSort)
    ? groupSort
    : (a: any, b: any) => (orderWeight[b] || 0) - (orderWeight[a] || 0);
  const groupDataNodes = keys(dataList)
    .sort(orderSort)
    .map((key, index) => {
      const items = dataList[key] || [];
      // getListItems(groupData[key]);
      const groupName = getGroupNameInner(items, key);
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
