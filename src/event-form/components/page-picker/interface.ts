// import React from 'react';
import { TagElement } from '../../TagElement';

interface ActionButton {
  /**
   * Action button's icon
   */
  // icon: React.ReactElement;
  /**
   * Callback when click action button
   */
  onClick?: () => void;
}
// interface PickerOption {
//   label: string;
//   value: string;
// }
export interface PagePickerProps {
  value?: TagElement;
  // dataSource?: TagElement[];
  /**
   * 当前页面已定义的
   */
  currentPageTags: TagElement[];
  /**
   * 已定义的相关页面,列表项
   */
  dataSource: TagElement[];
  onSearch?: (keyword: string) => void;
  onSelect?: (value: TagElement) => void;
  onChange?: (value: TagElement) => void;
  actionButton?: ActionButton;
}
