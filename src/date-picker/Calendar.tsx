import React, { useRef, useEffect } from 'react';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { noop } from 'lodash';
import Button from '@gio-design/components/es/components/button';
import { Tabs, TabPane } from '@gio-design/components';
import Input from '@gio-design/components/es/components/input';
import { CalendarOutlined, PlusCircleFilled } from '@gio-design/icons';
import { DateRangePickerProps } from './interfaces';
import useCalendar from './hooks/useCalendar';
import './style';

moment.locale('zh-cn', {
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
});

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

  const { state, actions } = useCalendar(props);

  const calendarContainerRef = useRef(null);

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
    actions.setTimeRange(value);
  }, [value]);

  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const panelNode = ReactDOM.findDOMNode(calendarContainerRef.current) as HTMLElement;
    if (state.fixedMode) {
      // panelNode.addEventListener('click', handlePanelClick);
      if (state.endDay === 'yesterday') {
        panelNode.onclick = hackPanelClickYesterday;
      } else {
        panelNode.onclick = hackPanelClickToday;
      }
    } else {
      panelNode.onclick = noop;
    }
  }, [state.fixedMode, state.endDay]);

  useEffect(() => {
    if (mode === 'since') {
      actions.setTimeRange([value[0], moment()]);
      actions.setFixedMode(true);
    } else if (mode === 'dynamic') {
      actions.handleRightDynamicInput(7);
      actions.setFixedMode(true);
      actions.setLeftDynamicInputVisible(false);
      actions.setTimeRange([moment().subtract('days', 7), moment()]);
    } else {
      actions.setFixedMode(false);
      actions.setTimeRange(value);
    }
  }, [mode]);

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const renderFooter = () => (
    <>
      {props.renderExtraFooter && (
        <div className={classNames(`${prefixCls}-extra-footer`)}>{props.renderExtraFooter()}</div>
      )}
      <Button onClick={actions.onCancel} type="secondary" size="middle" style={{ margin: ' 0 12px 0 0 ' }}>
        取消
      </Button>
      <Button onClick={actions.onConfirm} size="middle">
        确定
      </Button>
    </>
  );

  const formatDate = (v: Moment) => v?.format(format);

  const calendar = (
    <RcRangeCalendar
      locale={zhCN}
      format={format}
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      // value={timeRange}
      onSelect={actions.onSelect}
      onPanelChange={actions.onPanelChange}
      showToday={false}
      showOk={false}
      showDateInput={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      renderFooter={renderFooter}
    />
  );

  const renderPanel = (renderMode: string) => (
    <RcDatePicker
      calendar={calendar}
      value={state.timeRange}
      onChange={actions.onChange}
      prefixCls={`${prefixCls}-dropdown`}
      getCalendarContainer={() => calendarContainerRef.current}
      open={state.open}
    >
      {({ value: _value }: { value: Array<Moment> }) => (
        <div className={classNames(`${prefixCls}-range-input-${renderMode}`)}>
          {renderMode === 'absolute' && (
            <div className={classNames(`${prefixCls}-range-input`)}>
              <Input
                className={`${prefixCls}-input-first`}
                onChange={actions.handleLeftInputChange}
                value={state.leftInputTimeRange || `${formatDate(_value[0])}`}
                onClick={actions.handleOpen}
              />
              <span className={`${prefixCls}-split`}>—</span>
              <Input
                className={`${prefixCls}-input-second`}
                onChange={actions.handleRightInputChange}
                value={state.rightInputTimeRange || `${formatDate(_value[1])}`}
                onClick={actions.handleOpen}
                suffix={<CalendarOutlined />}
              />
            </div>
          )}
          {renderMode === 'since' && (
            <>
              从
              <Input
                className={`${prefixCls}-input-second`}
                onChange={actions.handleLeftInputChange}
                value={state.leftInputTimeRange || `${formatDate(_value[0])}`}
                onClick={actions.handleOpen}
                suffix={<CalendarOutlined />}
              />
              <Tabs
                activeKey={state.endDay}
                className={`${prefixCls}-tab`}
                size="middle"
                onChange={actions.handleEndDayChange}
              >
                <TabPane tab="至今日" key="today" style={{ height: '36px' }} />
                <TabPane tab="至昨日" key="yesterday" style={{ height: '36px' }} />
              </Tabs>
            </>
          )}
          {renderMode === 'dynamic' && !state.leftDynamicInputVisible && (
            <>
              过去
              <Input.InputNumber
                className={`${prefixCls}-input-second`}
                value={state.rightDynamicInput}
                onChange={actions.handleRightDynamicInput as any}
                min={0}
              />
              天
              <Button type="secondary" icon={<PlusCircleFilled />} onClick={actions.handleEndDay}>
                结束日期
              </Button>
            </>
          )}
          {renderMode === 'dynamic' && state.leftDynamicInputVisible && (
            <>
              过去
              <Input.InputNumber
                className={`${prefixCls}-input-second`}
                value={state.leftDynamicInput}
                onChange={actions.handleLeftDynamicInput}
                min={0}
              />
              至
              <Input.InputNumber
                className={`${prefixCls}-input-second`}
                value={state.rightDynamicInput}
                onChange={actions.handleRightDynamicInput as any}
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

  return <div className={classNames(`${prefixCls}-wrap-range`)}>{renderPanel(mode)}</div>;
};

export default DateRangePicker;
