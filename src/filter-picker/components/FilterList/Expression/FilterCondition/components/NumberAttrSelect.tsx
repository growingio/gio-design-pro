import React, { useEffect, useState } from 'react';
import { Input } from '@gio-design/components';

interface NumberAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
}
function NumberAttrSelect(props: NumberAttrSelectProps) {
  const { attrSelect, attrChange, values } = props;
  const [value, setValue] = useState<number>(values[0] ? parseInt(values[0], 10) : 0);
  const [value1, setValue1] = useState<number>(values[0] ? parseInt(values[0], 10) : 0);
  const [value2, setValue2] = useState<number>(values[1] ? parseInt(values[1], 10) : 0);
  // 初始化attrValue值
  useEffect(() => {
    const num = values[0] ? values[0] : '0';
    setValue(parseInt(values[0], 10) || 0);
    setValue1(parseInt(values[0], 10) || 0);
    setValue2(parseInt(values[1], 10) || 0);
    if (attrSelect === 'between') {
      attrChange([num, num]);
    } else {
      attrChange([num]);
    }
  }, [attrSelect]);

  const setValue1Number = (v: number) => {
    setValue1(v);
  };

  // 设置数值
  const setNumberValue = (v: number) => {
    if (v && /^-?[1-9]\d*$/.test(`${v}`)) {
      setValue(v);
      attrChange([v]);
    } else if (!v) {
      setValue(0);
      attrChange(['0']);
    }
  };
  // 设置区间方法
  const setBetweenNumberValue = (v: number) => {
    if (v && /^-?[0-9]\d*$/.test(`${v}`)) {
      setValue2(v);
      attrChange([value1, v]);
    } else if (!v) {
      setValue2(0);
      attrChange([value1, '0']);
    }
  };

  switch (attrSelect) {
    case 'between':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.InputNumber value={value1} onChange={setValue1Number} style={{ width: '120px' }} />
          <div style={{ margin: '0 16px' }}>与</div>
          <Input.InputNumber value={value2} onChange={setBetweenNumberValue} style={{ width: '120px' }} />
        </div>
      );
    case 'hasValue':
    case 'noValue':
      return null;
    default:
      return <Input.InputNumber value={value} onChange={setNumberValue} />;
  }
}

export default NumberAttrSelect;
