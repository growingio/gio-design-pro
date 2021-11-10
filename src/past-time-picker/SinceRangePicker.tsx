import React from 'react';
import {
  format,
  getTime,
  startOfToday,
  startOfYesterday,
  differenceInDays,
  startOfDay,
  isValid,
  isAfter,
} from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { TabNav } from '@gio-design/components';
import DatePicker from '@gio-design/components/es/date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { DATE_FORMAT } from './constant';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';

function SinceRangePicker({ disabledDate, timeRange, onSelect, onCancel, experimental }: RangePickerProps) {
  const endDateKeys = ['today', experimental ? 'yesterday' : undefined];
  const dates = parseStartAndEndDate(timeRange);
  const prefixCls = usePrefixCls('range-panel__header');
  const [startDate, setStartDate] = React.useState<Date | undefined>(dates[0]);
  const [endKey, setEndKey] = React.useState(endDateKeys[dates[1] ? differenceInDays(startOfToday(), dates[1]) : 0]);

  const locale = useLocale('PastTimePicker') || defaultLocale;

  const { startDayText, FromText, toTodayText, toYesterdayText } = {
    ...defaultLocale,
    ...locale,
  } as any;

  const END_DATE_MAPPING: { [key: string]: string } = {
    today: toTodayText,
    yesterday: toYesterdayText,
  };

  const renderHeader = () => {
    const startDateString = startDate ? format(startDate, DATE_FORMAT) : startDayText;
    return (
      <>
        <span className={`${prefixCls}__text`}>{`${FromText} ${startDateString}`}</span>
        <span className={`${prefixCls}__options`}>
          <TabNav
            size="small"
            defaultActiveKey={endKey}
            onChange={(key) => {
              setEndKey(key);
            }}
          >
            {endDateKeys.map((o: string) => o && <TabNav.Item key={o}>{END_DATE_MAPPING[o]}</TabNav.Item>)}
          </TabNav>
        </span>
      </>
    );
  };
  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(current, endKey === 'yesterday' ? startOfYesterday() : startOfToday());

  const handleOnOK = () => {
    // @ts-ignore
    onSelect(`since:${getTime(startOfDay(startDate))}${endKey === 'yesterday' ? ',1' : ''}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(startDate)}
      header={renderHeader()}
      body={<DatePicker disabledDate={handleDisabledDate} value={startDate} onSelect={setStartDate} />}
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default SinceRangePicker;
