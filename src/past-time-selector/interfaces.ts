import { SelectorProps } from '@gio-design/components/es/selector/interfaces';
import { PastTimePickerProps } from '../past-time-picker/interfaces';

export interface PastTimeSelectorProps
  extends Pick<
      SelectorProps,
      'borderless' | 'disabled' | 'fitContent' | 'placeholder' | 'size' | 'triggerClassName' | 'triggerStyle'
    >,
    Pick<PastTimePickerProps, 'experimental' | 'onCancel' | 'onSelect' | 'shortcutFilter'> {
  /**
   *  选择的时间范围
   */
  value?: string;
}
