import React from 'react';
import classnames from 'classnames';
import moment, { Moment } from 'moment';
import { usePrefixCls, useControlledState as useState } from '@gio-design/utils';
import RangeCalendar from './RangeCalendar';
import SinceRangeHeader from './SinceRangeHeader';
import DynamicRangeHeader from './DynamicRangeHeader';
import AbsoluteRangeHeader from './AbsoluteRangeHeader';
import { EndDateFixedMode, RangePanelProps, TimeCalculationMode } from './interfaces';
import { parseFixedMode, parseStartAndEndDate, parseTimeCalcMode } from './utils';

function RangePanel({ value, timeCalculationMode, onSelect, onCancel, experimental = false }: RangePanelProps) {
  const calendarContainerRef = React.useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(value, undefined);
  const [dates, setDates] = React.useState<(Moment | undefined)[]>(parseStartAndEndDate(currentValue));
  const [fixedMode, setFixedMode] = React.useState<EndDateFixedMode>(parseFixedMode(currentValue));

  const prefixCls = usePrefixCls('range-panel');
  const cls = classnames(prefixCls);

  const handleDisabledDate = (current: Moment) => {
    const realEndDate =
      fixedMode === 'yesterday' ? moment().startOf('day').subtract(1, 'day') : moment().startOf('day');
    return current.diff(realEndDate, 'day') > 0;
  };
  const handleOnRangeChange = (currentDates: Moment[]) => {
    setDates(currentDates);
  };
  const handleOnOk = () => {
    const [currentStartDate, currentEndDate] = dates;
    let timeRange;
    switch (timeCalculationMode) {
      case TimeCalculationMode.Since:
        timeRange = `since:${currentStartDate?.valueOf()}${
          moment().startOf('day').diff(currentEndDate, 'day') > 0 ? ',1' : ''
        }`;
        break;
      case TimeCalculationMode.Dynamic:
        timeRange = `day:${moment().diff(currentStartDate, 'days')},${moment().diff(currentEndDate, 'days')}`;
        break;
      default:
        timeRange = `abs:${currentStartDate?.valueOf()},${currentEndDate?.endOf('day').valueOf()}`;
    }
    setCurrentValue(timeRange);
    onSelect?.(timeRange);
  };
  const handleCalendarOnClick = (e: MouseEvent) => {
    if (fixedMode) {
      const element = e.target as HTMLDivElement;
      if (element.className.endsWith('calendar-date')) {
        const date = fixedMode === 'today' ? moment() : moment().subtract(1, 'day');
        (
          calendarContainerRef?.current?.querySelector(`td[title='${date.format('M月 D, YYYY')}']`) as HTMLElement
        )?.click();
      }
    }
  };

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
    calendarContainerRef.current.onclick = handleCalendarOnClick;
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
          setDates([moment().startOf('day').subtract(8, 'days'), moment().startOf('day').subtract(1, 'day')]);
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
      <div className={`${prefixCls}__calendar`} ref={calendarContainerRef}>
        <RangeCalendar
          disabledOk={!dates[0]?.isValid() || !dates[1]?.isValid()}
          selectedValue={dates}
          onSelect={handleOnRangeChange}
          disabledDate={handleDisabledDate}
          onOk={handleOnOk}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}

export default RangePanel;
