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
  propertyOptions: any[];
}
function FilterList(props: FilterListProps) {
  const { list = [], dimensionValueRequest, timeRange, measurements, changeFilterListCb, propertyOptions } = props;
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
    filterList.splice(index, 1);
    setFilterList([...filterList]);
    changeFilterListCb([...filterList]);
  };

  return (
    <>
      <div className="filter-list-box">
        {filterList.map((ele: FilterValueType, index: number) => (
          <Expression
            key={ele.key}
            index={index}
            filterLength={filterList.length}
            exprs={filterList}
            filterItem={ele}
            deleteFilterItem={deleteFilterItem}
            dimensionValueRequest={dimensionValueRequest}
            timeRange={timeRange}
            measurements={measurements}
            onChange={expressChange}
            propertyOptions={propertyOptions}
          />
        ))}
      </div>
      <Button icon={<PlusCircleFilled />} type="text" disabled={filterList.length >= 5} onClick={addFilter}>
        添加过滤条件
      </Button>
    </>
  );
}
export default FilterList;
