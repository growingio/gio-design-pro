import React from 'react';
import { Button } from '@gio-design-new/components';
import './index.less';

interface FilterFooterProps {
  submit: () => void;
  cancel: () => void;
}

function FilterFooter(props: FilterFooterProps) {
  const { cancel, submit } = props;
  return (
    <div className="filter-contidion-footer">
      <Button type="secondary" onClick={cancel} size="small">
        取消
      </Button>
      <Button type="primary" onClick={submit} size="small">
        确认
      </Button>
    </div>
  );
}
export default FilterFooter;
