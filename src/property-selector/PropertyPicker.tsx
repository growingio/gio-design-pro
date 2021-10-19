/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { toPairs, uniq, cloneDeep, groupBy, keys, orderBy, Dictionary, isEqualWith, isEmpty, replace } from 'lodash';
import * as pinyin from 'pinyin-match';
import classNames from 'classnames';

import { dimensionToPropertyItem, getShortPinyin, promisify } from './util';
import { useDebounce, useDebounceFn, useLocalStorage } from '../hooks';
import BasePicker from '../base-picker';
import { PropertyPickerProps, PropertyTypes, PropertyItem, PropertyValue, PropertyInfo } from './interfaces';
import List from '../list';
import EmptyPrompt from '../empty-prompt';
import { ListItemProps } from '../list/interfaces';
import { renderExpandableItems } from '../list/utils';
import PropertyCard from './PropertyCard';
import './style';
import { Dimension } from './types';
import IconRender from './PropertyValueIconRender';

export const ExpandableGroupOrSubGroup = (props: {
  title?: string;
  type: 'group' | 'subgroup';
  items: ListItemProps[];
  groupKey?: string;
}) => {
  // console.log('props,', props);
  const { items = [], type = 'subgroup', title, groupKey: key } = props;
  const [expanded, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(true);
  };
  const content = renderExpandableItems(expanded, items, onExpand);
  return (
    <>
      {type === 'group' && (
        <List.ItemGroup key={`group-${key}`} title={title}>
          {content}
        </List.ItemGroup>
      )}
      {type === 'subgroup' && (
        <List.ItemSubgroup key={`subgroup-${key}`} title={title}>
          {content}
        </List.ItemSubgroup>
      )}
    </>
  );
};

const pinyinMatch = pinyin.default;
const Tabs = toPairs(PropertyTypes).map((v) => ({ key: v[0], children: v[1] }));

const PropertyPicker: React.FC<PropertyPickerProps> = (props: PropertyPickerProps) => {
  const {
    value: initialValue,
    searchBar,
    loading = false,
    dataSource: originDataSource,
    recentlyStorePrefix = '_gio',
    onChange,
    onSelect,
    onClick,
    detailVisibleDelay = 600,
    fetchDetailData = (data: PropertyItem): Promise<PropertyInfo> => Promise.resolve({ ...data }),
    disabledValues = [],
    shouldUpdateRecentlyUsed = true,
    ...rest
  } = props;
  const [scope, setScope] = useState('all');
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [recentlyUsedInMemo, setRecentlyUsedInMemo] = useState<{
    [key: string]: any[];
  }>();
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<{
    [key: string]: any[];
  }>(`${recentlyStorePrefix}_propertyPicker`, {
    all: [],
  });
  // const mounted = useMountedState();
  // useEffect(() => {
  //   console.log('setRecentlyUsedInMemo on mounted');
  //   setRecentlyUsedInMemo(recentlyUsed);
  // }, []);
  useEffect(() => {
    if (shouldUpdateRecentlyUsed) {
      // console.log('setRecentlyUsedInMemo on recentlyUsed update');
      setRecentlyUsedInMemo(recentlyUsed);
    }
  }, [shouldUpdateRecentlyUsed]);

  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>(initialValue);
  const [debouncedKeyword, setDebouncedKeyword] = useDebounce(keyword, 300);

  const [detailVisible, setDetailVisible] = useState(false);
  const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
    setDetailVisible(visible);
  }, detailVisibleDelay);
  const [dataList, setDataList] = useState<PropertyItem[]>([]);
  const navRef = useRef([{ key: 'all', children: '全部' }]);
  useEffect(() => {
    // 如果是Dimension类型 需要做一个数据转换
    let propertiItemList: PropertyItem[] = [];
    if (originDataSource && originDataSource.length) {
      if (!('value' in originDataSource[0])) {
        propertiItemList = originDataSource.map((v) => {
          const item = dimensionToPropertyItem(v as Dimension);
          item.itemIcon = () => {
            // 针对多物品模型，物品属性不再作为事件下面的属性，而是作为事件属性下面绑定的属性
            if (item.associatedKey) {
              return (
                <span>
                  <span style={{ width: '22px', display: 'inline-block' }} />
                  <IconRender group="item" />
                </span>
              );
            }
            return <IconRender group={item?.groupId} />;
          };
          return item;
        });
      } else {
        propertiItemList = originDataSource.map((v) => {
          const item = v as PropertyItem;
          item.itemIcon = () => {
            // 针对多物品模型，物品属性不再作为事件下面的属性，而是作为事件属性下面绑定的属性
            if (item.associatedKey) {
              return (
                <span>
                  <span style={{ width: '22px', display: 'inline-block' }} />
                  <IconRender group="item" />
                </span>
              );
            }
            return <IconRender group={item?.groupId} />;
          };
          return item;
        });
      }
    }
    const list = propertiItemList.map((v) => {
      const disabled = !!disabledValues && disabledValues.includes(v.id);

      return {
        ...v,
        disabled,
        pinyinName: getShortPinyin(v.label ?? ''),
      };
    });

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

    // mixin 最近使用
    const rids: string[] = recentlyUsedInMemo ? recentlyUsedInMemo[scope] : [];
    const recent: PropertyItem[] = [];
    rids?.forEach((v: string) => {
      const r = filterdData.find((d) => d.value === v);
      if (r) {
        recent.push({
          ...r,
          itemIcon: () => <IconRender group={r?.groupId} />,
          _groupKey: 'recently',
          // type: `recently¥${r.type}`,
          // typeName: '最近使用',
          // groupId: `recently¥${r.groupId}`,
          // groupName: '最近使用',
        });
      }
    });
    return [recent, sortedData];
  }, [scope, debouncedKeyword, dataList, recentlyUsedInMemo]);

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
    const allScopedRecent = recent.all || [];

    let newAllScopedRecent = uniq([v, ...allScopedRecent]);
    if (newAllScopedRecent.length > 5) {
      newAllScopedRecent = newAllScopedRecent.slice(0, 5);
    }
    recent[realScope] = newScopedRecent;
    recent.all = newAllScopedRecent;
    setRecentlyUsed(recent);
  }
  function handleSelect(node: PropertyItem) {
    setCurrentValue(node as PropertyValue);

    _saveRecentlyByScope(node);
    if (isEmpty(currentValue) || !isEqualWith(currentValue, node, (a, b) => a.value === b.value)) {
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
  const groupDatasource = useMemo(
    () => groupBy([...propertyItems], (o) => replace(o.type, /^recently¥/, '')),
    [propertyItems]
  );

  function labelRender(item: PropertyItem) {
    return (
      <>
        <span className="item-icon">{item.itemIcon?.()}</span>
        <span>{item.label}</span>
      </>
    );
  }
  const [hoverdNodeValue, setHoveredNodeValue] = useState<PropertyItem | undefined>();
  function getListItems(items: PropertyItem[], keyPrefix: string = '') {
    const handleItemMouseEnter = (data: PropertyItem) => {
      setHoveredNodeValue(data);
      debounceSetDetailVisible(true);
    };
    const handleItemMouseLeave = () => {
      setHoveredNodeValue(undefined);
      debounceSetDetailVisible.cancel();
      setDetailVisible(false);
    };
    const listItems = items.map((data: PropertyItem) => {
      const select =
        !isEmpty(currentValue) &&
        isEqualWith(currentValue, data, (a, b) => a?.value === b?.value) &&
        data._groupKey !== 'recently';
      const itemProp: ListItemProps = {
        disabled: data.disabled,
        ellipsis: true,
        key: ['item', keyPrefix, data.type, data.groupId, data.id].join('-'),
        className: classNames({ selected: select }),
        children: labelRender(data),
        onClick: (e) => handleItemClick(e, data),
        onMouseEnter: () => {
          handleItemMouseEnter(data);
        },
        onMouseLeave: () => {
          handleItemMouseLeave();
        },
      };
      return itemProp;
    });
    return listItems;
  }
  function subGroupRender(groupData: Dictionary<PropertyItem[]>) {
    const dom = keys(groupData).map((gkey) => {
      const { groupName, type } = groupData[gkey][0];
      const listItems = getListItems(groupData[gkey]);
      // const elem = ExpandableGroupOrSubGroup({
      //   // key: ['exp', type, gkey].join('-'),
      //   groupKey: [type, gkey].join('-'),
      //   title: groupName,
      //   type: 'subgroup',
      //   items: listItems,
      // });
      // return elem;
      return (
        <ExpandableGroupOrSubGroup
          key={['exp', type, gkey].join('-')}
          groupKey={[type, gkey].join('-')}
          title={groupName}
          type="subgroup"
          items={listItems}
        />
      );
    });
    return dom as React.ReactNode;
  }
  const renderItems = () => {
    if (propertyItems?.length === 0) {
      return <EmptyPrompt {...rest.emptyPrompt} />;
    }
    const recentlyNodes = recentlyPropertyItems?.length > 0 && (
      <React.Fragment key="recentlyNodes">
        <ExpandableGroupOrSubGroup
          groupKey="recently"
          key="exp-group-recently"
          title="最近使用"
          type="group"
          items={getListItems(recentlyPropertyItems, 'recently')}
        />
        <List.Divider key="divider-group-recently" />
      </React.Fragment>
    );
    const groupDataNodes = keys(groupDatasource).map((key, index) => {
      const groupData = groupDatasource[key];

      let subGroupDic;
      if (key === 'event' && 'associatedKey' in groupData[0] && groupData.length > 1) {
        subGroupDic = groupBy(
          groupData
            .filter((ele) => !ele.associatedKey)
            .map((ele) => [ele])
            ?.reduce((acc, cur) => {
              cur.push(
                ...groupData
                  .filter((e) => e.associatedKey === cur[0].id)
                  .map((e) => {
                    e.groupId = key;
                    return e;
                  })
              );
              acc.push(...cur);
              return acc;
            }, []),
          (o) => o.groupId
        );
      } else {
        subGroupDic = groupBy(groupData, (o) => o.groupId);
      }

      const { typeName } = groupData[0];
      // 此处的处理是 如果2级分组只有一组 提升为一级分组；如果没有这个需求删除该if分支 ；
      if (keys(subGroupDic).length === 1) {
        const items = getListItems(subGroupDic[keys(subGroupDic)[0]]);
        return (
          <React.Fragment key={`groupDataNodes-${index}`}>
            {index > 0 && <List.Divider key={`divider-group-${key}-${index}`} />}
            <ExpandableGroupOrSubGroup
              key={`exp-group-${key}`}
              groupKey={`${key}`}
              title={typeName}
              type="group"
              items={items}
            />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={`groupDataNodes-${index}`}>
          {index > 0 && <List.Divider key={`divider-group-${key}-${index}`} />}
          <List.ItemGroup key={`group-${key}`} title={typeName} expandable={false}>
            {subGroupRender(subGroupDic)}
          </List.ItemGroup>
        </React.Fragment>
      );
    });
    const childrens = [recentlyNodes, groupDataNodes];
    return childrens as React.ReactNode;
  };
  // console.log(promisify<PropertyInfo>(fetchDetailData));
  const renderDetail = () =>
    hoverdNodeValue && <PropertyCard nodeData={hoverdNodeValue} fetchData={promisify(fetchDetailData)} />;
  const clsPrifx = usePrefixCls('property-picker');
  const cls = classNames(clsPrifx, rest?.className);
  return (
    <>
      <BasePicker
        {...rest}
        className={cls}
        renderItems={renderItems}
        detailVisible={detailVisible && !!hoverdNodeValue}
        renderDetail={renderDetail}
        loading={loading}
        searchBar={{
          placeholder: searchBar?.placeholder || '搜索属性名称',
          onSearch: handleSearch,
        }}
        tabNav={{
          items: navRef.current,
          onChange: onTabNavChange,
        }}
      />
    </>
  );
};

export default PropertyPicker;
