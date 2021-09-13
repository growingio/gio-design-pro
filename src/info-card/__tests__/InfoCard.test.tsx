import { render } from '@testing-library/react';
import React from 'react';
import { Default, DefaultMeta } from '../InfoCard.stories';

describe('InfoCard', () => {
  it('renders default InfoCard', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('InfoCard')).toBeDefined();
  });

  it('renders meta', () => {
    const { getByText } = render(<DefaultMeta {...DefaultMeta.args} />);
    expect(getByText(/Meta Children/)).toBeDefined();
  });

  it('renders no colon', () => {
    const { container } = render(<DefaultMeta {...DefaultMeta.args} colon={false} />);
    expect(container.getElementsByClassName('gio-info-card-meta__label_no_colon')).toBeDefined();
  });
});
