import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useControlledState as useState } from '@gio-design/utils';
import DateRangePicker from '@gio-design/components/es/date-range-picker';
import Button from '@gio-design/components/es/components/button';
import {
  differenceInDays,
  getTime,
  isValid,
  isYesterday,
  startOfToday,
  startOfYesterday,
  subDays,
  subMonths,
} from 'date-fns';
import SinceRangeHeader from './SinceRangeHeader';
import DynamicRangeHeader from './DynamicRangeHeader';
import AbsoluteRangeHeader from './AbsoluteRangeHeader';
import { EndDateFixedMode, RangePanelProps, TimeCalculationMode } from './interfaces';
import { parseFixedMode, parseStartAndEndDate, parseTimeCalcMode } from './utils';

function RangePanel({ value, timeCalculationMode, onSelect, onCancel, experimental = false }: RangePanelProps) {
  const [currentValue, setCurrentValue] = useState(value, undefined);
  const [dates, setDates] = React.useState<[Date, Date]>(parseStartAndEndDate(currentValue));
  const [fixedMode, setFixedMode] = React.useState<EndDateFixedMode>(parseFixedMode(currentValue));

  const prefixCls = usePrefixCls('range-panel');
  const cls = classnames(prefixCls);

  const handleDisabledDate = (current: Date) => {
    const realEndDate = fixedMode === 'yesterday' ? startOfYesterday() : startOfToday();
    return differenceInDays(current, realEndDate) >= 0;
  };
  const handleOnRangeChange = (currentDates: [Date | undefined, Date | undefined]) => {
    if (fixedMode) {
      const date = fixedMode === 'yesterday' ? startOfYesterday() : startOfToday();
      setDates([currentDates[0], date]);
    } else {
      setDates(currentDates);
    }
  };
  const handleOnOk = () => {
    const [currentStartDate, currentEndDate] = dates;
    let timeRange;
    switch (timeCalculationMode) {
      case TimeCalculationMode.Since:
        timeRange = `since:${getTime(currentStartDate)}${isYesterday(currentEndDate) ? ',1' : ''}`;
        break;
      case TimeCalculationMode.Dynamic:
        timeRange = `day:${differenceInDays(startOfToday(), currentStartDate)},${differenceInDays(
          startOfToday(),
          currentEndDate
        )}`;
        break;
      default:
        timeRange = `abs:${getTime(currentStartDate)},${getTime(currentEndDate)}`;
    }
    setCurrentValue(timeRange);
    onSelect?.(timeRange);
  };
  // const handleCalendarOnClick = (e: MouseEvent) => {
  //   if (fixedMode) {
  //     const element = e.target as HTMLDivElement;
  //     if (element.className.endsWith('calendar-date')) {
  //       const date = fixedMode === 'today' ? moment() : moment().subtract(1, 'day');
  //       (
  //         calendarContainerRef?.current?.querySelector(`td[title='${date.format('M月 D, YYYY')}']`) as HTMLElement
  //       )?.click();
  //     }
  //   }
  // };

  const renderHeader = () => {
    const headerProps = {
      dateRange: dates,
      onRangeChange: handleOnRangeChange,
    };
    switch (timeCalculationMode) {
      case TimeCalculationMode.Since:
        return <SinceRangeHeader {...headerProps} onModeChange={setFixedMode} experimental={experimental} />;
      case TimeCalculationMode.Dynamic:
        return <DynamicRangeHeader {...headerProps} onModeChange={setFixedMode} />;
      default:
        return <AbsoluteRangeHeader {...headerProps} />;
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    // calendarContainerRef.current.onclick = handleCalendarOnClick;
  }, [fixedMode]);
  React.useEffect(() => {
    if (currentValue && parseTimeCalcMode(currentValue) === timeCalculationMode) {
      setDates(parseStartAndEndDate(currentValue));
      setFixedMode(parseFixedMode(currentValue));
    } else {
      switch (timeCalculationMode) {
        case TimeCalculationMode.Since:
          setFixedMode('today');
          setDates([undefined, undefined]);
          break;
        case TimeCalculationMode.Dynamic:
          setFixedMode('yesterday');
          setDates([subDays(startOfToday(), 8), subDays(startOfToday(), 1)]);
          break;
        default:
          setDates([undefined, undefined]);
          setFixedMode(false);
      }
    }
  }, [timeCalculationMode]);

  return (
    <div className={cls}>
      <div className={`${prefixCls}__header`}>{renderHeader()}</div>
      <div className={`${prefixCls}__divider`} />
      <div className={`${prefixCls}__body`}>
        {/* <RangeCalendar
          disabledOk={!dates[0]?.isValid() || !dates[1]?.isValid()}
          selectedValue={dates}
          onSelect={handleOnRangeChange}
          disabledDate={handleDisabledDate}
          onOk={handleOnOk}
          onCancel={onCancel}
        /> */}
        <DateRangePicker
          defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
          disabledDate={handleDisabledDate}
          onSelect={handleOnRangeChange}
          value={dates}
        />
      </div>
      <div className={`${prefixCls}__footer`}>
        <Button onClick={onCancel} type="secondary" size="middle">
          取消
        </Button>
        <Button disabled={!isValid(dates[0]) || !isValid(dates[1])} onClick={handleOnOk} size="middle">
          确定
        </Button>
      </div>
    </div>
  );
}

export default RangePanel;
