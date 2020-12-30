import React, { useEffect, useState } from 'react';
import { Input, List, Checkbox, CheckboxGroup } from '@gio-design-new/components';
import { attributeValue } from '../../interfaces';

interface StringAttrSelectProps {
  valueType: attributeValue;
  attrSelect: string;
  attrChange: (v: any) => void;
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
  const [inputValue, setInputValue] = useState<string>(
    attrSelect !== 'in' && attrSelect !== 'not in' ? values.join(',') : ''
  );
  const [checkValue, setCheckValue] = useState<string[] | []>(values);
  const [listOptions, setListOptions] = useState<listOptionsItem[]>([]);
  const [listValue, setListValue] = useState<string>(values.length ? values[0] : '');
  const [inputCheckList, setInputCheckList] = useState<string[]>([]);

  useEffect(() => {
    setCheckValue(values);
    setInputValue(attrSelect !== 'in' && attrSelect !== 'not in' ? values.join(',') : '');
    setListValue(values?.[0]);
  }, [values]);

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    const valueList = v.target.value.split(',');
    const filterValueList = valueList.filter((ele: string) => !!ele);
    if (attrSelect === 'in' || attrSelect === 'not in') {
      console.log('in');
      // 当字符串类型为在范围内（in),不在范围内（not in)时，搜索逻辑和其他条件不同

      if (valueList.length > 1 && valueList[valueList.length - 1] === '') {
        // 当input输入字符串，存在英文逗号时，将字符串以英文逗号为分割点，
        const checkList = Array.from(new Set([...filterValueList, ...inputCheckList]));
        setInputCheckList(checkList);
        setListOptions(checkList.map((ele: string) => ({ label: `自由输入：${ele}`, value: ele })));
        setCheckValue(checkList);
      } else {
        curryDimensionValueRequest?.(exprKey, valueList[valueList.length - 1] || '')?.then((res: string[]) => {
          setListOptions([
            ...inputCheckList.map((ele: string) => ({ label: `自由输入：${ele}`, value: ele })),
            ...res.map((ele: string) => ({ label: ele, value: ele })),
          ]);
        });
      }
      // if (attrSelect === 'in' || attrSelect === 'not in') {
      //   setCheckValue([...inputCheckList, ...checkValue]);
      //   attrChange([...checkValue, ...inputCheckList]);
      // } else {
      //   attrChange([v.target.value]);
      // }
    } else {
      curryDimensionValueRequest?.(exprKey, v.target.value)?.then((res: string[]) => {
        setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
      });
    }

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

  const changeCheckValue = (checkedValue: any[]) => {
    setCheckValue(checkedValue);
    attrChange(checkedValue);
  };

  useEffect(() => {
    curryDimensionValueRequest?.(exprKey, '')?.then((res: string[]) => {
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
            style={{ display: 'block', marginBottom: '20px' }}
          />
          <div style={{ overflowY: 'auto', height: '280px' }}>
            <CheckboxGroup defaultValue={[]} value={checkValue} direction="vertical" onChange={changeCheckValue}>
              {listOptions.map((ele: listOptionsItem) => (
                <Checkbox key={ele.value} value={ele.value}>
                  {ele.label}
                </Checkbox>
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
