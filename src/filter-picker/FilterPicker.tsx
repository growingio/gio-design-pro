import React, { useState } from 'react';
import { Dropdown, Button } from '@gio-design/components';
import { FilterOutlined } from '@gio-design/icons';
import FilterOverlay from './components/FilterOverlay/index';
import './style/index.less';

import { FilterPickerProps, FilterValueType } from './interfaces';

const FilterPicker = (props: FilterPickerProps) => {
  const {
    children,
    getTooltipContainer,
    filter,
    propertyOptions,
    onConfirm,
    dimensionValueRequest,
    measurements,
    timeRange,
    recentlyStorePrefix,
  } = props;
  const [visible, setVisible] = useState(false);
  const visibleChange = (v: boolean) => {
    setVisible(v);
  };
  const cancel = () => {
    setVisible(false);
  };
  const submit = (v: FilterValueType[]) => {
    setVisible(false);
    onConfirm({ ...filter, exprs: v });
  };
  return (
    <Dropdown
      visible={visible}
      trigger={['click']}
      onVisibleChange={visibleChange}
      overlay={
        <FilterOverlay
          onCancel={cancel}
          onSubmit={submit}
          filterList={filter.exprs}
          propertyOptions={propertyOptions}
          dimensionValueRequest={dimensionValueRequest}
          measurements={measurements}
          timeRange={timeRange}
          recentlyStorePrefix={recentlyStorePrefix}
        />
      }
      placement="bottomRight"
      getTooltipContainer={getTooltipContainer}
      destroyTooltipOnHide
    >
      {children || <Button icon={<FilterOutlined />} size="small" type="assist" />}
    </Dropdown>
  );
};

export default FilterPicker;
