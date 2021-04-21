/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import Button from '@gio-design/components/es/components/button';
import List from '@gio-design/components/es/components/list';
import Dropdown from '@gio-design/components/es/components/dropdown';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { CalendarOutlined } from '@gio-design/icons';
import useRangePicker from './hooks/useRangePicker';
import Calendar from './Calendar';
import { RangePickerProps } from './interfaces';

export enum Mode {
  shortcut = 'shortcut',
  since = 'since',
  dynamic = 'dynamic',
  absolute = 'absolute',
}

export const shortcutOptions = [
  [
    { value: 'day:1,0', label: '今日' },
    { value: 'week:1,0', label: '本周' },
    { value: 'month:1,0', label: '本月' },
    // { value: 'quarter:1,0', label: '本季度' },
    { value: 'year:1,0', label: '今年' },
    { value: 'day:8,1', label: '过去7天' },
    { value: 'day:31,1', label: '过去30天' },
    { value: 'day:181,1', label: '过去180天' },
    // { value: 'hour:24,0', label: '过去24小时' },
    { value: 'since', label: '开始至今' },
  ],
  [
    { value: 'day:2,1', label: '昨日' },
    { value: 'week:2,1', label: '上周' },
    { value: 'month:2,1', label: '上月' },
    // { value: 'quarter:2,1', label: '上季度' },
    { value: 'year:2,1', label: '去年' },
    { value: 'day:15,1', label: '过去14天' },
    { value: 'day:91,1', label: '过去90天' },
    { value: 'day:366,1', label: '过去365天' },
    // { value: 'hour:48,0', label: '过去48小时' },
  ],
];

const DateRangePicker: React.FC<RangePickerProps> = (props: RangePickerProps) => {
  const { prefixCls: customizePrefixCls } = props;
  // const [formatedTime, setFormatedTime] = useState(timeRange);
  const { state, actions, utils } = useRangePicker(props);

  const modeOptions = [
    { value: Mode.shortcut, label: '常用时间' },
    // { value: Mode.since, label: '自某天以后' },
    { value: Mode.dynamic, label: '过去动态时段' },
    { value: Mode.absolute, label: '过去固定时段' },
  ];

  // useEffect(() => {
  //   if (state.visible) {
  //     actions.setMode(Mode.shortcut);
  //   }
  // }, [state.visible]);

  const prefixCls = usePrefixCls('date-picker', customizePrefixCls);

  const renderCalendar = () => (
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
        value={state.time}
        onChange={actions.onChange}
        format={utils.format}
        onCancel={actions.onCancel}
        onConfirm={actions.onConfirm}
        mode={state.mode}
        showFooter
      />
    </div>
  );

  const renderShortcuts = () => (
    <div
      style={{
        display: 'inline-flex',
      }}
    >
      <List stateless dataSource={shortcutOptions[0]} width={128} onClick={actions.onListClick} />
      <List stateless dataSource={shortcutOptions[1]} width={128} onClick={actions.onListClick} />
    </div>
  );

  return (
    <Dropdown
      visible={state.visible}
      onVisibleChange={actions.setVisible}
      overlay={
        <div
          style={{
            width: 'auto',
            height: 'auto',
            backgroundColor: '#FFFFFF',
            display: 'inline-flex',
            justifyContent: 'center',
            borderRadius: '4px',
          }}
        >
          <List
            wrapStyle={{ borderRight: '1px solid #E7EAF9' }}
            dataSource={modeOptions}
            width={144}
            value={Mode.shortcut}
            onClick={actions.handleModeChange}
          />
          <div>{state.mode === Mode.shortcut ? renderShortcuts() : renderCalendar()}</div>
        </div>
      }
      placement="bottomRight"
    >
      <Button type="secondary" icon={<CalendarOutlined />}>
        {state.displayTime}
      </Button>
    </Dropdown>
  );
};

export default DateRangePicker;
