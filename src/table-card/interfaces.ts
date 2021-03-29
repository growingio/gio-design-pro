import { CSSProperties, ReactNode } from 'react';
import { TableProps, ButtonProps, SearchBarProps } from '@gio-design/components';
import { RowSelection } from '@gio-design/components/es/components/table/interface';

interface TableCardRowSelection<RecordType> extends RowSelection<RecordType> {
  selectedRowKeys: string[];
  onChange: (selectedRowKeys: string[], selectedRows: RecordType[]) => void;
}

interface TableCardTableProps<RecordType> extends TableProps<RecordType> {
  rowSelection?: TableCardRowSelection<RecordType>;
}

interface TableCardTab<RecordType> {
  name: ReactNode;
  table: TableCardTableProps<RecordType>;
  searchBar?: SearchBarProps;
  buttons?: ButtonProps[];
  batchButtons?: ButtonProps[];
}

export interface TableCardProps<RecordType> {
  tabs: TableCardTab<RecordType>[];
  title?: ReactNode;
  description?: string;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
}
