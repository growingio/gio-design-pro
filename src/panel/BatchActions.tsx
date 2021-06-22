import React from 'react';
import { CloseOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { BatchActionProps } from './interfaces';

import './style/batchActions.less';

const BatchActions: React.FC<BatchActionProps> = ({ onClose, count = 0, children }) => {
  const prefixCls = usePrefixCls('panel__batch-actions');
  return (
    <div className={prefixCls}>
      <span className={`${prefixCls}__text`}>{`已经选择 ${count} 项`}</span>
      <CloseOutlined className={`${prefixCls}__close`} onClick={onClose} />
      <span className={`${prefixCls}__divider`} />
      <span className={`${prefixCls}__children`}>{children}</span>
    </div>
  );
};

export default BatchActions;
