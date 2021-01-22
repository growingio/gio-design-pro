/* eslint-disable consistent-return */

/**
 * 表单数据最大长度
 */
export const MAX_VALUE_LENGTH = 30;
/**
 * 描述字段最大长度
 */
export const MAX_DESC_LENGTH = 150;

export interface Kv {
  key: string;
  value: string;
  [K: string]: any;
}
/**
 * 去除字符串字段中前后的空格
 * @param val
 */
export function trim(val: any): any {
  if (!val) {
    return val;
  }

  if (val.trim) {
    return val.trim.call(val);
  }

  if (Array.isArray(val)) {
    return val.map((v) => {
      return trim(v);
    });
  }

  if (typeof val === 'object') {
    const obj = {} as any;
    Object.keys(val).forEach((key) => {
      obj[trim(key)] = trim(val[key]);
    });
    return obj;
  }

  return val;
}

export const isEmptyStr = (val: string) => {
  if (!val) {
    return true;
  }
  return val?.trim().length === 0;
};

export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === '[object Object]';
};

export const isEmptyValue = (val: any) => {
  return val === null || val === undefined || val === '';
};

export const kvsToQuery = (kvs: Kv[]): any => {
  if (!kvs || kvs.length === 0) return;
  return kvs
    .map((kv) => {
      if (kv.key) {
        return `${kv.key}=${kv.value || ''}`;
      }
      return '';
    })
    .filter((v) => v)
    .join('&');
};

export const objToQuery = (obj: any) => {
  return Object.keys(obj || {})
    .map((key) => `${key}=${obj[key]}`)
    .filter((v) => v)
    .join('&');
};

// 查询参数转化到kv结构数组，过滤掉key不存在的
export const queryToKvs = (query?: string): Kv[] => {
  if (!query) return [];
  // eslint-disable-next-line no-param-reassign
  if (query.startsWith('?')) query = query.slice(1);
  return query
    .split('&')
    .map((kv) => {
      const kva = kv.split('=');
      return {
        key: kva[0],
        value: kva[1],
      };
    })
    .filter((v) => !!v.key);
};

/**
 * 判断某个元素是不是一个元素的子元素
 * @param elem 目标元素
 * @param parentElem 父元素
 */
export const isChildOfElement = (elem: Element, parentElem: Element) => {
  let p = elem.parentElement;
  while (p && p !== document.body) {
    if (p === parentElem) {
      return true;
    }
    p = p.parentElement;
  }
  return false;
};
