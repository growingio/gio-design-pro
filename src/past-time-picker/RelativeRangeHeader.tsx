import React from 'react';
import { Input, Button } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { PlusOutlined } from '@gio-design/icons';
import { differenceInDays, startOfDay, startOfToday } from 'date-fns';
import { subDays } from 'date-fns/esm';
import { RelativeRangeHeaderProps } from './interfaces';

const convertDateToDays = (date: Date | undefined, defaultValue: number) =>
  date ? differenceInDays(startOfToday(), startOfDay(date)) : defaultValue;

function RelativeRangeHeader({ dateRange, onRangeChange, onModeChange }: RelativeRangeHeaderProps) {
  const [startDays, setStartDays] = React.useState<number>(convertDateToDays(dateRange[0], 2));
  const [endDays, setEndDays] = React.useState<number>(convertDateToDays(dateRange[1], 1));
  const [endDaysHidden, setEndDaysHidden] = React.useState(endDays === 1);

  const basePrefixCls = usePrefixCls('range-panel__header');
  const setRange = (start: number, end: number) => {
    const startDate = subDays(startOfToday(), start);
    const endDate = subDays(startOfToday(), end);
    onRangeChange([startDate, endDate]);
  };

  const renderDuration = () => {
    const duration = startDays - endDays;
    return (
      <>
        <span className={`${basePrefixCls}__text`}>过去</span>
        <span className={`${basePrefixCls}__input-number`} data-testid="duration">
          <Input.InputNumber
            min={1}
            max={9999}
            value={duration}
            onChange={(value) => {
              if (value && value >= 1 && value <= 9999) {
                setRange((value as number) + (endDays as number), endDays as number);
              }
            }}
            size="small"
          />
        </span>
        <span className={`${basePrefixCls}__text`}>天</span>
        <Button
          className={`${basePrefixCls}__button`}
          type="secondary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEndDaysHidden(false);
            onModeChange(false);
          }}
          size="small"
        >
          结束日期
        </Button>
      </>
    );
  };
  const renderRange = () => (
    <>
      <span className={`${basePrefixCls}__text`}>过去</span>
      <span className={`${basePrefixCls}__input-number`} data-testid="end-days">
        <Input.InputNumber
          min={0}
          max={startDays - 1}
          value={endDays}
          onChange={(value) => {
            if (value && value < startDays) {
              setRange(startDays as number, value as number);
            }
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__text`}>至</span>
      <span className={`${basePrefixCls}__input-number`} data-testid="start-days">
        <Input.InputNumber
          min={endDays + 1}
          max={10000}
          value={startDays}
          onChange={(value) => {
            if (value && value > endDays) {
              setRange(value as number, endDays as number);
            }
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__text`}>天</span>
    </>
  );

  React.useEffect(() => {
    const currentEndDays = convertDateToDays(dateRange[1], 1);
    setStartDays(convertDateToDays(dateRange[0], 2));
    setEndDays(currentEndDays);
  }, [dateRange]);

  return endDaysHidden ? renderDuration() : renderRange();
}

export default RelativeRangeHeader;
