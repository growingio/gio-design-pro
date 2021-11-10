import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import Button from '@gio-design/components/es/components/button';
import { InnerRangePanelProps } from './interfaces';
import defaultLocale from './locales/zh-CN';

function InnerRangePanel({ disableOK, header, body, onOK, onCancel }: InnerRangePanelProps) {
  const prefixCls = usePrefixCls('range-panel');
  const cls = classnames(prefixCls);

  const locale = useLocale('PastTimePicker');

  const { okText, closeText } = {
    ...defaultLocale,
    ...locale,
  } as any;

  return (
    <div className={cls}>
      <div className={`${prefixCls}__header`}>{header}</div>
      <div className={`${prefixCls}__divider`} />
      <div className={`${prefixCls}__body`}>{body}</div>
      <div className={`${prefixCls}__footer`}>
        <Button onClick={onCancel} type="secondary" size="middle">
          {closeText}
        </Button>
        <Button disabled={disableOK} onClick={onOK} size="middle">
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default InnerRangePanel;
