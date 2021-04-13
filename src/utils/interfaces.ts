import React from 'react';

export interface BaseProps {
  /**
   * 自定义样式名
   */
  className?: string;
  /**
   * 自定义样式属性
   */
  style?: React.CSSProperties;
}

export interface Resource {
  id: string;
  name: string;
  creatorId?: string;
  creator?: string;
  createdAt?: string;
}
