import { Segment } from '../types';

export interface PreparedSegment {
  id: string;
  name: string;
}

export interface UserPickerProps {
  preparedSegments: PreparedSegment[];
  segments: Segment[];
  userId: string;
  loading?: boolean;
  mode?: 'single' | 'multiple';
  onSelect?: (value: PreparedSegment | Segment, segments: (PreparedSegment | Segment)[]) => void;
  onCreateSegment: () => void;
}

export interface OptionGroup {
  key: string;
  label: string;
}
