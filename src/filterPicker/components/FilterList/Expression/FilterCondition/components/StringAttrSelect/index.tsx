import React, { useEffect, useState } from 'react';
import { Input, List } from '@gio-design/components';
import { attributeValue } from '../../interfaces';
import InOrNotIn from './InOrNotIn';

interface StringAttrSelectProps {
  // 维度类型
  valueType: attributeValue;
  attrSelect: string;
  // 当属性值变化时回调函数
  attrChange: (v: any) => void;
  // 根据属性值获取对应维度，第一个参数是属性值，第二个参数是搜索关键字
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any> | undefined;
  values: string[];
  exprKey: string;
}

type listOptionsItem = {
  value: string;
  label: string;
};

function StringAttrSelect(props: StringAttrSelectProps) {
  const { attrSelect, valueType, curryDimensionValueRequest, attrChange, values = [], exprKey } = props;
  const [inputValue, setInputValue] = useState<string>(values.join(','));
  const [listOptions, setListOptions] = useState<listOptionsItem[]>([]);
  const [listValue, setListValue] = useState<string>(values.join(','));

  useEffect(() => {
    setInputValue(inputValue || '');
    setListValue(values?.[0]);
  }, [values]);

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    curryDimensionValueRequest?.(exprKey, v.target.value)?.then((res: string[]) => {
      res.length && setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
    });
    attrChange([v.target.value]);
    setInputValue(v.target.value);
  };

  const changeListValue = (option: listOptionsItem) => {
    if (inputValue === option.label) {
      setInputValue('');
      setListValue('');
      attrChange([' ']);
    } else {
      setInputValue(option.label);
      setListValue(option.label);
      attrChange([option.label]);
    }
  };

  useEffect(() => {
    curryDimensionValueRequest?.(exprKey, '')?.then((res: string[]) => {
      res.length && setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
    });
  }, [valueType, exprKey]);

  switch (attrSelect) {
    case 'in':
    case 'not in':
      return (
        <InOrNotIn
          attrChange={attrChange}
          valueType={valueType}
          curryDimensionValueRequest={curryDimensionValueRequest}
          values={values}
          exprKey={exprKey}
        />
      );
    case 'hasValue':
    case 'noValue':
      return null;
    default:
      return (
        <div style={{ width: '100%' }}>
          <Input
            placeholder="请输入…"
            size="middle"
            value={inputValue}
            onChange={changInputValue}
            style={{ display: 'block', marginBottom: '20px' }}
          />
          <List
            stateless
            value={listValue}
            dataSource={listOptions}
            width={300}
            height={250}
            onClick={changeListValue}
          />
        </div>
      );
  }
}

export default StringAttrSelect;
