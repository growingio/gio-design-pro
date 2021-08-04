import React from 'react';
import { differenceInDays, startOfToday, isBefore, startOfDay, isValid, isYesterday, startOfYesterday } from 'date-fns';
import DynamicRangeBody from './DynamicRangeBody';
import DynamicRangeHeader from './DynamicRangeHeader';
import InnerRangePanel from './InnerRangePanel';
import { RangePanelProps } from './interfaces';
import { parseStartAndEndDate } from './utils';

function DynamicRangePanel({ value, onSelect, onCancel }: RangePanelProps) {
  const defaultDates = parseStartAndEndDate(value);
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(defaultDates);
  const [endDateHidden, setEndDateHidden] = React.useState<boolean>(
    defaultDates[1] ? isYesterday(defaultDates[1]) : true
  );

  const disabledDate = (current: Date) =>
    !isBefore(startOfDay(current), endDateHidden ? startOfYesterday() : startOfToday());
  const handleOnOK = () => {
    // @ts-ignore
    const timeRange = `day:${differenceInDays(startOfToday(), dates[0])},${differenceInDays(startOfToday(), dates[1])}`;
    onSelect(timeRange);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={<DynamicRangeHeader dateRange={dates} onRangeChange={setDates} onModeChange={setEndDateHidden} />}
      body={
        <DynamicRangeBody
          dateRange={dates}
          fixedMode={endDateHidden}
          disabledDate={disabledDate}
          onRangeChange={setDates}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default DynamicRangePanel;
