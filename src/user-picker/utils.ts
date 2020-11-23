import { Option } from '@gio-design/components/es/components/list/interface';
import { Segment } from '../types';
import { OptionGroup, PreparedSegment } from './interfaces';

export function segmentToOption(seg: PreparedSegment | Segment, group?: OptionGroup): Option {
  if (!group) {
    return {
      value: seg.id,
      label: seg.name,
    };
  }
  return {
    value: seg.id,
    label: seg.name,
    groupLabel: group.label,
    groupValue: group.key,
  };
}

export default {
  segmentToOption,
};
