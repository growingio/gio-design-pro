import React from 'react';
import { BaseProps } from '../utils/interfaces';

export interface InfoCardProps extends BaseProps {
  /**
   * 卡片标题
   */
  title?: React.ReactNode;

  /**
   * 卡片右上角的操作区域
   */
  extra?: React.ReactNode;
}

export interface InfoCardMetaProps extends BaseProps {
  /**
   * 标签
   */
  label?: React.ReactNode;

  /**
   * 标签值
   */
  value?: React.ReactNode;

  /**
   * 是否显示 `label` 后面的冒号
   * @default true
   */
  colon?: boolean;
}
