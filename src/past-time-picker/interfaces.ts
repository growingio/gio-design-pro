import { Moment } from 'moment';

export interface Option {
  label: string;
  value: string;
}

interface ExperimentProps {
  /**
   * 实验特性
   */
  experimental?: boolean;
}

export interface PastTimePickerProps {
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
   * 实验特性
   */
  experimental?: boolean;
  /**
   * 常用时间过滤
   */
  shortcutFilter?: (shortcut: Option) => boolean;
}

export interface RangeCalendarProps {
  className?: string;
  disabledDate?: (current: Moment) => boolean;
  onCancel?: () => void;
  onOk?: () => void;
  onSelect?: (value: (Moment | undefined)[]) => void;
  selectedValue?: (Moment | undefined)[];
  defaultSelectedValue?: Moment[];
  disabledOk?: boolean;
  onChange?: (date: (Moment | undefined)[]) => void;
}

export interface RangeHeaderProps {
  experimental?: boolean;
  dateRange: (Moment | undefined)[];
  onRangeChange: (dates: (Moment | undefined)[]) => void;
  onModeChange?: (mode: EndDateFixedMode) => void;
}

export interface RangeInputProps {
  disabled?: boolean;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
}

export enum TimeCalculationMode {
  Since = 'since',
  Dynamic = 'dynamic',
  Absolute = 'absolute',
}

export interface SelectListProps {
  options: Option[];
  value?: string;
  onSelect?: (value: string) => void;
}

export interface PanelProps extends ExperimentProps {
  value?: string;
  onSelect?: (value: string) => void;
}

export interface RangePanelProps extends PanelProps {
  timeCalculationMode: TimeCalculationMode;
  onCancel?: () => void;
}

export interface ShortcutPanelProps extends PanelProps {
  /**
   * 快捷选项列表，
   */
  options: Option[][];
}

export type EndDateFixedMode = false | 'today' | 'yesterday';
