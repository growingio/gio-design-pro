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

  const checkInitValue = (attr: string, vals: string[]) => {
    if (!values.length) {
      return true;
    }
    const val = vals[0];
    // console.log(val, 'val')
    // console.log(val.split(":"), val.split(":")[1].split(','), '=================')
    if (attr.includes('relative') && attr !== 'relativeTime') {
      if (attr.includes('Current')) {
        return !(val.includes('0') || val.split(':')[1].split(',').length === 1);
      }
      return val.includes('0');
    }
    return !val.includes('abs');
  };

  useEffect(() => {
    // values值的初始化
    if (attrSelect !== 'relativeTime' && (!values.length || checkInitValue(attrSelect, values))) {
      // console.log(checkInitValue(attrSelect, values), 'checkInitValue(attrSelect, values)')
      if (attrSelect.includes('relative')) {
        // console.log(attrSelect, values, 'attrSelect')
        if (attrSelect.includes('Current')) {
          // console.log('current')
          // 相对现在，values值的初始化
          attrChange(['relativeTime:-1,0']);
        } else {
          // console.log('between')
          // 相对区间，值的初始化
          attrChange(['relativeTime:-1,-1']);
        }
      } else if (attrSelect === 'between' || attrSelect === 'not between') {
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
    // console.log(v, 'vvvvv');
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
    case 'not between':
      return <DateRangePicker value={timeRange} onChange={dateRangeChange} showFooter format="YYYY/MM/DD" />;
    default:
      return null;
  }
}

export default DateAttrSelect;