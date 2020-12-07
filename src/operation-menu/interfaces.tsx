export interface OperationMenuListOption {
  label: string;
  value: string;
  icon?: React.ReactNode | ((props: any) => React.ReactNode);
  description?: string;
  disabled?: boolean;
  tooltip?: string;
  placement?: string;
  groupValue?: string;
  groupLabel?: string;
  hidden?: boolean;
}

export interface OperationMenuListProps {
  options: OperationMenuListOption[];
  width?: number;
  onClick?: (value: OperationMenuListOption) => void;
}

export interface OperationMenuProps {
  iconClassName?: string,
  trigger?: string | string[];
  size?: 'large' | 'middle' | 'small';
  mini?: boolean;
  placement?: string;
  icon?: any;
  buttonType?: 'primary' | 'secondary' | 'assist' | 'text';
  options: OperationMenuListOption[];
  width?: number;
  onClick?: (value: OperationMenuListOption) => void;
  onVisibleChange?: (visible: boolean) => void;
}
