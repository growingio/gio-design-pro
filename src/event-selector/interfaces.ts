import { EventPickerProps } from '../event-picker';
import { SelectorProps } from '../selector';

export interface EventSelectorProps extends EventPickerProps, Omit<SelectorProps, 'dropdownRender' | 'valueRender'> {}
