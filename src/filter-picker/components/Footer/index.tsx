import React from 'react';
import { Button } from '@gio-design/components/es';
import './index.less';
import en from '../../locals/en-US';
import cn from '../../locals/zh-CN';

interface FilterFooterProps {
  onSubmit: () => void;
  onCancel: () => void;
  comfirmStatus?: boolean;
}

function FilterFooter(props: FilterFooterProps) {
  const { onCancel, onSubmit, comfirmStatus = false } = props;
  return (
    <div className="filter-contidion-footer">
      <Button type="secondary" onClick={onCancel} size="small">
        {window.localStorage.getItem('locale') === 'en-US' ? en.cancel : cn.cancel}
      </Button>
      <div style={{ width: '12px' }} />
      <Button type="primary" onClick={onSubmit} size="small" disabled={comfirmStatus}>
        {window.localStorage.getItem('locale') === 'en-US' ? en.submit : cn.submit}
      </Button>
    </div>
  );
}
export default FilterFooter;
