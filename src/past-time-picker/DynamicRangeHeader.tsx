import React from 'react';
import { Input, Button } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { PlusCircleFilled } from '@gio-design/icons';
import moment, { Moment } from 'moment';
import { RangeHeaderProps } from './interfaces';

const convertDateToDays = (date: Moment | undefined, defaultValue: number) =>
  date ? moment().diff(date, 'days') : defaultValue;

function DynamicRangeHeader({ dateRange, onRangeChange, onModeChange }: RangeHeaderProps) {
  const [startDays, setStartDays] = React.useState<number>(convertDateToDays(dateRange[0], 8));
  const [endDays, setEndDays] = React.useState<number>(convertDateToDays(dateRange[1], 1));
  const [endDaysHidden, setEndDaysHidden] = React.useState(true);

  const basePrefixCls = usePrefixCls('range-panel');
  const setRange = (start: number, end: number) => {
    const startDate = moment().startOf('day').subtract(start, 'days');
    const endDate = moment().startOf('day').subtract(end, 'days');
    onRangeChange([startDate, endDate]);
  };

  const renderDuration = () => {
    const duration = startDays - endDays;
    return (
      <>
        <span className={`${basePrefixCls}__header__text`}>过去</span>
        <span className={`${basePrefixCls}__header__input-number`}>
          <Input.InputNumber
            min={endDays}
            max={10000}
            value={duration}
            onChange={(value) => {
              setRange((value as number) + endDays, endDays);
            }}
            size="middle"
          />
        </span>
        <span className={`${basePrefixCls}__header__text`}>天</span>
        <Button
          className={`${basePrefixCls}__header__button`}
          type="secondary"
          icon={<PlusCircleFilled />}
          onClick={() => {
            setEndDaysHidden(false);
            onModeChange?.(false);
          }}
        >
          结束日期
        </Button>
      </>
    );
  };
  const renderRange = () => (
    <>
      <span className={`${basePrefixCls}__header__text`}>过去</span>
      <span className={`${basePrefixCls}__header__input-number`}>
        <Input.InputNumber
          min={0}
          max={startDays}
          value={endDays}
          onChange={(value) => {
            setRange(startDays, value as number);
          }}
          size="middle"
        />
      </span>
      <span className={`${basePrefixCls}__header__text`}>至</span>
      <span className={`${basePrefixCls}__header__input-number`}>
        <Input.InputNumber
          min={endDays}
          max={10000}
          value={startDays}
          onChange={(value) => {
            setRange(value as number, endDays);
          }}
          size="middle"
        />
      </span>
      <span className={`${basePrefixCls}__header__text`}>天</span>
    </>
  );

  React.useEffect(() => {
    const currentEndDays = convertDateToDays(dateRange[1], 1);
    setStartDays(convertDateToDays(dateRange[0], 8));
    setEndDays(currentEndDays);
    setEndDaysHidden(currentEndDays === 1);
  }, [dateRange]);

  return endDaysHidden ? renderDuration() : renderRange();
}

export default DynamicRangeHeader;
