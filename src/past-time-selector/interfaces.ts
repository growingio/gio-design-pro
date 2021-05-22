import { PastTimePickerProps } from '../past-time-picker/interfaces';
import { SelectorProps } from '../selector/interfaces';

export interface PastTimeSelectorProps
  extends Omit<SelectorProps, 'dropdownRender' | 'valueRender' | 'mode' | 'borderless' | 'placeholder' | 'icon'>,
    Omit<PastTimePickerProps, 'className' | 'style' | 'timeRange'> {
  /**
   *  选择的时间范围
   */
  value?: string;
}
