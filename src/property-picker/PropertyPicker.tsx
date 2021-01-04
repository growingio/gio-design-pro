import React, { useRef, useState, useMemo, useEffect } from 'react';
import usePrefixCls from '@gio-design-new/components/es/utils/hooks/use-prefix-cls';
// import { TabNavItemProps } from '@gio-design-new/components/es/components/tab-nav/interface';
import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
import { toPairs, isEqual, uniq, cloneDeep } from 'lodash';
import { makeSearchParttern } from '@gio-design-new/components/es/components/cascader/helper';
import { DownFilled, UpFilled } from '@gio-design/icons';
import { dimensionToPropertyItem } from './util';
import { useDebounce, useLocalStorage } from '../hooks';
// import { Loading, Grid, Tag } from '@gio-design-new/components';
import BasePicker from '../picker';
import { PropertyPickerProps, PropertyTypes, PropertyItem, PropertyValue } from './interfaces';

const Tabs = toPairs(PropertyTypes).map((v) => {
  return { key: v[0], children: v[1] };
});
const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    initialValue,
    input: triggerElement,
    placeholder = '请选择属性',
    searchPlaceholder = '搜索属性名称',
    visible,
    onVisibleChange,
    // fetchDetailData = (node) => Promise.resolve({ ...node, id: node.value, name: node.label } as PropertyInfo),
    loading = false,
    dataSource: originDataSource,
    recentlyStorePrefix = '_gio',
    onChange,
    ...rest
  } = props;
  const [scope, setScope] = useState('all');
  const [pickerVisible, setPickerVisible] = useState(!!visible);
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
  const [dataList, setDataList] = useState<PropertyItem[]>([]);
  const navRef = useRef([{ key: 'all', children: '全部' }]);
  useEffect(() => {
    if (initialValue) {
      setDisplayValue(initialValue.label ?? '');
      setCurrentValue(initialValue);
    }
  }, []);
  useEffect(() => {
    let propertiItemList: PropertyItem[] = [];
    if (originDataSource && originDataSource.length) {
      if (originDataSource && originDataSource.length && !('value' in originDataSource[0])) {
        propertiItemList = originDataSource.map(dimensionToPropertyItem);
      } else {
        propertiItemList = originDataSource;
      }
    }
    setDataList(propertiItemList);
    const types = uniq(propertiItemList.map((p) => p.type));
    const tabs = Tabs.filter((t) => types.indexOf(t.key) > -1);
    // setTabNavItems(tabs);
    navRef.current = [{ key: 'all', children: '全部' }].concat(tabs);
  }, [originDataSource]);
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
    const filterdData = _filterFunc(dataList);

    // 按照分组排序
    const sortedData = filterdData; // sortBy(filterdData, ['groupOrder', 'name']);
    sortedData.sort((a, b) => {
      const regEnOrNum = /^[a-zA-Z0-9]/;
      const aOrder = a.groupOrder ?? 0;
      const bOrder = b.groupOrder ?? 0;
      if (aOrder - bOrder === 0) {
        if (regEnOrNum.test(a.label ?? '') || regEnOrNum.test(b.label ?? '')) {
          return (a.label?.charCodeAt(0) as number) - (b.label?.charCodeAt(0) as number);
        }
        return a.label?.localeCompare(b.label ?? '', 'zh') || 0;
      }
      return aOrder - bOrder;
    });
    // mixin 最近使用
    const rids: string[] = recentlyUsed ? recentlyUsed[scope] : [];
    const recent: PropertyItem[] = [];
    rids?.forEach((v: string) => {
      const r = filterdData.find((d) => d.value === v);
      if (r) {
        recent.push({
          ...r,
          groupId: 'recently',
          groupName: '最近使用',
        });
      }
    });
    return [...recent, ...sortedData];
  }, [scope, debouncedKeyword, dataList, recentlyUsed]);

  function onTabNavChange(key: string) {
    setScope(key);
  }
  function onPickerVisibleChange(v: boolean) {
    setPickerVisible(v);
    onVisibleChange?.(v);
  }
  // function onMunuItemHover(data: NodeData) {
  //   return <PropertyDetailPanel nodeData={data} fetchData={fetchDetailData} />;
  // }
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
  function handleSelect(node: NodeData) {
    const { label, value, valueType } = node as PropertyItem;

    setDisplayValue(label ?? '');
    _saveRecentlyByScope(node);
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
  const prefixCls = usePrefixCls('property-picker');
  const defaultInput = () => {
    const valueElem = <span className={`${prefixCls}-trigger__value`}>{currentValue?.label}</span>;

    return (
      <>
        <span className={`${prefixCls}-trigger`}>
          <span className="prefix" />
          <span className={`${prefixCls}-trigger-input`}>
            {!currentValue ? <span className={`${prefixCls}-trigger__placeholder`}>{placeholder}</span> : valueElem}
          </span>
          <span className="suffix">{pickerVisible ? <UpFilled /> : <DownFilled />}</span>
        </span>
      </>
    );
  };
  return (
    <>
      <BasePicker
        {...rest}
        input={triggerElement || defaultInput()}
        inputValue={displayValue}
        value={currentValue?.value}
        loading={loading}
        searchPlaceholder={searchPlaceholder}
        visible={pickerVisible}
        onVisibleChange={onPickerVisibleChange}
        tabNav={{
          items: navRef.current,
          onChange: onTabNavChange,
        }}
        onSelect={handleSelect}
        onSearch={handleSearch}
        dataSource={dataSource}
        groupVisible
      />
    </>
  );
};
export default PropertyPicker;
