import React from 'react';

import FilterList from '../FilterList';

import { FilterValueType } from '../../interfaces';

import './index.less';

interface FilterOverflyProps {
  onCancel: () => void;
  onSubmit: (v: FilterValueType[]) => void;
  filterList: FilterValueType[];
  propertyOptions: any[];
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
}
function FilterOverlay(props: FilterOverflyProps) {
  const { onCancel, onSubmit, filterList, dimensionValueRequest, timeRange, measurements, propertyOptions } = props;
  return (
    <div className="filter-condition_box">
      <div className="filter-condition_title">选择过滤条件</div>
      <FilterList
        list={filterList}
        dimensionValueRequest={dimensionValueRequest}
        timeRange={timeRange}
        measurements={measurements}
        propertyOptions={propertyOptions}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default FilterOverlay;
