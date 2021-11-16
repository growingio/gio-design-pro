import { useLocale } from '@gio-design/utils';
import { TimeMode } from './interfaces';
import defaultLocale from './locales/zh-CN';

const usePickerOptions = () => {
  const locale = useLocale('PastTimePicker');
  const { quickPickerText, sinceRangePickerText, relativeRangePickerText, absoluteRangePickerText } = {
    ...defaultLocale,
    ...locale,
  } as any;

  const PICKER_OPTIONS: { label: string; value: TimeMode | 'quick' }[] = [
    { value: 'quick', label: quickPickerText },
    { value: TimeMode.Since, label: sinceRangePickerText },
    { value: TimeMode.Relative, label: relativeRangePickerText },
    { value: TimeMode.Absolute, label: absoluteRangePickerText },
  ];

  return PICKER_OPTIONS;
};

export default usePickerOptions;
