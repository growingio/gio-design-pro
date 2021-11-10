import React from 'react';
import { render, screen } from '@testing-library/react';
import SegmentCard from '../SegmentCard';
import { preparedSegmentsCN } from '../constant';
import { segment } from './data';

const defaultChart = <div style={{ height: '100%', textAlign: 'center' }}>This is a Trend Chart.</div>;

describe('SegmentCard', () => {
  it('can render the prepared segment', () => {
    render(<SegmentCard {...preparedSegmentsCN[0]} chart={defaultChart} />);
    expect(screen.queryByText(preparedSegmentsCN[0].name)).toBeTruthy();
    expect(screen.queryByText(/Chart/)).toBeTruthy();
  });

  it('also can render a segment', () => {
    render(<SegmentCard {...segment} chart={defaultChart} />);
    expect(screen.queryByText(segment.name)).toBeTruthy();
    expect(screen.queryByText(/分群人数/)).toBeTruthy();
    expect(screen.queryByText(/分群占比/)).toBeTruthy();
    expect(screen.queryByText(/Chart/)).toBeTruthy();
    expect(screen.queryByText(/创建人/)).toBeTruthy();
    expect(screen.queryByText(/更新时间/)).toBeTruthy();
  });
});
