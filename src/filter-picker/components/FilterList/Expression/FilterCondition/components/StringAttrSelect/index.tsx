import React, { useEffect, useState } from 'react';
import { Input, List, Loading } from '@gio-design/components';
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
  key: string;
  children: string;
  onClick: (checkedValue: listOptionsItem) => void;
};

let timer: any = null;
function StringAttrSelect(props: StringAttrSelectProps) {
  const { attrSelect, valueType, curryDimensionValueRequest, attrChange, values = [], exprKey } = props;
  const [inputValue, setInputValue] = useState<string>(values.join(','));
  const [listOptions, setListOptions] = useState<listOptionsItem[]>([]);
  // const [listValue, setListValue] = useState<string>(values.join(','));
  const [loadingStatue, setLoadingStatue] = useState<boolean>(true);
  useEffect(() => {
    setInputValue(values?.length ? values[0] : '');
    // setListValue(values?.[0]);
  }, [values]);

  const changeListValue = (option: any) => {
    const value = option.currentTarget.innerText;
    if (inputValue === value) {
      setInputValue('');
      // setListValue('');
      attrChange([' ']);
    } else {
      setInputValue(value);
      // setListValue(value);
      attrChange([value]);
    }
  };

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingStatue(true);
    if (timer) {
      clearTimeout(timer);
    }
    const value = v?.target?.value;
    timer = setTimeout(() => {
      curryDimensionValueRequest?.(exprKey, value)?.then((res: string[]) => {
        if (res.length) {
          setListOptions(res.map((ele: string) => ({ children: ele, key: ele, onClick: changeListValue })));
        } else {
          setListOptions([]);
        }
        setLoadingStatue(false);
      });
    }, 500);
    attrChange([v.target.value]);
    setInputValue(v.target.value);
  };

  useEffect(() => {
    curryDimensionValueRequest?.(exprKey, '')?.then((res: string[]) => {
      if (res.length) {
        setListOptions(res.map((ele: string) => ({ children: ele, key: ele, onClick: changeListValue })));
      } else {
        setListOptions([]);
      }
      setLoadingStatue(false);
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
        <div style={{ width: '100%', height: '100%' }}>
          <Input placeholder="请输入…" size="middle" value={inputValue} onChange={changInputValue} />
          {loadingStatue ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loading />
            </div>
          ) : (
            <List items={listOptions} />
          )}
        </div>
      );
  }
}

export default StringAttrSelect;
