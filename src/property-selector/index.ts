import _PropertyPicker from './PropertyPicker';
import _PropertyCard from './PropertyCard';
import PropertySelector from './PropertySelector';
// import './style/index';

export type { PropertySelectorProps, PropertyPickerProps, PropertyTypes } from './interfaces';

export { dimensionToPropertyItem } from './util';
export const PropertyCard = _PropertyCard;
export type TPropertyPicker = typeof _PropertyPicker & {
  PropertyCard: typeof PropertyCard;
};
const Picker = _PropertyPicker as TPropertyPicker;
Picker.PropertyCard = _PropertyCard;

export const PropertyPicker = Picker;

export default PropertySelector;
