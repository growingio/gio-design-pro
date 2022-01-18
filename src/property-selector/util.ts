// import { transform } from 'lodash';

import { has } from 'lodash';
import { PropertyItem, PropertyTypes } from './interfaces';
import { Dimension } from './types';

type MapedType = 'usr' | 'event' | 'avar' | 'itm';
type TypeMapping = (input: Dimension, locale?: string) => PropertyItem;

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
  item: 'itm',
  people: 'event',
  visitor: 'event',
  element: 'event', // element 为前端自定义的分类 (无埋点事件属性)
  conversion: 'event',
  user: 'usr',
  tag: 'usr',
  geo: 'avar',
  device: 'avar',
  origin: 'avar',
  virtual: 'event',
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
  const locale = localStorage.getItem('locale') || 'zh-CN';
  if (groupMap.page.includes(id)) return ['page', locale === 'en-US' ? 'Pages' : '页面'];
  if (groupMap.element.includes(id))
    return ['element', locale === 'en-US' ? 'AutoTrack Event Variables' : '无埋点事件属性'];
  return ['device', locale === 'en-US' ? 'Devices' : '设备'];
};

const regroup = (data: PropertyItem, locale = 'zh-CN'): PropertyItem => {
  const { isSystem, groupId, type, typeName } = data;
  let newType = type;
  let newTypeName = typeName;
  if (type === 'avar') {
    newType = 'event';
    newTypeName = PropertyTypes[newType];
  }
  const preset = locale === 'en-US' ? 'Preset ' : '预置';
  const custom = locale === 'en-US' ? 'Custom ' : '自定义';
  let groupName = isSystem ? `${preset}${typeName}` : `${custom}${typeName}`;
  if (groupId === 'tag') {
    if (locale === 'en-US') {
      groupName = 'Tags';
    } else {
      groupName = '用户标签';
    }
  }

  return {
    ...data,
    groupName,
    type: newType,
    typeName: newTypeName,
  } as PropertyItem;
};

// eslint-disable-next-line import/prefer-default-export
export const dimensionToPropertyItem: TypeMapping = (item: Dimension, locale = 'zh-CN') => {
  const result: PropertyItem = { label: item.name, value: item.id, ...item };
  const { id, groupId, type: _type, associatedKey } = item;
  if (groupId === 'normal' && _type === 'global') {
    const [newGoupId, newGroupName] = PreparedNormalDimensionIdMap(id);
    result.groupId = newGoupId;
    result.groupName = newGroupName;
  }

  // 多物品模型，物品属性不再作为事件绑定属性，而是作为事件属性的属性来展示，作为事件属性的子集
  // 所以，当存在parentId的时候，物品属性，和事件属性同组
  if (groupId === 'item' && _type === 'itm' && associatedKey) {
    result.isItem = true;
    result.groupId = 'event';
    if (locale === 'en-US') {
      result.groupName = 'Event Variables';
    } else {
      result.groupName = '事件变量';
    }
  }

  // 虚拟属性需要添加到事件属性中，但是有自己的type和groupId，所以和维度表（多物品模型）做相同处理
  if (groupId === 'virtual' && _type === 'vvar') {
    if (locale === 'en-US') {
      result.groupName = 'Virtual Variables';
    } else {
      result.groupName = '虚拟属性';
    }
  }

  const gOrder = PropertyGroupOrder.indexOf(result.groupId as string);
  result.groupOrder = gOrder > -1 ? gOrder : 99999;

  result.type = DimensionGroupTypeMapper[result.groupId || 'unkown'];
  result.typeName = PropertyTypes[result.type];
  const tOrder = ['event', 'avar', 'usr'].indexOf(result.type);
  result.typeOrder = tOrder > -1 ? tOrder : 99999;

  if (has(item, 'isSystem') && groupId !== 'virtual') {
    return regroup(result, locale);
  }
  return result;
};

export function getShortPinyin(word: string) {
  let idx = -1;
  const MAP = 'ABCDEFGHJKLMNOPQRSTWXYZ';
  const boundaryChar = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳';

  if (!String.prototype.localeCompare) {
    return word[0];
  }

  return word
    .split('')
    .map((c) => {
      if (/[^\u4e00-\u9fa5]/.test(c)) {
        return c;
      }
      for (let i = 0; i < boundaryChar.length; i += 1) {
        if (boundaryChar[i].localeCompare(c, 'zh-CN-u-co-pinyin') >= 0) {
          idx = i;
          break;
        }
      }
      return MAP[idx];
    })
    .join('');
}
export function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
export function promisify<T = unknown>(func: Function) {
  return (...arg: any) =>
    new Promise<T>((resolve, reject) => {
      const res = func(...arg);
      if (isPromise(res)) {
        return res.then(resolve).catch(reject);
      }
      return resolve(res);
    });
}
