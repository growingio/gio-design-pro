import React from 'react';
import Selector from '../selector';
import UserPicker from '../user-picker';
import { UserSelectorProps } from './interfaces';
import { Resource } from '../utils/interfaces';

function UserSelector({
  borderless,
  disabled = false,
  placeholder,
  segments,
  userId,
  onCreateSegment,
  onShowSegmentChart,
  onSelect,
  size,
  style,
  showSegmentCard,
  className,
}: UserSelectorProps) {
  const [input, setInput] = React.useState<string>('');
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);

  function handleSelect(id: string, segment: Resource) {
    setInput(segment.name);
    setDropdownVisible(false);
    onSelect?.(id, segment);
  }

  const dropdown = () => (
    <UserPicker
      updatingRecentDelay={100}
      segments={segments}
      userId={userId}
      onCreateSegment={onCreateSegment}
      onShowSegmentChart={onShowSegmentChart}
      onSelect={handleSelect}
      showSegmentCard={showSegmentCard}
    />
  );

  return (
    <Selector
      borderless={borderless}
      disabled={disabled}
      placeholder={placeholder}
      dropdownVisible={dropdownVisible}
      dropdownRender={dropdown}
      onDropdownVisibleChange={setDropdownVisible}
      valueRender={() => input}
      className={className}
      size={size}
      style={style}
    />
  );
}

export default UserSelector;
