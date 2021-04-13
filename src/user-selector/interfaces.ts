import { UserPickerProps } from '../user-picker/interfaces';
import { SelectorProps } from '../selector/interfaces';

export interface UserSelectorProps
  extends Omit<SelectorProps, 'dropdownRender' | 'valueRender'>,
    Omit<UserPickerProps, 'className' | 'style'> {}
