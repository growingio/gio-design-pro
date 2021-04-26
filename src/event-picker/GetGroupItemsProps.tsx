import classNames from 'classnames';
import React from 'react';
import { ListItemProps } from '../list/interfaces';
import CustomItem from './CustomItem';
import { EventData } from './interfaces';

export interface GroupListItemEvent {
  onMouseEnter?: (e: EventData) => void;
  onMouseLeave?: () => void;
  onClick?: (value: EventData) => void;
  onCheckboxChange?: (value: EventData, checked: boolean) => void;
}
export interface GroupItemsProps extends GroupListItemEvent {
  /**
   * 列表项的数据源
   */
  dataSource: EventData[];
  /**
   * 分组的key前缀
   */
  keyPrefix?: string;
  /**
   * 选中项的value，通常为 selectKey
   */
  value?: string[];
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 搜索的关键字
   */
  keyword?: string;
}
const ListItems = (props: GroupItemsProps) => {
  const {
    dataSource = [],
    keyPrefix = '',
    onMouseEnter,
    onMouseLeave,
    onClick,
    onCheckboxChange,
    multiple,
    keyword,
    value = [],
  } = props;
  const handleItemMouseEnter = (node: EventData) => {
    onMouseEnter?.(node);
  };
  const handleItemMouseLeave = () => {
    onMouseLeave?.();
  };

  const handleCheckboxChange = (node: EventData, checked: boolean) => {
    onCheckboxChange?.(node, checked);
    onClick?.(node);
  };
  const handleItemClick = (node: EventData) => {
    if (!multiple) {
      onClick?.(node);
    }
  };
  const listItems = dataSource.map((d: EventData) => {
    const data = (d || {}) as EventData;
    const select = value.includes(data.selectKey || '');

    const itemProp: ListItemProps = {
      disabled: data.disabled,
      ellipsis: true,
      key: ['item', keyPrefix, data.type, data.id].join('-'),
      className: classNames({ selected: !!select && !multiple }),
      children: (
        <CustomItem
          dataSource={data}
          keyword={keyword}
          multiple={multiple}
          value={select ? data.selectKey : undefined}
          onCheckboxChange={(node, checked) => {
            handleCheckboxChange(node, checked);
          }}
        />
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick: (_) => handleItemClick(data),
      onMouseEnter: () => {
        handleItemMouseEnter(data);
      },
      onMouseLeave: () => {
        handleItemMouseLeave();
      },
    };
    return itemProp;
  });
  return listItems;
};
export default ListItems;
