import React, { useState } from 'react';
import List from '../list';
import { ListItemProps } from '../list/interfaces';
import { renderExpandableItems } from '../list/utils';

const ExpandableGroup = (props: { title?: React.ReactNode; items: ListItemProps[]; groupKey?: string }) => {
  const { items = [], title, groupKey: key } = props;
  const [expanded, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(true);
  };
  const content = renderExpandableItems(expanded, items, onExpand);
  return (
    <>
      <List.ItemGroup key={`group-${key}`} title={title}>
        {content}
      </List.ItemGroup>
    </>
  );
};

export default ExpandableGroup;
