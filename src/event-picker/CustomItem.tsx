import { Tooltip, Checkbox } from '@gio-design/components';
import { makeSearchParttern } from '@gio-design/components/es/components/cascader/helper';
import React, { ChangeEvent, useState, useEffect } from 'react';

import TypeIcon from './TypeIcon';
import { EventData } from './interfaces';

export interface Props {
  dataSource: EventData;
  keyword?: string;
  value?: string;
  multiple?: boolean;
  onCheckboxChange?: (data: EventData, checked: boolean) => void;
  // onMouseEnter?: (e: React.MouseEvent, data: EventData) => void;
  // onMouseLeave?: (e: React.MouseEvent) => void;
}

const renderKeyword = (label: string, keyword: string, ignoreCase: boolean) => {
  if (!keyword) {
    return label;
  }
  const rSearch = makeSearchParttern(keyword, ignoreCase);
  const replaceValues: string[] = [];
  label.replace(rSearch, (s) => {
    replaceValues.push(s);
    return s;
  });

  const result = label.split(rSearch).reduce((acc, b, i) => {
    acc.push(
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${b}-${i}`}>
        <span>{b}</span>
        <b className="keyword">{replaceValues.shift()}</b>
      </span>
    );
    return acc;
  }, [] as React.ReactElement[]);

  return result;
};

export const CustomItem: React.FC<Props> = (props) => {
  const {
    dataSource,
    dataSource: { name, type, disabled },
    keyword,
    value,
    multiple,
    onCheckboxChange,
  } = props;

  const [checked, setChecked] = useState(dataSource.selectKey === value);
  useEffect(() => {
    setChecked(dataSource.selectKey === value);
  }, [dataSource, value]);
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onCheckboxChange?.(dataSource, e.target.checked);
  };
  return (
    <Tooltip overlay={<div>{dataSource.disabledTips ?? '暂不可用'}</div>} disabled={!disabled}>
      <div className="item-content">
        {multiple && (
          <Checkbox
            disabled={disabled}
            onChange={handleCheckboxChange}
            className="item-content-checkbox"
            checked={checked}
            // defaultChecked={dataSource.selectKey === value}
          />
        )}
        <TypeIcon size="14px" className="item-content-icon" type={type || ''} />
        <span className="item-content-body" title={name}>
          {renderKeyword(name as string, keyword || '', true)}
        </span>
      </div>
    </Tooltip>
  );
};

export default CustomItem;
