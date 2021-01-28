/* eslint-disable no-prototype-builtins */
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
    return val.map((v) => trim(v));
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

export const isObject = (o: any) => Object.prototype.toString.call(o) === '[object Object]';

export const isEmptyValue = (val: any) => val === null || val === undefined || val === '';

export const kvsToQuery = (kvs: Kv[]): any => {
  if (!kvs || kvs.length === 0) return;
  return kvs
    .map((kv) => {
      if (kv?.key) {
        return `${kv?.key}=${kv?.value || ''}`;
      }
      return '';
    })
    .filter((v) => v)
    .join('&');
};

export const objToQuery = (obj: any) =>
  Object.keys(obj || {})
    .map((key) => `${key}=${obj[key]}`)
    .filter((v) => v)
    .join('&');

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
export type Query = { [name: string]: string | any[] };
export const qsParse = (search: string): Query => {
  let _search = search;
  if (search?.startsWith('?')) _search = search.slice(1);
  const query = {} as any;
  _search?.split('&').forEach((item) => {
    const kv = item.split('=');
    if (query.hasOwnProperty(kv[0])) {
      let v = query[kv[0]];
      if (Array.isArray(v)) {
        v.push(kv[1]);
      } else {
        v = [v, kv[1]];
      }
      query[kv[0]] = v?.sort();
    } else {
      !isEmptyStr(kv[0]) && (query[kv[0]] = kv[1] || '');
    }
  });
  return query;
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
export const matchString = (likePattern: string, value: string, accurate = false): boolean => {
  if (!accurate && (!likePattern || value == null)) {
    return false;
  }
  return !accurate && likePattern.indexOf('*') !== -1
    ? new RegExp(`^${likePattern.replace(/\*+/g, '(.*)')}$`).test(value)
    : likePattern === value;
};
/**
 * 模糊模式下只要page中包含tag中的所有query就行，多了是可以匹配的
 * a=1&b=1可以匹配上a=1
 * 不关注顺序
 *
 * @param patternSearch 匹配模式
 * @param pageSearch 要匹配的query
 * @param accurate 开启精准匹配，参数key一致，值相同，默认false
 */
export const matchQuery = (patternSearch: string, pageSearch: string, accurate = false): boolean => {
  const patternQuery = qsParse(patternSearch);
  const pageQuery = qsParse(pageSearch);

  // 精准匹配下，query个数必须一样
  if (accurate && Object.keys(patternQuery).length !== Object.keys(pageQuery).length) {
    return false;
  }
  // page中的query在多的情况下也可匹配成功
  return Object.keys(patternQuery).every((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!pageQuery.hasOwnProperty(key)) {
      return false;
    }
    const pageVal = pageQuery[key] as any;
    const patternVal = patternQuery[key];
    // 匹配规则和页面参数值类型不一样就直接匹配失败,数组和字符串
    if (typeof patternVal !== typeof pageVal) {
      return false;
    }
    if (Array.isArray(patternVal)) {
      // 在精准匹配模式下，数组内容必须是一样的
      if (Array.isArray(pageVal) && (accurate ? pageVal.length === patternVal.length : true)) {
        // 对于数组的参数，比较时不分顺序进行匹配
        return patternVal.every((ptv) => Array.from(pageVal).some((pgv: any) => matchString(ptv, pgv, accurate)));
      }
      return false;
    }
    return matchString(patternVal, pageVal, accurate);
  });
};
