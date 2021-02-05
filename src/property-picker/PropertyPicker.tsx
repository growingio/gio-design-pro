import React, { useRef, useState, useMemo, useEffect } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
// import { TabNavItemProps } from '@gio-design/components/es/components/tab-nav/interface';
import { toPairs, uniq, cloneDeep, groupBy, keys, orderBy, Dictionary, isEqualWith, isEmpty } from 'lodash';
// import { makeSearchParttern } from '@gio-design/components/es/components/cascader/helper';
// import { DownFilled } from '@gio-design/icons';
import * as pinyin from 'pinyin-match';
// import { Tooltip } from '@gio-design/components';
import classNames from 'classnames';
import { dimensionToPropertyItem, getShortPinyin } from './util';
import { useDebounce, useLocalStorage } from '../hooks';
// import { Loading, Grid, Tag } from '@gio-design/components';
import BasePicker from '../base-picker';
import { PropertyPickerProps, PropertyTypes, PropertyItem, PropertyValue } from './interfaces';
import List from '../list';
import EmptyPrompt from '../empty-prompt';
import { ListItemProps, ListItemSubgroupProps } from '../list/interfaces';

const pinyinMatch = pinyin.default;
const Tabs = toPairs(PropertyTypes).map((v) => ({ key: v[0], children: v[1] }));

const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    value: initialValue,
    searchBar,
    // fetchDetailData = (node) => Promise.resolve({ ...node, id: node.value, name: node.label } as PropertyInfo),
    loading = false,
    dataSource: originDataSource,
    recentlyStorePrefix = '_gio',
    onChange,
    onSelect,
    onClick,
    ...rest
  } = props;
  const [scope, setScope] = useState('all');
  // const [pickerVisible, setPickerVisible] = useState(!!visible);
  const [keyword, setKeyword] = useState<string | undefined>('');
  // const [displayValue, setDisplayValue] = useState<string>('');
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<{ [key: string]: any[] }>(
    `${recentlyStorePrefix}_propertyPicker`,
    {
      all: [],
    }
  );
  // const searchBarProp = merge({ onSearch, placeholder: '搜索属性' }, searchBar)
  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>(initialValue);
  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(keyword, 300);
  const [dataList, setDataList] = useState<PropertyItem[]>([]);
  const navRef = useRef([{ key: 'all', children: '全部' }]);
  useEffect(() => {
    // 如果是Dimension类型 需要做一个数据转换
    let propertiItemList: PropertyItem[] = [];
    if (originDataSource && originDataSource.length) {
      if (originDataSource && originDataSource.length && !('value' in originDataSource[0])) {
        propertiItemList = originDataSource.map(dimensionToPropertyItem);
      } else {
        propertiItemList = originDataSource;
      }
    }
    const list = propertiItemList.map((v) => ({ ...v, pinyinName: getShortPinyin(v.label ?? '') }));

    setDataList(list);
    /**
     * 设置属性类型tab，如果传入的列表没有对应的类型 不显示该tab
     */
    const types = uniq(propertiItemList.map((p) => p.type));
    const tabs = Tabs.filter((t) => types.indexOf(t.key) > -1);
    // setTabNavItems(tabs);
    navRef.current = [{ key: 'all', children: '全部' }].concat(tabs);
  }, [originDataSource]);
  /**
   * 搜索关键字的方法，支持拼音匹配
   * @param input 带匹配的项
   * @param key 匹配的关键字
   */
  const keywordFilter = (input: string = '', key: string = '') => {
    if (!input || !key) return true;
    return !!pinyinMatch?.match(input, key);
    // const parttern: RegExp = makeSearchParttern(key, true);
    // if (!parttern) return true;
    // return !!input.match(parttern) || !!pinyinMatch?.match(input, key);
  };
  const _filterFunc = (data = [] as PropertyItem[]) => {
    const labelKey = 'label';

    if (scope === 'all') {
      return data.filter((d) => keywordFilter(d[labelKey] as string, keyword));
    }

    return data.filter((d) => d.type === scope && keywordFilter(d[labelKey] as string, keyword));
  };
  /**
   * 属性列表数据源
   */
  const dataSource = useMemo(() => {
    const filterdData = _filterFunc(dataList);

    // 按照分组排序
    // const sortedData = filterdData; // sortBy(filterdData, ['groupOrder', 'name']);
    const sortedData = orderBy(filterdData, ['typeOrder', 'groupOrder', 'pinyinName']);
    // sortedData.sort((a, b) => {
    //   // const regEnOrNum = /^[a-zA-Z0-9]/;
    //   const aOrder = a.groupOrder ?? 0;
    //   const bOrder = b.groupOrder ?? 0;
    //   if (aOrder - bOrder === 0) {
    //     const aPinyin = a.pinyinName; // getShortPinyin(a.label ?? '');
    //     const bPinyin = b.pinyinName; // getShortPinyin(b.label ?? '');
    //     return aPinyin?.localeCompare(bPinyin ?? '') || 0;
    //   }
    //   return aOrder - bOrder;
    // });
    // mixin 最近使用
    const rids: string[] = recentlyUsed ? recentlyUsed[scope] : [];
    const recent: PropertyItem[] = [];
    rids?.forEach((v: string) => {
      const r = filterdData.find((d) => d.value === v);
      if (r) {
        recent.push({
          ...r,
          type: 'recently',
          typeName: '最近使用',
          groupId: 'recently',
          groupName: '最近使用',
        });
      }
    });
    return [recent, sortedData];
  }, [scope, debouncedKeyword, dataList, recentlyUsed]);

  function onTabNavChange(key: string) {
    setScope(key);
  }

  /**
   * 点选时 设置最近使用
   * @param item
   */
  function _saveRecentlyByScope(item: PropertyItem) {
    const { value: v, type } = item;
    const recent = cloneDeep(recentlyUsed);
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
    let allScopedRecent = recent.all;
    if (!allScopedRecent) {
      allScopedRecent = [];
    }
    let newAllScopedRecent = uniq([v, ...allScopedRecent]);
    if (newAllScopedRecent.length > 5) {
      newAllScopedRecent = newAllScopedRecent.slice(0, 5);
    }
    recent[realScope] = newScopedRecent;
    recent.all = newAllScopedRecent;
    setRecentlyUsed(recent);
  }
  function handleSelect(node: PropertyItem) {
    // const { label, value, valueType } = node as PropertyItem;
    setCurrentValue(node as PropertyValue);

    _saveRecentlyByScope(node);
    if (!isEqualWith(currentValue, node, (a, b) => a.value === b.value)) {
      onChange?.(node);
    }
    onSelect?.(node);
  }
  const handleSearch = (query: string) => {
    setKeyword(query);
    setDebouncedKeyword(query);
  };
  const handleItemClick = (e: React.MouseEvent<HTMLElement>, node: PropertyItem) => {
    handleSelect(node);
    onClick?.(e);
  };
  const [recentlyPropertyItems, propertyItems] = dataSource;
  const groupDatasource = useMemo(() => groupBy(propertyItems, (o) => o.type), [propertyItems]);
  // console.log(dataSource);
  // console.log(groupDatasource);
  const renderItems = () => {
    if (dataSource?.length === 0) {
      return <EmptyPrompt {...rest.emptyPrompt} />;
    }
    function labelRender(item: PropertyItem) {
      return item.label as React.ReactChild;
    }
    function getListItems(items: PropertyItem[]) {
      const listItems = items.map((data: PropertyItem) => {
        const select =
          !isEmpty(currentValue) &&
          isEqualWith(currentValue, data, (a, b) => a.value === b.value) &&
          data.groupId !== 'recently';
        const itemProp: ListItemProps = {
          disabled: data.disabled,
          ellipsis: true,
          key: [data.type, data.groupId, data.value].join(''),
          className: classNames({ selected: select }),
          children: labelRender(data),
          onClick: (e) => handleItemClick(e, data),
        };
        return itemProp;
      });
      return listItems;
    }
    function subGroupRender(groupData: Dictionary<PropertyItem[]>) {
      const dom = keys(groupData).map((gkey) => {
        const { groupName, type } = groupData[gkey][0];
        const listItems = getListItems(groupData[gkey]);
        const subgroupProps: ListItemSubgroupProps = {
          key: [type, gkey].join('￥'),
          title: groupName || gkey,
          expandable: true,
          items: listItems,
        };
        return <List.ItemSubgroup {...subgroupProps} />;
      });
      return dom as React.ReactNode;
    }

    const childrens = keys(groupDatasource).map((key) => {
      const groupData = groupDatasource[key];
      const subGroupDic = groupBy(groupData, (o) => o.groupId);
      if (keys(subGroupDic).length === 1) {
        const { typeName } = groupData[0];
        const items = getListItems(subGroupDic[keys(subGroupDic)[0]]);
        return <List.ItemGroup key={key} title={typeName} items={items} expandable />;
      }
      return (
        <List.ItemGroup key={key} expandable={false}>
          {subGroupRender(subGroupDic)}
        </List.ItemGroup>
      );
    });
    const renderRecentItems = () => {
      if (!recentlyPropertyItems || recentlyPropertyItems.length === 0) {
        return <></>;
      }
      const { type, typeName } = recentlyPropertyItems[0];
      return <List.ItemGroup key={type} title={typeName} items={getListItems(recentlyPropertyItems)} />;
    };
    return [renderRecentItems(), ...childrens] as React.ReactNode;
  };
  const clsPrifx = usePrefixCls('property-picker');
  const cls = classNames(clsPrifx, rest?.className);
  return (
    <>
      <BasePicker
        {...rest}
        className={cls}
        renderItems={renderItems}
        loading={loading}
        searchBar={{ placeholder: searchBar?.placeholder || '搜索属性名称', onSearch: handleSearch }}
        tabNav={{
          items: navRef.current,
          onChange: onTabNavChange,
        }}
      />
    </>
  );
};

export default PropertyPicker;
