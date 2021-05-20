import React from 'react';
import { render } from '@testing-library/react';
import PickerContent from '../PickerContent';
import { withSelectKey } from '../helper';
import { events } from './data';
import { EventData } from '../interfaces';

const customEvents = withSelectKey((events.filter((e) => e.type === 'custom').slice(0, 15) as unknown) as EventData[]);
describe('<PickerContent/> test', () => {
  it('render PickerContent', async () => {
    const { container } = render(<PickerContent dataSource={customEvents} tabKey="event" />);

    expect(container.querySelector('.gio-event-picker-list-panel')).toBeTruthy();
  });
});
