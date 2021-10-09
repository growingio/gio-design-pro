import { EventPickerProps } from '../event-picker';
import { SelectorProps } from '../selector';

export interface EventSelectorProps extends EventPickerProps, Omit<SelectorProps, 'dropdownRender' | 'valueRender'> {
  showValueIcon?: boolean;
  /**
   * 自定义 eventPicker 的 placeholder
   */
  pickerPlaceholder?: string;
}
