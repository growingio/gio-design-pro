import React from 'react';
import { render } from '@testing-library/react';
import PropertyValueIconRender from '../PropertyValueIconRender';

const groupList: string[] = [
  'cs',
  'ads',
  'page',
  'event',
  'item',
  'app',
  'people',
  'visitor',
  'element',
  'conversion',
  'user',
  'tag',
  'geo',
  'device',
  'origin',
];
describe('PropertyValueIconRender', () => {
  it('can render the icon by groupid', async () => {
    const { container } = render(
      <>
        {groupList.map((g: string) => (
          <PropertyValueIconRender key={`idx-${g}`} group={g} />
        ))}
      </>
    );
    expect(container).toMatchSnapshot();
  });
  it('will be render empty when group id is not in case', async () => {
    const { container } = render(<PropertyValueIconRender group="not exist group id" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
