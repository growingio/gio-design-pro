/* eslint-disable import/prefer-default-export */
import React from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import Item from './Item';
import ExpandItem from './ExpandItem';
import { ListItemProps } from './interfaces';

const DEFAULT_SHOW_ITEMS_COUNT = 10;

export const rootPrefixCls = () => usePrefixCls('list');

export function renderItem(i: ListItemProps, idx: number) {
  return <Item {...i} key={`item-${i.key}-${idx}`} />;
}

export function renderExpandableItems(expanded: boolean, currentItems: ListItemProps[], onExpand: () => void) {
  if (expanded) {
    return currentItems.map(renderItem);
  }
  if (currentItems.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = currentItems.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    return showItems
      .map(renderItem)
      .concat(
        <ExpandItem
          title={`展开全部 (${currentItems.length - showItems.length})`}
          key={`expand-item-${showItems.length + 1}`}
          onClick={onExpand}
        />
      );
  }
  return currentItems.map(renderItem);
}
