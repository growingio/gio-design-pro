import React from 'react';
import Menu, { MenuItem } from '@gio-design/components/es/components/menu';
import { Tooltip } from '@gio-design/components';
import { OperationMenuListOption, OperationMenuListProps } from './interfaces';

const OperationMenuList = (props: OperationMenuListProps) => {
  const { options, width = 'auto' } = props;

  return (
    <div className="operation-menu" style={{ width }}>
      <Menu mode="vertical" onClick={(e: any) => props.onClick?.(e)}>
        {options
          .filter((option: OperationMenuListOption) => !option.hidden)
          .map((option: OperationMenuListOption) => (
            <MenuItem icon={option.icon} key={option.value} disabled={option.disabled}>
              <Tooltip title={option.disabled ? option.tooltip : ''} placement="leftTop">
                <span style={{ display: 'block', marginLeft: -20, paddingLeft: 20 }}>{option.label}</span>
              </Tooltip>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default OperationMenuList;
