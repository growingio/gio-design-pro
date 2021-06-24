import React from 'react';
import { SizeType } from '@gio-design/utils/es/design-context';
import { DropdownProps } from '@gio-design/components';
import { BaseProps } from '../utils/interfaces';

export interface SelectorProps extends BaseProps {
  /**
   * 是否为无边框模式
   */
  borderless?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 下拉框是否可见
   */
  dropdownVisible?: boolean;
  /**
   * 自定义下拉框内容
   */
  dropdownRender: () => React.ReactElement | React.ReactElement;
  /**
   * 下拉框状态转变时调用，参数为 `visible`
   */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /**
   * placeholder
   */
  placeholder?: string;
  /**
   * 自定义显示内容
   */
  valueRender: () => React.ReactNode;
  /**
   * 下拉根元素的类名称
   */
  overlayClassName?: string;
  /**
   * 组件输入框的尺寸
   */
  size?: SizeType;
  /**
   * dropdown overlay 要渲染的父元素
   */
  getContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 选择器模式
   */
  mode?: 'input' | 'button';
  /**
   * 选择器的图标
   */
  icon?: React.ReactNode;
  /**
   * 关闭销毁
   */
  destroyTooltipOnHide?: DropdownProps['destroyTooltipOnHide'];
}
