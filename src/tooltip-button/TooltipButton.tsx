import React from 'react';
import classNames from 'classnames';
import { usePrefixCls, Button, Tooltip } from '@gio-design/components';
import { TooltipButtonProps } from './interfaces';

import './style';

function TooltipButton(props: TooltipButtonProps) {
  const { tooltipProps, disabled, onClick, className, prefixCls: customizePrefixCls, type, ...restProps } = props;

  const prefixCls = usePrefixCls('tooltip-button', customizePrefixCls);

  const classes = classNames(
    prefixCls,
    className,
    `${prefixCls}-${type || 'primary'}`,
    `${prefixCls}-${disabled ? 'disabled' : 'normal'}`,
    `${prefixCls}-${type === 'link' && 'link'}`
  );

  const handleClick = (event: any) => {
    if (disabled) {
      return;
    }
    onClick && onClick(event);
  };

  const buttonType = type === 'link' ? 'text' : type;
  return (
    <Tooltip {...tooltipProps} disabled={!disabled}>
      <Button
        className={classes}
        onClick={(event: any) => {
          handleClick(event);
          event.stopPropagation();
        }}
        type={buttonType}
        {...restProps}
      />
    </Tooltip>
  );
}

export default TooltipButton;
