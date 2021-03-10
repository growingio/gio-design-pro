import { PropertyPickerProps } from '../property-selector';

export interface FilterPickerProps {
  children?: any;
  getTooltipContainer: (node: HTMLElement) => HTMLElement;
  filter: FilterValue;
  propertyOptions: any[];
  measurements: any[];
  timeRange: string;
  onConfirm: (v: FilterValue) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  recentlyStorePrefix: string;

  /**
   * 获取属性详情的方法，并且可以修改最后的展示数据
   * @example
   * fetchDetailData: (node: PropertyValue) => new Promise((resolve) => {
   *   setTimeout(
   *     () => resolve(node),
   *     500
   *   );
   * })
   */
  fetchDetailData?: PropertyPickerProps['fetchDetailData'];
}
export type attributeValue = 'string' | 'int' | 'date';

export type FilterValueType = {
  op: StringValue | NumberValue | DateValue;
  values: string[];
  key?: string;
  name?: string;
  valueType?: attributeValue;
};

export type FilterValue = {
  op: string;
  exprs: FilterValueType[];
};

export type StringValue = '=' | '!=' | '<' | '>';
export type NumberValue = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'hasValue';
export type DateValue = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'relativeTime';

export interface titleGroup {
  string: string;
  int: string;
  date: string;
  STRING: string;
}

export interface selectOption {
  string: {
    value: string;
    label: string;
  }[];
  STRING: {
    value: string;
    label: string;
  }[];
  int: {
    value: string;
    label: string;
  }[];
  date: {
    value: string;
    label: string;
  }[];
}
