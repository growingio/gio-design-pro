import React, { useRef, useState, useEffect } from 'react';
import { Tooltip } from '@gio-design/components';

interface TooltipEllipsisProps {
  className?: string;
  children: React.ReactElement;
  tooltipDisabled?: boolean;
}
const TooltipEllipsis = ({ className, children, tooltipDisabled }: TooltipEllipsisProps) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  const reCompute = useRef(() => {
    const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width ?? 0;
    const innerWidth = innerRef.current?.getBoundingClientRect().width ?? 0;
    setDisable(wrapperWidth >= innerWidth);
  });

  useEffect(() => {
    reCompute.current();
    window.addEventListener('resize', reCompute.current);
    return () => window.removeEventListener('resize', reCompute.current);
  }, []);

  return (
    <Tooltip title={children} disabled={tooltipDisabled || disabled} destroyTooltipOnHide>
      <span ref={wrapperRef} className={className}>
        <span ref={innerRef}>{children}</span>
      </span>
    </Tooltip>
  );
};

export default TooltipEllipsis;
