/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { DatePicker, DateRangePicker } from '@gio-design/components';
import RelativeCurrent from './components/RelativeCurrent';
import RelativeBetween from './components/RelativeBetween';
import IncludeToday from './components/IncludeToday';

interface DateAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
}
function DateAttrSelect(props: DateAttrSelectProps) {
  const { attrSelect, attrChange, values } = props;
  const [time, setTime] = useState<Moment>(
    values[0] && parseFloat(values[0]).toString() !== 'NaN' ? moment(values[0]) : moment(new Date())
  );
  const [timeRange, setTimeRange] = useState<Moment[]>(
    values.length && values[0]?.includes?.('abs')
      ? [
          moment(parseInt(values[0].split(':')[1].split(',')[0], 10)),
          moment(parseInt(values[0].split(':')[1].split(',')[1], 10)),
        ]
      : [moment(new Date()), moment(new Date())]
  );

  useEffect(() => {
    // values值的初始化
    if (!values.length) {
      if (attrSelect.includes('relative')) {
        if (attrSelect.includes('Current')) {
          // 相对现在，values值的初始化
          attrChange(['relateTime:-1,0']);
        } else {
          // 相对区间，值的初始化
          attrChange(['relateTime:-1,-1']);
        }
      } else if (attrSelect === 'between') {
        // 在。。。与。。。之间，值的初始化
        attrChange([
          `abs:${moment(timeRange?.[0], 'YYYY-MM-DD').startOf('day').valueOf()},${moment(timeRange?.[1], 'YYYY-MM-DD')
            .endOf('day')
            .valueOf()}`,
        ]);
      } else {
        attrChange([time.valueOf()]);
      }
    }
  }, [attrSelect]);

  const changeDate = (value: Moment | null) => {
    value && setTime(value);
    attrChange([moment(value, 'YYYY-MM-DD').startOf('day').valueOf()]);
  };
  const relativeDateChange = (v: string) => {
    attrChange([v]);
  };
  const dateRangeChange = (value: Array<Moment> | null) => {
    value && setTimeRange(value);
    value &&
      attrChange([
        `abs:${moment(value?.[0], 'YYYY-MM-DD').startOf('day').valueOf()},${moment(value?.[1], 'YYYY-MM-DD')
          .endOf('day')
          .valueOf()}`,
      ]);
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
