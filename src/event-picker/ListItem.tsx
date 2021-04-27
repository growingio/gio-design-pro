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
// const ListItems = (props: GroupItemsProps) => {
//   const {
//     dataSource = [],
//     keyPrefix = '',
//     onMouseEnter,
//     onMouseLeave,
//     onClick,
//     onCheckboxChange,
//     multiple,
//     keyword,
//     value = [],
//     detailVisibleDelay = 500,
//     onShowEventChart,
//     fetchDetailData,
//     previewCustomRender,
//   } = props;

//   const [detailVisible, setDetailVisible] = useState(false);
//   const debounceSetDetailVisible = useDebounceFn((visible: boolean) => {
//     setDetailVisible(visible);
//   }, detailVisibleDelay);

//   const handleItemMouseEnter = (node: EventData) => {
//     // setHoveredNodeValue(data);
//     debounceSetDetailVisible(true);
//     onMouseEnter?.(node);
//   };
//   const handleItemMouseLeave = () => {
//     // setHoveredNodeValue(undefined);
//     debounceSetDetailVisible.cancel();
//     // setDetailVisible(false);
//     onMouseLeave?.();
//     console.log('handleItemMouseLeave');
//   };
//   // const handleItemMouseEnter = (node: EventData) => {
//   //   // onMouseEnter?.(node);
//   //   debounceSetDetailVisible(true)
//   // };
//   // const handleItemMouseLeave = () => {
//   //   onMouseLeave?.();
//   // };

//   const handleCheckboxChange = (node: EventData, checked: boolean) => {
//     onCheckboxChange?.(node, checked);
//     onClick?.(node);
//   };
//   const handleItemClick = (node: EventData) => {
//     if (!multiple) {
//       onClick?.(node);
//     }
//   };
//   const listItems = dataSource.map((d: EventData) => {
//     const data = (d || {}) as EventData;
//     const select = value.includes(data.selectKey || '');
//     const listNode = (
//       <CustomItem
//         dataSource={data}
//         keyword={keyword}
//         multiple={multiple}
//         value={select ? data.selectKey : undefined}
//         onCheckboxChange={(node, checked) => {
//           handleCheckboxChange(node, checked);
//         }}
//         disabled={data.disabled}
//         ellipsis
//         key={['item', keyPrefix, data.type, data.id].join('-')}
//         className={classNames({ selected: !!select && !multiple })}
//         onClick={(_: any) => handleItemClick(data)}
//         onMouseEnter={() => handleItemMouseEnter(data)}
//         onMouseLeave={() => handleItemMouseLeave()}
//       />
//     );
//     return listNode;
//   });

//   return listItems;
// };
// export default ListItems;
