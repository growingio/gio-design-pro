import { PropertyPickerProps } from '../property-selector';

export interface FilterPickerProps extends Pick<PropertyPickerProps, 'fetchDetailData'> {
  children?: any;
  getTooltipContainer: (node: HTMLElement) => HTMLElement;
  filter: FilterValue;
  propertyOptions: any[];
  measurements: any[];
  timeRange: string;
  onConfirm: (v: FilterValue) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  recentlyStorePrefix: string;
  operationsOption?: operationsOptionType;
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

export type opStringType = '=' | '!=' | 'in' | 'not in' | 'like' | 'not like' | 'hasValue' | 'noValue';
export type opNumberType = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'not between' | 'hasValue' | 'noValue';
export type opDateType =
  | '='
  | '!='
  | '>'
  | '<'
  | 'relativeBetween'
  | 'relativeCurrent'
  | 'between'
  | 'not between'
  | 'hasValue'
  | 'noValue';

type opSTRINGType = '=' | '!=' | 'in' | 'not in' | 'like' | 'not like';

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

export interface operationsOptionType {
  string: opStringType[];
  int: opNumberType[];
  date: opDateType[];
  STRING: opSTRINGType[];
}
