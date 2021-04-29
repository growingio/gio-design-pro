import React from 'react';
import { Button } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import { RangeCalendarProps } from './interfaces';
import { DATE_FORMAT } from './constant';

const RangeCalendar: React.FC<RangeCalendarProps> = ({ onOk, onCancel, disabledOk, ...props }: RangeCalendarProps) => {
  const prefixCls = usePrefixCls('range-calendar');

  const renderFooter = () => (
    <>
      <Button onClick={onCancel} type="secondary" size="middle">
        取消
      </Button>
      <Button disabled={disabledOk} onClick={onOk} size="middle">
        确定
      </Button>
    </>
  );

  return (
    <RcRangeCalendar
      {...props}
      locale={zhCN}
      format={DATE_FORMAT}
      showToday={false}
      showOk={false}
      showDateInput={false}
      prefixCls={prefixCls}
      renderFooter={renderFooter}
    />
  );
};

export default RangeCalendar;
