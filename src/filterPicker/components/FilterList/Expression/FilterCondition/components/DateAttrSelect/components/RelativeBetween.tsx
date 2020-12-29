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
  const [value1, setValue1] = useState('1');
  const [value2, setValue2] = useState('1');
  // 解析初始values值
  useEffect(() => {
    if (values.length) {
      const relativeTime = values[0].split(':')[1].split(',');
      if (parseInt(relativeTime[0], 10) < 0) {
        setValue('-1');
      } else {
        setValue('1');
      }
      setValue1(`${Math.abs(parseInt(relativeTime[0], 10))}`);
      setValue2(`${Math.abs(parseInt(relativeTime[1], 10))}`);
    }
  }, [values]);

  const setInputValue1 = (v: string) => {
    if (v && !v.toString().includes('NaN')) {
      setValue1(v);
    }
  };
  const setInputValue2 = (v: string) => {
    if (v && !v.toString().includes('NaN')) {
      setValue2(v);
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
  };
  const createAttrValue = () => {
    let t: string = '';
    if (nowOrFuturevalue === '-1') {
      t = `relativeTime:-${value1},-${value2}`;
    } else {
      t = `relativeTime:${value1}, ${value2}`;
    }
    onChange(t);
  };
  useEffect(() => {
    createAttrValue();
  }, [attrSelect, nowOrFuturevalue, value1, value2]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Select value={nowOrFuturevalue} options={selectOptions} onChange={selectChange} style={{ marginRight: '4px' }} />
      <Input.InputNumber value={value1} onChange={setInputValue1} style={{ width: '70px', margin: '0 4px' }} min={1} />
      <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>天至</div>
      <Input.InputNumber value={value2} onChange={setInputValue2} style={{ width: '70px', margin: '0 4px' }} min={1} />
      <div style={{ whiteSpace: 'nowrap', margin: '16px 4px' }}>天之内</div>
    </div>
  );
}

export default RelativeBetween;
