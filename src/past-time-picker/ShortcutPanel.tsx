import React from 'react';
import { usePrefixCls, useControlledState as useState } from '@gio-design/utils';
import SelectList from './SelectList';
import { ShortcutPanelProps } from './interfaces';
import { experimentalShortcutOptions } from './constant';

const ShortcutPanel: React.FC<ShortcutPanelProps> = ({
  options,
  onSelect,
  value,
  experimental,
}: ShortcutPanelProps) => {
  const [currentValue, setCurrentValue] = useState(value, '');
  const prefixCls = usePrefixCls('shortcut-panel');
  let [left, right] = options;
  if (experimental) {
    left = [...left, ...experimentalShortcutOptions[0]];
    right = [...right, ...experimentalShortcutOptions[1]];
  }

  const handleOnSelect = (selectedValue: string) => {
    setCurrentValue(selectedValue);
    onSelect?.(selectedValue);
  };

  return (
    <div className={prefixCls}>
      <SelectList value={currentValue} options={left.filter((o) => o)} onSelect={handleOnSelect} />
      <SelectList value={currentValue} options={right.filter((o) => o)} onSelect={handleOnSelect} />
    </div>
  );
};

export default ShortcutPanel;
