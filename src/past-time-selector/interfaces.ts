import { SelectorProps } from '@gio-design/components/es/selector/interfaces';
import { PastTimePickerProps } from '../past-time-picker/interfaces';

export interface PastTimeSelectorProps
  extends Pick<
      SelectorProps,
      | 'allowClear'
      | 'borderless'
      | 'disabled'
      | 'fitContent'
      | 'placeholder'
      | 'size'
      | 'triggerClassName'
      | 'triggerStyle'
      | 'getContainer'
    >,
    Pick<
      PastTimePickerProps,
      'disabledDate' | 'experimental' | 'modes' | 'onCancel' | 'onSelect' | 'quickOptionsFilter'
    > {
  /**
   *  选择的时间范围
   */
  value?: string;
}
