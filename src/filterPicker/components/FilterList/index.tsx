import React from 'react';
import Expression from '../Expression';
import './index.less';

interface FilterListProps {
  list?: string[];
}
function FilterList(props: FilterListProps) {
  const { list = [] } = props;
  return (
    <div className="filter-list-box">
      {list.map(() => (
        <Expression />
      ))}
    </div>
  );
}
export default FilterList;
