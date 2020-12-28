import React from 'react';
import { Moment } from 'moment';
import { DatePicker } from '@gio-design-new/components';

interface IncludeTodayProps {
  time: Moment;
  onChange: (v: any) => void;
  attrSelect: string;
}
function IncludeToday(props: IncludeTodayProps) {
  const { time, onChange } = props;

  const changeDate = (value: Moment | null) => {
    onChange(value.valueOf());
  };
  return (
    <>
      <DatePicker value={time} showFooter onChange={changeDate} format="YYYY/MM/DD" />
    </>
  );
}

export default IncludeToday;
