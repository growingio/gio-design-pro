import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RangePanel from '../RangePanel';
import { TimeCalculationMode } from '../interfaces';

describe('RangePanel', () => {
  const handleOnSelect = jest.fn();

  // beforeAll(() => {
  //   // mock today is 2021-05-13 00:00:00
  //   Date.now = jest.fn(() => 1620835200000);
  // });

  it('can be change with input in since mode', () => {
    render(
      <RangePanel
        experimental
        value="since:1617811200000"
        onSelect={handleOnSelect}
        timeCalculationMode={TimeCalculationMode.Since}
      />
    );
    fireEvent.change(screen.getByDisplayValue('2021/04/08'), { target: { value: '2021/04/' } });
    fireEvent.change(screen.getByDisplayValue('2021/04/'), { target: { value: '2021/04/09' } });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('since:1617897600000');
  });

  it('can be change with calendar in since mode', () => {
    render(
      <RangePanel
        experimental
        value="since:1617811200000"
        onSelect={handleOnSelect}
        timeCalculationMode={TimeCalculationMode.Since}
      />
    );
    fireEvent.click(screen.getByText('至昨日'));
    // click 2021-4-9
    (document.querySelector("td[title='4月 9, 2021']").childNodes[0] as HTMLElement).click();
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('since:1617897600000,1');
  });

  it('renders dynamic mode as duration', () => {
    render(<RangePanel timeCalculationMode={TimeCalculationMode.Dynamic} onSelect={handleOnSelect} />);
    expect(screen.getByText(/结束日期/)).toBeDefined();
    expect(screen.getByText(/确 定/)).toBeDefined();
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:8,1');
    fireEvent.change(screen.getByDisplayValue('7'), { target: { value: '8' } });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenLastCalledWith('day:9,1');
  });

  it('renders dynamic mode as range', () => {
    render(<RangePanel timeCalculationMode={TimeCalculationMode.Dynamic} onSelect={handleOnSelect} />);
    fireEvent.click(screen.getByText(/结束日期/));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:8,1');
    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '2' } });
    fireEvent.change(screen.getByDisplayValue('8'), { target: { value: '9' } });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenLastCalledWith('day:9,2');
  });

  it('renders absolute mode', () => {
    render(<RangePanel timeCalculationMode={TimeCalculationMode.Absolute} onSelect={handleOnSelect} />);
    fireEvent.change(screen.getByPlaceholderText(/开始日期/), { target: { value: '2021/05/05' } });
    fireEvent.change(screen.getByPlaceholderText(/结束日期/), { target: { value: '2021/05/13' } });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('abs:1620144000000,1620921599999');
  });

  it('renders with default', () => {
    render(<RangePanel timeCalculationMode={TimeCalculationMode.Since} />);
    fireEvent.click(screen.getByTitle('上个月 (翻页上键)'));
    fireEvent.click(screen.getAllByText('9')[0]);
    expect(screen.getByText(/确 定/).closest('button')).toHaveAttribute('disabled');
  });
});
