import React, { useEffect, useRef, useState } from 'react';
import { Input, Form, Alert } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { FormInstance } from '@gio-design/components/es/components/form';
import Button, { ButtonProps } from '@gio-design/components/es/components/button';
import { cloneDeep, get, isEmpty, omit } from 'lodash';
import { MAX_DESC_LENGTH, MAX_VALUE_LENGTH } from './utils';
import FormItemGroup from './components/FormItemGroup';
import Submitter, { SubmitterProps } from './components/Submitter';
import { EventFormProps, ElementEventFormProps, Rule, ElementFormValues } from './interfaces';
import './style';
import '@gio-design/components/es/components/link/style/css.js';
import BaseForm from './BaseForm';
import { AppType, LimitCondition } from './types';
import ValidatorHelper from './validator';
import FooterToolbar from './components/FooterToolbar';
// import { DocProps, TagElement } from './TagElement';
import PagePicker from './components/page-picker';
import DefinitionCondition from './components/definition-condition';
import ElementDefinitionRule from './ElementDefinitionRuleRender';
// import { DocProps } from './TagElement';
// interface DefinitionRuleProps {
//   definition: DocProps;
//   appType: AppType;
// }

function transformFormValues(initialValues?: ElementFormValues) {
  const tempValue = cloneDeep(initialValues || {}) as ElementFormValues;
  const { definition } = tempValue;
  const res = {
    // ...omit(tempValue, ['definition', 'attrs']),
    ...tempValue,
    limitCondition: {
      content: definition?.content,
      href: definition.href,
      index: definition?.index,
      contentType: definition.contentType,
    },
  };
  // console.warn('res====>', res);
  return res;
}
/**
 *
 * @param values 转化数据类型，主要转化
 */
function conversionSubmitValue(values: any) {
  const tempValue = cloneDeep(values);
  const { limitCondition, definition } = tempValue;
  const { content, index, href, contentType } = limitCondition;
  const { contentChecked, indexChecked, hrefChecked } = limitCondition;
  const limit: LimitCondition = {
    content: contentChecked ? content : undefined,
    index: indexChecked ? index : undefined,
    href: hrefChecked ? href : undefined,
    contentType: contentChecked ? contentType : definition?.contentType,
  };
  const newDefinition = { ...get(tempValue, 'definition'), ...limit };
  tempValue.definition = newDefinition;
  return { ...omit(tempValue, 'limitCondition') } as ElementFormValues;
}
const ElementEventForm: React.ForwardRefRenderFunction<FormInstance, ElementEventFormProps> = (
  props: EventFormProps,
  ref
) => {
  const {
    labelAlign = 'left',
    labelWidth = 68,
    appType = AppType.WEB,
    initialValues,
    definedTags,
    form: userForm,
    onValuesChange,
    submitter,
    extraNode,
    pagePicker = {
      onActionButtonClick: () => undefined,
      currentPageTags: [],
      dataSource: [],
    },
    dataChart,
    // showPreButton = true,
    ...restProps
  } = props as ElementEventFormProps;
  const [wrapForm] = Form.useForm<FormInstance>();
  const formRef = useRef<FormInstance>(wrapForm || userForm);
  React.useImperativeHandle(ref, () => formRef?.current);

  const prefixCls = usePrefixCls('event-form');

  /**
   * 提交按钮的disabled状态，
   */
  const [submitDisabled, setSubmitDisabeld] = useState(true);
  const validatorRef = useRef(new ValidatorHelper(definedTags));

  const whitespaceRule = {
    pattern: /^\S.*\S$|(^\S{0,1}\S$)/,
    message: '首、末位不支持输入空格',
    validateTrigger: 'onBlur',
  };

  const validateRules: { [key: string]: Rule[] } = {
    name: [
      { required: true, message: '名称不能为空', validateTrigger: 'onChange' },
      whitespaceRule,
      {
        validator: async (_, value) => validatorRef.current?.checkName(value),
        validateTrigger: 'onSubmit',
      },
    ],
    description: [],
    belongApp: [],
    limitCondition: [
      {
        message: whitespaceRule.message,
        validator: async () => true,
        validateTrigger: 'onChange',
      },
    ],
    page: [],
  };

  const showBelongApp = appType !== AppType.WEB;
  const [formValues, setFormValues] = useState<any>(() => transformFormValues(initialValues));

  function handleValuesChange(changedValues: any, allValues: any) {
    const newValue = { ...initialValues, ...allValues };
    setFormValues(newValue);
    onValuesChange?.(changedValues, allValues);
  }
  useEffect(() => {
    const { name } = formValues;
    let disabled = false;
    const isNameEmpty = isEmpty(name);

    disabled = isNameEmpty;
    setSubmitDisabeld(disabled);
    // console.log('ElementFormValues', formValues);
  }, [formValues]);

  const renderDefinitionRule = () => {
    const { definition, attrs } = conversionSubmitValue(formValues) as ElementFormValues;
    // const { attrs } = initialValues;
    const repeatRuleTag = validatorRef.current.findRepeatElementTag(definition);
    const renderMessage = <ElementDefinitionRule attrs={attrs} limitCondition={definition} repeatTag={repeatRuleTag} />; // ruleText; // renderDefinitionRuleText(definition, repeatRuleTag);
    return (
      <>
        <Alert size="small" type={repeatRuleTag ? 'error' : 'info'} showIcon message={renderMessage} />
      </>
    );
  };

  const onSubmit = () => {
    formRef.current?.submit();
  };
  const submit = submitter !== false && (
    <Button
      key="submit"
      type="primary"
      {...submitter?.submitButtonProps}
      disabled={submitDisabled}
      onClick={() => {
        submitter?.onSubmit?.();
        onSubmit();
      }}
    >
      {submitter?.submitText ?? '保存'}
    </Button>
  );
  const reset = submitter !== false && (
    <Button
      key="rest"
      type="secondary"
      {...submitter?.resetButtonProps}
      onClick={(e) => {
        formRef.current?.resetFields();
        submitter?.onReset?.();
        submitter?.resetButtonProps?.onClick?.(e);
      }}
    >
      {submitter?.resetText ?? '取消'}
    </Button>
  );
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  const defaultSubmitRender = () => {
    const submitterProps: SubmitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;
    const submitterNode =
      submitter === false ? undefined : (
        <Submitter
          key="submitter"
          {...submitterProps}
          form={formRef.current}
          resetText="取消"
          submitButtonProps={{
            loading,
            ...submitterProps.submitButtonProps,
            disabled: submitDisabled,
          }}
        />
      );
    return (
      <div className="footer">
        <FooterToolbar style={{ position: 'static' }} extra={extraNode}>
          {submitterNode}
        </FooterToolbar>
      </div>
    );
  };

  const renderSubmitter = () => {
    const submitterDom = [reset, submit] as JSX.Element[];
    if (submitter && submitter.render) {
      const submitterProps: any = {
        form: formRef?.current,
        onSubmit,
        // showPreButton,
        onPre: () => {
          // restProps.onPre?.();
        },
      };
      return submitter.render(submitterProps, submitterDom) as React.ReactNode;
    }
    if (submitter && submitter?.render === false) {
      return null;
    }
    return defaultSubmitRender() as React.ReactNode;
  };
  function hasLimit() {
    const { attrs } = (initialValues || {}) as ElementFormValues;
    return !!attrs?.href || attrs?.index != null || !!attrs?.content;
  }
  const pagePickerDataSource = pagePicker.dataSource || definedTags.filter((v) => v.docType === 'page');
  return (
    <div className={`${prefixCls}-wrap`}>
      <div className={`${prefixCls}-body`}>
        <BaseForm
          {...restProps}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          form={userForm || wrapForm}
          submitter={submitter}
          onValuesChange={handleValuesChange}
          initialValues={formValues}
          onFinish={async (values) => {
            if (!restProps.onFinish) return;
            setLoading(true);
            const { definition } = conversionSubmitValue(values);
            const repeatRuleTag = validatorRef.current.findRepeatElementTag(definition);
            if (repeatRuleTag) {
              return;
            }
            await restProps.onFinish(conversionSubmitValue(values));
            setLoading(false);
          }}
          contentRender={(items) => (
            <>
              {items}
              {renderSubmitter()}
            </>
          )}
        >
          <FormItemGroup groupNumber={1} title="基本信息">
            <Form.Item validateTrigger={['onBlur', 'onChange']} name="name" label="页面名称" rules={validateRules.name}>
              <Input placeholder="请输入页面名称" maxLength={MAX_VALUE_LENGTH} />
            </Form.Item>
            <Form.Item name="description" label="描述" rules={validateRules.description}>
              <Input.TextArea maxLength={MAX_DESC_LENGTH} rows={3} placeholder="请输入描述" />
            </Form.Item>
          </FormItemGroup>
          <FormItemGroup style={{ marginTop: '24px' }} groupNumber={2} title="定义规则">
            <div className="feedback">
              {/* <Alert size="small" showIcon type="error" message="xxxxx" /> */}
              {renderDefinitionRule()}
            </div>
            {showBelongApp && (
              <Form.Item name="belongApp" label="所属应用">
                <Input placeholder="所属应用包名" disabled />
              </Form.Item>
            )}
            <Form.Item name="page" label="所属页面" rules={validateRules.page}>
              <PagePicker
                dataSource={pagePickerDataSource}
                actionButton={{ onClick: pagePicker?.onActionButtonClick }}
                currentPageTags={pagePicker?.currentPageTags ?? []}
              />
            </Form.Item>
            {hasLimit && (
              <Form.Item name="limitCondition" label="限定条件" rules={validateRules.limitCondition}>
                <DefinitionCondition isNative={appType === AppType.NATIVE} />
              </Form.Item>
            )}
            <Form.Item label="数据">
              <div className="data-chart-wrap">{dataChart}</div>
            </Form.Item>
          </FormItemGroup>
        </BaseForm>
      </div>
    </div>
  );
};

export default React.forwardRef(ElementEventForm);
