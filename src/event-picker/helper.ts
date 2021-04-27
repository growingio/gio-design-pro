import { EventData } from './interfaces';

export { withPrefix } from '@gio-design/components/es/components/cascader/helper';

export const defaultTabs = [
  { label: '事件', value: 'event' },
  { label: '计算指标', value: 'measurement' },
];

// 数据类型映射
export const getEventType = (data: EventData): string => {
  const { type } = data;

  switch (type) {
    case 'simple': // 无埋点事件
    case 'custom': // 埋点事件
    case 'merged':
      return 'event';

    case 'prepared':
    case 'complex':
      return 'measurement';

    default:
      return 'unknow';
  }
};
/**
 * 因为不同类型的事件 id可能重复，此处用 type 和 id 组合出一个唯一key
 * @param data Array<EventData>
 * @returns 包含了 selectKey的新EventData数组
 */
export const withSelectKey = (data: EventData[]) =>
  data.map((d) => {
    const selectKey = `${d.type}-${d.id}`;
    return { ...d, selectKey };
  });
