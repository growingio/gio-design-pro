import React, { PropsWithChildren } from 'react';
import { BaseProps } from '../utils/interfaces';

export interface PanelProps extends PropsWithChildren<BaseProps> {
  title?: React.ReactNode;
  /**
   * 描述
   * type string 默认最多显示3行
   * type React.ReactNode 自定义
   */
  description?: React.ReactNode | string;
  descriptionClamp?: number;
  tabType?: 'line' | 'block';
  tabSize?: 'small' | 'middle' | 'large';
  onTabClick?: (key: string) => void;
  onChange?: (key: string) => void;
  activeKey?: string;
  defaultActiveKey?: string;
  footer?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
}

export interface TabPaneProps extends PropsWithChildren<BaseProps> {
  name?: React.ReactNode;
  disabled?: boolean;
}

export interface ToolBarProps extends PropsWithChildren<BaseProps> {
  float?: 'left' | 'right' | 'none' | string;
}

export interface BatchActionProps extends PropsWithChildren<BaseProps> {
  onClose?: () => void;
  count?: number;
}
