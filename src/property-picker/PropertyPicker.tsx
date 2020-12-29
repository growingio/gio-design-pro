import React, { useRef, useState, useMemo, useEffect } from 'react';
// import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
// import { TabNavItemProps } from '@gio-design-new/components/es/components/tab-nav/interface';
import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
import { toPairs, isEqual } from 'lodash';
import { makeSearchParttern } from '@gio-design-new/components/es/components/cascader/helper';
import { dimensionToPropertyItem } from './util';
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
import { PropertyPickerProps, PropertyTypes, PropertyInfo, PropertyItem } from './interfaces';
import PropertyDetailPanel from './PropertyDetail';
import { useLocalStorage } from '../hooks';

const Tabs = toPairs(PropertyTypes).map((v) => {
  return { key: v[0], children: v[1] };
});
const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    initialValue,
    searchPlaceholder = '搜索属性名称',
    visible,
    onVisibleChange,
    // onSearch,
    fetchDetailData = (node) => Promise.resolve({ id: node.value, name: node.label, ...node } as PropertyInfo),
    loading = false,
    dataSource: originDataSource,
    userId,
    onChange,
    ...rest
  } = props;
  // const prefixCls = usePrefixCls('property-picker');
  const [scope, setScope] = useState('all');
  const [pickerVisible, setPickerVisible] = useState(visible);
  const [keyword, setKeyword] = useState<string>('');
  const [displayValue, setDisplayValue] = useState<string>('');
  const [recentlyUsed] = useLocalStorage<Map<string, any[]>>(`${userId}_propertyPicker`, new Map());
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (initialValue) {
      setDisplayValue(initialValue.label);
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
    // const r = recentlyUsed?.get(scope) as Array<PropertyItem>;
    // const recent: PropertyItem[] = [...r].map((v) => {
    //   return {
    //     groupId: 'recently',
    //     groupName: '最近使用',
    //     ...v,
    //   };
    // });
    const recent: PropertyItem[] = [];
    return [...recent, ...filterdData];
  }, [scope, keyword, originDataSource, recentlyUsed]);

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
  // function _saveRecentlyByScope(v: string | number, tab: string) {
  //   const recent = cloneDeep(recentlyUsed) as Map<string, any[]>;
  //   let scopedRecent = recent.get(tab);
  //   if (!scopedRecent) {
  //     scopedRecent = [];
  //   }
  //   let newScopedRecent = uniq([v, ...scopedRecent]);
  //   if (newScopedRecent.length > 5) {
  //     newScopedRecent = newScopedRecent.slice(0, 5);
  //   }
  //   const newRecent = recent.set(scope, newScopedRecent);
  //   setRecentlyUsed(newRecent);
  // }
  function handleSelect(node: NodeData) {
    const { label, value, valueType } = node as PropertyItem;

    setDisplayValue(label);
    // _saveRecentlyByScope(value, scope);
    if (!isEqual(currentValue, node)) {
      onChange?.({ label, value: typeof value === 'number' ? value.toString() : value, valueType });
    }
    setCurrentValue(node);
    rest.onSelect?.(node);
    setPickerVisible(false);
    onVisibleChange?.(false);
  }
  const handleSearch = (query: string) => {
    setKeyword(query);
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