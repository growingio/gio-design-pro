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
    case 'prepared':
    case 'virtual':
    case 'merged':
      return 'event';

    case 'preparedComplex':
    case 'complex':
      return 'measurement';

    default:
      return 'unknow';
  }
};
export const getGroupName = (groupKey: string, locale = 'zh-CN'): string => {
  const nameMap: { [key: string]: string } = {
    custom: '埋点事件',
    virtual: '虚拟事件',
    simple: '无埋点事件',
    preparedComplex: '预置计算指标',
    prepared: '预置事件',
    complex: '自定义计算指标',
    merged: '合成事件',
  };
  const EnglishMap: { [key: string]: string } = {
    custom: 'Custom Events',
    virtual: 'Virtual Events',
    simple: 'Simple Events',
    preparedComplex: 'Prepared Metrics',
    prepared: 'Prepared Events',
    complex: 'Custom Metrics',
    merged: 'Merged Events',
  };
  if (locale === 'en-US') {
    return EnglishMap[groupKey] || 'uknown';
  }
  return nameMap[groupKey] || '未知类型';
};
export const getGroupKey = (data: EventData): string => data.type || 'unkwon';
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
