import React from 'react';
import { usePrefixCls, useControlledState as useState } from '@gio-design/utils';
import SelectList from '@gio-design/components/es/list-picker';
import { Option } from '@gio-design/components/es/components/list-pro/interface';
import { QuickPickerProps } from './interfaces';
import { experimentalQuickOptions } from './constant';

function QuickPicker({ options, optionsFilter, onSelect, timeRange, experimental }: QuickPickerProps) {
  const [currentValue, setCurrentValue] = useState(timeRange, '');
  const prefixCls = usePrefixCls('quick-picker');

  const filter = (currentOptions: Option[]) => {
    if (optionsFilter) {
      return currentOptions.filter(optionsFilter);
    }
    return currentOptions;
  };

  let [left, right] = options;
  if (experimental) {
    left = [...left, ...experimentalQuickOptions[0]];
    right = [...right, ...experimentalQuickOptions[1]];
  }

  const handleOnSelect = (selectedValue: string) => {
    setCurrentValue(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className={prefixCls}>
      <SelectList value={currentValue} options={filter(left)} onSelect={handleOnSelect} />
      <SelectList value={currentValue} options={filter(right)} onSelect={handleOnSelect} />
    </div>
  );
}

export default QuickPicker;