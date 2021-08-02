import React from 'react';
import RangeInput from '@gio-design/components/es/date-range-selector/RangeInputTrigger';
import { formatDates } from '@gio-design/components/es/date-range-selector/utils';
import { RangeHeaderProps } from './interfaces';

const AbsoluteRangeHeader: React.FC<RangeHeaderProps> = ({ dateRange, onRangeChange }: RangeHeaderProps) => {
  const handleOnClear = () => {
    onRangeChange([undefined, undefined]);
  };

  return <RangeInput onClear={handleOnClear} placeholder={['开始日期', '结束日期']} value={formatDates(dateRange)} />;
};

export default AbsoluteRangeHeader;
