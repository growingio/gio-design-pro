import React from 'react';
import { getTime, isValid, isAfter, startOfToday, subMonths, endOfDay, startOfDay } from 'date-fns';
import DateRangePicker from '@gio-design/components/es/date-range-picker';
import { formatDates } from '@gio-design/components/es/date-range-selector/utils';
import { usePrefixCls } from '@gio-design/utils';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';

function AbsoluteRangePicker({ disabledDate, timeRange, onSelect, onCancel }: RangePickerProps) {
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(parseStartAndEndDate(timeRange));
  const prefixCls = usePrefixCls('range-panel__header');

  const renderHeader = () => {
    const placeholder = ['开始日期', '结束日期'];
    const dateStrings = formatDates(dates);
    const text = [dateStrings[0] ?? placeholder[0], dateStrings[1] ?? placeholder[1]];
    return <span className={`${prefixCls}__text`}>{`从 ${text[0]} 至 ${text[1]}`}</span>;
  };
  const handleDisabledDate = (current: Date) => disabledDate?.(current) || isAfter(current, startOfToday());
  const handleOnOK = () => {
    // @ts-ignore
    onSelect(`abs:${getTime(startOfDay(dates[0]))},${getTime(endOfDay(dates[1]))}`);
  };

  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={renderHeader()}
      body={
        <DateRangePicker
          defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
          disabledDate={handleDisabledDate}
          onSelect={setDates}
          // @ts-ignore
          value={dates}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default AbsoluteRangePicker;
