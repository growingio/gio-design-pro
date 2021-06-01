import React from 'react';

import {
  MetricsPresetOutlined,
  MetricsCustomOutlined,
  CodelessTrackingOutlined,
  EventsPresetOutlined,
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
      // return <Icon id={Preset} title='埋点事件' {...others} />;
      return <EventsPresetOutlined {...others} />;
    case 'simple':
      // return <Icon id={Codeless} title="无埋点事件" {...others} />;
      return <CodelessTrackingOutlined {...others} />;
    case 'prepared':
      // return <Icon id={MetricsPreset} title="预置计算指标" {...others} />;
      return <MetricsPresetOutlined {...others} />;
    case 'complex':
      // return <Icon id={MetricsCustom} title="自定义计算指标" {...others} />;
      return <MetricsCustomOutlined {...others} />;
    default:
      return <EventsPresetOutlined {...others} />;
  }
};

export default TypeIcon;
