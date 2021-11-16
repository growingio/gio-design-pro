import { useLocale } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';

const useQuickOptions = () => {
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

  const quickOptions = [
    [
      { value: 'day:1,0', label: todayText },
      { value: 'week:1,0', label: thisWeekText },
      { value: 'month:1,0', label: thisMonthText },
      { value: 'quarter:1,0', label: thisQuarterText },
      { value: 'year:1,0', label: thisYearText },
      { value: 'day:8,1', label: last7DaysText },
      { value: 'day:31,1', label: last30daysText },
      { value: 'day:181,1', label: last180DaysText },
    ],
    [
      { value: 'day:2,1', label: yesterdayText },
      { value: 'week:2,1', label: lastWeekText },
      { value: 'month:2,1', label: lastMonthText },
      { value: 'quarter:2,1', label: lastQuarterText },
      { value: 'year:2,1', label: lastYearText },
      { value: 'day:15,1', label: last14DaysText },
      { value: 'day:91,1', label: last90daysText },
      { value: 'day:366,1', label: last365DaysText },
    ],
  ];

  return quickOptions;
};

export default useQuickOptions;
