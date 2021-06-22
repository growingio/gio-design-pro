import React, { PropsWithChildren } from 'react';
import { BaseProps } from '../utils/interfaces';

export interface PanelProps extends PropsWithChildren<BaseProps> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'line' | 'block';
  size?: 'small' | 'middle' | 'large';
  onTabClick?: (key: string) => void;
  onChange?: (key: string) => void;
  activeKey?: string;
  defaultActiveKey?: string;
  footer?: React.ReactNode;
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
