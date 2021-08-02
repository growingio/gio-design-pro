import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Shortcut, Since, Dynamic, Absolute, Experiment } from '../PastTimePicker.stories';
import PastTimePicker from '../PastTimePicker';

describe('PastTimePicker', () => {
  const handleOnSelect = jest.fn();

  // beforeAll(() => {
  //   // mock today is 2021-05-13 00:00:00
  //   Date.now = jest.fn(() => 1620835200000);
  // });

  it('renders shortcut mode', () => {
    render(<Shortcut {...Shortcut.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByText(/过去 \d+ 天/)).toHaveLength(6);

    fireEvent.click(screen.getByText(/过去 14 天/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:15,1');
  });

  it('renders shortcut mode and with shortcutFilter', () => {
    render(<PastTimePicker shortcutFilter={(s) => s.value !== 'day:1,0'} timeRange="day:8,1" />);
    fireEvent.click(screen.getByText('常用时间'));
    expect(() => screen.getByText('今日')).toThrow('Unable to find an element');
  });

  it('renders since mode', () => {
    render(<Since {...Since.args} timeRange="since:1618329600000" onSelect={handleOnSelect} />);
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('since:1618329600000');
  });

  it('renders dynamic mode', () => {
    render(<Dynamic {...Dynamic.args} onSelect={handleOnSelect} />);
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:9,1');
  });

  it('renders absolute mode', () => {
    render(<Absolute timeRange="abs:1618329600000,1621007999999" onSelect={handleOnSelect} />);
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('abs:1618329600000,1621007999999');
  });

  it('renders with experimental features', () => {
    render(<Experiment {...Experiment.args} />);
    expect(screen.getAllByText(/小时/)).toHaveLength(3);
    fireEvent.click(screen.getByText('自某天以后'));
    expect(screen.getByText('至昨日')).toBeDefined();
  });

  it('can switch mode', () => {
    render(<PastTimePicker />);
    fireEvent.click(screen.getByText('过去动态时段'));
    expect(screen.getByText(/结束日期/)).toBeDefined();
  });

  it('has default mode', () => {
    render(<PastTimePicker timeRange="hour:2,1" />);
    expect(screen.getAllByText(/过去 \d+ 天/)).toHaveLength(6);
  });
});
