/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Dropdown from '@gio-design/components/es/components/dropdown';
import Button from '@gio-design/components/es/components/button';
import { MoreOutlined } from '@gio-design/icons';
import { OperationMenuProps } from './interfaces';
import OperationMenuList from './OperationMenuList';

const OperateMenu = (props: OperationMenuProps) => {
  const {
    options,
    width = 160,
    trigger = ['click'],
    mini = true,
    size,
    icon = <MoreOutlined />,
    placement = 'bottomLeft',
    buttonType = 'assist',
    iconClassName,
  } = props;

  return (
    <div onClick={(e: any) => e.stopPropagation()}>
      <Dropdown
        overlay={
          <OperationMenuList width={width} options={options} onClick={(option: any) => props.onClick?.(option)} />
        }
        placement={placement}
        trigger={trigger}
        onVisibleChange={(visible: boolean) => props.onVisibleChange?.(visible)}
      >
        <Button
          className={iconClassName}
          mini={mini}
          size={size}
          onClick={(e: any) => e.stopPropagation()}
          icon={icon}
          type={buttonType}
        />
      </Dropdown>
    </div>
  );
};

export default OperateMenu;
