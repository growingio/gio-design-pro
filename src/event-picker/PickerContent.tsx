import { useLocalStorage } from '@gio-design/utils';
import { cloneDeep, groupBy, uniq } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefixCls } from '@gio-design/components';
import { EventData } from './interfaces';
import ListPanel from './ListPanel';
import GroupList from './GroupList';
import { GroupListItemEvent } from './GroupListItemProps';
import EmptyPrompt, { EmptyPromptProps } from '../empty-prompt';

/**
 * 本地存储历史记录
 */
const STORE_KEY_PREFIX = '__GIO_EVENT_TARGET_PICK_HISTORY';

interface Props extends GroupListItemEvent {
  /**
   * tab内展示的数据源
   */
  dataSource: EventData[];
  /**
   * 当前的activeTab
   */
  tabKey: string;
  /**
   * 搜索的关键字
   */
  keyword?: string;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 最近使用项的存储key
   */
  historyStoreKey?: string;
  /**
   * 搜索的筛选函数
   */
  filter?: (dataSource: EventData[], kw?: string) => EventData[];
  getTabKey: (event: EventData) => string;
  /**
   * 列表项的排序函数
   */
  sort?: (dataSource: EventData[]) => EventData[];
  /**
   * 刷新最近使用，只有在点选后下次打开时才会更新最近使用
   */
  shouldUpdateRecentlyUsed?: boolean;
  /**
   * 选中的回调
   */
  onSelect?: (values: string[]) => void;
  /**
   * 多选时 取消选择的回调
   */
  onCancel?: () => void;
  /**
   * 选项被点击时的回调
   */
  onClick?: (node: EventData) => void;
  /**
   * 选项的绑定值
   */
  value?: EventData[];
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
  /**
   * 无数据时的展示信息
   */
  emptyPrompt?: EmptyPromptProps;
  footer: React.ReactNode;
}
const PickerContent = (props: Props) => {
  const {
    dataSource: originDataSource,
    tabKey,
    keyword,
    filter,
    historyStoreKey = '_',
    shouldUpdateRecentlyUsed = true,
    multiple = false,
    onMouseEnter,
    onMouseLeave,
    onSelect,
    onCancel,
    onClick,
    sort,
    value = [],
    emptyPrompt,
    footer,
    ...rest
  } = props;

  const valueKeys = useMemo(() => value.map((v) => v?.selectKey || ''), [value]);
  const [select, setSelect] = useState<string[]>(valueKeys);
  const panelRef = useRef();
  const panelBodyCls = usePrefixCls('event-picker-list-panel__body');
  /**
   * 当切换tab时 将滚动条滚动到顶部
   */
  useEffect(() => {
    if (panelRef.current) {
      const panelDom = (panelRef.current as unknown) as HTMLDivElement;
      if (panelDom) {
        const bodyDiv = panelDom.querySelector(`.${panelBodyCls}`);
        if (bodyDiv) {
          bodyDiv.scrollTop = 0;
        }
      }
    }
  }, [tabKey, keyword, originDataSource, shouldUpdateRecentlyUsed]);
  // const [history, setHistory] = useState<EventData[]>([]);
  const [historyInMemo, setHistoryInMemo] = useState<{
    [key: string]: any[];
  }>();
  const [historyStore, setHistoryStore] = useLocalStorage<{
    [key: string]: any[];
  }>(`${STORE_KEY_PREFIX}_${historyStoreKey}`, {
    all: [],
  });
  useEffect(() => {
    if (shouldUpdateRecentlyUsed) {
      // console.log('setRecentlyUsedInMemo on recentlyUsed update');
      setHistoryInMemo(historyStore);
      // 重置选项
      setSelect(valueKeys);
    }
  }, [shouldUpdateRecentlyUsed]);
  /**
   * 点选时 设置最近使用
   * @param item
   */
  function saveHistory(item: EventData) {
    const { selectKey: v } = item;
    const type = tabKey;
    const recent = cloneDeep(historyStore);
    // save by type/scope
    const realScope = type || 'all';
    let scopedRecent = recent[realScope];
    if (!scopedRecent) {
      scopedRecent = [];
    }
    let newScopedRecent = uniq([v, ...scopedRecent]);
    if (newScopedRecent.length > 5) {
      newScopedRecent = newScopedRecent.slice(0, 5);
    }
    const allScopedRecent = recent.all || [];

    let newAllScopedRecent = uniq([v, ...allScopedRecent]);
    if (newAllScopedRecent.length > 5) {
      newAllScopedRecent = newAllScopedRecent.slice(0, 5);
    }
    recent[realScope] = newScopedRecent;
    recent.all = newAllScopedRecent;
    setHistoryStore(recent);
  }
  /**
   * 对数据源进行排序 筛选
   */
  const dataSource = useMemo(() => {
    const filteredData = filter ? filter(originDataSource as EventData[], keyword) : originDataSource;
    const sortedData = sort ? sort(filteredData) : filteredData;
    return sortedData;
  }, [originDataSource, keyword]);

  const history = useMemo(() => {
    if (!multiple) {
      const historyIds: string[] = historyInMemo ? historyInMemo[tabKey] : [];
      return dataSource.filter((d) => (historyIds || []).includes(d.selectKey || ''));
    }
    return [];
  }, [historyInMemo, dataSource]);
  /**
   * 多选时已选中的项不在数据源中展示，
   */
  const groupData = useMemo(() => {
    const source = multiple ? dataSource.filter((d) => !valueKeys.includes(d.selectKey || '')) : dataSource;
    return groupBy(source, 'type') as Record<string, EventData[]>;
  }, [dataSource, valueKeys]);

  /**
   * 多选时取消按钮的回调，将当前新增选项清空
   */
  function handleCancel() {
    setSelect(valueKeys);
    onCancel?.();
  }
  /**
   * 多选时点击确认时的回调
   */
  function handleOk() {
    onSelect?.(select);
  }
  function handleCheckboxChange(node: EventData, checked: boolean) {
    if (checked) {
      setSelect((p) => uniq([...p, node.selectKey || '']));
    } else {
      const idx = select.indexOf(node.selectKey || '');

      if (idx > -1) {
        setSelect((p) => {
          p.splice(idx, 1);
          return p;
        });
      }
    }
  }
  function handleClick(data: EventData) {
    if (!multiple) {
      saveHistory(data);
      setSelect([data.selectKey || data.id]);
      onSelect?.([data.selectKey || data.id]);
    }
    onClick?.(data);
  }
  function handleClearAll() {
    setSelect([]);
  }
  /**
   * 多选时要没有选中项再展示空态
   */
  if ((!multiple && dataSource.length === 0) || (valueKeys.length === 0 && dataSource.length === 0)) {
    return (
      <div style={{ padding: '8px' }}>
        <EmptyPrompt {...(emptyPrompt || {})} />
      </div>
    );
  }
  return (
    <>
      <ListPanel
        ref={panelRef}
        multiple={multiple}
        footer={footer}
        onCancel={() => handleCancel()}
        onOK={() => handleOk()}
      >
        <GroupList
          {...rest}
          dataSource={{
            history,
            dataList: groupData,
            select: value,
          }}
          value={select}
          multiple={multiple}
          onDeselectAll={handleClearAll}
          onCheckboxChange={handleCheckboxChange}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
        />
      </ListPanel>
    </>
  );
};
export default PickerContent;
