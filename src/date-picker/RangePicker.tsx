/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import Button from '@gio-design/components/es/components/button';
import List from '@gio-design/components/es/components/list';
import Dropdown from '@gio-design/components/es/components/dropdown';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import moment, { Moment } from 'moment';
import { CalendarOutlined } from '@gio-design/icons';
import Calendar from './Calendar';
import { RangePickerProps } from './interface';

enum Mode {
  shortcut = 'shortcut',
  since = 'since',
  dynamic = 'dynamic',
  absolute = 'absolute',
}

const RangePicker: React.FC<RangePickerProps> = (props: RangePickerProps) => {
  const { prefixCls: customizePrefixCls } = props;
  const [v, setV] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.shortcut);
  const [displayTime, setDisplayTime] = useState('今天');
  // const [formatedTime, setFormatedTime] = useState(timeRange);
  const modeOptions = [
    { value: Mode.shortcut, label: '常用时间' },
    { value: Mode.since, label: '自某天以后' },
    { value: Mode.dynamic, label: '过去动态时段' },
    { value: Mode.absolute, label: '过去固定时段' },
  ];
  const shortcutOptions = [
    [
      { value: 'day:1,0', label: '今日' },
      { value: 'week:1,0', label: '本周' },
      { value: 'month:1,0', label: '本月' },
      { value: 'quarter:1,0', label: '本季度' },
      { value: 'year:1,0', label: '今年' },
      { value: 'day:8,1', label: '过去7天' },
      { value: 'day:31,1', label: '过去30天' },
      { value: 'day:181,1', label: '过去180天' },
      { value: 'hour:24,0', label: '过去24小时' },
      { value: 'since', label: '开始至今' },
    ],
    [
      { value: 'day:2,1', label: '昨日' },
      { value: 'week:2,1', label: '上周' },
      { value: 'month:2,1', label: '上月' },
      { value: 'quarter:2,1', label: '上季度' },
      { value: 'year:2,1', label: '去年' },
      { value: 'day:15,1', label: '过去14天' },
      { value: 'day:91,1', label: '过去90天' },
      { value: 'day:366,1', label: '过去365天' },
      { value: 'hour:48,0', label: '过去48小时' },
    ],
  ];

  useEffect(() => {
    if (v) {
      setMode(Mode.shortcut);
    }
  }, [v]);

  const prefixCls = usePrefixCls('date-picker', customizePrefixCls);
  const [time, setTime] = useState([moment(new Date()), moment(new Date())]);
  // const [nextTime, setNextTime] = useState([moment(new Date()), moment(new Date())]);
  const format = 'YYYY/MM/DD';
  const formatDate = (_: Moment) => _.format(format);

  const formatDisplayRange = (mode: Mode, value: Array<Moment>) => {
    if (mode === Mode.since) {
      const sinceStart = formatDate(value[0]);
      const sinceEnd = value[1].day() === moment().day() ? '今天' : '昨天';
      return `自 ${sinceStart} 至${sinceEnd}`;
    }
    if (mode === Mode.dynamic) {
      const dynamicRight = value[1].diff(moment(), 'days');
      const dynamicLeft = value[0].diff(moment(), 'days');
      return dynamicRight === 0 ? `过去${-dynamicLeft}天` : `过去${-dynamicRight}-${-dynamicLeft}天`;
    }
    if (mode === Mode.absolute) {
      return `从 ${formatDate(value[0])} 到 ${formatDate(value[1])} `;
    }
    return '';
  };

  const onListClick = (item: any) => {
    setDisplayTime(item.label);
    // setFormatedTime(item.value);
    setV(false);
  };

  const formatRange = (mode: Mode, value: Array<Moment>) => {
    if (mode === Mode.since) {
      // todo
    }
    if (mode === Mode.dynamic) {
      const dynamicRight = value[1].diff(moment(), 'days');
      const dynamicLeft = value[0].diff(moment(), 'days');
      return `day:${-dynamicLeft + 1},${-dynamicRight + 1}`;
    }
    if (mode === Mode.absolute) {
      return `abs:${value[0].valueOf()},${value[1].valueOf()}`;
    }
    return '';
  };

  const onChange = (value: Array<Moment>) => {
    setDisplayTime(formatDisplayRange(mode, value));
    formatRange(mode, value);
    value && setTime(value);
  };

  const onConfirm = () => {
    setV(false);
  };

  const onCancel = () => {
    setV(false);
  };

  const handleModeChange = (item: any) => {
    setMode(item.value);
  };

  const renderCalendar = () => {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          width: '540px',
          height: '430px',
          position: 'relative',
          display: 'block',
          lineHeight: 1.5,
          marginBottom: 16,
        }}
      >
        <Calendar
          prefixCls={prefixCls}
          value={time}
          onChange={onChange}
          format={format}
          onCancel={onCancel}
          onConfirm={onConfirm}
          mode={mode}
          showFooter
        />
      </div>
    );
  };

  const renderShortcuts = () => {
    return (
      <div
        style={{
          display: 'inline-flex',
        }}
      >
        <List stateless dataSource={shortcutOptions[0]} width={128} onClick={onListClick} />
        <List stateless dataSource={shortcutOptions[1]} width={128} onClick={onListClick} />
      </div>
    );
  };

  return (
    <Dropdown
      visible={v}
      onVisibleChange={setV}
      overlay={
        <div
          style={{
            width: 'auto',
            height: 'auto',
            backgroundColor: '#FFFFFF',
            display: 'inline-flex',
            justifyContent: 'center',
          }}
        >
          <List
            wrapStyle={{ borderRight: '1px solid #E7EAF9' }}
            dataSource={modeOptions}
            width={144}
            onClick={handleModeChange}
          />
          <div>{mode === Mode.shortcut ? renderShortcuts() : renderCalendar()}</div>
        </div>
      }
      placement="bottomRight"
    >
      <Button type="secondary" icon={<CalendarOutlined />}>
        {displayTime}
      </Button>
    </Dropdown>
  );
};

export default RangePicker;
