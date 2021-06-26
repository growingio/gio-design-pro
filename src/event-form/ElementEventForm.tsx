/* eslint-disable no-empty-pattern */
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Input, Form, Alert, Popconfirm } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { FormInstance } from '@gio-design/components/es/components/form';
import Button, { ButtonProps } from '@gio-design/components/es/components/button';
import { cloneDeep, get, isEmpty, omit } from 'lodash';
import { MAX_DESC_LENGTH, MAX_VALUE_LENGTH } from './utils';
import FormItemGroup from './components/FormItemGroup';
import { SubmitterProps } from './components/submitter';
import { EventFormProps, ElementEventFormProps, Rule, ElementFormValues } from './interfaces';
// import './style';
// import '@gio-design/components/es/components/link/style/css.js';
import BaseForm from './BaseForm';
import { AppType, LimitCondition } from './types';
import ValidatorHelper from './validator';
import FooterToolbar from './components/FooterToolbar';
import PagePicker from './components/page-picker';
import DefinitionCondition from './components/definition-condition';
import ElementDefinitionRule from './ElementDefinitionRuleRender';
import { TagElement } from './TagElement';
import { useMountedState } from '../hooks';

/**
 * @name 将初始值转换成form 表单需要的数据 ，（添加 limitCondition prop）
 * @param initialValues
 */
function transformFormValues(initialValues?: ElementFormValues) {
  const tempValue = cloneDeep(initialValues || {}) as ElementFormValues;
  const { definition } = tempValue;
  const res = {
    ...tempValue,
    limitCondition: {
      content: definition?.content,
      href: definition?.href,
      index: definition?.index,
      contentType: definition.contentType,
    },
  };
  return res;
}
/**
 * @name 转化数据类型，主要转化
 * @param values
 */
function conversionSubmitValue(values: any) {
  const tempValue = cloneDeep(values);
  const { limitCondition = {}, definition, belongPage } = tempValue;
  const { content, index, href, contentType } = limitCondition;
  const { contentChecked, indexChecked, hrefChecked } = limitCondition;
  // const {
  //   definition: { path, domain, query },
  // } = (belongPage || {}) as TagElement;
  const pageDefine = (belongPage as TagElement)?.definition;
  const { path, domain, query } = pageDefine || {};
  const limit: LimitCondition = {
    content: contentChecked ? content : undefined,
    index: indexChecked ? index : undefined,
    href: hrefChecked ? href : undefined,
    contentType: contentChecked ? contentType : definition?.contentType,
  };
  const newDefinition = { ...get(tempValue, 'definition'), ...{ path, domain, query }, ...limit };
  tempValue.definition = newDefinition;
  return { ...omit(tempValue, 'limitCondition', 'belongPage', 'belongApp') } as ElementFormValues;
}
const Render: React.ForwardRefRenderFunction<FormInstance, ElementEventFormProps> = (props: EventFormProps, ref) => {
  const {
    labelAlign = 'left',
    labelWidth = 70,
    appType = AppType.WEB,
    platform,
    initialValues,
    definedTags = [],
    form: userForm,
    onValuesChange,
    submitter,
    submitterExtra,
    pagePicker = {
      // onActionButtonClick: () => undefined,
      currentPageTags: [],
      dataSource: [],
    },
    dataChart,
    manualMode,
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
  const [manualModeStatue, setManualMode] = useState(false);
  const validatorRef = useRef(new ValidatorHelper(definedTags));
  useEffect(() => {
    validatorRef.current = new ValidatorHelper(definedTags);
  }, [definedTags?.length]);

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
      // {
      //   message: whitespaceRule.message,
      //   validator: async () => true,
      //   validateTrigger: 'onChange',
      // },
    ],
    definition: [
      () => ({
        validateTrigger: ['onChange', 'onSubmit'],
        validator: async () => {
          // console.warn('definition validator');
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const { definition } = conversionSubmitValue(formValues) as ElementFormValues;

          const repeatRuleTag = validatorRef.current.findRepeatElementTag(definition);
          if (repeatRuleTag != null) {
            throw new Error('规则重复');
          }
        },
      }),
    ],
    belongPage: [
      {
        required: true,
        message: '所属页面不能为空',
        validateTrigger: 'onChange',
        validator: async (rule, value) => {
          if (!value || !value.id) {
            throw new Error(rule.message as string);
          }
        },
      },
    ],
  };
  const mounted = useMountedState();
  const showBelongApp = platform?.toLowerCase() !== 'web';
  const innerFormInitialValues = useMemo(() => transformFormValues(initialValues as ElementFormValues), [
    initialValues,
  ]);
  const [formValues, setFormValues] = useState<any>(() => transformFormValues(initialValues));
  useEffect(() => {
    setFormValues(() => transformFormValues(initialValues));
    formRef.current.resetFields();
  }, [initialValues]);
  function handleValuesChange(changedValues: any, allValues: any) {
    const newValue = { ...initialValues, ...allValues };
    setFormValues(newValue);
    onValuesChange?.(changedValues, conversionSubmitValue(allValues));
  }
  useEffect(() => {
    const { name, belongPage } = formValues;
    let disabled = false;
    const isNameEmpty = isEmpty(name) || isEmpty(belongPage);

    disabled = isNameEmpty;
    // const validInfo = formRef.current?.getFieldsError();
    // const hasError = validInfo && validInfo.some((v) => v.errors.length > 0);
    setSubmitDisabeld(disabled);
    // console.log('ElementFormValues', formValues);
  }, [formValues]);

  const renderDefinitionRule = () => {
    const { definition, attrs } = conversionSubmitValue(formValues) as ElementFormValues;

    const repeatRuleTag = validatorRef.current.findRepeatElementTag(definition);
    const renderMessage = <ElementDefinitionRule attrs={attrs} limitCondition={definition} repeatTag={repeatRuleTag} />; // ruleText; // renderDefinitionRuleText(definition, repeatRuleTag);
    return (
      <div style={{ flex: 1 }}>
        <Alert size="small" type={repeatRuleTag ? 'error' : 'info'} showIcon message={renderMessage} />
      </div>
    );
  };

  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  const defaultSubmitRender = (prop: SubmitterProps, submitterDom: ReactElement[]) => {
    const [manual, resetBtn, submitBtn] = submitterDom;
    const { defaultRenderContainer } = prop;
    if (defaultRenderContainer) {
      return (
        <FooterToolbar
          container={prop.defaultRenderContainer}
          // style={{ position: 'static' }}
          extra={submitterExtra || (!showBelongApp && manual)}
        >
          {resetBtn}
          {submitBtn}
          {/* {[resetBtn, submitBtn] as ReactElement[]} */}
        </FooterToolbar>
      );
    }
    return (
      <div className="footer">
        <FooterToolbar
          container={prop.defaultRenderContainer}
          // style={{ position: 'static' }}
          extra={submitterExtra || (!showBelongApp && manual)}
        >
          {resetBtn}
          {submitBtn}
          {/* {[resetBtn, submitBtn] as ReactElement[]} */}
        </FooterToolbar>
      </div>
    );
  };

  const renderSubmitter = () => {
    const [popVisible, setPopVisible] = useState(false);
    const [popoverDisabled, setPopoverDisabled] = useState(true);
    if (submitter === false || submitter?.render === false) {
      return null;
    }

    const submit = (
      <Popconfirm
        placement="topRight"
        title="保存后不支持修改元素定义规则，仅可修改基本信息。确定要保存当前定义吗？"
        onConfirm={() => {
          formRef.current?.submit();
          submitter?.onSubmit?.();
          // setSave(true);
          // setPopVisible(false);
        }}
        onCancel={() => {
          // setPopVisible(false);
          // setSave(false);
        }}
        onVisibleChange={(show) => {
          setPopVisible(show);
        }}
        overlayInnerStyle={{ width: 400 }}
        arrowPointAtCenter
        visible={!popoverDisabled && popVisible}
      >
        <Button
          key="submit"
          type="primary"
          {...submitter?.submitButtonProps}
          disabled={submitDisabled || popVisible}
          loading={loading}
          onClick={async () => {
            // setPopVisible(false);
            try {
              await formRef.current?.validateFields();
              setPopoverDisabled(false);
              // setPopVisible(true);
            } catch {
              setPopVisible(false);
              setPopoverDisabled(true);
            }
          }}
        >
          {submitter?.submitText ?? '保存'}
        </Button>
      </Popconfirm>
    );

    const reset = (
      <Button
        key="rest"
        type="secondary"
        {...submitter?.resetButtonProps}
        onClick={(e) => {
          formRef.current?.resetFields();
          submitter?.onReset?.();
          submitter?.resetButtonProps?.onClick?.(e);
          // handleReset(e);
        }}
      >
        {submitter?.resetText ?? '取消'}
      </Button>
    );

    const manual = (
      <Button
        key="manualMode"
        type="text"
        onClick={() => {
          setManualMode(!manualModeStatue);
        }}
      >
        {manualModeStatue ? '关闭手动模式' : '打开手动模式'}
      </Button>
    );
    const submitterDom = [manual, reset, submit] as ReactElement[];
    const _render = submitter?.render || defaultSubmitRender;
    const submitterProps: any = {
      form: formRef?.current,
      submitButtonProps: {
        loading,
        ...submitter?.submitButtonProps,
      },
      defaultRenderContainer: submitter?.defaultRenderContainer,
    };
    return _render(submitterProps, submitterDom) as React.ReactNode;
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
          initialValues={innerFormInitialValues}
          onFinish={async (values) => {
            if (!mounted() || !restProps.onFinish) return;
            try {
              setLoading(true);

              const submitValues = conversionSubmitValue(values);
              await restProps.onFinish(submitValues);
            } finally {
              setLoading(false);
            }
          }}
          contentRender={(items) => (
            <>
              {items}
              {renderSubmitter()}
            </>
          )}
        >
          <FormItemGroup groupNumber={1} title="基本信息">
            <Form.Item validateTrigger={['onBlur', 'onChange']} name="name" label="元素名称" rules={validateRules.name}>
              <Input placeholder="请输入元素名称" maxLength={MAX_VALUE_LENGTH} />
            </Form.Item>
            <Form.Item name="description" label="描述" rules={validateRules.description}>
              <Input.TextArea maxLength={MAX_DESC_LENGTH} rows={3} placeholder="请输入描述" />
            </Form.Item>
          </FormItemGroup>
          <FormItemGroup style={{ marginTop: '24px' }} groupNumber={2} title="定义规则">
            <div className="feedback">
              <Form.Item labelWidth={0} rules={validateRules.definition}>
                {renderDefinitionRule()}
              </Form.Item>
              <Form.Item
                style={{ display: 'none' }}
                name="definition"
                dependencies={['belongPage', 'limitCondition']}
                label="限定条件"
                rules={validateRules.definition}
              />
            </div>
            {showBelongApp && (
              <Form.Item name="belongApp" label="所属应用">
                <Input placeholder="所属应用包名" disabled />
              </Form.Item>
            )}
            <Form.Item name="belongPage" label="所属页面" rules={validateRules.belongPage}>
              <PagePicker
                dataSource={pagePickerDataSource}
                actionButton={{ onClick: pagePicker.onActionButtonClick }}
                currentPageTags={pagePicker.currentPageTags ?? []}
              />
            </Form.Item>
            {hasLimit() && (
              <>
                <Form.Item shouldUpdate name="limitCondition" label="限定条件" rules={validateRules.limitCondition}>
                  <DefinitionCondition isNative={appType === AppType.NATIVE} />
                </Form.Item>
              </>
            )}

            {!showBelongApp && manualModeStatue && (
              <Form.Item name="manualMode" label="手动模式">
                {manualMode}
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
export const ElementEventForm = React.forwardRef(Render);
export default ElementEventForm;
