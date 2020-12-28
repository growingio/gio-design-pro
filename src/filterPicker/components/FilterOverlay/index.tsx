import React, { useState } from 'react';

import FilterList from '../FilterList';
import Footer from '../Footer';
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
  const { onCancel, onSubmit, filterList, dimensionValueRequest, timeRange, measurements } = props;
  const [list, setList] = useState<FilterValueType[]>(filterList);
  const changeFilterListCb = (v: FilterValueType[]) => {
    setList(v);
  };

  const submit = () => {
    onSubmit(list);
  };
  return (
    <div className="filter-condition_box">
      <div className="filter-condition_title">选择过滤条件</div>
      <FilterList
        list={filterList}
        dimensionValueRequest={dimensionValueRequest}
        timeRange={timeRange}
        measurements={measurements}
        changeFilterListCb={changeFilterListCb}
      />
      <Footer onCancel={onCancel} onSubmit={submit} />
    </div>
  );
}

export default FilterOverlay;
