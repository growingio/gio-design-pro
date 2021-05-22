import React from 'react';
import { usePrefixCls, useControlledState as useState } from '@gio-design/utils';
import SelectList from './SelectList';
import ShortcutPanel from './ShortcutPanel';
import RangePanel from './RangePanel';
import { TimeCalculationMode, PastTimePickerProps } from './interfaces';
import { panelModeOptions, shortcutOptions } from './constant';
import { parseTimeCalcMode } from './utils';

function PastTimePicker({ timeRange, onSelect, onCancel, experimental = false }: PastTimePickerProps) {
  const [mode, setMode] = React.useState<string | undefined>(parseTimeCalcMode(timeRange) ?? 'shortcut');
  const [currentRange, setCurrentRange] = useState(timeRange, undefined);
  const prefixCls = usePrefixCls('past-time-picker');

  const handleOnSelect = (value: string) => {
    setCurrentRange(value);
    onSelect?.(value);
  };
  const renderPanel = (currentMode: string | undefined) => {
    const valueProps = {
      experimental,
      value: currentRange,
      onSelect: handleOnSelect,
      onCancel,
    };
    if (currentMode === 'shortcut') {
      return <ShortcutPanel {...valueProps} options={shortcutOptions} />;
    }
    return <RangePanel {...valueProps} timeCalculationMode={mode as TimeCalculationMode} />;
  };

  React.useEffect(() => {
    setMode(parseTimeCalcMode(timeRange) ?? 'shortcut');
  }, [timeRange]);

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}__time-mode`}>
        <SelectList
          options={panelModeOptions}
          value={mode}
          onSelect={(value) => {
            setMode(value);
          }}
        />
      </div>
      <div className={`${prefixCls}__panel`}>{renderPanel(mode)}</div>
    </div>
  );
}

export default PastTimePicker;
