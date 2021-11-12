import React from 'react';
import { BasePickerProps } from '../base-picker';
import { BaseProps } from '../utils/interfaces';

export interface Attributes {
  id: string;
  name: string;
  valueType: string;
}

export interface EventData {
  id: string;
  name: string;
  type?: string;
  attributes?: Attributes[];
  itemModels?: Attributes[];
  disabledTips?: React.ReactNode;
  disabled?: boolean;
  selectKey?: string;
  // groupId?: string;
  // groupName?: string;
  [key: string]: unknown;
}
export interface Tab {
  label: string;
  value: string;
}
export interface ListItemPreviewEventProps {
  /**
   * 事件预览中展示图表的回调函数
   */
  onShowEventChart?: (event: EventData) => React.ReactNode;
  /**
   * 事件预览的自定义展示，用于 无埋点事件 详情展示
   */
  previewCustomRender?: (dataSource: EventData) => React.ReactNode;
  /**
   * 获取详情的方法
   */
  fetchDetailData?: (event: EventData) => Promise<EventData>;
  /**
   * 鼠标hover列表项详情面板延迟显示的毫秒数
   */
  detailVisibleDelay?: number;
}
export interface EventPickerProps
  extends Pick<BasePickerProps, 'emptyPrompt' | 'loading'>,
    BaseProps,
    ListItemPreviewEventProps {
  dataSource?: EventData[];
  // /**
  //  * 对数据进行过滤的回调函数
  //  */
  // filter?: (data: EventData[]) => EventData[];
  /**
   * 已选中的项
   */
  value?: EventData | EventData[];
  /**
   * 要显示 Tab 的数据
   */
  tabs?: Tab[];
  /**
   * 是否显示tab['全部']
   */
  showTabAll?: boolean;
  /**
   * 默认的active tab
   */
  activedTab?: string;
  /**
   * 获取对数据进行 tab 级分组的 `key`，
   * 如不提供，则按默认规则取 `key`
   * 最终的值将与 `tabs` 项里的 `value` 进行比较
   */
  getTabKey?: (nodeData: EventData) => string;

  defaultKeyword?: string;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 渲染tab footer的回调方法，可以针对不同的tab渲染footer
   */
  panelFooter?: (tabKey: string, data: EventData[]) => React.ReactElement;
  /**
   * 是否隐藏tabNav,设置为true 不显示tabNav，如果只有一个tab 也不显示tabNav
   */
  hideTabNav?: boolean;
  /**
   * 本地存储最近使用的属性 key值，用于区分不同用户的最近使用
   */
  historyStoreKey?: string;
  /**
   * 是否重新从localstorage加载最近使用选项,最近使用选项会在点选时自动存储到localstorage,
   * 需要在picker重新渲染或者shouldUpdateRecentlyUsed属性值从false->true时重新加载
   */
  shouldUpdate?: boolean;
  /**
   * 鼠标hover列表项详情面板延迟显示的毫秒数
   */
  detailVisibleDelay?: number;
  // /**
  //  * 禁用的选项 id数组
  //  */
  // disabledValues?: string[];
  /**
   * 已选值改变时的回调
   */
  onChange?: (value: EventData | EventData[] | undefined, oldValue?: EventData | EventData[] | undefined) => void;
  /**
   * 选中值时的回调
   */
  onSelect?: (value: EventData | EventData[]) => void;
  /**
   * 列表项点击的回调
   */
  onClick?: (e: EventData) => void;

  /**
   * 多选取消按钮点击的回调
   */
  onCancel?: () => void;
  /**
   * 是否显示preview 弹出面板
   */
  showPreview?: boolean;
  /**
   * 获取事件分组的名称；getGroupName，getGroupKey，getTypeIcon 组合用于自定义分组
   */
  getGroupName?: (groupKey: string, locale?: string) => string;
  /**
   * 获取事件分组的key；
   * @default (nodeData:EventData)=>nodeData.type
   */
  getGroupKey?: (nodeData: EventData) => string;
  /**
   * 获取事件分组的Icon；
   */
  getTypeIcon?: (type: string, value: EventData) => React.ReactElement;
  /**
   * 分组排序方法，默认预制事件排在前面
   */
  groupSort?: (a: string, b: string) => number;
  /**
   * 自定义 search-bar 的 placeholder
   */
  placeholder?: string;
}

export interface EventPickerPreviewProps extends BaseProps, ListItemPreviewEventProps {
  dataSource: EventData;
  // chart?: React.ReactNode;
  // fetchData?: (event: EventData) => Promise<EventData>;
}
