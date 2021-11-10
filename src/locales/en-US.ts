import type { Locale } from '@gio-design/utils';
import PastTimePickerLocale from '../past-time-picker/locales/en-US';
import EventPickerLocale from '../event-picker/locales/en-US';
import PropertyPickerLocale from '../property-selector/locales/en-US';
import UserPickerLocale from '../user-picker/locales/en-US';

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
