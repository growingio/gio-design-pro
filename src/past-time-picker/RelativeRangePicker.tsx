import React from 'react';
import { differenceInDays, startOfToday, isBefore, startOfDay, isValid, isYesterday, startOfYesterday } from 'date-fns';
import RelativeRangeBody from './RelativeRangeBody';
import RelativeRangeHeader from './RelativeRangeHeader';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';

function RelativeRangePciker({ disabledDate, timeRange, onSelect, onCancel }: RangePickerProps) {
  const defaultDates = parseStartAndEndDate(timeRange);
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(defaultDates);
  const [endDateHidden, setEndDateHidden] = React.useState<boolean>(
    defaultDates[1] ? isYesterday(defaultDates[1]) : true
  );

  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || !isBefore(startOfDay(current), endDateHidden ? startOfYesterday() : startOfToday());
  const handleOnOK = () => {
    // @ts-ignore
    onSelect(`day:${differenceInDays(startOfToday(), dates[0])},${differenceInDays(startOfToday(), dates[1])}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={<RelativeRangeHeader dateRange={dates} onRangeChange={setDates} onModeChange={setEndDateHidden} />}
      body={
        <RelativeRangeBody
          dateRange={dates}
          fixedMode={endDateHidden}
          disabledDate={handleDisabledDate}
          onRangeChange={setDates}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default RelativeRangePciker;
