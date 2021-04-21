import { renderHook, act } from '@testing-library/react-hooks';
import moment from 'moment';
import { noop } from 'lodash';
import useCalendar from '../hooks/useCalendar';
import { Mode } from '../DateRangePicker';

const e = { target: {} };

const props = {
  value: [moment(), moment()],
  mode: Mode.dynamic,
  onCancel: noop,
  onConfirm: noop,
};

describe('Testing useCalendar', () => {
  it('useCalendar actions', () => {
    const { result } = renderHook(() => useCalendar(props));
    const { state, actions } = result.current;

    act(() => {
      actions.handleOpen();
    });
    expect(state.open).toBe(true);

    act(() => {
      actions.onConfirm();
    });
    expect(state.leftInputTimeRange).toBe('');
    expect(state.rightInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.onCancel();
    });
    expect(state.leftInputTimeRange).toBe('');
    expect(state.rightInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.handleRightDynamicInput(7);
    });
    expect(state.rightDynamicInput).toBe(7);
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.handleLeftDynamicInput(0);
    });
    expect(state.leftDynamicInput).toBe(0);
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.handleEndDay();
    });
    expect(state.fixedMode).toBe(false);

    e.target.value = moment().add(1, 'day').valueOf();
    act(() => {
      actions.handleLeftInputChange(e);
    });
    expect(state.leftInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    e.target.value = moment().add(-1, 'day').valueOf();
    act(() => {
      actions.handleLeftInputChange(e);
    });
    expect(state.leftInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    e.target.value = moment().add(1, 'day').valueOf();
    act(() => {
      actions.handleRightInputChange(e);
    });
    expect(state.rightInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    e.target.value = moment().add(-1, 'day').valueOf();
    act(() => {
      actions.handleRightInputChange(e);
    });
    expect(state.rightInputTimeRange).toBe('');
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.onChange(props.value);
    });
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.onPanelChange(props.value);
    });
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.onSelect(props.value);
    });
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.handleEndDayChange('today');
    });
    expect(state.timeRange).toEqual(props.value);

    act(() => {
      actions.handleEndDayChange('yesterday');
    });
    expect(state.timeRange).toEqual(props.value);
  });
});
