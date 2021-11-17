import { titleGroup, selectOption, FilterValueType } from './interfaces';

export const titleMap: titleGroup = {
  string: '字符串类型',
  STRING: '字符串类型',
  int: '数值类型',
  date: '日期类型',
};

export const enTitleMap: titleGroup = {
  string: 'String',
  STRING: 'String',
  int: 'Int',
  date: 'Date',
};

export const defaultFilterItem: FilterValueType = {
  op: '=',
  values: [],
  valueType: 'string',
  name: '',
  key: '',
};

export const selectOptionMap: selectOption = {
  string: [
    {
      value: '=',
      label: '等于',
    },
    {
      value: '!=',
      label: '不等于',
    },
    {
      value: 'in',
      label: '在...范围内',
    },
    {
      value: 'not in',
      label: '不在...范围内',
    },
    {
      value: 'like',
      label: '包含',
    },
    {
      value: 'not like',
      label: '不包含',
    },
    {
      value: 'hasValue',
      label: '有值',
    },
    {
      value: 'noValue',
      label: '无值',
    },
  ],
  // Tag类型
  STRING: [
    {
      value: '=',
      label: '等于',
    },
    {
      value: '!=',
      label: '不等于',
    },
    {
      value: 'in',
      label: '在...范围内',
    },
    {
      value: 'not in',
      label: '不在...范围内',
    },
    {
      value: 'like',
      label: '包含',
    },
    {
      value: 'not like',
      label: '不包含',
    },
  ],
  int: [
    {
      value: '=',
      label: '等于',
    },
    {
      value: '!=',
      label: '不等于',
    },
    {
      value: '>',
      label: '大于',
    },
    {
      value: '>=',
      label: '大于等于',
    },
    {
      value: '<',
      label: '小于',
    },
    {
      value: '<=',
      label: '小于等于',
    },
    {
      value: 'between',
      label: '在...与...之间',
    },
    {
      value: 'not between',
      label: '不在...与...之间',
    },
    {
      value: 'hasValue',
      label: '有值',
    },
    {
      value: 'noValue',
      label: '无值',
    },
  ],
  date: [
    {
      value: '=',
      label: '等于',
    },
    {
      value: '!=',
      label: '不等于',
    },
    {
      value: '<',
      label: '在某天之前',
    },
    {
      value: '>',
      label: '在某天之后',
    },
    {
      value: 'between',
      label: '在...与...之间',
    },
    {
      value: 'not between',
      label: '不在...与...之间',
    },
    // {
    //   value: 'e',
    //   label: '不在...与...之间',
    // },
    {
      value: 'relativeCurrent',
      label: '相对现在',
      // values: ["relativeTime:-1,0"]
    },
    {
      value: 'relativeBetween',
      label: '相对区间',
      // values: ["relativeTime:-1,-1"]
    },
    {
      value: 'hasValue',
      label: '有值',
    },
    {
      value: 'noValue',
      label: '无值',
    },
  ],
};
export const enSelectOptionMap: selectOption = {
  string: [
    {
      value: '=',
      label: 'equal',
    },
    {
      value: '!=',
      label: 'not equal to',
    },
    {
      value: 'in',
      label: 'bewteen',
    },
    {
      value: 'not in',
      label: 'not between',
    },
    {
      value: 'like',
      label: 'include',
    },
    {
      value: 'not like',
      label: 'not include',
    },
    {
      value: 'hasValue',
      label: 'hasValue',
    },
    {
      value: 'noValue',
      label: 'noValue',
    },
  ],
  // Tag类型
  STRING: [
    {
      value: '=',
      label: 'equal',
    },
    {
      value: '!=',
      label: 'not equal to',
    },
    {
      value: 'in',
      label: 'between',
    },
    {
      value: 'not in',
      label: 'not between',
    },
    {
      value: 'like',
      label: 'include',
    },
    {
      value: 'not like',
      label: 'not include',
    },
  ],
  int: [
    {
      value: '=',
      label: 'equal',
    },
    {
      value: '!=',
      label: 'not equal to',
    },
    {
      value: '>',
      label: 'greater than',
    },
    {
      value: '>=',
      label: 'greater than or equal to',
    },
    {
      value: '<',
      label: 'less than',
    },
    {
      value: '<=',
      label: 'less than or equal to',
    },
    {
      value: 'between',
      label: 'between',
    },
    {
      value: 'not between',
      label: 'not between',
    },
    {
      value: 'hasValue',
      label: 'hasValue',
    },
    {
      value: 'noValue',
      label: 'noValue',
    },
  ],
  date: [
    {
      value: '=',
      label: 'equal',
    },
    {
      value: '!=',
      label: 'not equal to',
    },
    {
      value: '<',
      label: 'before a certain day',
    },
    {
      value: '>',
      label: 'after a certain day',
    },
    {
      value: 'between',
      label: 'between',
    },
    {
      value: 'not between',
      label: 'not between',
    },
    // {
    //   value: 'e',
    //   label: '不在...与...之间',
    // },
    {
      value: 'relativeCurrent',
      label: 'relativeCurrent',
      // values: ["relativeTime:-1,0"]
    },
    {
      value: 'relativeBetween',
      label: 'relativeBetween',
      // values: ["relativeTime:-1,-1"]
    },
    {
      value: 'hasValue',
      label: 'hasValue',
    },
    {
      value: 'noValue',
      label: 'noValue',
    },
  ],
};

export const selectValueMap = {
  string: {},
  int: {
    '=': '等于',
    '!=': '不等于',
    '>': '大于',
    '>=': '大于等于',
    '<': '小于',
    '<=': '小于等于',
    hasValue: '有值',
  },
  date: {
    '=': '等于',
    '!=': '不等于',
    '>': '在某天之后',
    '>=': '在某天之后包括当天',
    '<': '在某天之前',
    '<=': '在某天之前包括当天',
    hasValue: '有值',
  },
};

export const enSelectValueMap = {
  string: {},
  int: {
    '=': 'equal',
    '!=': 'not equal to',
    '>': 'greater than',
    '>=': 'greater than or equal to',
    '<': 'less than',
    '<=': 'less than or equal to',
    hasValue: 'hasValue',
  },
  date: {
    '=': 'equal',
    '!=': 'not equal to',
    '>': 'after a certain day',
    '>=': 'after a certain day (including that day)',
    '<': 'before a certain day',
    '<=': 'before a certain date (including that day)',
    hasValue: '有值',
  },
};

export const AttributeMap = {
  string: 'string',
  int: 'int',
  date: 'date',
  STRING: 'STRING',
};

export default { titleMap, enTitleMap, selectOptionMap, enSelectOptionMap, selectValueMap, defaultFilterItem };
