// import { Element } from '../types';

// export declare type TagElement = Element;
export interface TagElement {
  id: string;
  name: string;
  actions: string[];
  attrs: DocProps;
  definition: DocProps;
  screenshot: Screenshot;
  platforms: string[];
  docType: string;
  description: string;
  businessType: string;
  isSystem: Boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  updaterId: string;
  creator: string;
  updater: string;
  patternMatched: Boolean;
  appVersion: string;
  sdkVersion: string;
}

export interface DocProps {
  urlScheme?: string;
  domain?: string;
  path?: string;
  query?: string;
  xpath?: string;
  index?: string;
  href?: string;
  content?: string;
  pg?: string;
  contentType?: string; // 'match_phrase' | '=';
}
export interface Screenshot {
  target?: string;
  viewport: string;
}
