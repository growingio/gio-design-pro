import React from 'react';
import DatePicker from '@gio-design/components/es/date-picker';
import DateRangePicker from '@gio-design/components/es/date-range-picker';
import { startOfDay, startOfToday, startOfYesterday, subMonths } from 'date-fns';
import { RangeBodyProps } from './interfaces';

function DynamicRangeBody({ dateRange, fixedMode, onRangeChange, disabledDate }: RangeBodyProps) {
  if (fixedMode) {
    const handleOnSelect = (current: Date) => {
      onRangeChange([startOfDay(current), startOfYesterday()]);
    };
    return <DatePicker disabledDate={disabledDate} value={dateRange[0]} onSelect={handleOnSelect} />;
  }
  return (
    <DateRangePicker
      defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
      disabledDate={disabledDate}
      onSelect={onRangeChange}
      // @ts-ignore
      value={dateRange}
    />
  );
}

export default DynamicRangeBody;
