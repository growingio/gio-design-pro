import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { DateRangePickerProps } from '../interfaces';

enum sinceEnd {
  yesterday = 'yesterday',
  today = 'today',
}

const useCalendar = (props: DateRangePickerProps) => {
  const { value, mode } = props;

  const [open, setOpen] = useState(true);
  const [timeRange, setTimeRange] = useState(value);
  const [leftInputTimeRange, setLeftInputTimeRange] = useState('');
  const [rightInputTimeRange, setRightInputTimeRange] = useState('');
  const [endDay, setEndDay] = useState<sinceEnd>(sinceEnd.today);
  const [leftDynamicInput, setLeftDynamicInput] = useState<number>(0);
  const [rightDynamicInput, setRightDynamicInput] = useState<number>(7);
  const [leftDynamicInputVisible, setLeftDynamicInputVisible] = useState(false);
  const [fixedMode, setFixedMode] = useState(false);

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

  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLeftInputTimeRange(e.target.value);
    const values = moment(e.target.value, props.format);
    if (values.isValid() && values.isBefore(timeRange[1])) {
      setTimeRange([values, timeRange[1]]);
    } else {
      setTimeRange(timeRange);
    }
  };

  const handleRightInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setRightInputTimeRange(e.target.value);
    const values = moment(e.target.value, props.format);
    if (values.isValid() && values.isAfter(timeRange[0])) {
      setTimeRange([timeRange[0], values]);
    } else {
      setTimeRange(timeRange);
    }
  };

  const handleEndDay = () => {
    setLeftDynamicInputVisible(true);
    setFixedMode(false);
  };

  const handleLeftDynamicInput = (leftInput: number) => {
    setLeftDynamicInput(leftInput);
    setTimeRange([timeRange[0], moment().add(-leftInput, 'days')]);
  };

  const handleRightDynamicInput = (rightInput: number) => {
    setRightDynamicInput(rightInput);
    setTimeRange([moment().add(-rightInput, 'days'), moment().add(-leftDynamicInput, 'days')]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    // setOpen(false);
    setTimeRange(timeRange);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(timeRange);
    props.onConfirm?.();
  };

  const onCancel = () => {
    // setOpen(false);
    setTimeRange(value);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(value);
    props.onCancel?.();
  };

  return {
    state: {
      open,
      timeRange,
      leftInputTimeRange,
      rightInputTimeRange,
      endDay,
      leftDynamicInput,
      rightDynamicInput,
      leftDynamicInputVisible,
      fixedMode,
    },
    actions: {
      //   setOpen,
      setTimeRange,
      //   setLeftDynamicInput,
      //   setRightDynamicInput,
      //   setLeftInputTimeRange,
      //   setRightInputTimeRange,
      setLeftDynamicInputVisible,
      //   setEndDay,
      setFixedMode,
      handleEndDay,
      handleRightInputChange,
      handleLeftInputChange,
      onPanelChange,
      onChange,
      onSelect,
      handleEndDayChange,
      handleOpen,
      handleLeftDynamicInput,
      handleRightDynamicInput,
      onCancel,
      onConfirm,
    },
  };
};

export default useCalendar;
