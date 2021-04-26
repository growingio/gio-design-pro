import React from 'react';

import { Card } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import PreviewChart from './Chart';
import { PreviewProps } from './PreviewProps';

const Preset: React.FC<PreviewProps> = (props) => {
  const {
    eventData: { name, instruction },
    chart,
  } = props;

  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'preset');
  return (
    <Card className={cls} clickable={false}>
      <Card.Meta title={name} />
      {instruction && <Card.Meta>{instruction as string}</Card.Meta>}
      {chart && (
        <Card.Meta>
          <PreviewChart chart={chart} />
        </Card.Meta>
      )}
    </Card>
  );
};

export default Preset;
