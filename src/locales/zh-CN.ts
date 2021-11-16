import type { Locale } from '@gio-design/utils';
import PastTimePickerLocale from '../past-time-picker/locales/zh-CN';
import EventPickerLocale from '../event-picker/locales/zh-CN';
import PropertyPickerLocale from '../property-selector/locales/zh-CN';
import UserPickerLocale from '../user-picker/locales/zh-CN';

export const locale: Locale = {
  code: 'en-US',
  PastTimePicker: {
    ...PastTimePickerLocale,
  },
  EventPicker: {
    ...EventPickerLocale,
  },
  PropertyPicker: {
    ...PropertyPickerLocale,
  },
  UserPicker: {
    ...UserPickerLocale,
  },
};

export default locale;
