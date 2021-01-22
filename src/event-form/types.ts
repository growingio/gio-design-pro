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
