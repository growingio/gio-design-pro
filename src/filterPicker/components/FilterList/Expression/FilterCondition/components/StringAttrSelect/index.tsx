import React, { useEffect, useState } from 'react';
import { Input, List, Checkbox, CheckboxGroup } from '@gio-design-new/components';
import { attributeValue } from '../../interfaces';

interface StringAttrSelectProps {
  valueType: attributeValue;
  attrSelect: string;
  attrChange: (v: any) => void;
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any>;
  values: string[];
  exprKey: string;
}

type listOptionsItem = {
  value: string;
  label: string;
};

function StringAttrSelect(props: StringAttrSelectProps) {
  const { attrSelect, valueType, curryDimensionValueRequest, attrChange, values = [], exprKey } = props;
  console.log(values, 'values');
  const [inputValue, setInputValue] = useState<string>(values.join(','));
  const [checkValue, setCheckValue] = useState<string[] | []>(values);
  const [listOptions, setListOptions] = useState<listOptionsItem[]>([]);
  const [listValue, setListValue] = useState<string>(values.length ? values[0] : '');

  useEffect(() => {
    setCheckValue(values);
    setInputValue(values.join(','));
    setListValue(values?.[0]);
  }, [values]);

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    console.log(v.target.value, 'inputValue');
    setInputValue(v.target.value);
    curryDimensionValueRequest('d', v.target.value).then((res: string[]) => {
      setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
    });
    attrChange([v.target.value]);
  };

  const changeListValue = (option: listOptionsItem) => {
    console.log(option, 'option');
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

  const changeCheckValue = (checkedValue: any[]) => {
    setInputValue(checkedValue.join(','));
    setCheckValue(checkedValue);
    attrChange(checkedValue);
  };

  useEffect(() => {
    curryDimensionValueRequest(exprKey, '').then((res: string[]) => {
      setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
    });
  }, [valueType, exprKey]);

  switch (attrSelect) {
    case 'in':
    case 'not in':
      return (
        <div style={{ height: '330px' }}>
          <Input
            placeholder="请输入…"
            size="small"
            value={inputValue}
            onChange={changInputValue}
            maxLength={10}
            style={{ display: 'block', marginBottom: '20px' }}
          />
          <div style={{ overflowY: 'auto', height: '280px' }}>
            <CheckboxGroup defaultValue={[]} value={checkValue} direction="vertical" onChange={changeCheckValue}>
              {listOptions.map((ele: listOptionsItem) => (
                <Checkbox value={ele.value}>{ele.label}</Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      );
    case 'hasValue':
    case 'noValue':
      return null;
    case 'like':
    case 'not like':
      return (
        <div>
          <Input
            placeholder="请输入…"
            size="small"
            value={inputValue}
            onChange={changInputValue}
            maxLength={10}
            style={{ display: 'block', marginBottom: '20px' }}
          />
        </div>
      );
    default:
      return (
        <div>
          <Input
            placeholder="请输入…"
            size="small"
            value={inputValue}
            onChange={changInputValue}
            maxLength={10}
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
