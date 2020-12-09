import { Segment } from '../types';
import { PickerProps } from '../picker/interfaces';

export interface PreparedSegment {
  id: string;
  name: string;
}

export interface UserPickerProps extends Pick<PickerProps, 'visible' | 'onVisibleChange' | 'loading' | 'emptyPrompt'> {
  /**
   * Prepared segments to be displayed
   */
  preparedSegments: PreparedSegment[];
  /**
   * Segments to be displayed
   */
  segments: Segment[];
  /**
   * Current user id for filtering segments in my tab
   */
  userId: string;
  /**
   * Callback when select a segement
   */
  onSelect?: (value: PreparedSegment | Segment, segments: (PreparedSegment | Segment)[]) => void;
  /**
   * Callback when click creating button
   */
  onCreateSegment: () => void;
}

export interface NodeGroup {
  id: string;
  name: string;
}
