import { useLocale } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';

const useQuickMapping = () => {
  const locale = useLocale('PastTimePicker');
  const {
    todayText,
    yesterdayText,
    thisWeekText,
    lastWeekText,
    thisMonthText,
    lastMonthText,
    thisQuarterText,
    lastQuarterText,
    thisYearText,
    lastYearText,
    last7DaysText,
    last14DaysText,
    last30daysText,
    last90daysText,
    last180DaysText,
    last365DaysText,
  } = {
    ...defaultLocale,
    ...locale,
  } as any;

  const QUICK_MAPPING = {
    'day:1,0': todayText,
    'week:1,0': thisWeekText,
    'month:1,0': thisMonthText,
    'quarter:1,0': thisQuarterText,
    'year:1,0': thisYearText,
    'day:8,1': last7DaysText,
    'day:31,1': last30daysText,
    'day:181,1': last180DaysText,
    'day:2,1': yesterdayText,
    'week:2,1': lastWeekText,
    'month:2,1': lastMonthText,
    'quarter:2,1': lastQuarterText,
    'year:2,1': lastYearText,
    'day:15,1': last14DaysText,
    'day:91,1': last90daysText,
    'day:366,1': last365DaysText,
  };

  return QUICK_MAPPING;
};

export default useQuickMapping;
