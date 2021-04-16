import React from 'react';

export interface TitleInfoCardProps {
  children?: React.ReactNode;
  titleIcon?: boolean | React.ReactNode;
  centerWidth?: string | number;
  rightWidth?: string | number;
  title: string;
  description?: string | undefined;
  operationContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  prefixCls?: string;
  className?: string;
}
