import React from 'react';
import { BaseProps } from '../utils/interfaces';

export interface SelectorProps extends BaseProps {
  /**
   * Whether has border style
   */
  borderless?: boolean;
  /**
   * Whether disabled selector
   */
  disabled?: boolean;
  /**
   * Whether the dropdown of selector is currently visible
   */
  dropdownVisible?: boolean;
  /**
   * Customize dropdown content
   */
  dropdownRender: () => React.ReactElement;
  /**
   * Called when the dropdown visible state is changed
   */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /**
   * Placeholder of selector
   */
  placeholder?: string;
  /**
   * Customize the vaule of input
   */
  valueRender: () => React.ReactNode;
}
