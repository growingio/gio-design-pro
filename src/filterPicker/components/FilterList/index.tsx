import React, { useEffect, useState } from 'react';
import { Button } from '@gio-design-new/components';
import { PlusCircleFilled } from '@gio-design/icons';
import Expression from './Expression';
import './index.less';
import { FilterValueType } from '../../interfaces';
import { defaultFilterItem } from '../../filterMap';

interface FilterListProps {
  list: FilterValueType[];
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  changeFilterListCb: (v: FilterValueType[]) => void;
}
function FilterList(props: FilterListProps) {
  const { list = [], dimensionValueRequest, timeRange, measurements, changeFilterListCb } = props;
  const [filterList, setFilterList] = useState<FilterValueType[]>(list);
  useEffect(() => {
    if (!list.length) {
      setFilterList([defaultFilterItem]);
    } else {
      setFilterList(list);
    }
  }, [list]);

  const expressChange = (v: FilterValueType, index: number) => {
    const subFilter = filterList;
    subFilter.splice(index, 1, v);
    setFilterList([...subFilter]);
    changeFilterListCb([...subFilter]);
  };

  const addFilter = () => {
    setFilterList([...filterList, defaultFilterItem]);
  };
  const deleteFilterItem = (index: number) => {
    const subFilter = filterList;
    subFilter.splice(index, 1);
    setFilterList([...subFilter]);
  };

  return (
    <div className="filter-list-box">
      {filterList.length &&
        filterList.map((ele: FilterValueType, index: number) => (
          <Expression
            index={index}
            filterLength={filterList.length}
            filterItem={ele}
            deleteFilterItem={deleteFilterItem}
            dimensionValueRequest={dimensionValueRequest}
            timeRange={timeRange}
            measurements={measurements}
            onChange={expressChange}
          />
        ))}
      <Button icon={<PlusCircleFilled />} type="text" disabled={filterList.length >= 5} onClick={addFilter}>
        添加过滤条件
      </Button>
    </div>
  );
}
export default FilterList;
