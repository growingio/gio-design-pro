// import './index.less';
import React from 'react';
import { Loading } from '@gio-design/components';
import { EventPickerPreviewProps } from '../interfaces';
import useAsync from '../../hooks/useAsync';
import AutoTrack from './AutoTrack';
// import Complex from './ComplexMetric';
import Custom from './Custom';
// todo: implement ComplexMetric component
const Complex = Custom;

const Preview: React.FC<EventPickerPreviewProps> = (props) => {
  const {
    dataSource,
    dataSource: { type },
    fetchData = async (data) => data,
    chart,
  } = props;
  const { loading, value: eventData = { id: '', name: '' } } = useAsync(async () => {
    const res = await fetchData(dataSource);
    return res;
  }, [dataSource]);
  const previewProps = { eventData, chart };
  const children = () => {
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
    <div className="event-target-preview">
      <Loading size="small" title={false} loading={loading}>
        {children()}
      </Loading>
    </div>
  );
};

export default Preview;
