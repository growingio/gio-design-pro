import React from 'react';
import { getTime, isValid, isBefore, startOfToday, subMonths, endOfDay, startOfDay } from 'date-fns';
import DateRangePicker from '@gio-design/components/es/date-range-picker';
import { formatDates } from '@gio-design/components/es/date-range-selector/utils';
import { usePrefixCls } from '@gio-design/utils';
import InnerRangePanel from './InnerRangePanel';
import { RangePanelProps } from './interfaces';
import { parseStartAndEndDate } from './utils';

function AbsoluteRangePanel({ value, onSelect, onCancel }: RangePanelProps) {
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(parseStartAndEndDate(value));
  const prefixCls = usePrefixCls('range-panel__header');

  const renderHeader = () => {
    const placeholder = ['开始日期', '结束日期'];
    const dateStrings = formatDates(dates);
    const text = [dateStrings[0] ?? placeholder[0], dateStrings[1] ?? placeholder[1]];
    return <span className={`${prefixCls}__text`}>{`从 ${text[0]} 至 ${text[1]}`}</span>;
  };
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
          disabledDate={(current: Date) => !isBefore(current, startOfToday())}
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

export default AbsoluteRangePanel;
