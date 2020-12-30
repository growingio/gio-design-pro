import React, { useEffect, useState } from 'react';
import { Input } from '@gio-design-new/components';

interface NumberAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
}
function NumberAttrSelect(props: NumberAttrSelectProps) {
  const { attrSelect, attrChange, values } = props;
  const [value, setValue] = useState<string>(values[0] ? values[0] : '0');
  const [value1, setValue1] = useState<string>(values[0] ? values[0] : '0');
  const [value2, setValue2] = useState<string>(values[1] ? values[1] : '0');
  // 初始化attrValue值
  useEffect(() => {
    const num = values[0] ? values[0] : '0';
    setValue(values[0] || '0');
    setValue1(values[0] || '0');
    setValue2(values[1] || '0');
    if (attrSelect === 'between') {
      attrChange([num, num]);
    } else {
      attrChange([num]);
    }
  }, [attrSelect]);

  // 设置数值
  const setNumberValue = (v: string) => {
    setValue(v);
    attrChange([v]);
  };
  // 设置区间方法
  const setBetweenNumberValue = (v: string) => {
    setValue2(v);
    attrChange([value1, v]);
  };

  switch (attrSelect) {
    case 'between':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.InputNumber value={value1} onChange={setValue1} />
          <div style={{ margin: '0 16px' }}>与</div>
          <Input.InputNumber value={value2} onChange={setBetweenNumberValue} />
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
