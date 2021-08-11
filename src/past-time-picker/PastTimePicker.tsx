import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import SelectList from '@gio-design/components/es/list-picker';
import { filter } from 'lodash';
import QuickPicker from './QuickPicker';
import { PastTimePickerProps, TimeMode } from './interfaces';
import { quickOptions, PICKER_OPTIONS } from './constant';
import { parseTimeMode } from './utils';
import AbsoluteRangePicker from './AbsoluteRangePicker';
import SinceRangePicker from './SinceRangePicker';
import RelativeRangePicker from './RelativeRangePicker';

function PastTimePicker({
  disabledDate,
  modes = [TimeMode.Since, TimeMode.Relative, TimeMode.Absolute],
  timeRange,
  onSelect,
  onCancel,
  experimental = false,
  quickOptionsFilter,
}: PastTimePickerProps) {
  const parseMode = (currentRange: string | undefined) => parseTimeMode(currentRange);
  const originMode = parseMode(timeRange) ?? 'quick';
  const [mode, setMode] = React.useState<string | undefined>(originMode);
  const [currentRange, setCurrentRange] = React.useState(timeRange);
  const prefixCls = usePrefixCls('past-time-picker');

  const handleOnSelect = (value: string) => {
    setCurrentRange(value);
    onSelect?.(value);
  };
  const renderPicker = (currentMode: string | undefined) => {
    const valueProps = {
      disabledDate,
      experimental,
      timeRange: currentMode === originMode ? currentRange : undefined,
      onSelect: handleOnSelect,
      onCancel,
    };
    switch (currentMode) {
      case 'quick':
        return <QuickPicker {...valueProps} options={quickOptions} optionsFilter={quickOptionsFilter} />;
      case TimeMode.Since:
        return <SinceRangePicker {...valueProps} />;
      case TimeMode.Relative:
        return <RelativeRangePicker {...valueProps} />;
      case TimeMode.Absolute:
      default:
        return <AbsoluteRangePicker {...valueProps} />;
    }
  };

  React.useEffect(() => {
    setMode(parseMode(timeRange) ?? 'quick');
  }, [timeRange]);

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}__time-mode`}>
        <SelectList
          options={filter(PICKER_OPTIONS, (o) => o.value === 'quick' || modes.includes(o.value))}
          value={mode}
          onSelect={(value) => {
            setMode(value);
          }}
        />
      </div>
      <div className={`${prefixCls}__panel`}>{renderPicker(mode)}</div>
    </div>
  );
}

export default PastTimePicker;
