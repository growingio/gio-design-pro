export interface DeviceInfo {
  name: string;
  domain: string;
  os: string;
  // 以下是原生app特有的
  urlScheme?: string;
  projectId: string;
  screenHeight: number;
  screenWidth: number;
  sdkVersion: string;
  sdkVersionCode: number;
  timestamp: number;
}
export enum AppType {
  MINP,
  NATIVE,
  WEB,
}
export interface Rect {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  // 是不是在可视区外边
  inOut?: boolean;
}
/**
 * 获取的页面信息
 */
export interface PageInfo extends Rect {
  domain: string;
  path: string;
  query?: string;
  title?: string;
  isIgnored?: string;
}
/**
 * 元素信息
 */
export interface ElementInfo extends PageInfo {
  // 带有最大5层限制的xpath
  xpath: string;
  parentXPath?: string;
  content?: string;
  href?: string;
  // index从1开始
  index?: string;
  nodeType?: string;
  zLevel?: number;
  // native拥有的
  page?: string;
  webView?: WebViewInfo;
}
export interface WebViewInfo {
  page: PageInfo;
  elements: ElementInfo[];
}

export interface LimitCondition {
  content?: string;
  index?: string;
  href?: string;
  contentType?: 'match_phrase' | '=';
}
