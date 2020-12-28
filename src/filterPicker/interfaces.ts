export interface FilterPickerProps {
  children?: any;
  getTooltipContainer: (node: HTMLElement) => HTMLElement;
  filter: FilterValue;
  propertyOptions: any[];
  measurements: any[];
  timeRange: string;
  onConfirm: (v: FilterValue) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
}
export type attributeValue = 'string' | 'int' | 'date';

export type FilterValueType = {
  op: StringValue | NumberValue | DateValue;
  values: string[] | number[];
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
}

export interface selectOption {
  string: {
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
