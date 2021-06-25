import React from 'react';
import { Button } from '@gio-design/components';
import { CloseOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { BatchActionProps } from './interfaces';

const BatchActions: React.FC<BatchActionProps> = ({ onClose, count = 0, children }) => {
  const prefixCls = usePrefixCls('panel__batch-actions');
  return (
    <div className={prefixCls}>
      <span className={`${prefixCls}__text`}>{`已经选择 ${count} 项`}</span>
      <Button size="small" type="text" icon={<CloseOutlined />} onClick={onClose} />
      <span className={`${prefixCls}__divider`} />
      <span className={`${prefixCls}__children`}>{children}</span>
    </div>
  );
};

export default BatchActions;
