import React from 'react';
import { SizeType } from '@gio-design/utils/es/design-context';
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
  dropdownRender: () => React.ReactElement | React.ReactElement;
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

  overlayClassName?: string;
  /**
   * 组件输入框的尺寸
   */
  size?: SizeType;
  /**
   * dropdown overlay 要渲染的父元素
   */
  getContainer?: (node: HTMLElement) => HTMLElement;
}
