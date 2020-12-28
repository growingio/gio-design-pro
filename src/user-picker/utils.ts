import { NodeData } from '@gio-design-new/components/es/components/cascader/menu-item';
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
