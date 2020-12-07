import React from 'react';
import { Dropdown, Button } from '@gio-design/components';
import { OperationMenuProps } from './interfaces';
import { More } from '@gio-design/icons';
import OperationMenuList from './OperationMenuList';

const OperateMenu = (props: OperationMenuProps) => {
  const { 
    options, 
    width = 160, 
    trigger = ['click'],
    mini = true,
    size,
    icon = <More />,
    placement = 'bottomLeft',
    buttonType = 'assist',
    iconClassName,
  } = props;

  return (
    <div onClick={(e: any) => e.stopPropagation()}>
      <Dropdown
        getTooltipContainer={(triggerNode: any) => triggerNode?.parentElement! || document.body}
        overlay={<OperationMenuList width={width} options={options} onClick={(option: any) => props.onClick?.(option)} />}
        placement={placement}
        trigger={trigger}
        onVisibleChange={(visible: boolean) => props.onVisibleChange?.(visible)}
      >
        <Button className={iconClassName} mini={mini} size={size} onClick={(e: any) => e.stopPropagation()} icon={icon} type={buttonType} />
      </Dropdown>
    </div>
  )
}

export default OperateMenu;
