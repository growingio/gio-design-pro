import React from 'react';
import type { DatePickerProps } from '@gio-design/components/es/date-picker/interfaces';
import type { Option } from '@gio-design/components/es/list-picker/interfaces';

export type EndDateFixedMode = false | 'today' | 'yesterday';

export enum TimeMode {
  Absolute = 'absolute',
  Since = 'since',
  Relative = 'relative',
}

interface ExperimentProps {
  /**
   * 实验特性
   */
  experimental?: boolean;
}

interface PickerProps extends ExperimentProps, Pick<DatePickerProps, 'disabledDate'> {
  /**
   * 时间范围
   */
  timeRange?: string;
  /**
   * 选择完后的回调，参数为选中项的 timeRange 值
   */
  onSelect: (timeRange: string) => void;
}

export interface PastTimePickerProps extends Omit<PickerProps, 'onSelect'> {
  /**
   * 显示的面板，默认都显示
   */
  modes?: TimeMode[];
  /**
   * 常用时间过滤
   */
  quickOptionsFilter?: (o: Option) => boolean;
  /**
   * 点击取消按钮时回调
   */
  onCancel?: () => void;
  /**
   * 选择完后的回调，参数为选中项的 timeRange 值
   */
  onSelect?: (timeRange: string) => void;
}

export interface RangePickerProps extends PickerProps {
  /**
   * 点击取消按钮时回调
   */
  onCancel?: () => void;
}

export interface QuickPickerProps extends PickerProps {
  /**
   * 快捷选项列表
   */
  options: Option[][];
  /**
   * 快捷选项过滤
   */
  optionsFilter?: (o: Option) => boolean;
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

interface RangePickerInnerProps {
  /**
   * 日期范围
   */
  dateRange: [Date | undefined, Date | undefined];
  /**
   * 日期范围改变时的回调
   */
  onRangeChange: (dates: [Date, Date]) => void;
}

export interface RelativeRangeHeaderProps extends ExperimentProps, RangePickerInnerProps {
  /**
   * 结束日期固定模式改变时的回调
   */
  onModeChange: (fixedMode: boolean) => void;
}

export interface RelativeRangeBodyProps extends RangePickerInnerProps, Pick<DatePickerProps, 'disabledDate'> {
  fixedMode?: boolean;
}
