/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventData, ListItemPreviewEventProps } from './interfaces';

export interface GroupListItemEvent {
  onMouseEnter?: (e: EventData) => void;
  onMouseLeave?: () => void;
  onClick?: (e: EventData) => void;
  // onClick?: (value: EventData) => void;
  onCheckboxChange?: (value: EventData, checked: boolean) => void;
  /**
   * 预览详情延迟展示的毫秒数
   */
  detailVisibleDelay?: number;
}
export interface GroupItemsProps extends GroupListItemEvent, ListItemPreviewEventProps {
  /**
   * 列表项的数据源
   */
  dataSource: EventData[];
  /**
   * 分组的key前缀
   */
  keyPrefix?: string;
  /**
   * 选中项的value，通常为 selectKey
   */
  value?: string[];
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 搜索的关键字
   */
  keyword?: string;
}
