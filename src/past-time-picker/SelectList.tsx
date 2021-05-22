import React from 'react';
import classnames from 'classnames';
import { List } from '@gio-design/components';
import { usePrefixCls } from '@gio-design/utils';
import { SelectListProps } from './interfaces';

const SelectList: React.FC<SelectListProps> = ({ options, value, onSelect }: SelectListProps) => {
  const [currentValue, setCurrentVaule] = React.useState<string>();
  const prefixCls = usePrefixCls('selectable-list');
  const itemPrefixCls = `${prefixCls}__item`;

  function onItemClick(selectedValue: string) {
    setCurrentVaule(selectedValue);
    onSelect?.(selectedValue);
  }

  return (
    <List className={prefixCls}>
      {options.map((o) => (
        <List.Item
          key={o.value}
          className={classnames(itemPrefixCls, { [`${itemPrefixCls}--actived`]: o.value === (value ?? currentValue) })}
          onClick={() => {
            onItemClick(o.value);
          }}
        >
          {o.label}
        </List.Item>
      ))}
    </List>
  );
};

export default SelectList;
