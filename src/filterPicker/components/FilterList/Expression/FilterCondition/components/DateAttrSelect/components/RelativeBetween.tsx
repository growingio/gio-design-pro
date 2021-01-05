import React, { useEffect, useState } from 'react';
import { Input, Select } from '@gio-design-new/components';

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
    if (values.length) {
      const relativeTime = values[0].split(':')[1].split(',');
      if (parseInt(relativeTime[0], 10) < 0) {
        setValue('-1');
      } else {
        setValue('1');
      }
      setValue1(Math.abs(parseInt(relativeTime[0], 10)));
      setValue2(Math.abs(parseInt(relativeTime[1], 10)));
    }
  }, [values]);
  const createAttrValue = (v1: number, v2: number, nowOrFuture: string) => {
    let t: string = '';
    if (nowOrFuture === '-1') {
      t = `relativeTime:-${v1},-${v2}`;
    } else {
      t = `relativeTime:${v1}, ${v2}`;
    }
    onChange(t);
  };
  const setInputValue1 = (v: number) => {
    if (v && /^\d+$/.test(`${v}`)) {
      setValue1(v);
      createAttrValue(v, value2, nowOrFuturevalue);
    }
  };
  const setInputValue2 = (v: number) => {
    if (v && /^\d+$/.test(`${v}`)) {
      setValue2(v);
      createAttrValue(value1, v, nowOrFuturevalue);
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

  const selectChange = (v: string) => {
    setValue(v);
    createAttrValue(value1, value2, v);
  };

  useEffect(() => {
    // values值的初始化设置
    if (!values.length) {
      createAttrValue(value1, value2, nowOrFuturevalue);
    }
  }, [attrSelect, nowOrFuturevalue, value1, value2]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Select
          value={nowOrFuturevalue}
          options={selectOptions}
          onChange={selectChange}
          style={{ marginRight: '4px' }}
        />
        <Input.InputNumber
          value={value1}
          onChange={setInputValue1}
          style={{ width: '150px', margin: '0 4px' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>天至</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Input.InputNumber
          value={value2}
          onChange={setInputValue2}
          style={{ width: '150px', margin: '0 4px 0 0' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '16px 4px' }}>天之内</div>
      </div>
    </>
  );
}

export default RelativeBetween;
