import React, { useState } from 'react';
import { Dropdown, Button } from '@gio-design/components';
import { FilterOutlined } from '@gio-design/icons';
import FilterOverlay from './components/FilterOverlay/index';
import './style/index.less';

import { FilterPickerProps, FilterValueType, operationsOptionType } from './interfaces';

export const FilterPickerContext = React.createContext<Pick<FilterPickerProps, 'fetchDetailData' | 'operationsOption'>>(
  {}
);

const defaultOperationsOption: operationsOptionType = {
  string: ['=', '!=', 'in', 'not in', 'like', 'not like', 'hasValue', 'noValue'],
  int: ['=', '!=', '>', '>=', '<', '<=', 'between', 'not between', 'hasValue', 'noValue'],
  date: ['=', '!=', '>', '<', 'relativeBetween', 'relativeCurrent', 'between', 'not between', 'hasValue', 'noValue'],
  STRING: ['=', '!=', 'in', 'not in', 'like', 'not like'],
};

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
    fetchDetailData,
    operationsOption,
    hasVisible = false,
    visible,
    onVisibleChange,
    placement = 'bottomRight',
  } = props;
  const [localVisible, setLocalVisible] = useState(false);
  const visibleChange = (v: boolean) => {
    setLocalVisible(v);
    onVisibleChange?.(v);
  };
  const cancel = () => {
    setLocalVisible(false);
    hasVisible && onVisibleChange?.(false);
  };
  const submit = (v: FilterValueType[]) => {
    setLocalVisible(false);
    hasVisible && onVisibleChange?.(false);
    onConfirm({ ...filter, exprs: v });
  };
  return (
    <FilterPickerContext.Provider
      value={{ fetchDetailData, operationsOption: { ...defaultOperationsOption, ...operationsOption } }}
    >
      <Dropdown
        visible={hasVisible ? visible : localVisible}
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
        placement={placement}
        getTooltipContainer={getTooltipContainer}
        destroyTooltipOnHide
      >
        {children || <Button icon={<FilterOutlined />} size="small" type={!localVisible ? 'link' : 'secondary'} />}
      </Dropdown>
    </FilterPickerContext.Provider>
  );
};

export default FilterPicker;
