import React from 'react';
import { DatePickerProps } from '@gio-design/components/es/date-picker/interfaces';
import type { Option } from '@gio-design/components/es/list-picker/interfaces';

export type EndDateFixedMode = false | 'today' | 'yesterday';

export enum TimeCalculationMode {
  Since = 'since',
  Dynamic = 'dynamic',
  Absolute = 'absolute',
}

interface ExperimentProps {
  /**
   * 实验特性
   */
  experimental?: boolean;
}

export interface PastTimePickerProps extends ExperimentProps {
  /**
   * 时间范围
   */
  timeRange?: string;
  /**
   * 选择完后的回调，参数为选中项的 timeRange 值
   */
  onSelect?: (timeRange: string) => void;
  /**
   * 点击取消按钮时回调
   */
  onCancel?: () => void;
  /**
   * 常用时间过滤
   */
  shortcutFilter?: (shortcut: Option) => boolean;
}

export interface PanelSharedProps {
  /**
   * 日期范围
   */
  dateRange: [Date | undefined, Date | undefined];
  /**
   * 日期范围改变时的回调
   */
  onRangeChange: (dates: [Date, Date]) => void;
}

export interface RangeHeaderProps extends ExperimentProps, PanelSharedProps {
  /**
   * 结束日期固定模式改变时的回调
   */
  onModeChange: (fixedMode: boolean) => void;
}

export interface RangeBodyProps extends PanelSharedProps, Pick<DatePickerProps, 'disabledDate'> {
  fixedMode?: boolean;
}

export interface PanelProps extends ExperimentProps {
  value?: string;
  onSelect: (value: string) => void;
}

export interface RangePanelProps extends PanelProps {
  onCancel?: () => void;
}

export interface ShortcutPanelProps extends PanelProps {
  /**
   * 快捷选项列表，
   */
  options: Option[][];
}

export interface InnerRangePanelProps {
  disableOK?: boolean;
  header: React.ReactNode;
  body: React.ReactNode;
  /**
   * 选择完后的回调，参数为选中项的 timeRange 值
   */
  onOK?: () => void;
  /**
   * 点击取消按钮时回调
   */
  onCancel?: () => void;
}
