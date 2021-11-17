import React, { useEffect, useState } from 'react';
import { Input, Select } from '@gio-design/components';

interface RelativeBetweenProps {
  onChange: (v: string) => void;
  attrSelect: string;
  values: string[];
}
function RelativeBetween(props: RelativeBetweenProps) {
  const { onChange, attrSelect, values } = props;
  const [nowOrFuturevalue, setValue] = useState('-1');
  const [value1, setValue1] = useState<number>(1);
  const [value2, setValue2] = useState<number>(1);
  // 解析初始values值
  useEffect(() => {
    if (values.length && typeof values[0] === 'string') {
      const relativeTime = values[0].split(':')[1].split(',');
      if (parseInt(relativeTime[0], 10) < 0) {
        setValue('-1');
      } else {
        setValue('1');
      }
      setValue1(Math.abs(parseInt(relativeTime[0], 10)));
      setValue2(Math.abs(parseInt(relativeTime[1], 10)) || 1);
    }
  }, [values]);
  const createAttrValue = (v1: number, v2: number, nowOrFuture: string) => {
    let t: string = '';
    if (nowOrFuture === '-1') {
      t = `relativeTime:-${v1},-${v2}`;
    } else {
      t = `relativeTime:${v1},${v2}`;
    }
    onChange(t);
  };
  const setInputValue1 = (v: number) => {
    if (v && /^\d+$/.test(`${v}`)) {
      setValue1(v);
      createAttrValue(v, value2, nowOrFuturevalue);
    } else if (!v) {
      setValue1(v);
      createAttrValue(0, value2, nowOrFuturevalue);
    }
  };
  const setInputValue2 = (v: number) => {
    if (v && /^\d+$/.test(`${v}`)) {
      setValue2(v);
      createAttrValue(value1, v, nowOrFuturevalue);
    } else if (!v) {
      setValue2(v);
      createAttrValue(value1, 0, nowOrFuturevalue);
    }
  };
  const selectOptions = [
    {
      value: '-1',
      label: '过去',
    },
    {
      value: '1',
      label: '未来',
    },
  ];
  const enSelectOptions = [
    {
      value: '-1',
      label: 'past',
    },
    {
      value: '1',
      label: 'future',
    },
  ];

  const selectChange = (v: string) => {
    setValue(v);
    createAttrValue(value1, value2, v);
  };

  useEffect(() => {
    // values值的初始化设置
    if (!values.length) {
      createAttrValue(value1, value2, nowOrFuturevalue);
    }
  }, [attrSelect]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {window.localStorage.getItem('locale') === 'en-US' && (
          <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>at</div>
        )}
        <Select
          value={nowOrFuturevalue}
          options={window.localStorage.getItem('locale') === 'en-US' ? enSelectOptions : selectOptions}
          onChange={selectChange}
          style={{ marginRight: '4px', width: '90px' }}
        />
        <Input.InputNumber
          value={value1}
          onChange={setInputValue1}
          style={{ width: '150px', margin: '0 4px' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>
          {window.localStorage.getItem('locale') === 'en-US' ? 'Day to ' : '天至'}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Input.InputNumber
          value={value2}
          onChange={setInputValue2}
          style={{ width: '150px', margin: '0 4px 0 0' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '16px 4px' }}>
          {window.localStorage.getItem('locale') === 'en-US' ? 'Day within' : '天之内'}
        </div>
      </div>
    </>
  );
}

export default RelativeBetween;
