import React from 'react';
import classNames from 'classnames';
import { usePrefixCls, Button, Tooltip } from '@gio-design/components';
import { TooltipButtonProps } from './interfaces';

import './style';

function TooltipButton(props: TooltipButtonProps) {
  const { tooltipProps, disabled, onClick, className, prefixCls: customizePrefixCls, ...restProps } = props;

  const prefixCls = usePrefixCls('tooltip-button', customizePrefixCls);

  const classes = classNames(
    prefixCls,
    className,
    `${prefixCls}-${restProps.type || 'primary'}`,
    `${prefixCls}-${disabled ? 'disabled' : 'normal'}`
  );

  const handleClick = (event: any) => {
    if (disabled) {
      return;
    }
    onClick && onClick(event);
  };
  return (
    <Tooltip {...tooltipProps} disabled={!disabled}>
      <Button
        className={classes}
        onClick={(event: any) => {
          handleClick(event);
          event.stopPropagation();
        }}
        {...restProps}
      />
    </Tooltip>
  );
}

export default TooltipButton;
