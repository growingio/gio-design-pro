import React from 'react';

import { Card } from '@gio-design/components';
import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';
import classnames from 'classnames';
import { isFunction } from 'lodash';
import PreviewChart from './Chart';
import { PreviewProps } from './PreviewProps';

const AutoTrack: React.FC<PreviewProps> = (props) => {
  const { eventData, className, chart, previewCustomRender } = props;
  const { name, instruction } = eventData;
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'auto-track', className);
  if (previewCustomRender && isFunction(previewCustomRender)) {
    return (
      <Card className={cls} clickable={false}>
        {previewCustomRender(eventData)}
      </Card>
    );
  }
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

export default AutoTrack;
