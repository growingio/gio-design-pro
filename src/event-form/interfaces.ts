import { FormInstance, FormProps } from '@gio-design/components/es/components/form';
import { ReactElement, ReactNode } from 'react';
import { SubmitterProps } from './components/Submitter';
import { AppType, DeviceInfo } from './types';
import { TagElement, DocProps } from './TagElement';

type FormSubmitter = SubmitterProps<{
  form?: FormInstance<any>;
}>;

type SubmitterType = FormSubmitter | false;

export interface CommonFormProps {
  submitter?: SubmitterType;
  /**
   * @name 表单结束后调用
   * @description  支持异步操作
   */
  onFinish?: (formData: Record<string, any>) => Promise<boolean | void>;
}
/**
 * 无埋点页面浏览&元素点击事件表单属性
 */
export interface EventFormProps extends FormProps, CommonFormProps {
  /**
   * @name 表单结束后调用
   * @description  支持异步操作
   */
  onFinish?: (formData: Record<string, any>) => Promise<boolean | void>;
  /**
   *  存在则是app定义
   * */
  deviceInfo?: DeviceInfo;
  appType?: AppType;

  /**
   * 所有已定义的标签
   */
  definedTags: TagElement[];
  dataChart?: JSX.Element;
  repeatRuleTag?: TagElement;
  ruleText?: ReactNode;
}
type StepSubmitterProps = SubmitterProps<{
  showPreButton: boolean;
  onPre: () => void;
  form?: FormInstance<any>;
}>;

export interface PageViewEventFormProps extends Omit<EventFormProps, 'initialValues'> {
  initialValues?: PageViewFormValues;
  /**
   * 底部toolbar 配置 ；
   */
  submitter?: StepSubmitterProps | false;
  /**
   * @name 是否显示 上一步按钮
   */
  showPreButton?: boolean;
  /**
   * 点击 上一步 的回调
   */
  onPre?: () => void;
}
export interface ElementEventFormProps extends Omit<EventFormProps, 'initialValues'> {
  initialValues?: ElementFormValues;
  pagePicker?: {
    /** 页面选择的定义新页面按钮 */
    onActionButtonClick?: () => void;
    currentPageTags: TagElement[];
    dataSource?: TagElement[];
  };

  extraNode?: ReactElement;
  /**
   * 页面选择器定义新页面按钮的click事件回调
   */
  // onDefinePageClick？: () => void;
}

export interface EventFormValues {
  name: string;
  description?: string;
  // 所属应用
  belongApp?: string;
}

/**
 * 定义页面的表单数据结构
 */
export interface PageViewFormValues extends EventFormValues {
  definition: { domain?: string; path?: string; query?: string };
}
export interface ElementFormValues extends EventFormValues {
  belongPage?: string;
  attrs: DocProps;
  definition: DocProps;
  // definition: {
  //   domain: string;
  //   path?: string;
  //   query?: string;
  //   xpath?: string;
  //   index?: string;
  //   href?: string;
  //   content?: string;
  //   pg?: string;
  //   contentType?: 'match_phrase' | '=';
  // };
}

/**
 * 表单验证规则类型定义
 */
export declare type StoreValue = any;
export declare type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';
declare type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void
) => Promise<void | any> | void;
export declare type RuleRender = (form: FormInstance) => RuleObject;
export interface ValidatorRule {
  message?: string | ReactElement;
  validator: Validator;
}
interface BaseRule {
  enum?: StoreValue[];
  len?: number;
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: StoreValue) => StoreValue;
  type?: RuleType;
  whitespace?: boolean;
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[];
}
declare type AggregationRule = BaseRule & Partial<ValidatorRule>;
interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array';
  defaultField?: RuleObject;
}
export declare type RuleObject = AggregationRule | ArrayRule;
export declare type Rule = RuleObject | RuleRender;
