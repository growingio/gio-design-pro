import React from 'react';
import { Input, Button } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { PlusOutlined } from '@gio-design/icons';
import { differenceInDays, startOfDay, startOfToday } from 'date-fns';
import { subDays } from 'date-fns/esm';
import { RangeHeaderProps } from './interfaces';

const convertDateToDays = (date: Date | undefined, defaultValue: number | undefined) =>
  date ? differenceInDays(startOfToday(), startOfDay(date)) : defaultValue;

function DynamicRangeHeader({ dateRange, onRangeChange, onModeChange }: RangeHeaderProps) {
  const [startDays, setStartDays] = React.useState<number | undefined>(convertDateToDays(dateRange[0], undefined));
  const [endDays, setEndDays] = React.useState<number | undefined>(convertDateToDays(dateRange[1], 1));
  const [endDaysHidden, setEndDaysHidden] = React.useState(endDays === 1);

  const basePrefixCls = usePrefixCls('range-panel');
  const setRange = (start: number, end: number) => {
    const startDate = subDays(startOfToday(), start);
    const endDate = subDays(startOfToday(), end);
    onRangeChange([startDate, endDate]);
  };

  const renderDuration = () => {
    const duration = startDays && endDays ? startDays - endDays : undefined;
    return (
      <>
        <span className={`${basePrefixCls}__header__text`}>过去</span>
        <span className={`${basePrefixCls}__header__input-number`} data-testid="duration">
          <Input.InputNumber
            min={endDays}
            max={10000}
            // @ts-ignore
            value={duration}
            onChange={(value) => {
              setRange((value as number) + (endDays as number), endDays as number);
            }}
            size="small"
          />
        </span>
        <span className={`${basePrefixCls}__header__text`}>天</span>
        <Button
          className={`${basePrefixCls}__header__button`}
          type="secondary"
          icon={<PlusOutlined />}
          onClick={() => {
            if (!startDays) {
              setEndDays(undefined);
            }
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
      <span className={`${basePrefixCls}__header__text`}>过去</span>
      <span className={`${basePrefixCls}__header__input-number`} data-testid="end-days">
        <Input.InputNumber
          min={0}
          max={startDays}
          // @ts-ignore
          value={endDays}
          onChange={(value) => {
            setRange(startDays as number, value as number);
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__header__text`}>至</span>
      <span className={`${basePrefixCls}__header__input-number`} data-testid="start-days">
        <Input.InputNumber
          min={endDays}
          max={10000}
          // @ts-ignore
          value={startDays}
          onChange={(value) => {
            setRange(value as number, endDays as number);
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__header__text`}>天</span>
    </>
  );

  React.useEffect(() => {
    const currentEndDays = convertDateToDays(dateRange[1], 1);
    setStartDays(convertDateToDays(dateRange[0], undefined));
    setEndDays(currentEndDays);
  }, [dateRange]);

  return endDaysHidden ? renderDuration() : renderRange();
}

export default DynamicRangeHeader;
