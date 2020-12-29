import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
import { PickerProps } from '../picker/interfaces';
import { Dimension } from '../types';

export interface PropertyInfo {
  id?: string;
  name?: string;
  key?: string;
  type?: string;
  description?: string;
  valueType?: string;
}
type FetchData<T extends {}> = (node: NodeData) => T | Promise<T>;
export type PropertyValue = {
  label?: string;
  value?: string;
  valueType?: string;
};

// type fetchResult = extends PropertyInfo
export interface PropertyPickerProps
  extends Omit<PickerProps, 'dataSource' | 'inputValue' | 'groupVisible' | 'actionButton'> {
  /**
   * 初始值
   */
  initialValue?: PropertyValue;
  multiple?: boolean;
  /**
   * 属性选择器的选项列表
   */
  dataSource: Array<PropertyItem | Dimension>;
  /**
   * 获取属性详情的方法
   */
  fetchDetailData?: FetchData<PropertyInfo>;
  /**
   * 已选值改变时的回调
   */
  onChange?: (value: PropertyValue) => void;
  /**
   * 本地存储最近使用的属性 key值，用于区分不同用户的最近使用
   */
  recentlyStorePrefix?: string;
  /**
   * 禁用的选项
   */
  disabledValues?: PropertyValue[] | string[];
}
export const PropertyTypes: { [key: string]: string } = {
  event: '事件属性',
  avar: '访问属性',
  usr: '用户属性',
};

/// declare type ItemValueType = _ValueType | { type: PrimitiveType };
/**
 * @name 属性分类 - 事件属性｜用户属性｜物品属性
 */
export declare type PropertyCategory = 'EventVariable' | 'UserVariable' | 'ItemVariable';

export interface PropertyItem extends NodeData {
  type?: string;
  typeName?: string;
  // hasChildren?: boolean,
  // itemIcon?: React.ReactElement | string,
  valueType?: string;
}
