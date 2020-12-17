import React from 'react';
import { PlusCircleFilled } from '@gio-design/icons';
import Footer from '../Footer';
import './index.less';

interface FilterConditionProps {
  onCancel: () => void;
  onSubmit: () => void;
}
function FilterCondition(props: FilterConditionProps) {
  const { onCancel, onSubmit } = props;
  return (
    <div className="filter-condition_box">
      <div className="filter-condition_title">选择过滤条件</div>
      <div>aaa</div>
      <div className="filter-condition_addContion">
        <PlusCircleFilled size="14px" />
        <span className="filter-condition_addtxt">添加过滤条件</span>
      </div>
      <Footer cancel={onCancel} submit={onSubmit} />
    </div>
  );
}

export default FilterCondition;
