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
  onSelect,
}: UserSelectorProps) {
  const [input, setInput] = React.useState<string>('');
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);

  function handleSelect(id: string, segment: Resource) {
    setInput(segment.name);
    setDropdownVisible(false);
    onSelect?.(id, segment);
  }

  const dropdown = () => (
    <UserPicker segments={segments} userId={userId} onCreateSegment={onCreateSegment} onSelect={handleSelect} />
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
    />
  );
}

export default UserSelector;
