import { Button } from '@gio-design/components';
import React from 'react';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classNames from 'classnames';

interface ListPanelProps {
  // dataSource: EventData[];
  // keyword?: string;
  multiple?: boolean;
  onOK?: () => void;
  onCancel?: () => void;
  // onSelect: (values: EventData[]) => void;
}
const ListPanel: React.FC<ListPanelProps> = (props) => {
  const { children, multiple, onCancel, onOK } = props;
  const clsPrefix = usePrefixCls('event-picker');
  const cls = `${clsPrefix}-list-panel`;
  return (
    <>
      <div className={cls}>
        <div className={classNames([`${cls}__body`, multiple ? 'multi-select' : ''])}>{children}</div>
        {multiple && (
          <div className={`${cls}__footer`}>
            <div className={`${cls}__footer-content`}>
              <Button type="secondary" onClick={() => onCancel?.()}>
                取消
              </Button>
              <Button
                onClick={() => {
                  onOK?.();
                }}
              >
                确定
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ListPanel;
