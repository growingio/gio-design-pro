/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import EmptyPrompt from '../empty-prompt';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import Divider from './Divider';
import { ListProps, ListItemProps, ListItemGroupProps } from './interfaces';
import { rootPrefixCls } from './utils';

function InternalList({ className, style, children, items, expandable = false }: ListProps) {
  function renderItems(currentItems: (ListItemGroupProps | ListItemProps)[]) {
    return currentItems.map((item: ListItemGroupProps | ListItemProps, index) => {
      if ('title' in item) {
        const itemGroup = item as ListItemGroupProps;
        return <ItemGroup expandable={expandable} {...itemGroup} />;
      }
      return <Item key={`item-${index}`} {...(item as ListItemProps)} />;
    });
  }

  let content;
  if (items && items.length > 0) {
    content = React.useMemo(() => renderItems(items), [items, expandable]);
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
