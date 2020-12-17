import React, { useState } from 'react';
import { Dropdown } from '@gio-design-new/components';
import { FilterOutlined } from '@gio-design/icons';
import FilterCondition from './components/FilterCondition/index';
import './style/index.less';

import { FilterPickerProps } from './interfaces';

const FilterPicker = (props: FilterPickerProps) => {
  const { children, getTooltipContainer } = props;
  const [visible, setVisible] = useState(false);
  const visibleChange = (v: boolean) => {
    setVisible(v);
  };
  const cancel = () => {
    setVisible(false);
  };
  const submit = () => {
    setVisible(false);
  };
  return (
    <Dropdown
      visible={visible}
      trigger={['click']}
      onVisibleChange={visibleChange}
      overlay={<FilterCondition onCancel={cancel} onSubmit={submit} />}
      placement="bottomRight"
      getTooltipContainer={getTooltipContainer}
    >
      {children || (
        <span className="filter-picker_icon">
          <FilterOutlined size="14px" /> 过滤条件
        </span>
      )}
    </Dropdown>
  );
};

export default FilterPicker;
