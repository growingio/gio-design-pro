import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Modal } from '@gio-design/components';
import { FormInstance, FormProps } from '@gio-design/components/es/components/form';
import type { ModalProps } from '@gio-design/components/es/components/modal';

import { createPortal } from 'react-dom';

import type { CommonFormProps } from '../../interfaces';
import BaseForm from '../../BaseForm';

export type ModalFormProps = Omit<FormProps, 'onFinish' | 'title'> &
  CommonFormProps & {
    /**
     * 接受返回一个boolean，返回 true 会关掉这个弹窗
     *
     * @name 表单结束后调用
     */
    onFinish?: (formData: any) => Promise<boolean | void>;

    /** @name 用于触发抽屉打开的 dom */
    trigger?: JSX.Element;

    /** @name 受控的打开关闭 */
    visible?: ModalProps['visible'];

    /** @name 打开关闭的事件 */
    onVisibleChange?: (visible: boolean) => void;

    /**
     * 不支持 'visible'，请使用全局的 visible
     *
     * @name 弹框的属性
     */
    modalProps?: Omit<ModalProps, 'visible'>;

    /** @name 弹框的标题 */
    title?: ModalProps['title'];

    // /** @name 弹框的宽度 */
    // width?: ModalProps['width'];
  };

const ModalForm: React.FC<ModalFormProps> = ({ children, trigger, modalProps, onFinish, title, ...rest }) => {
  const [visible, setVisible] = useState<boolean>(!!rest.visible);

  /** 设置 trigger 的情况下，懒渲染优化性能；使之可以直接配合表格操作等场景使用 */
  const isFirstRender = useRef(!modalProps?.forceRender);
  /**
   * IsFirstRender.current 或者 visible 为 true 的时候就渲染 不渲染能会造成一些问题, 比如再次打开值不对了 只有手动配置
   * drawerProps?.destroyOnClose 为 true 的时候才会每次关闭的时候删除 dom
   */
  const shouldRenderFormItems = useMemo(() => {
    if (isFirstRender.current && visible === false) {
      return false;
    }
    if (visible === false && modalProps?.destroyOnClose) {
      return false;
    }
    return true;
  }, [visible, modalProps?.destroyOnClose]);

  /** 同步 props 和 本地的 ref */
  const formRef = useRef<FormInstance>();

  /** 如果 destroyOnClose ，重置一下表单 */
  useEffect(() => {
    if (visible) {
      isFirstRender.current = false;
    }
    if (!visible && modalProps?.destroyOnClose) {
      formRef.current?.resetFields();
    }
  }, [modalProps?.destroyOnClose, visible]);

  useImperativeHandle(rest.formRef, () => formRef.current, [formRef.current]);

  return (
    <>
      {createPortal(
        <div>
          <BaseForm
            formRef={formRef}
            onFinish={async (values) => {
              if (!onFinish) {
                return;
              }
              const success = await onFinish(values);
              if (success) {
                formRef.current?.resetFields();
                setVisible(false);
              }
            }}
            contentRender={(item, submitter) => {
              return (
                <Modal
                  title={title}
                  getContainer={false}
                  {...modalProps}
                  visible={visible}
                  onClose={(e) => {
                    setVisible(false);
                    modalProps?.onClose?.(e);
                  }}
                  footer={submitter}
                >
                  {shouldRenderFormItems ? item : null}
                </Modal>
              );
            }}
          >
            {children}
          </BaseForm>
        </div>,
        document.body
      )}
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: (e: any) => {
            setVisible(!visible);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default ModalForm;
