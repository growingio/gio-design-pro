import React from 'react';

import usePrefixCls from '@gio-design/components/es/utils/hooks/use-prefix-cls';

const PreviewChart: React.FC<{ chart: React.ReactNode }> = (props) => {
  const { chart } = props;
  const prefixCls = usePrefixCls('event-previw');
  return <div className={`${prefixCls}__chart`}>{chart}</div>;
};
export default PreviewChart;
