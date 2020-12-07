import React from 'react';
import { OperationMenuListOption, OperationMenuListProps } from './interfaces';
import Menu, { MenuItem } from '@gio-design/components/es/components/menu';
import { Tooltip } from '@gio-design/components';

const OperationMenuList = (props: OperationMenuListProps) => {
  const { options, width = 160 } = props;

  return (
    <div className='operation-menu' style={{ width }}>
      <Menu mode="vertical" onClick={(e: any) => props.onClick?.(e.key)}>
        {
          options.filter((option: OperationMenuListOption) => !option.hidden).map((option: OperationMenuListOption) => {
            return <MenuItem icon={option.icon} key={option.value} disabled={option.disabled}><Tooltip title={option.disabled ? option.tooltip : ''} placement='leftTop'><span>{option.label}</span></Tooltip></MenuItem>
          })
        }
      </Menu>
    </div>
  )
}

export default OperationMenuList;
