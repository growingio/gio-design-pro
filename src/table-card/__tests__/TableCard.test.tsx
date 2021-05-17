import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableCard from '../TableCard';
import { getTableCardConfig, ExampleData } from './utils';

describe('<TableCard/> test', () => {
  const getTableCard = (args?: any) => <TableCard<ExampleData> {...getTableCardConfig()} {...args} />;

  it('should be stable', () => {
    const { asFragment } = render(getTableCard());
    expect(asFragment()).toMatchSnapshot();
  });

  test('title and description props', () => {
    const { getByText, rerender, container } = render(getTableCard({ title: 'Title', description: 'Description' }));
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    rerender(getTableCard({ title: undefined, description: undefined }));
    expect(container.getElementsByClassName('gio-table-card-title')).toBeTruthy();
    expect(container.getElementsByClassName('gio-table-card-description')).toBeTruthy();
  });

  test('tab and tab.name props', () => {
    const { getAllByTestId } = render(getTableCard());
    expect(getAllByTestId('tabnav-item').map((node) => node.textContent)).toEqual(
      getTableCardConfig().tabs.map((tab) => tab.name)
    );
    fireEvent.click(getAllByTestId('tabnav-item')[1]);
    expect(getAllByTestId('tabnav-item')[1].className.includes('active')).toBe(true);
  });

  test('tab searchBar prop', async () => {
    const { getByPlaceholderText } = render(getTableCard());
    const input = getByPlaceholderText(getTableCardConfig().tabs[0]!.searchBar!.placeholder!);
    expect(input).toBeTruthy();
  });

  test('tab buttons and batchButton prop', async () => {
    const { queryAllByText, rerender } = render(getTableCard());
    expect(queryAllByText('次要按钮').length > 0).toBeTruthy();
    expect(queryAllByText('批量操作')).toHaveLength(0);
    rerender(getTableCard({ ...getTableCardConfig(['1']) }));
    expect(queryAllByText('次要按钮')).toHaveLength(0);
    expect(queryAllByText('批量删除').length > 0).toBeTruthy();
  });

  it("should't display when batchButton not set", () => {
    const config = { ...getTableCardConfig(['1']), ...{ title: undefined } };
    const { container, rerender } = render(getTableCard(config));
    expect(container.getElementsByClassName('gio-table-card-select-divider')).toHaveLength(1);
    delete config.tabs[0].batchButtons;
    rerender(getTableCard(config));
    expect(container.getElementsByClassName('gio-table-card-select-divider')).toHaveLength(0);
  });

  it('should recive empty array', () => {
    const onChange = jest.fn();
    const config = getTableCardConfig(['1']);
    config.tabs[0].table!.rowSelection!.onChange = onChange;
    const { container } = render(getTableCard(config));
    fireEvent.click(container.getElementsByClassName('gio-table-card-select-close')[0]);
    expect(onChange).toBeCalledWith([], []);
  });

  test('divider display logic', () => {
    const { container, rerender } = render(getTableCard(getTableCardConfig(['1'])));
    expect(container.getElementsByClassName('gio-table-card-divider')).toHaveLength(2);
    rerender(getTableCard({ ...getTableCardConfig(['1']), title: undefined, showTabs: false }));
    expect(container.getElementsByClassName('gio-table-card-divider')).toHaveLength(0);
  });

  test('otherTabs prop', () => {
    const { getAllByTestId } = render(getTableCard({ otherTabs: [{ name: 'other', content: 'content' }] }));
    fireEvent.click(getAllByTestId('tabnav-item')[2]);
    expect(getAllByTestId('tabnav-item')[2].textContent.includes('other')).toBe(true);
  });
});
