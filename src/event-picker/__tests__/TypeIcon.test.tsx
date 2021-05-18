import React from 'react';
import { render } from '@testing-library/react';
import TypeIcon from '../TypeIcon';

jest.useFakeTimers();

describe('<TypeIcon/> test', () => {
  it('render TypeIcon ', async () => {
    const { container: container1 } = render(<TypeIcon type="custom" size="small" />);
    expect(container1.querySelector('.gio-icon')).toBeTruthy();
    const { container: container2 } = render(<TypeIcon type="simple" size="small" />);
    expect(container2.querySelector('.gio-icon')).toBeTruthy();
    const { container: container3 } = render(<TypeIcon type="prepared" size="small" />);
    expect(container3.querySelector('.gio-icon')).toBeTruthy();
    const { container: container4 } = render(<TypeIcon type="complex" size="small" />);
    expect(container4.querySelector('.gio-icon')).toBeTruthy();
    // const { container: container5 } = render(<TypeIcon type="merged" size="small" />);
    // expect(container5.querySelector('.gio-icon')).toBeTruthy();
    const { container: container6 } = render(<TypeIcon type="other" size="small" />);
    expect(container6.querySelector('.gio-icon')).toBeNull();
  });
});
