// import { NodeData } from '@gio-design/components/es/components/cascader/interface';
import React from 'react';
import { BasePickerProps } from '../base-picker';
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
interface Iterable {
  [key: string]: any;
}
/**
 * 获取属性详情的回调
 */
type FetchData<T extends {}> = (node: PropertyItem) => T | Promise<T>;
/**
 * picker选中后回调值类型
 */
export interface PropertyValue extends Iterable {
  label?: string;
  value?: string;
  valueType?: string;
}

/**
 *属性选择器参数
 */
export interface PropertyPickerProps
  extends Omit<BasePickerProps, 'footer' | 'renderItems' | 'renderDetail' | 'tabNav' | ''> {
  /**
   * 选中值
   */
  value?: PropertyValue;
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
   * 选中值时的回调
   */
  onSelect?: (value: PropertyValue) => void;
  /**
   * 列表项点击的回调
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
export interface PropertyItem extends Iterable {
  /**
   * 列表项显示的内容
   */
  label?: string;
  /**
   * 对应的value （key｜id）
   */
  value?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   *  Dimension.name
   */
  name: string;
  /**
   * type
   */
  type: string;
  typeName?: string;
  /**
   * type 分组展示的排序值，值越大位置越靠后
   */
  typeOrder?: number;
  // children?: NodeData[];
  groupId?: string;
  groupName?: string;
  groupOrder?: number;
  /**
   * 列表项的 icon
   */
  itemIcon?: React.ReactElement;
  /**
   * 属性值的 数据类型
   */
  valueType?: string;
  key?: string;
  pinyinName?: string;
}
