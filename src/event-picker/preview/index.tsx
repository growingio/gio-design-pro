// import './index.less';
import React from 'react';
import { Loading, Card, usePrefixCls } from '@gio-design/components';
import { EventPickerPreviewProps } from '../interfaces';
import useAsync from '../../hooks/useAsync';
import AutoTrack from './AutoTrack';
// import Complex from './ComplexMetric';
import Custom from './Custom';
import './style';
import { isFunction } from 'lodash';
import classnames from 'classnames';

// todo: implement ComplexMetric component
const Complex = Custom;

const Preview: React.FC<EventPickerPreviewProps> = (props) => {
  const {
    dataSource,
    dataSource: { type },
    fetchDetailData = async (data) => data,
    onShowEventChart,
    previewCustomRender,
    style,
  } = props;
  const { loading, value: eventData = { id: '', name: '' } } = useAsync(async () => {
    const res = await fetchDetailData(dataSource);
    return res;
  }, [dataSource]);
  const prefixCls = usePrefixCls('event-previw');
  const cls = classnames(prefixCls, 'custom-render', 'event-preview-card');
  const previewProps = { eventData, chart: onShowEventChart, previewCustomRender, className: 'event-preview-card' };
  const children = () => {
    if (previewCustomRender && isFunction(previewCustomRender)) {
      return (
        <Card className={cls} clickable={false}>
          {previewCustomRender(eventData)}
        </Card>
      );
    }
    switch (type) {
      case 'prepared':
        return <Complex {...previewProps} />;
      case 'custom':
      case 'complex':
        return <Custom {...previewProps} />;
      case 'simple':
        return <AutoTrack {...previewProps} />;
      default:
        return <></>;
    }
  };

  return (
    <div
      role="document"
      className="event-preview"
      aria-hidden="true"
      style={{ ...style }}
      onClick={(e) => e.stopPropagation()}
    >
      <Loading size="small" title={false} loading={loading}>
        {children()}
      </Loading>
    </div>
  );
};

export default Preview;
