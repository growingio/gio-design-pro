import { FormInstance, FormProps } from '@gio-design/components/es/components/form';
import { SubmitterProps } from './components/Submitter';

export interface CommonFormProps {
  submitter?:
    | SubmitterProps<{
        form?: FormInstance<any>;
      }>
    | false;

  /**
   * @name 表单结束后调用
   * @description  支持异步操作，更加方便
   */
  onFinish?: (formData: any) => Promise<boolean | void>;
}
/**
 * 无埋点页面浏览&元素点击事件表单属性
 */
export interface EventFormProps extends FormProps, CommonFormProps {
  /**
   * @name 表单结束后调用
   * @description  支持异步操作，更加方便
   */
  onFinish?: (formData: any) => Promise<boolean | void>;
}
export interface PageViewEventFormProps extends Omit<EventFormProps, 'initialValues'> {
  initialValues?: PageViewFormValues;
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
  domain?: string;
  path?: string;
  query?: string;
}
