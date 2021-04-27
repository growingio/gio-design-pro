import { BaseProps } from '../../utils/interfaces';
import { EventData, EventPickerPreviewProps } from '../interfaces';

export interface PreviewProps extends Omit<EventPickerPreviewProps, 'dataSource'>, BaseProps {
  chart?: EventPickerPreviewProps['onShowEventChart'];
  eventData: EventData;
  dataSource?: EventData;
}
