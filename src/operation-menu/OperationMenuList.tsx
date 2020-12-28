import React from 'react';
import Menu, { MenuItem } from '@gio-design-new/components/es/components/menu';
import { Tooltip } from '@gio-design-new/components';
import { OperationMenuListOption, OperationMenuListProps } from './interfaces';

const OperationMenuList = (props: OperationMenuListProps) => {
  const { options, width = 160 } = props;

  return (
    <div className="operation-menu" style={{ width }}>
      <Menu mode="vertical" onClick={(e: any) => props.onClick?.(e)}>
        {options
          .filter((option: OperationMenuListOption) => !option.hidden)
          .map((option: OperationMenuListOption) => {
            return (
              <MenuItem icon={option.icon} key={option.value} disabled={option.disabled}>
                <Tooltip title={option.disabled ? option.tooltip : ''} placement="leftTop">
                  <>{option.label}</>
                </Tooltip>
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default OperationMenuList;
