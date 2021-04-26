import { CSSProperties, ReactNode } from 'react';
import { TableProps, SearchBarProps } from '@gio-design/components';
import { RowSelection } from '@gio-design/components/es/components/table/interface';
import { TooltipButtonProps } from '../tooltip-button/interfaces';

interface TableCardRowSelection<RecordType> extends RowSelection<RecordType> {
  selectedRowKeys: string[];
  onChange: (selectedRowKeys: string[], selectedRows: RecordType[]) => void;
}

interface TableCardTableProps<RecordType> extends TableProps<RecordType> {
  rowSelection?: TableCardRowSelection<RecordType>;
}

export interface TableCardTab<RecordType> {
  name: ReactNode;
  table: TableCardTableProps<RecordType>;
  searchBar?: SearchBarProps;
  buttons?: TooltipButtonProps[];
  batchButtons?: TooltipButtonProps[];
}
export interface TableCardProps<RecordType> {
  tabs: TableCardTab<RecordType>[];
  title?: ReactNode;
  description?: string;
  showTabs?: boolean;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}
