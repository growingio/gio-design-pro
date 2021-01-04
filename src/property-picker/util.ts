// import { transform } from 'lodash';
import { PropertyItem, PropertyTypes } from './interfaces';
import { Dimension } from '../types';

type MapedType = 'usr' | 'event' | 'avar';
type TypeMapping = (input: Dimension) => PropertyItem;

type Mapper = {
  [key: string]: MapedType;
};
// /**
//  * 用户自定义分组和类型
//  */
// const GroupTuples = [
//   ['cs', 'ppl'], // saas旧版登录用户属性
//   ['ads', 'ads'], // 广告属性
//   ['app', 'avar'], // saas访问属性
//   ['page', 'pvar'], // saas页面属性
//   ['user', 'usr'], // op用户属性
//   ['item', 'itm'], // op物品属性
//   ['event', 'var'], // 事件属性
//   ['people', 'ppl'], // saas新版登录用户属性
//   ['visitor', 'vstr'], // saas访问用户属性
//   ['conversion', 'evar'], // saas 转化变量
// ];
/**
 * 属性分组对应的groupId映射
 *
 */
// const CustomPropertyGroups = {
//   event: ['cs', 'ads', 'page', 'app', 'event', 'people', 'visitor'],
//   usr: ['user', 'tag'],
//   visitor: ['geo', 'device', 'origin'],
// };
export const DimensionGroupTypeMapper: Mapper = {
  cs: 'event',
  ads: 'event',
  page: 'event',
  app: 'event',
  event: 'event',
  item: 'event',
  people: 'event',
  visitor: 'event',
  element: 'event', // element 为前端自定义的分类
  conversion: 'event',
  user: 'usr',
  tag: 'usr',
  geo: 'avar',
  device: 'avar',
  origin: 'avar',
};
export const PropertyGroupOrder = [
  'event',
  'item',
  'page',
  'element',
  'app',
  'cs',
  'ads',
  'conversion',
  'people',
  'visitor',
  'geo',
  'device',
  'origin',
  'user',
  'tag',
];
const PreparedNormalDimensionIdMap = (id: string) => {
  const groupMap = {
    page: ['p', 'd', 'rp'], // 域名,页面,页面来源
    element: ['v', 'idx'], // ，元素内容，元素位置
    device: ['b', 'cv'], // 应用平台和app版本归属到-设备分类
  };
  if (groupMap.page.includes(id)) return ['page', '页面'];
  if (groupMap.element.includes(id)) return ['element', '无埋点事件'];
  return ['device', '设备'];
};

// eslint-disable-next-line import/prefer-default-export
export const dimensionToPropertyItem: TypeMapping = (item: Dimension) => {
  const result: PropertyItem = { label: item.name, value: item.id, ...item };
  const { id, groupId, type: _type } = item;

  if (groupId === 'normal' && _type === 'global') {
    const [newGoupId, newGroupName] = PreparedNormalDimensionIdMap(id);
    result.groupId = newGoupId;
    result.groupName = newGroupName;
  }
  const gOrder = PropertyGroupOrder.indexOf(result.groupId as string);
  result.groupOrder = gOrder > -1 ? gOrder : 9999;

  result.type = DimensionGroupTypeMapper[result.groupId || 'unkown'];
  result.typeName = PropertyTypes[result.type];
  const tOrder = ['event', 'avar', 'usr'].indexOf(result.type);
  result.typeOrder = tOrder > -1 ? tOrder : 9999;
  return result;
};