import React, { useRef, useState, useEffect } from 'react';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { debounce, noop } from 'lodash';
import Button from '@gio-design/components/es/components/button';
import { Tabs, TabPane } from '@gio-design/components';
import Input from '@gio-design/components/es/components/input';
import { CalendarOutlined, PlusCircleFilled } from '@gio-design/icons';
import { DateRangePickerProps } from './interface';
import './style';

moment.locale('zh-cn', {
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
});

enum sinceEnd {
  yesterday = 'yesterday',
  today = 'today',
}

const disabledDate = (current: Moment) => {
  const date = moment();
  return current.isAfter(date);
};

const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const {
    prefixCls,
    format = 'YYYY/MM/DD',
    value,
    defaultValue,
    showFooter,
    // disabledDate,
    mode,
  } = props;

  const calendarContainerRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [timeRange, setTimeRange] = useState(value);
  const [leftInputTimeRange, setLeftInputTimeRange] = useState('');
  const [rightInputTimeRange, setRightInputTimeRange] = useState('');
  const [endDay, setEndDay] = useState<sinceEnd>(sinceEnd.today);
  const [leftDynamicInput, setLeftDynamicInput] = useState<number>(0);
  const [rightDynamicInput, setRightDynamicInput] = useState<number>(7);
  const [leftDynamicInputVisible, setLeftDynamicInputVisible] = useState(false);
  const [fixedMode, setFixedMode] = useState(false);

  useEffect(() => {
    setTimeRange(value);
  }, [value]);

  useEffect(() => {
    if (mode === 'since') {
      setTimeRange([value[0], moment()]);
      setFixedMode(true);
    } else if (mode === 'dynamic') {
      handleRightDynamicInput(7);
      setFixedMode(true);
      setLeftDynamicInputVisible(false);
      setTimeRange([moment().subtract('days', 7), moment()]);
    } else {
      setFixedMode(false);
      setTimeRange(value);
    }
  }, [mode]);

  const hackPanelClickToday = (e: any) => {
    if (e.target.className === 'gio-date-picker-date' && e.target.ariaDisabled === 'false') {
      const todayNode = document.querySelector('.gio-date-picker-today') as HTMLElement;
      todayNode.click();
    }
  };

  const hackPanelClickYesterday = (e: any) => {
    if (e.target.className === 'gio-date-picker-date' && e.target.ariaDisabled === 'false') {
      const yesterdayNode = document.querySelector('.gio-date-picker-today')?.previousSibling as HTMLElement;
      yesterdayNode.click();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const panelNode = ReactDOM.findDOMNode(calendarContainerRef.current) as HTMLElement;
    if (fixedMode) {
      // panelNode.addEventListener('click', handlePanelClick);
      if (endDay === 'yesterday') {
        panelNode.onclick = hackPanelClickYesterday;
      } else {
        panelNode.onclick = hackPanelClickToday;
      }
    } else {
      // panelNode.removeEventListener('click', handlePanelClick);
      panelNode.onclick = noop;
    }
  }, [fixedMode, endDay]);

  const handleLeftDynamicInput = (leftInput: number) => {
    setLeftDynamicInput(leftInput);
    setTimeRange([timeRange[0], moment().add(-leftInput, 'days')]);
  };

  const handleRightDynamicInput = (rightInput: number) => {
    setRightDynamicInput(rightInput);
    setTimeRange([moment().add(-rightInput, 'days'), moment().add(-leftDynamicInput, 'days')]);
  };

  const handleEndDayChange = (day: sinceEnd) => {
    if (day === 'today') {
      setTimeRange([timeRange[0], moment()]);
    } else {
      setTimeRange([timeRange[0], moment().add(-1, 'days')]);
    }
    setEndDay(day);
  };

  const onSelect = (values: Array<Moment>): void => {
    setTimeRange(values);
    // props.onSelect?.(values);
    //! showFooter && setOpen(false);
  };

  const onChange = (values: Array<Moment>): void => {
    if (mode === 'dynamic') {
      setLeftDynamicInput(-values[1].diff(moment(), 'days'));
      setRightDynamicInput(-values[0].diff(moment(), 'days'));
    }
    setTimeRange(values);
  };

  const onPanelChange = (values: Array<Moment>): void => {
    setTimeRange(values);
  };

  const debounceLeftChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid() && values.isBefore(timeRange[1])) {
      setTimeRange([values, timeRange[1]]);
    } else {
      setTimeRange(timeRange);
    }
  }, 500);

  const debounceRightChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid() && values.isAfter(timeRange[0])) {
      setTimeRange([timeRange[0], values]);
    } else {
      setTimeRange(timeRange);
    }
  }, 500);

  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setLeftInputTimeRange(e.target.value);
    debounceLeftChange(e.target.value);
  };

  const handleRightInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setRightInputTimeRange(e.target.value);
    debounceRightChange(e.target.value);
  };

  const handleEndDay = () => {
    setLeftDynamicInputVisible(true);
    setFixedMode(false);
  };

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const onConfirm = () => {
    // setOpen(false);
    setTimeRange(timeRange);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(timeRange);
    props.onConfirm();
  };

  const onCancel = () => {
    // setOpen(false);
    setTimeRange(value);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(value);
    props.onCancel();
  };

  const renderFooter = () => (
    <>
      {props.renderExtraFooter && (
        <div className={classNames(`${prefixCls}-extra-footer`)}>{props.renderExtraFooter()}</div>
      )}
      <Button onClick={onCancel} type="secondary" size="middle" style={{ margin: ' 0 12px 0 0 ' }}>
        取消
      </Button>
      <Button onClick={onConfirm} size="middle">
        确定
      </Button>
    </>
  );

  const formatDate = (v: Moment) => v.format(format);

  const calendar = (
    <RcRangeCalendar
      locale={zhCN}
      format={format}
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      // value={timeRange}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      showToday={false}
      showOk={false}
      showDateInput={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      renderFooter={renderFooter}
    />
  );

  const renderPanel = (renderMode: string) => {
    return (
      <RcDatePicker
        calendar={calendar}
        value={timeRange}
        onChange={onChange}
        prefixCls={`${prefixCls}-dropdown`}
        getCalendarContainer={() => calendarContainerRef.current}
        open={open}
      >
        {({ value: _value }: { value: Array<Moment> }) => (
          <div className={classNames(`${prefixCls}-range-input-${renderMode}`)}>
            {renderMode === 'absolute' && (
              <div className={classNames(`${prefixCls}-range-input`)}>
                <Input
                  className={`${prefixCls}-input-first`}
                  onChange={handleLeftInputChange}
                  value={leftInputTimeRange || `${formatDate(_value[0])}`}
                  onClick={() => setOpen(true)}
                />
                <span className={`${prefixCls}-split`}>—</span>
                <Input
                  className={`${prefixCls}-input-second`}
                  onChange={handleRightInputChange}
                  value={rightInputTimeRange || `${formatDate(_value[1])}`}
                  onClick={() => setOpen(true)}
                  suffix={<CalendarOutlined />}
                />
              </div>
            )}
            {renderMode === 'since' && (
              <>
                从
                <Input
                  className={`${prefixCls}-input-second`}
                  onChange={handleLeftInputChange}
                  value={leftInputTimeRange || `${formatDate(_value[0])}`}
                  onClick={() => setOpen(true)}
                  suffix={<CalendarOutlined />}
                />
                <Tabs activeKey={endDay} className={`${prefixCls}-tab`} size="middle" onChange={handleEndDayChange}>
                  <TabPane tab="至今日" key="today" style={{ height: '36px' }} />
                  <TabPane tab="至昨日" key="yesterday" style={{ height: '36px' }} />
                </Tabs>
              </>
            )}
            {renderMode === 'dynamic' && !leftDynamicInputVisible && (
              <>
                过去
                <Input.InputNumber
                  className={`${prefixCls}-input-second`}
                  value={rightDynamicInput}
                  onChange={handleRightDynamicInput as any}
                  min={0}
                />
                天
                <Button type="secondary" icon={<PlusCircleFilled />} onClick={handleEndDay}>
                  结束日期
                </Button>
              </>
            )}
            {renderMode === 'dynamic' && leftDynamicInputVisible && (
              <>
                过去
                <Input.InputNumber
                  className={`${prefixCls}-input-second`}
                  value={leftDynamicInput}
                  onChange={handleLeftDynamicInput as any}
                  min={0}
                />
                至
                <Input.InputNumber
                  className={`${prefixCls}-input-second`}
                  value={rightDynamicInput}
                  onChange={handleRightDynamicInput as any}
                  min={0}
                />
                天
              </>
            )}
            <div className={classNames(`${prefixCls}-wrapper`)} ref={calendarContainerRef} />
          </div>
        )}
      </RcDatePicker>
    );
  };

  return <div className={classNames(`${prefixCls}-wrap-range`)}>{renderPanel(mode)}</div>;
};

export default DateRangePicker;
