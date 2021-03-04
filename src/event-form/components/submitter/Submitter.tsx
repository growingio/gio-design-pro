import React from 'react';
import { FormInstance } from '@gio-design/components/es/components/form';
import Button, { ButtonProps } from '@gio-design/components/es/components/button';
// import '../style';

export type SubmitterProps<T = {}> = {
  /**
   * @name 提交方法
   */
  onSubmit?: () => void;
  /**
   * @name 重置方法
   */
  onReset?: () => void;
  /**
   * @name 提交按钮的文字
   */
  submitText?: string;
  /**
   * @name 重置按钮的文字
   */
  resetText?: string;
  /**
   * @name 提交按钮的 props
   */
  submitButtonProps?: ButtonProps;
  /**
   * @name 重置按钮的 props
   */
  resetButtonProps?: ButtonProps;
  /**
   * 默认的提交按钮FooterToolbar渲染的父元素；默认渲染到form底部的<div className="footer"></div>
   */
  defaultRenderContainer?: Element;
  /**
   * @name 自定义操作的渲染
   */
  render?: ((props: SubmitterProps & T, dom: JSX.Element[]) => React.ReactNode[] | React.ReactNode | false) | false;
};

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */

const Submitter: React.FC<SubmitterProps & { form: FormInstance }> = (props) => {
  if (props.render === false) {
    return null;
  }

  const {
    form,
    onSubmit,
    render,
    onReset,
    submitButtonProps,
    resetButtonProps,
    resetText = '重置',
    submitText = '提交',
  } = props;

  /**
   * 默认的操作的逻辑
   */
  const dom = [
    <Button
      {...resetButtonProps}
      key="rest"
      type="secondary"
      onClick={(e) => {
        form.resetFields();
        onReset?.();
        resetButtonProps?.onClick?.(e);
      }}
    >
      {resetText}
    </Button>,
    <Button
      {...submitButtonProps}
      key="submit"
      type="primary"
      onClick={(e) => {
        form.submit();
        onSubmit?.();
        submitButtonProps?.onClick?.(e);
      }}
    >
      {submitText}
    </Button>,
  ];

  const renderDom = render ? render(props, dom) : dom;
  if (!renderDom) {
    return null;
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null;
    }
    return <>{renderDom}</>;
  }
  return renderDom as JSX.Element;
};

export default Submitter;
