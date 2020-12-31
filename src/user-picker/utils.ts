import { NodeData } from '@gio-design/components/es/components/cascader/interface';
import { Segment } from '../types';
import { PreparedSegment, NodeGroup } from './interfaces';

export function segmentToNode(seg: PreparedSegment | Segment, group?: NodeGroup): NodeData {
  if (!group) {
    return {
      id: seg.id,
      value: seg.id,
      label: seg.name,
    };
  }
  return {
    id: seg.id,
    value: `${group.id}-${seg.id}`,
    label: seg.name,
    groupId: group.id,
    groupName: group.name,
  };
}

export default {
  segmentToNode,
};
