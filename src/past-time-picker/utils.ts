import has from 'lodash/has';
import get from 'lodash/get';
import moment from 'moment-timezone';
import { TimeCalculationMode } from './interfaces';
import { DATE_FORMAT, SHORTCUT_MAPPING } from './constant';

moment.tz.setDefault('Asia/Shanghai');

export const parseTimeCalcMode = (timeRange: string | undefined) => {
  if (!timeRange || has(SHORTCUT_MAPPING, timeRange)) {
    return 'shortcut';
  }
  const items = timeRange.split(':');
  switch (items[0]) {
    case 'since':
      return TimeCalculationMode.Since;
    case 'abs':
      return TimeCalculationMode.Absolute;
    case 'day':
      return TimeCalculationMode.Dynamic;
    default:
      return undefined;
  }
};

export const parseStartAndEndDate = (timeRange: string | undefined) => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return [undefined, undefined];
  }
  const items = timeRange.split(':');
  const times = items[1].split(',');
  if (items[0] === 'since') {
    if (times.length === 1) {
      return [moment(parseInt(times[0], 10)), moment().startOf('day')];
    }
    return [moment(parseInt(times[0], 10)), moment().startOf('day').subtract(times[1], 'day')];
  }
  if (items[0] === 'abs') {
    return [moment(parseInt(times[0], 10)), moment(parseInt(times[1], 10))];
  }
  if (items[0] === 'day') {
    return [moment().startOf('day').subtract(times[0], 'days'), moment().startOf('day').subtract(times[1], 'days')];
  }
  return [undefined, undefined];
};

export const parseFixedMode = (timeRange: string | undefined) => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return false;
  }
  const items = timeRange.split(':');
  const times = items[1].split(',');
  if (items[0] === 'since') {
    if (times.length === 1 || times[1] === '0') {
      return 'today';
    }
    return 'yesterday';
  }
  if (items[0] === 'day' && times[1] === '1') {
    return 'yesterday';
  }
  return false;
};

export const humanizeTimeRange = (timeRange: string, defaultString: string = '时间范围') => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return defaultString;
  }
  if (has(SHORTCUT_MAPPING, timeRange)) {
    return get(SHORTCUT_MAPPING, timeRange);
  }
  const items = timeRange.split(':');
  const times = items[1].split(',');
  if (items[0] === 'since') {
    const start = moment(parseInt(times[0], 10)).format(DATE_FORMAT);
    if (times.length === 1) {
      return `自 ${start} 至今日`;
    }
    return `自 ${start} 至昨日`;
  }
  if (items[0] === 'abs') {
    const start = moment(parseInt(times[0], 10)).format(DATE_FORMAT);
    const end = moment(parseInt(times[1], 10)).format(DATE_FORMAT);
    return `从 ${start} 至 ${end}`;
  }
  if (items[0] === 'day') {
    if (times[1] === '1') {
      return `过去 ${parseInt(times[0], 10) - parseInt(times[1], 10)} 天`;
    }
    return `过去 ${times[1]}-${times[0]} 天`;
  }
  return defaultString;
};

export default {
  parseTimeCalcMode,
  parseStartAndEndDate,
  humanizeTimeRange,
};
