import React from 'react';

import {
  MetricsPresetOutlined,
  MetricsCustomOutlined,
  CodelessTrackingOutlined,
  EventsPresetOutlined,
  EventsTrackingOutlined,
} from '@gio-design/icons';
import { BaseProps } from '../utils/interfaces';

export type Types =
  | 'custom' // 埋点事件
  | 'simple' // 无埋点事件
  | 'prepared' // 预置计算指标
  | 'complex' // 自定义计算指标
  | 'merged'; // 合成事件

interface Props extends BaseProps {
  type: string;
  size?: string;
}

const TypeIcon: React.FC<Props> = (props) => {
  const { type, ...others } = props;
  switch (type) {
    case 'custom':
    case 'virtual':
      return <EventsTrackingOutlined {...others} />;
    case 'prepared':
      return <EventsPresetOutlined {...others} />;
    case 'simple':
      return <CodelessTrackingOutlined {...others} />;
    case 'preparedComplex':
      return <MetricsPresetOutlined {...others} />;
    case 'complex':
      return <MetricsCustomOutlined {...others} />;
    default:
      return <EventsTrackingOutlined {...others} />;
  }
};

export default TypeIcon;
