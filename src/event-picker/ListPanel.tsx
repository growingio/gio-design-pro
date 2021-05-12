import { Button } from '@gio-design/components';
import React, { useRef } from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classNames from 'classnames';

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
  const wrapElemRef = useRef<HTMLDivElement | undefined>();
  React.useImperativeHandle(ref, () => wrapElemRef?.current);
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
                  确定
                </Button>
                <Button type="secondary" onClick={() => onCancel?.()}>
                  取消
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
