import { get } from 'lodash';
import moment from 'moment';
import { TimeCalculationMode } from '../interfaces';
import { parseFixedMode, parseStartAndEndDate, parseTimeCalcMode, humanizeTimeRange } from '../utils';

describe('PastTimePicker utils', () => {
  it('can parse fixed mode', () => {
    const timeRangeFixModeMapping = {
      'since:1234567890123': 'today',
      'since:1234567890123,1': 'yesterday',
      'day:9,1': 'yesterday',
      'day:9,0': false,
      'abs:1234567890123,1234567890123': false,
      xxx: false,
    };
    Object.keys(timeRangeFixModeMapping).forEach((timeRange) => {
      expect(parseFixedMode(timeRange)).toBe(get(timeRangeFixModeMapping, timeRange));
    });
  });

  it('can parse start and end date', () => {
    expect(parseStartAndEndDate('')).toEqual([undefined, undefined]);
    expect(parseStartAndEndDate('hour')).toEqual([undefined, undefined]);
    expect(parseStartAndEndDate('hour:2,1')).toEqual([undefined, undefined]);

    const today = moment().startOf('day');
    const yesterday = moment().startOf('day').subtract(1, 'days');

    const sinceTimeRange = `since:${today.valueOf()}`;
    const sinceTimeRangeToYesterday = `since:${today.valueOf()},1`;
    let [start, end] = parseStartAndEndDate(sinceTimeRange);
    expect([start.valueOf(), end.valueOf()]).toEqual([today.valueOf(), today.valueOf()]);
    [start, end] = parseStartAndEndDate(sinceTimeRangeToYesterday);
    expect([start.valueOf(), end.valueOf()]).toEqual([today.valueOf(), yesterday.valueOf()]);

    const dynamicTimeRange = 'day:1,0';
    [start, end] = parseStartAndEndDate(dynamicTimeRange);
    expect([start.valueOf(), end.valueOf()]).toEqual([yesterday.valueOf(), today.valueOf()]);

    const absoluteTimeRange = `abs:${yesterday.valueOf()},${today.valueOf()}`;
    [start, end] = parseStartAndEndDate(absoluteTimeRange);
    expect([start.valueOf(), end.valueOf()]).toEqual([yesterday.valueOf(), today.valueOf()]);
  });

  it('can parse time calc mode', () => {
    let timeRange = 'day:8,1';
    expect(parseTimeCalcMode(timeRange)).toEqual('shortcut');

    timeRange = 'since:';
    expect(parseTimeCalcMode(timeRange)).toEqual(TimeCalculationMode.Since);

    timeRange = 'day:';
    expect(parseTimeCalcMode(timeRange)).toEqual(TimeCalculationMode.Dynamic);

    timeRange = 'abs:';
    expect(parseTimeCalcMode(timeRange)).toEqual(TimeCalculationMode.Absolute);

    timeRange = 'hour:';
    expect(parseTimeCalcMode(timeRange)).toEqual(undefined);
  });

  it('can humanize time range', () => {
    const timeRangeMapping = {
      'day:8,1': '过去 7 天',
      'since:1618243200000': '自 2021/04/13 至今日',
      'since:1618243200000,1': '自 2021/04/13 至昨日',
      'day:9,1': '过去 8 天',
      'day:9,0': '过去 0-9 天',
      'abs:1619452800000,1620230400000': '从 2021/04/27 至 2021/05/06',
      xxx: '时间范围',
      'hour:2,1': '时间范围',
    };
    Object.keys(timeRangeMapping).forEach((timeRange) => {
      expect(humanizeTimeRange(timeRange)).toEqual(get(timeRangeMapping, timeRange));
    });
  });
});
