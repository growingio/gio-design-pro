import React, { useRef, useState, useMemo, useEffect } from 'react';
// import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
// import { TabNavItemProps } from '@gio-design-new/components/es/components/tab-nav/interface';
import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
import { toPairs, isEqual, uniq, cloneDeep } from 'lodash';
import { makeSearchParttern } from '@gio-design-new/components/es/components/cascader/helper';
import { dimensionToPropertyItem } from './util';
import { useDebounce, useLocalStorage } from '../hooks';
// import {
//   TagOutlined,
//   UserOutlined,
//   MapChartOutlined,
//   LocationRecoveryOutlined,
//   DownFilled,
//   CheckOutlined,
// } from '@gio-design/icons';
// import { Loading, Grid, Tag } from '@gio-design-new/components';
import BasePicker from '../picker';
import { PropertyPickerProps, PropertyTypes, PropertyInfo, PropertyItem, PropertyValue } from './interfaces';
import PropertyDetailPanel from './PropertyDetail';

const Tabs = toPairs(PropertyTypes).map((v) => {
  return { key: v[0], children: v[1] };
});
const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    initialValue,
    searchPlaceholder = '搜索属性名称',
    visible,
    onVisibleChange,
    fetchDetailData = (node) => Promise.resolve({ ...node, id: node.value, name: node.label } as PropertyInfo),
    loading = false,
    dataSource: originDataSource,
    recentlyStorePrefix,
    onChange,
    ...rest
  } = props;
  const [scope, setScope] = useState('all');
  const [pickerVisible, setPickerVisible] = useState(visible);
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [displayValue, setDisplayValue] = useState<string>('');
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<{ [key: string]: any[] }>(
    `${recentlyStorePrefix}_propertyPicker`,
    {
      all: [],
    }
  );
  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>();
  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(keyword, 300);
  useEffect(() => {
    if (initialValue) {
      setDisplayValue(initialValue.label ?? '');
      setCurrentValue(initialValue);
    }
  }, []);
  const _filterFunc = (data = [] as PropertyItem[]) => {
    const labelKey = 'label';
    const parttern: RegExp = makeSearchParttern(keyword, true);
    if (scope === 'all') {
      if (!parttern) {
        return data;
      }
      return data.filter((d) => (d[labelKey] as string).match(parttern));
    }
    if (!parttern) {
      return data;
    }
    return data.filter((d) => d.type === scope && (d[labelKey] as string).match(parttern));
  };
  const dataSource = useMemo(() => {
    let dataList: PropertyItem[] = [];
    if (originDataSource && originDataSource.length && !('value' in originDataSource[0])) {
      dataList = originDataSource.map(dimensionToPropertyItem);
    } else {
      dataList = originDataSource;
    }
    const filterdData = _filterFunc(dataList);
    const rids = recentlyUsed ? recentlyUsed[scope] : [];
    const r = dataList.filter((v) => rids?.includes(v.value));
    const recent: PropertyItem[] = [...r].map((v) => {
      return {
        ...v,
        groupId: 'recently',
        groupName: '最近使用',
      };
    });
    return [...recent, ...filterdData];
  }, [scope, debouncedKeyword, originDataSource, recentlyUsed]);

  const tabNavItems = useRef([{ key: 'all', children: '全部' }].concat(Tabs));
  function onTabNavChange(key: string) {
    setScope(key);
  }
  function onPickerVisibleChange(v: boolean) {
    setPickerVisible(v);
    onVisibleChange?.(v);
  }
  function onMunuItemHover(data: NodeData) {
    return <PropertyDetailPanel nodeData={data} fetchData={fetchDetailData} />;
  }
  function _saveRecentlyByScope(v: string | number | undefined, tab: string) {
    const recent = cloneDeep(recentlyUsed);
    let scopedRecent = recent[tab];
    if (!scopedRecent) {
      scopedRecent = [];
    }
    let newScopedRecent = uniq([v, ...scopedRecent]);
    if (newScopedRecent.length > 5) {
      newScopedRecent = newScopedRecent.slice(0, 5);
    }
    recent[scope] = newScopedRecent;
    setRecentlyUsed(recent);
  }
  function handleSelect(node: NodeData) {
    const { label, value, valueType } = node as PropertyItem;

    setDisplayValue(label ?? '');
    _saveRecentlyByScope(value, scope);
    if (!isEqual(currentValue, node)) {
      onChange?.({ label, value: typeof value === 'number' ? value.toString() : value, valueType });
    }
    setCurrentValue(node as PropertyValue);
    rest.onSelect?.(node);
    setPickerVisible(false);
    onVisibleChange?.(false);
  }
  const handleSearch = (query: string) => {
    setKeyword(query);
    setDebouncedKeyword(query);
  };
  return (
    <>
      <BasePicker
        {...rest}
        inputValue={displayValue}
        loading={loading}
        searchPlaceholder={searchPlaceholder}
        visible={pickerVisible}
        onVisibleChange={onPickerVisibleChange}
        tabNav={{
          items: tabNavItems.current,
          onChange: onTabNavChange,
        }}
        onSelect={handleSelect}
        onSearch={handleSearch}
        dataSource={dataSource}
        groupVisible
        onHoverPanelShow={onMunuItemHover}
      />
    </>
  );
};
export default PropertyPicker;
