import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { DatePicker, DateRangePicker } from '@gio-design-new/components';
import RelativeCurrent from './components/relativeCurrent';
import RelativeBetween from './components/relativeBetween';
import IncludeToday from './components/IncludeToday';

interface DateAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
}
function DateAttrSelect(props: DateAttrSelectProps) {
  const { attrSelect, attrChange, values } = props;
  const [time, setTime] = useState<Moment>(values[0] ? moment(values[0]) : moment(new Date()));
  const [timeRange, setTimeRange] = useState<Moment[]>(
    values.length === 2 ? [moment(values[0]), moment(values[1])] : [moment(new Date()), moment(new Date())]
  );

  useEffect(() => {
    if (attrSelect.includes('relative')) {
      if (attrSelect.includes('Current')) {
        attrChange(['relateTime: -1, 0']);
      } else {
        attrChange(['relateTime: -1, -1']);
      }
    } else if (attrSelect === 'between') {
      attrChange([timeRange[0].valueOf(), timeRange[1].valueOf()]);
    } else {
      attrChange([time.valueOf()]);
    }
  }, [attrSelect]);

  const changeDate = (value: Moment | null) => {
    value && setTime(value);
    attrChange([value.valueOf()]);
  };
  const relativeDateChange = (v: string) => {
    attrChange([v]);
  };
  const dateRangeChange = (value: Array<Moment> | null) => {
    value && setTimeRange(value);
    attrChange([value[0].valueOf(), value[1].valueOf()]);
  };

  switch (attrSelect) {
    case '=':
    case '!=':
      return <DatePicker value={time} showFooter onChange={changeDate} format="YYYY/MM/DD" />;
    case '>':
    case '>=':
    case '<=':
    case '<':
      return <IncludeToday time={time} onChange={changeDate} attrSelect={attrSelect} />;
    case 'relativeCurrent':
      return <RelativeCurrent onChange={relativeDateChange} attrSelect={attrSelect} values={values} />;
    case 'relativeBetween':
      return <RelativeBetween onChange={relativeDateChange} attrSelect={attrSelect} values={values} />;
    case 'between':
      return <DateRangePicker value={timeRange} onChange={dateRangeChange} showFooter format="YYYY/MM/DD" />;
    default:
      return null;
  }
}

export default DateAttrSelect;
