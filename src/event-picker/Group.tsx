import React, { useState } from 'react';
import List from '../list';
// import CustomItem from './CustomItem';
// import { ListItemProps } from '../list/interfaces';
import ExpandItem from '../list/ExpandItem';

const DEFAULT_SHOW_ITEMS_COUNT = 10;
export function renderExpandableItems(
  expanded: boolean,
  children: React.ReactNode[],
  onExpand: () => void,
  groupKey: string
) {
  if (expanded) {
    return children;
  }
  if (children.length > DEFAULT_SHOW_ITEMS_COUNT) {
    const showItems = children.slice(0, DEFAULT_SHOW_ITEMS_COUNT);
    return showItems.concat(
      <ExpandItem
        title={`展开全部 (${children.length - showItems.length})`}
        key={`expand-item-${groupKey}-${showItems.length + 1}`}
        onClick={onExpand}
      />
    );
  }
  return children;
}
// items: ListItemProps[];
const ExpandableGroup: React.FC<{ title?: React.ReactNode; groupKey?: string }> = (props) => {
  const { children, title, groupKey: key } = props;
  const childrenItems = React.Children.toArray(children);
  // const itemsProps: ListItemProps[] = React.Children.map(childrenItems, (ele: React.ReactNode) => {
  //   console.log(ele);
  //   if (!React.isValidElement(ele)) return undefined;
  //   return { ...ele.props, key: ele.key };
  // });
  const gk = `group-${key}`;
  const [expanded, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(true);
  };
  const content = renderExpandableItems(expanded, childrenItems, onExpand, gk);

  return (
    <>
      <List.ItemGroup key={gk} title={title}>
        {content}
      </List.ItemGroup>
    </>
  );
};

export default ExpandableGroup;
