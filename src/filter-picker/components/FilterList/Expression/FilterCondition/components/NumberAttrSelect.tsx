import React, { useEffect, useState } from 'react';
import { Input } from '@gio-design/components';

interface NumberAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
}
function NumberAttrSelect(props: NumberAttrSelectProps) {
  const { attrSelect, attrChange, values } = props;
  const [value, setValue] = useState<number | string>(values[0] ? parseInt(values[0], 10) : 0);
  const [value1, setValue1] = useState<number | string>(values[0] ? parseInt(values[0], 10) : 0);
  const [value2, setValue2] = useState<number | string>(values[1] ? parseInt(values[1], 10) : 0);

  // 初始化attrValue值
  useEffect(() => {
    const num = values[0] && values[0] !== ' ' ? values[0] : '0';
    setValue(parseInt(values[0], 10) || 0);
    setValue1(parseInt(values[0], 10) || 0);
    setValue2(Number.isNaN(parseInt(values[1], 10)) ? num : parseInt(values[1], 10));
    if (attrSelect === 'between' || attrSelect === 'not between') {
      attrChange([num, values[1] || num]);
    } else {
      attrChange([num]);
    }
  }, [attrSelect]);

  const setValue1Number = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if ((v && /^-?[0-9]\d*$/.test(`${v}`)) || v === '-') {
      setValue1(v);
      if (v !== '-') {
        attrChange([v, value2]);
      }
    } else if (!v) {
      setValue1(v);
      attrChange(['0', value2]);
    }
  };

  // 设置数值
  const setNumberValue = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if ((v && /^-?[0-9]\d*$/.test(`${v}`)) || v === '-') {
      setValue(v);
      if (v !== '-') {
        attrChange([v]);
      }
    } else if (!v) {
      setValue(v);
      attrChange(['0']);
    }
  };
  // 设置区间方法
  const setBetweenNumberValue = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if ((v && /^-?[0-9]\d*$/.test(`${v}`)) || v === '-') {
      setValue2(v);
      if (v !== '-') {
        attrChange([value1, v]);
      }
    } else if (!v) {
      setValue2(v);
      attrChange([value1, '0']);
    }
  };

  switch (attrSelect) {
    case 'between':
    case 'not between':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input value={value1} onChange={setValue1Number} style={{ width: '120px' }} />
          <div style={{ margin: '0 16px' }}>与</div>
          <Input value={value2} onChange={setBetweenNumberValue} style={{ width: '120px' }} />
        </div>
      );
    case 'hasValue':
    case 'noValue':
      return null;
    default:
      return <Input value={value} onChange={setNumberValue} />;
  }
}

export default NumberAttrSelect;