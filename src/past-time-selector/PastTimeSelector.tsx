import React from 'react';
import { useControlledState } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import { PastTimeSelectorProps } from './interfaces';
import Selector from '../selector';
import PastTimePicker from '../past-time-picker';
import { humanizeTimeRange } from '../past-time-picker/utils';

const PastTimeSelector = ({
  disabled = false,
  value,
  onSelect,
  onCancel,
  dropdownVisible,
  onDropdownVisibleChange,
  shortcutFilter,
}: PastTimeSelectorProps) => {
  const [controlledVisible, setControlledVisible] = useControlledState<boolean>(dropdownVisible, false);
  const [timeRange, setTimeRange] = useControlledState<string>(value, '');

  const handleOnSelect = (currentValue: string) => {
    setTimeRange(currentValue, true);
    setControlledVisible(false);
    onDropdownVisibleChange?.(false);
    onSelect?.(currentValue);
  };
  const handleOnCancel = () => {
    setControlledVisible(false);
    onCancel?.();
  };
  const handleDropdownVisible = (visible: boolean) => {
    setControlledVisible(visible);
    onDropdownVisibleChange?.(visible);
  };
  const dropdownRender = () => (
    <PastTimePicker
      timeRange={timeRange}
      onSelect={handleOnSelect}
      onCancel={handleOnCancel}
      shortcutFilter={shortcutFilter}
    />
  );

  return (
    <Selector
      mode="button"
      placeholder="时间范围"
      icon={<CalendarOutlined />}
      disabled={disabled}
      dropdownVisible={controlledVisible}
      dropdownRender={dropdownRender}
      onDropdownVisibleChange={handleDropdownVisible}
      valueRender={() => humanizeTimeRange(timeRange)}
    />
  );
};

export default PastTimeSelector;
