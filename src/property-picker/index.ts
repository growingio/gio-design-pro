import PropertyPicker from './PropertyPicker';
import PropertyDetail from './PropertyDetail';

export { PropertyPickerProps, PropertyTypes } from './interfaces';
export { dimensionToPropertyItem } from './util';
export { PropertyDetail };
export type TPropertyPicker = typeof PropertyPicker & {
  DetailPanel: typeof PropertyDetail;
};
const Picker = PropertyPicker as TPropertyPicker;
Picker.DetailPanel = PropertyDetail;
export default Picker;
