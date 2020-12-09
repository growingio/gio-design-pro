import React from 'react';
import { NodeData } from '@gio-design/components/es/components/cascader/menu-item';

interface ActionButton {
  /**
   * Action button's icon
   */
  icon: React.ReactElement;
  /**
   * Callback when click action button
   */
  onClick: () => void;
}

interface TabNavItem {
  /**
   * Child elment of tab nav item
   */
  children: React.ReactNode;
  /**
   * React key of tab nav item
   */
  key: string;
}

export interface PickerProps {
  /**
   * Whether the dropdown picker is visible or not
   */
  visible?: boolean;
  /**
   * Callback when the visiblity of dropdown picker is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Input's value
   */
  inputValue: string;
  /**
   * Searchbar's placeholder
   */
  searchPlaceholder?: string;
  /**
   * Callback when user input in search bar
   */
  onSearch?: (query: string) => void;
  /**
   * The button for extra action
   */
  actionButton?: ActionButton;
  /**
   * TabNav config
   */
  tabNav?: {
    items: TabNavItem[];
    onChange?: (key: string) => void;
  };
  /**
   * Loading state of picker
   */
  loading?: boolean;
  /**
   * Empty state of picker
   */
  emptyPrompt?: {
    /**
     * Customize description
     */
    description: React.ReactNode;
    /**
     * Customize child element
     */
    children?: React.ReactNode;
  };
  /**
   * Wether the group name is visible or not
   */
  groupVisible?: boolean;
  /**
   * Data record array to be displayed
   */
  dataSource: NodeData[];
  /**
   * Callback when hover some data
   */
  onHoverPanelShow?: (node: NodeData) => React.ReactElement;
  /**
   * Callback when select some data
   */
  onSelect?: (node: NodeData) => void;
}
