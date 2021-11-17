import { Button } from '@gio-design/components';
import React, { useRef } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classNames from 'classnames';
import { Locale, useLocale } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';
import localeEn from './locales/en-US';

interface ListPanelProps {
  // dataSource: EventData[];
  // keyword?: string;
  multiple?: boolean;
  onOK?: () => void;
  onCancel?: () => void;
  footer?: React.ReactNode;
  // onSelect: (values: EventData[]) => void;
}
const _ListPanel: React.ForwardRefRenderFunction<unknown, React.PropsWithChildren<ListPanelProps>> = (props, ref) => {
  const { children, multiple, onCancel, onOK, footer } = props;
  const clsPrefix = usePrefixCls('event-picker');
  const cls = `${clsPrefix}-list-panel`;
  const wrapElemRef = useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => wrapElemRef?.current);
  const language = localStorage.getItem('locale');
  const locale = useLocale('EventPicker');
  const mergedLocale = locale || language.indexOf('en') > -1 ? localeEn : ({} as Locale);

  const { cancelText, okText } = { ...defaultLocale, ...mergedLocale } as any;
  return (
    <>
      <div className={cls} ref={wrapElemRef}>
        <div className={classNames([`${cls}__body`, multiple ? 'multi-select' : '', footer ? 'with-footer' : ''])}>
          {children}
        </div>

        <div className={`${cls}__footer`}>
          <div className={`${cls}__footer-content`}>
            {multiple && (
              <div className="multiple">
                <Button
                  onClick={() => {
                    onOK?.();
                  }}
                >
                  {okText}
                </Button>
                <Button type="secondary" onClick={() => onCancel?.()}>
                  {cancelText}
                </Button>
              </div>
            )}
            {footer && <div className="bottom">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
};
const ListPanel = React.forwardRef(_ListPanel);
export default ListPanel;
