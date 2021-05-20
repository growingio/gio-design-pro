import React, { useMemo, useRef, useState } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import * as pinyin from 'pinyin-match';
import classNames from 'classnames';
import { isArray, isEqualWith, isUndefined, orderBy, uniqBy, xorWith } from 'lodash';
import { injectPinyinWith } from '@gio-design/utils';
import { EventData, EventPickerProps, Tab } from './interfaces';
import BasePicker from '../base-picker';

import { getEventType, defaultTabs, withSelectKey } from './helper';
import PickerContent from './PickerContent';
import './style';

export const DefaultKeyMapping = { label: 'name', value: 'id' };

const pinyinMatch = pinyin.default;

const EventPicker = (props: EventPickerProps) => {
  const {
    className,
    style,
    value: initialValue = [],
    // searchBar,
    tabs = defaultTabs,
    showTabAll = true,
    hideTabNav,
    loading = false,
    dataSource: originDataSource = [],
    historyStoreKey = '_',
    shouldUpdate: shouldUpdateRecentlyUsed = true,
    onChange,
    onSelect,
    onClick,
    onCancel,
    detailVisibleDelay = 600,
    getTabKey = getEventType,
    defaultKeyword,
    panelFooter,
    multiple,
    // emptyPrompt,
    onShowEventChart,
    fetchDetailData,
    showPreview = true,
    ...rest
  } = props;
  const [keyword, setKeyword] = useState(defaultKeyword);

  // const [detailVisible, setDetailVisible] = useState(false);
  // const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
  //   setDetailVisible(visible);
  // }, detailVisibleDelay);

  /**
   * tabNav
   */
  const mergedTabs: Tab[] = showTabAll ? [{ value: 'all', label: '全部' }].concat(tabs) : tabs;
  const firstTab = mergedTabs[0]?.value.toString();
  const [activedTab, setActivedTab] = useState(firstTab);

  /**
   * 是否显示tabNav
   */
  const mergedHideTabNav = hideTabNav ?? tabs.length + +showTabAll === 1;

  const navRef = useRef(mergedTabs.map((t) => ({ key: t.value, children: t.label })));
  const formatValue = (source: EventData[] | EventData) => {
    const arr = isArray(source) ? source : [source];
    return withSelectKey(arr);
  };
  const formatedValue = formatValue(initialValue);
  const [value, setValue] = useState<EventData[]>(formatedValue);
  /**
   * 搜索关键字的方法，支持拼音匹配
   * @param input 带匹配的项
   * @param key 匹配的关键字
   */
  // const keywordFilter = (input: string[], key: string[]) => {
  //   if (!input || !key || input.length !== key.length) return true;
  //   let match = false;
  //   match = includes(input.join(''), key.join(''));
  //   if (!match) {
  //     const shortKeys = key.map((k) => k[0]).join('');
  //     const shortInput = input.map((i) => i[0]).join('');
  //     match = includes(shortInput, shortKeys);
  //   }
  //   return match;
  // };

  // const scopedKeywordSearch = (data = [] as EventData[]) => {
  //   // const labelKey = 'name';
  //   const scope = activedTab;
  //   const keys = injectPinyinWith([{ keyword }], 'keyword');
  //   const pinyinKey = keys[0].keywordPinyin as string[];
  //   if (scope === 'all') {
  //     return data.filter((d) => keywordFilter(d.namePinyin as string[], pinyinKey));
  //   }

  //   return data.filter((d) => d.type === scope && keywordFilter(d.namePinyin as string[], pinyinKey));
  // };

  const keywordFilter = (input: string = '', key: string = '') => {
    if (!input || !key) return true;
    return !!pinyinMatch.match(input, key);
  };
  const filterFunc = (data: EventData[], kw: string) => data.filter((d) => keywordFilter(d.name as string, kw));
  // 按照拼音字母排序
  function sort(data: EventData[]): EventData[] {
    return orderBy(data, [(o) => o.type, (o) => ((o.namePinyin as string[]) || []).map((v) => v[0]).join('')]);
  }

  const processedDataSource = useMemo(() => {
    const withSelectedKeyData = withSelectKey(originDataSource || []);
    const dataWithPinyin = injectPinyinWith(withSelectedKeyData, 'name');
    return (dataWithPinyin as unknown) as EventData[];
  }, [originDataSource]);
  /**
   * 列表数据源
   */
  const dataSource = useMemo(() => {
    const filteredData =
      activedTab === 'all' || mergedHideTabNav
        ? processedDataSource
        : processedDataSource.filter((d) => getTabKey(d) === activedTab);
    // const source = isFunction(filter) ? filter(originDataSource) : originDataSource;

    return filteredData;
  }, [activedTab, processedDataSource]);

  function onTabNavChange(key: string) {
    setActivedTab(key);
  }
  const handleSearch = (query: string) => {
    setKeyword(query);
    // debouncedKeyword(query);
  };
  function isEqualEventData(a: EventData, b: EventData) {
    return isEqualWith(a, b, (v, o) => v.selectKey === o.selectKey);
  }
  function handleSelect(selected: string[]) {
    const selectEvent = selected
      .map((k) => processedDataSource.find((d) => d.selectKey === k))
      .filter((v) => !isUndefined(v));
    // const selectEvent = processedDataSource.filter((d) => selected.includes(d.selectKey || ''));
    const newValues = uniqBy([...(selectEvent || [])], 'selectKey') as EventData[];

    const diff = xorWith(newValues, value, isEqualEventData);
    if (diff && diff.length) {
      const retNewVal = multiple ? newValues : newValues[0];
      const retOldVal = multiple ? value : value[0];
      onChange?.(retNewVal, retOldVal);
    }
    setValue(newValues);

    // if (!newValues || newValues.length < 1) {
    //   return;
    // }
    onSelect?.(multiple ? newValues : newValues[0]);
  }
  const handleItemClick = (node: EventData) => {
    onClick?.(node);
  };

  const footer = panelFooter?.(activedTab, dataSource);

  const renderContent = () => (
    <PickerContent
      {...rest}
      historyStoreKey={historyStoreKey}
      shouldUpdate={shouldUpdateRecentlyUsed}
      dataSource={dataSource}
      tabKey={activedTab}
      keyword={keyword}
      multiple={multiple}
      onClick={handleItemClick}
      onSelect={handleSelect}
      filter={filterFunc}
      sort={sort}
      value={formatedValue}
      footer={footer}
      onShowEventChart={onShowEventChart}
      fetchDetailData={fetchDetailData}
      detailVisibleDelay={detailVisibleDelay}
      onCancel={onCancel}
      showPreview={showPreview}
      // onMouseEnter={handleItemMouseEnter}
      // onMouseLeave={handleItemMouseLeave}
    />
  );

  const clsPrifx = usePrefixCls('event-picker');

  const cls = classNames(clsPrifx, className, mergedHideTabNav && 'hide-tab-nav');
  const tabNav = mergedHideTabNav
    ? undefined
    : {
        items: navRef.current,
        onChange: onTabNavChange,
      };
  return (
    <BasePicker
      // {...rest}
      style={style}
      className={cls}
      renderContent={renderContent}
      detailVisible={false}
      // renderDetail={renderDetail}
      loading={loading}
      searchBar={{
        placeholder: '搜索事件或指标名称',
        onSearch: handleSearch,
      }}
      // footer={footer}
      tabNav={tabNav}
    />
  );
};

export default EventPicker;
