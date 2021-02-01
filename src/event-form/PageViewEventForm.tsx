/* eslint-disable react/no-danger */
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Input, Form, Alert, Link } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import { FormInstance } from '@gio-design/components/es/components/form';
import Button, { ButtonProps } from '@gio-design/components/es/components/button';
import { cloneDeep, get, isArray, isEmpty, omit, trim } from 'lodash';
import { MAX_DESC_LENGTH, MAX_VALUE_LENGTH, queryToKvs, kvsToQuery } from './utils';
import FormItemGroup from './components/FormItemGroup';
import PathInput from './components/PathInput';
import QueryInput from './components/QSInput';
import Submitter, { SubmitterProps } from './components/Submitter';
import { EventFormProps, PageViewEventFormProps, PageViewFormValues, Rule } from './interfaces';
import './style';
import '@gio-design/components/es/components/link/style/css.js';
import BaseForm from './BaseForm';
import { AppType } from './types';
import ValidatorHelper from './validator';
import FooterToolbar from './components/FooterToolbar';
// import { DocProps, TagElement } from './TagElement';
import PageViewDefinitionRule from './PageViewDefinitionRuleRender';
import { DocProps } from './TagElement';

function definePageTip() {
  return (
    <span>
      支持使用通配符 * 来代替任意字符。例如：
      <br />
      页面1的地址是：www.sale.com/dress，
      <br />
      页面2的地址是：www.sale.com/furniture，
      <br />
      可以写成：www.sale.com/* 用于
      <br />
      统计所有符合这个规则的页面的数据总和。
    </span>
  );
}
// interface DefinitionRuleProps {
//   definition: DocProps;
//   appType: AppType;
// }

/**
 * 转化path:string ==> {path:string,checked?:boolean},query:string==>[{key,value}] collection
 * @param pvFormValues
 */
function transformFormValues(pvFormValues: PageViewFormValues) {
  const tempValue = cloneDeep(pvFormValues);
  const definition = get(tempValue, 'definition');
  const path = { path: definition?.path, checked: !isEmpty(definition?.path) };
  const query = queryToKvs(definition?.query);
  const { domain } = definition;
  return {
    ...tempValue,
    definition: { domain, path, query },
  };
}
/**
 *
 * @param values 转化数据类型，主要转化 path/query==>string
 */
function conversionSubmitValue(values: any) {
  const tempValue = cloneDeep(values);
  const defined = get(tempValue, 'definition', {});

  const path = get(defined, 'path', {});
  if (path && path.checked) {
    defined.path = path.path;
  }
  const query = get(tempValue, 'definition.query');
  if (query) {
    defined.query = kvsToQuery(query);
  }
  tempValue.definition = defined;
  return { ...omit(tempValue, 'belongApp') } as PageViewFormValues;
  // return tempValue;
}
const PageViewEventForm: React.ForwardRefRenderFunction<FormInstance, PageViewEventFormProps> = (
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
    showPreButton = true,
    dataChart,
    ...restProps
  } = props as PageViewEventFormProps;
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
    path: [
      {
        message: whitespaceRule.message,
        validator: async (_, value) => !whitespaceRule.pattern.test(value),
        validateTrigger: 'onChange',
      },
      {
        validator: async (_, value) => validatorRef.current?.checkPath(value),
        validateTrigger: 'onChange',
      },
    ],
    domain: [{ required: true, message: '域名不能为空' }, whitespaceRule],
    definition: [
      // {
      //   validator: async (_, value) => {
      //     validatorRef.current?.checkPageViewDefinition(value);
      //   },
      // },
    ],
  };

  const isNative = appType === AppType.NATIVE;
  const showBelongApp = appType !== AppType.WEB;
  const [formValues, setFormValues] = useState<any>(() => transformFormValues(initialValues as PageViewFormValues));

  function handleFormValuesChange(changedValues: any, allValues: any) {
    setFormValues(allValues);
    onValuesChange?.(changedValues, conversionSubmitValue(allValues));
  }
  useEffect(() => {
    const {
      name,
      definition: { path, query, domain },
    } = formValues;
    let disabled = false;
    const isNameEmpty = isEmpty(name);
    const isPathEmpty = path.checked === true && isEmpty(trim(path.path));
    const isDomainEmpty = isEmpty(trim(domain));
    const isQueryEmpty = () =>
      isArray(query) &&
      query.length > 0 &&
      query.findIndex((v) => isEmpty(v) || isEmpty(v.key) || isEmpty(v.value)) > -1;
    if (!isNative && (isNameEmpty || isPathEmpty || isDomainEmpty || isQueryEmpty())) {
      disabled = true;
      // setSubmitDisabeld(disabled);
    } else {
      disabled = isNameEmpty || isPathEmpty;
    }
    setSubmitDisabeld(disabled);
  }, [formValues]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const renderDefinitionRule = () => {
    const { definition } = conversionSubmitValue(formValues);
    const repeatRuleTag = validatorRef.current.findRepeatPageTag(definition);
    // console.warn(definition);
    const renderMessage = (
      <PageViewDefinitionRule repeatTag={repeatRuleTag} definition={definition} appType={appType} />
    ); // renderDefinitionRuleText(definition, repeatRuleTag);
    return (
      <div style={{ flex: 1 }}>
        <Alert size="small" type={repeatRuleTag ? 'error' : 'info'} showIcon message={renderMessage} />
      </div>
    );
  };
  const pre = submitter !== false && (
    <Button
      key="pre"
      type="secondary"
      {...submitter?.resetButtonProps}
      onClick={() => {
        restProps.onPre?.();
      }}
    >
      上一步
    </Button>
  );
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
        <FooterToolbar style={{ position: 'static' }} extra={pre}>
          {submitterNode}
        </FooterToolbar>
      </div>
    );
  };

  const renderSubmitter = () => {
    const submitterDom = [pre, reset, submit] as JSX.Element[];
    if (submitter && submitter.render) {
      const submitterProps: any = {
        form: formRef?.current,
        onSubmit,
        showPreButton,
        onPre: () => {
          restProps.onPre?.();
        },
        // render: defaultSubmitRender,
      };
      return submitter.render(submitterProps, submitterDom) as React.ReactNode;
    }
    if (submitter && submitter?.render === false) {
      return null;
    }
    return defaultSubmitRender() as React.ReactNode;
  };

  return (
    <div className={`${prefixCls}-wrap`}>
      <div className={`${prefixCls}-body`}>
        <BaseForm
          {...restProps}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          form={userForm || wrapForm}
          submitter={submitter}
          onValuesChange={handleFormValuesChange}
          initialValues={{
            ...formValues,
          }}
          onFinish={async (values) => {
            if (!restProps.onFinish) return;
            setLoading(true);
            // validatorRef.current?.
            const submitValues = conversionSubmitValue(values);
            const { definition } = submitValues;
            const repeatRuleTag = validatorRef.current.findRepeatPageTag(definition as DocProps);
            if (repeatRuleTag) {
              return;
            }
            await restProps.onFinish(submitValues);
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
          <FormItemGroup
            style={{ marginTop: '24px' }}
            groupNumber={2}
            title="定义规则"
            extra={
              appType !== AppType.NATIVE && (
                <Tooltip title={definePageTip()} placement="topRight" arrowPointAtCenter trigger="hover">
                  <Link style={{ fontSize: '12px' }} component="span" to="#;" onClick={(e) => e.preventDefault()}>
                    如何定义一组页面？
                  </Link>
                </Tooltip>
              )
            }
          >
            <div className="feedback">
              <Form.Item name="definition" labelWidth={0} rules={validateRules.definition}>
                {renderDefinitionRule()}
              </Form.Item>
            </div>
            {showBelongApp && (
              <Form.Item name="belongApp" label="所属应用">
                <Input placeholder="所属应用包名" disabled />
              </Form.Item>
            )}
            {isNative && (
              <Form.Item name={['definition', 'path', 'path']} label="路径">
                <Input disabled maxLength={MAX_VALUE_LENGTH} />
              </Form.Item>
            )}
            {!isNative && (
              <>
                <Form.Item
                  validateTrigger={['onBlur', 'onChange']}
                  name={['definition', 'domain']}
                  label="域名"
                  rules={validateRules.domain}
                >
                  <Input placeholder="请输入域名" maxLength={MAX_VALUE_LENGTH} />
                </Form.Item>

                <Form.Item
                  name={['definition', 'path']}
                  label="路径"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={validateRules.path}
                >
                  <PathInput placeholder="请输入路径" maxLength={MAX_VALUE_LENGTH} />
                </Form.Item>
                <Form.Item label="查询条件">
                  <div className="query-input">
                    <QueryInput value={formValues.definition.query} />
                  </div>
                </Form.Item>
              </>
            )}
            <Form.Item label="数据">
              <div className="data-chart-wrap">{dataChart}</div>
            </Form.Item>
          </FormItemGroup>
          {/* <Form.Item>
            <div className="footer-submitter"> {Submitter}</div>
          </Form.Item> */}
        </BaseForm>
      </div>
    </div>
  );
};

export default React.forwardRef(PageViewEventForm);
