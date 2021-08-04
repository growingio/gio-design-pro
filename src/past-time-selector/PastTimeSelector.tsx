import React from 'react';
import { useControlledState } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import Selector from '@gio-design/components/es/selector';
import { PastTimeSelectorProps } from './interfaces';
import PastTimePicker from '../past-time-picker';
import { humanizeTimeRange } from '../past-time-picker/utils';

const PastTimeSelector = ({
  fitContent = true,
  value,
  onSelect,
  onCancel,
  shortcutFilter,
  experimental,
  ...restProps
}: PastTimeSelectorProps) => {
  const [controlledVisible, setControlledVisible] = React.useState<boolean>(false);
  const [timeRange, setTimeRange] = useControlledState<string | undefined>(value, undefined);

  const handleOnClear = () => {
    setTimeRange(undefined);
  };
  const handleOnSelect = (currentValue: string) => {
    setTimeRange(currentValue, true);
    setControlledVisible(false);
    onSelect?.(currentValue);
  };
  const handleOnCancel = () => {
    setControlledVisible(false);
    onCancel?.();
  };
  const handleDropdownVisible = (visible: boolean) => {
    setControlledVisible(visible);
  };
  const dropdownRender = () => (
    <PastTimePicker
      experimental={experimental}
      timeRange={timeRange}
      onSelect={handleOnSelect}
      onCancel={handleOnCancel}
      shortcutFilter={shortcutFilter}
    />
  );
  const renderItem = () => {
    if (timeRange) {
      return (
        <>
          <CalendarOutlined size="14px" />
          <span style={{ marginLeft: 8, marginRight: 10 }}>{humanizeTimeRange(timeRange)}</span>
        </>
      );
    }
    return timeRange;
  };

  return (
    <Selector
      {...restProps}
      actived={controlledVisible}
      fitContent={fitContent}
      visible={controlledVisible}
      overlay={dropdownRender}
      onClear={handleOnClear}
      onVisibleChange={handleDropdownVisible}
      itemRender={renderItem}
    />
  );
};

export default PastTimeSelector;
