/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import moment, { Moment } from 'moment';
import _ from 'lodash';
import { RangePickerProps } from '../interfaces';
import { Mode, shortcutOptions } from '../DateRangePicker';

const useRangePicker = (props: RangePickerProps) => {
  const { timeRange } = props;
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.shortcut);
  const [time, setTime] = useState([moment(new Date()), moment(new Date())]);

  const format = 'YYYY/MM/DD';

  const formatDate = (_: Moment) => _.format(format);

  const formatLabel = (timeRange: string) => {
    const shortcut = _.chain(shortcutOptions).flatMap(_.identity).value();
    const label = _.get(
      _.find(shortcut, (l: any) => l.value === timeRange),
      'label'
    );
    if (label) {
      return label;
    }
    if (timeRange?.match(/abs:/)) {
      const res = timeRange.replace(/abs:/, '').split(',');
      // return `${res[0]}-${res[1]}`;
      return `${moment(res[0])}-${moment(res[1])}`;
    }
    if (timeRange?.match(/day:/)) {
      const res = timeRange.replace(/day:/, '').split(',');
      return `过去${res[0]}-${res[1]}天`;
    }
    return '今天';
  };

  const [displayTime, setDisplayTime] = useState(formatLabel(timeRange as string));
  const [value, setValue] = useState(timeRange);

  const formatDisplayRange = (mode: Mode, value: Array<Moment>) => {
    // if (mode === Mode.since) {
    //   const sinceStart = formatDate(value[0]);
    //   const sinceEnd = value[1].day() === moment().day() ? '今天' : '昨天';
    //   return `自 ${sinceStart} 至${sinceEnd}`;
    // }
    if (mode === Mode.dynamic) {
      const dynamicRight = value[1].diff(moment(), 'days');
      const dynamicLeft = value[0].diff(moment(), 'days');
      return dynamicRight === 0 ? `过去${-dynamicLeft}天` : `过去${-dynamicRight}-${-dynamicLeft}天`;
    }
    if (mode === Mode.absolute) {
      return `从 ${formatDate(value[0])} 到 ${formatDate(value[1])}`;
    }
    return '';
  };

  const toGioFormat = (mode: Mode, value: Array<Moment>) => {
    if (mode === Mode.dynamic) {
      const dynamicRight = Math.abs(value[1].diff(moment(), 'days')) + 1;
      const dynamicLeft = Math.abs(value[0].diff(moment(), 'days')) + 1;
      return `day:${dynamicLeft},${dynamicRight}`;
    }
    if (mode === Mode.absolute) {
      return `abs:${value[0].startOf('day').valueOf()},${value[1].startOf('day').valueOf()}`;
    }
    return 'day:2,1';
  };

  const onListClick = (item: any) => {
    setDisplayTime(item.label);
    setValue(item.value);
    props.onChange?.(value as string);
    setVisible(false);
  };

  const onChange = (value: Array<Moment>) => {
    setDisplayTime(formatDisplayRange(mode, value));
    setValue(toGioFormat(mode, value));
    value && setTime(value);
  };

  const onConfirm = () => {
    setVisible(false);
    props.onChange?.(value as string);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleModeChange = (item: any) => {
    setMode(item.value);
  };
  return {
    state: {
      visible,
      mode,
      displayTime,
      value,
      time,
    },
    actions: {
      onListClick,
      onCancel,
      onConfirm,
      handleModeChange,
      onChange,
      setVisible,
      setMode,
    },
    utils: {
      formatDate,
      format,
      toGioFormat,
      formatDisplayRange,
      formatLabel,
    },
  };
};

export default useRangePicker;
