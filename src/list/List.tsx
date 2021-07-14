/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { cloneDeep } from 'lodash';
import EmptyPrompt from '../empty-prompt';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import ItemMultifunction from './ItemMultifunction';
import Divider from './Divider';
import { ListProps, ListItemProps, ListItemGroupProps } from './interfaces';
import { rootPrefixCls } from './utils';

function InternalList({
  className,
  style,
  children,
  items,
  expandable = false,
  multiple,
  allSelected = false,
  size,
  values,
  onChange,
}: ListProps) {
  const [keys, setKeys] = useState<string[]>(values);
  const allSelectStatus = useRef(allSelected);

  const changeMulti = (key: string) => {
    if (keys.includes(key)) {
      const subKeys = cloneDeep(keys);
      subKeys.splice(subKeys.indexOf(key), 1);
      setKeys([...subKeys]);
    } else {
      setKeys([...keys, key]);
    }
  };

  const changeSingle = (key: string) => {
    setKeys([key]);
  };

  useEffect(() => {
    onChange?.(keys);
  }, [keys]);

  useEffect(() => {
    if (allSelected !== allSelectStatus.current && multiple) {
      if (allSelected) {
        const itemKeys = items?.filter((item: ListItemProps) => !item.disabled)?.map((item: ListItemProps) => item.key);
        onChange?.(itemKeys);
      } else {
        onChange?.([]);
      }
      allSelectStatus.current = allSelected;
    }
  }, [allSelected]);

  function renderItems(
    currentItems: (ListItemGroupProps | ListItemProps)[],
    multiChange: (key: string) => void,
    singleChange: (key: string) => void
  ) {
    return currentItems.map((item: ListItemGroupProps | ListItemProps, index) => {
      if ('title' in item) {
        const itemGroup = item as ListItemGroupProps;
        return <ItemGroup expandable={expandable} {...itemGroup} />;
      }
      if ('descrition' in item || 'avator' in item || 'tagInfo' in item || multiple || size) {
        return (
          <ItemMultifunction
            size={size}
            // key={`item-${index}`}
            {...(item as ListItemProps)}
            id={item.key}
            multiple={multiple}
            allSelected={allSelected}
            onChangeMulti={multiChange}
            onChangeSingle={singleChange}
            values={values}
          />
        );
      }

      return <Item key={`item-${index}`} {...(item as ListItemProps)} />;
    });
  }

  let content;
  if (items && items.length > 0) {
    content = React.useMemo(() => renderItems(items, changeMulti, changeSingle), [items, expandable, keys]);
  } else if (children) {
    content = children;
  } else {
    content = <EmptyPrompt />;
  }

  const cls = classnames(rootPrefixCls(), className);
  return (
    <ul className={cls} style={style}>
      {content}
    </ul>
  );
}

class List extends React.Component<ListProps> {
  static Item = Item;

  static ItemGroup = ItemGroup;

  static ItemSubgroup = ItemSubgroup;

  static Divider = Divider;

  render() {
    return <InternalList {...this.props} />;
  }
}

export default List;
