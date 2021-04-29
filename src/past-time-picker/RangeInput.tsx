import React from 'react';
import { Input } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import { RangeInputProps } from './interfaces';

const RangeInput: React.FC<RangeInputProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disabled = false,
}: RangeInputProps) => {
  const prefixCls = usePrefixCls('range-input');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange?.(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange?.(e.target.value);
  };

  return (
    <div className={prefixCls}>
      <Input
        className={`${prefixCls}__start`}
        placeholder="开始日期"
        onChange={handleStartDateChange}
        value={startDate}
        disabled={disabled}
      />
      <span className={`${prefixCls}__separator`}>—</span>
      <Input
        className={`${prefixCls}__end`}
        suffix={<CalendarOutlined />}
        placeholder="结束日期"
        onChange={handleEndDateChange}
        value={endDate}
        disabled={disabled}
      />
    </div>
  );
};

export default RangeInput;
