import React from 'react';
import { SearchBarProps, TreeProps as GioTreeProps } from '@gio-design/components';
import { TooltipButtonProps } from '../tooltip-button/interfaces';
import { OperationMenuProps, OperationMenuListOption } from '../operation-menu';

type UnifiedTreeProps =
  | 'onExpand'
  | 'onSelect'
  | 'selectedKeys'
  | 'expandedKeys'
  | 'defaultExpandedKeys'
  | 'defaultSelectedKeys';

export interface TreeCardProps<RecordType> extends Pick<GioTreeProps, UnifiedTreeProps> {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  title?: React.ReactNode;
  searchBar?: SearchBarProps;
  footerButton?: Omit<TooltipButtonProps, 'size'>;
  treeConfig: TreeConfig<RecordType>[] | TreeConfig<RecordType>;
  parentNodeSelectable?: boolean;
}

interface TreeConfig<RecordType> {
  data: RecordType[];
  title?: React.ReactNode;
  treeProps?: Omit<GioTreeProps, 'children' | 'treeData' | UnifiedTreeProps>;
  customIcon?: ((record: RecordType) => React.ReactNode) | React.ReactNode;
  customTitle?: ((record: RecordType) => React.ReactNode) | string[] | string;
  customKey?: ((record: RecordType) => string) | string[] | string;
  customIsLeaf?: (record: RecordType) => boolean;
  operationMenu?: Omit<OperationMenuProps, 'options' | 'onClick'> & {
    options: ((record: RecordType) => OperationMenuListOption[]) | OperationMenuListOption[];
    onClick?: (value: OperationMenuListOption, record: RecordType) => void;
  };
  childrenField?: string[] | string;
  tooltipDisabled?: boolean;
}

export interface TreeProps<RecordType> extends TreeConfig<RecordType>, Pick<GioTreeProps, UnifiedTreeProps> {
  hasDivider: boolean;
  prefixCls: string;
}
