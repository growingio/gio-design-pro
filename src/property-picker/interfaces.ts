import { NodeData } from '@gio-design-new/components/es/components/cascader/interface';
import { PickerProps } from '../picker/interfaces';
import { Dimension } from '../types';

/**
 * 属性详情组件的参数
 */
export interface PropertyInfo {
  id?: string;
  name?: string;
  key?: string;
  type?: string;
  description?: string;
  valueType?: string;
}
/**
 * 获取属性详情的回调
 */
type FetchData<T extends {}> = (node: NodeData) => T | Promise<T>;
/**
 * picker选中后回调值类型
 */
export type PropertyValue = {
  label?: string;
  value?: string;
  valueType?: string;
};

/**
 *属性选择器参数
 */
export interface PropertyPickerProps
  extends Omit<PickerProps, 'dataSource' | 'inputValue' | 'groupVisible' | 'actionButton'> {
  /**
   * 初始值
   */
  initialValue?: PropertyValue;
  // multiple?: boolean;
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
/**
 * 属性的类型 event|avar|usr
 */
export const PropertyTypes: { [key: string]: string } = {
  event: '事件属性',
  avar: '访问属性',
  usr: '用户属性',
};

export type ItemValueType = 'int' | 'string' | 'double' | 'date' | 'list' | 'boolean';
/**
 * 属性选择器选项列表item 类型
 */
export interface PropertyItem extends NodeData {
  type?: string;
  typeName?: string;
  typeOrder?: number;
  groupOrder?: number;
  // hasChildren?: boolean,
  // itemIcon?: React.ReactElement | string,
  valueType?: string;
  key?: string;
  pinyinName?: string;
}
