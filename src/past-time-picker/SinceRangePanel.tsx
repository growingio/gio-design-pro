import React from 'react';
import {
  format,
  getTime,
  startOfToday,
  startOfYesterday,
  isBefore,
  differenceInDays,
  startOfDay,
  isValid,
} from 'date-fns';
import { usePrefixCls } from '@gio-design/utils';
import { TabNav } from '@gio-design/components';
import DatePicker from '@gio-design/components/es/date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePanelProps } from './interfaces';
import { DATE_FORMAT, END_DATE_MAPPING } from './constant';
import { parseStartAndEndDate } from './utils';

function SinceRangePanel({ value, onSelect, onCancel, experimental }: RangePanelProps) {
  const endDateKeys = ['today', experimental ? 'yesterday' : undefined];
  const dates = parseStartAndEndDate(value);
  const prefixCls = usePrefixCls('range-panel__header');
  const [startDate, setStartDate] = React.useState<Date | undefined>(dates[0]);
  const [endKey, setEndKey] = React.useState(endDateKeys[dates[1] ? differenceInDays(startOfToday(), dates[1]) : 0]);

  const renderHeader = () => {
    const startDateString = startDate ? format(startDate, DATE_FORMAT) : '开始日期';
    return (
      <>
        <span className={`${prefixCls}__text`}>{`从 ${startDateString}`}</span>
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
  const disabledDate = (current: Date) =>
    !isBefore(current, endKey === 'yesterday' ? startOfYesterday() : startOfToday());

  const handleOnOK = () => {
    // @ts-ignore
    onSelect(`since:${getTime(startOfDay(startDate))}${endKey === 'yesterday' ? ',1' : ''}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(startDate)}
      header={renderHeader()}
      body={<DatePicker disabledDate={disabledDate} value={startDate} onSelect={setStartDate} />}
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default SinceRangePanel;
