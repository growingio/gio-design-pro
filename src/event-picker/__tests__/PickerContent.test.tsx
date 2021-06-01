import React from 'react';
import { render } from '@testing-library/react';
import PickerContent from '../PickerContent';
import { withSelectKey, getGroupKey, getGroupName } from '../helper';
import { events } from './data';
import { EventData } from '../interfaces';
import TypeIcon from '../TypeIcon';

const customEvents = withSelectKey((events.filter((e) => e.type === 'custom').slice(0, 15) as unknown) as EventData[]);
describe('<PickerContent/> test', () => {
  it('render PickerContent', async () => {
    const getTypeIcon = (type: string) => <TypeIcon size="14px" className="item-content-icon" type={type || ''} />;
    const { container } = render(
      <PickerContent
        dataSource={customEvents}
        getTypeIcon={getTypeIcon}
        getGroupKey={getGroupKey}
        getGroupName={getGroupName}
        tabKey="event"
      />
    );

    expect(container.querySelector('.gio-event-picker-list-panel')).toBeTruthy();
  });
});
