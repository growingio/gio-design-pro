import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import * as pinyin from 'pinyin-match';
import classNames from 'classnames';
import { isArray, isEqualWith, isUndefined, orderBy, uniqBy, xorWith } from 'lodash';
import { injectPinyinWith } from '@gio-design/utils';
import { EventData, EventPickerProps, Tab } from './interfaces';
import { useDebounce } from '../hooks';
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
    shouldUpdateRecentlyUsed = true,
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

  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(keyword, 300);
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
  const formatValue = (source: EventData[] | EventData | undefined) => {
    if (source) {
      const arr = isArray(source) ? source : [source];
      return withSelectKey(arr);
    }
    return [];
  };
  const formatedValue = formatValue(initialValue);
  const [value, setValue] = useState<EventData[]>(formatedValue);
  // useEffect(() => {
  //   setValue(formatedValue);
  // }, [formatedValue]);

  // useEffect(() => {
  //   /**
  //    * 设置属性类型tab，如果传入的列表没有对应的类型 不显示该tab
  //    */
  //   const types = uniq(dataList.map(getEventType));
  //   const tabs = mergedTabs.filter((t) => types.indexOf(t.value) > -1);
  //   navRef.current = tabs.map((t) => ({ key: t.value, children: t.label }));
  // }, []);
  // const filteredDataSource = useMemo(() => {
  //   const source = isFunction(filter) ? filter(originDataSource) : originDataSource;
  //   const target = injectPinyinWith(source, 'name');
  //   return target;
  // }, [originDataSource]);
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
    return !!pinyinMatch?.match(input, key);
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
  useEffect(() => {}, [activedTab]);
  const handleSearch = (query: string) => {
    setKeyword(query);
    setDebouncedKeyword(query);
  };
  function isEqualEventData(a: EventData, b: EventData) {
    return isEqualWith(a, b, (v, o) => v.selectKey === o.selectKey);
  }
  function handleSelect(selected: string[]) {
    const selectEvent = selected
      .map((k) => processedDataSource.find((d) => d.selectKey === k))
      .filter((v) => !isUndefined(v));
    // const selectEvent = processedDataSource.filter((d) => selected.includes(d.selectKey || ''));
    const newValues = uniqBy([...(selectEvent || [])], 'selectKey');

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

  // const [hoverdNodeValue, setHoveredNodeValue] = useState<EventData | undefined>();
  // const handleItemMouseEnter = (data: EventData) => {
  //   setHoveredNodeValue(data);
  //   debounceSetDetailVisible(true);
  // };
  // const handleItemMouseLeave = () => {
  //   setHoveredNodeValue(undefined);
  //   debounceSetDetailVisible.cancel();
  //   setDetailVisible(false);
  //   console.log('handleItemMouseLeave');
  // };
  // const renderDetail = () =>
  //   hoverdNodeValue && (
  //     <Preview dataSource={hoverdNodeValue} chart={onShowEventChart} fetchData={async (data) => data} />
  //   );
  const footer = panelFooter?.(activedTab, dataSource);

  const renderContent = () => (
    <PickerContent
      {...rest}
      // emptyPrompt={emptyPrompt}
      historyStoreKey={historyStoreKey}
      shouldUpdateRecentlyUsed={shouldUpdateRecentlyUsed}
      dataSource={dataSource}
      getTabKey={getTabKey}
      tabKey={activedTab}
      keyword={debouncedKeyword}
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
