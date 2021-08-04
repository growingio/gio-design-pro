import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import SelectList from '@gio-design/components/es/list-picker';
import ShortcutPanel from './ShortcutPanel';
import { TimeCalculationMode, PastTimePickerProps } from './interfaces';
import { panelModeOptions, shortcutOptions } from './constant';
import { parseTimeCalcMode } from './utils';
import AbsoluteRangePanel from './AbsoluteRangePanel';
import SinceRangePanel from './SinceRangePanel';
import DynamicRangePanel from './DynamicRangePanel';

function PastTimePicker({ timeRange, onSelect, onCancel, experimental = false, shortcutFilter }: PastTimePickerProps) {
  const originMode = parseTimeCalcMode(timeRange);
  const [mode, setMode] = React.useState<string | undefined>(originMode ?? 'shortcut');
  // const [currentRange, setCurrentRange] = useState(timeRange, undefined);
  const [currentRange, setCurrentRange] = React.useState(timeRange);
  const prefixCls = usePrefixCls('past-time-picker');

  const handleOnSelect = (value: string) => {
    setCurrentRange(value);
    onSelect?.(value);
  };
  const renderPanel = (currentMode: string | undefined) => {
    const valueProps = {
      experimental,
      value: currentMode === originMode ? currentRange : undefined,
      onSelect: handleOnSelect,
      onCancel,
    };
    if (currentMode === 'shortcut') {
      const shortcuts =
        typeof shortcutFilter === 'function'
          ? shortcutOptions.map((partial) => partial.filter(shortcutFilter))
          : shortcutOptions;

      return <ShortcutPanel {...valueProps} options={shortcuts} />;
    }
    switch (currentMode) {
      case TimeCalculationMode.Since:
        return <SinceRangePanel {...valueProps} />;
      case TimeCalculationMode.Dynamic:
        return <DynamicRangePanel {...valueProps} />;
      case TimeCalculationMode.Absolute:
      default:
        return <AbsoluteRangePanel {...valueProps} />;
    }
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
