import React from 'react';

import { Card } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import PreviewChart from './Chart';
import { PreviewProps } from './PreviewProps';

const Preset: React.FC<PreviewProps> = (props) => {
  const { eventData, chart, className, previewCustomRender } = props;
  const { name, instruction = '' } = eventData;
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'preset', className);
  return (
    <Card className={cls} clickable={false}>
      <Card.Meta title={name} />
      {instruction && <Card.Meta>{instruction as string}</Card.Meta>}
      {chart && (
        <Card.Meta>
          <PreviewChart chart={chart(eventData)} />
        </Card.Meta>
      )}
      {previewCustomRender?.(eventData)}
    </Card>
  );
};

export default Preset;
