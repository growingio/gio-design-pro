import React from 'react';

export interface FilterPickerProps {
  /**
           自定义 `CSS` 类名
           */
  className?: string;
  /**
           自定义描述内容
           */
  description?: React.ReactNode;

  children?: React.ReactNode;

  getTooltipContainer: () => React.ReactNode;
}
