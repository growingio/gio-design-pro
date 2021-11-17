/* eslint-disable import/prefer-default-export */
import React from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ListItemProps } from './interfaces';

const DEFAULT_SHOW_ITEMS_COUNT = 10;

export const rootPrefixCls = () => usePrefixCls('list');

export function renderItem(i: ListItemProps, idx: number) {
  return <Item {...i} key={i.key ?? `item-${idx}`} />;
}

export function renderExpandableItems(expanded: boolean, currentItems: ListItemProps[], onExpand: () => void) {
  if (expanded) {
    return currentItems.map(renderItem);
  }
  if (currentItems.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = currentItems.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    const expandText = localStorage.getItem('locale') === 'en-US' ? 'Expand All' : '展开全部';
    return showItems
      .map(renderItem)
      .concat(
        <ExpandItem
          title={`${expandText} (${currentItems.length - showItems.length})`}
          key={`expand-item-${currentItems[0].key}-${showItems.length + 1}`}
          onClick={onExpand}
        />
      );
  }
  return currentItems.map(renderItem);
}
