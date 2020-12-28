import React from 'react';
import { Button } from '@gio-design-new/components';
import './index.less';

interface FilterFooterProps {
  onSubmit: () => void;
  onCancel: () => void;
}

function FilterFooter(props: FilterFooterProps) {
  const { onCancel, onSubmit } = props;
  return (
    <div className="filter-contidion-footer">
      <Button type="secondary" onClick={onCancel} size="small">
        取消
      </Button>
      <div style={{ width: '12px' }} />
      <Button type="primary" onClick={onSubmit} size="small">
        确认
      </Button>
    </div>
  );
}
export default FilterFooter;
