import { renderHook, act } from '@testing-library/react-hooks';
import moment from 'moment';
import { noop } from 'lodash';
import useRangePicker from '../hooks/useRangePicker';
import { Mode } from '../DateRangePicker';

const VALUE = 'day:2,1';

const props = {
  timeRange: VALUE,
  onChange: noop,
};

describe('Testing useCalendar', () => {
  it('useCalendar actions', () => {
    const { result } = renderHook(() => useRangePicker(props));
    const { state, actions, utils } = result.current;

    act(() => {
      actions.handleModeChange({ value: Mode.shortcut });
    });
    expect(state.mode).toBe(Mode.shortcut);

    act(() => {
      actions.setMode(Mode.shortcut);
    });
    expect(state.mode).toBe(Mode.shortcut);

    act(() => {
      actions.onCancel();
    });
    expect(state.visible).toBe(false);

    act(() => {
      actions.onConfirm();
    });
    expect(state.visible).toBe(false);

    act(() => {
      actions.onChange([moment().add(-1), moment()]);
    });
    expect(state.value).toBe('day:2,1');

    act(() => {
      actions.onListClick({ label: '昨天', value: 'day:2,1' });
    });
    expect(state.visible).toBe(false);

    expect(utils.toGioFormat(Mode.absolute, [moment().add(-1), moment()])).toMatch(/abs:/); // toBe('abs:1619452800000,1619452800000');
    expect(utils.toGioFormat(Mode.dynamic, [moment().add(-1), moment()])).toBe('day:1,1');

    act(() => {
      utils.formatDisplayRange(Mode.absolute, [moment(), moment()]);
    });
    expect(utils.formatDisplayRange(Mode.dynamic, [moment(), moment()])).toBe('过去0天');
    expect(utils.formatLabel('day:1,0')).toEqual('今日');
    expect(utils.formatLabel('day:3,1')).toEqual('过去3-1天');
    expect(utils.formatLabel('abs:1620057600000,1620230399999')).toBeTruthy();
  });
});
