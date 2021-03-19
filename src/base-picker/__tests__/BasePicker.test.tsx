import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasePicker from '..';
import { ITEMS_COUNT, renderItems, tabNavItems, footer } from './data';

describe('BasePicker', () => {
  it('renders items with function', () => {
    render(<BasePicker items={undefined} renderItems={renderItems} />);
    expect(screen.getAllByText(/Content/)).toHaveLength(ITEMS_COUNT);
  });

  it('renders items with props', () => {
    render(<BasePicker items={undefined} />);
    expect(screen.getAllByText(/Content/)).toHaveLength(ITEMS_COUNT);
  });

  it('renders items with search bar', () => {
    const placeholder = 'search item';
    const handleOnSearch = jest.fn();
    render(<BasePicker renderItems={renderItems} searchBar={{ placeholder, onSearch: handleOnSearch }} />);
    expect(screen.queryByPlaceholderText(placeholder)).toBeTruthy();
    const searchBar = screen.getByPlaceholderText(placeholder);
    const query = 'custom query';
    fireEvent.change(searchBar, { target: { value: query } });
    expect(handleOnSearch).toHaveBeenCalledTimes(1);
    expect(handleOnSearch).toHaveBeenCalledWith(query);

    const longQuery = 'q'.repeat(201);
    fireEvent.change(searchBar, { target: { value: longQuery } });
    expect(handleOnSearch).toHaveBeenCalledTimes(2);
    expect(handleOnSearch).toHaveBeenLastCalledWith(longQuery.slice(0, 200));
    expect(screen.queryByText(/200/)).toBeTruthy();
  });

  it('renders items with tab nav', () => {
    const handleOnTabNavChange = jest.fn();
    render(<BasePicker renderItems={renderItems} tabNav={{ items: tabNavItems, onChange: handleOnTabNavChange }} />);
    expect(screen.queryAllByText(/Option/)).toHaveLength(2);
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleOnTabNavChange).toHaveBeenCalledTimes(1);
    expect(handleOnTabNavChange).toHaveBeenCalledWith('option-2');
  });

  it('renders items with footer', () => {
    render(<BasePicker renderItems={renderItems} footer={footer} />);
    expect(screen.queryByText('New Content')).toBeTruthy();
  });

  it('renders detail', () => {
    const renderDetail = jest.fn();
    render(<BasePicker renderItems={renderItems} detailVisible renderDetail={renderDetail} />);
    expect(renderDetail).toHaveBeenCalledTimes(1);
  });
});
