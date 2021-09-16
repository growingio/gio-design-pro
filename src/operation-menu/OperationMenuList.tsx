import React, { useEffect } from 'react';
import Menu, { MenuItem } from '@gio-design/components/es/components/menu';
import { Tooltip } from '@gio-design/components';
import { OperationMenuListOption, OperationMenuListProps } from './interfaces';

const OperationMenuList = (props: OperationMenuListProps) => {
  const { options, width = 'auto', verticalIndent = 12 } = props;

  useEffect(() => {
    document.body.style.setProperty('--operation-menu-list-indent', `${verticalIndent}px`);
    return () => {
      document.body.style.removeProperty('--operation-menu-list-indent');
    };
  }, [verticalIndent]);

  return (
    <div className="operation-menu" style={{ width }}>
      <Menu mode="vertical" onClick={(e: any) => props.onClick?.(e)} verticalIndent={verticalIndent}>
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
