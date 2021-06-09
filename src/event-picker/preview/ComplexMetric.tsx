import React from 'react';

import { Card } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import { PreviewProps } from './previewProps';

const ComplexMetric: React.FC<PreviewProps> = (props) => {
  const { eventData, className } = props;
  const { name } = eventData;
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'complex', className);

  return (
    <Card className={cls} clickable={false}>
      <Card.Meta title={name} />
    </Card>
  );
};

export default ComplexMetric;
