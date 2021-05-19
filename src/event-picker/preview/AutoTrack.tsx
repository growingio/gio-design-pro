import React from 'react';

import { Card } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import PreviewChart from './Chart';
import { PreviewProps } from './previewProps';

const AutoTrack: React.FC<PreviewProps> = (props) => {
  const { eventData, className, chart } = props;
  const { name, instruction } = eventData;
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'auto-track', className);

  return (
    <Card className={cls} clickable={false}>
      <Card.Meta title={name} />
      {instruction && <Card.Meta>{instruction as string}</Card.Meta>}
      {chart && (
        <Card.Meta>
          <PreviewChart chart={chart(eventData)} />
        </Card.Meta>
      )}
    </Card>
  );
};

export default AutoTrack;
