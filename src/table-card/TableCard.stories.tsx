import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableCard } from './index';
import { getTableCardConfig } from './__tests__/utils';
import './style';
import './style/demo.stories.less';

export default {
  title: 'Business Components/TableCard',
  component: TableCard,
};

const Default: Story<{
  showTitle: boolean;
  showSearchBar: boolean;
  showButtons: boolean;
  showPagination: boolean;
  showTableSelection: boolean;
}> = (args) => {
  const [selectedRowKeys1, setSelectedRowKeys1] = useState<string[]>([]);
  const [selectedRowKeys2, setSelectedRowKeys2] = useState<string[]>([]);

  const config = getTableCardConfig(selectedRowKeys1, setSelectedRowKeys1, selectedRowKeys2, setSelectedRowKeys2);

  if (!args.showTitle) {
    delete config.title;
  }
  if (!args.showSearchBar) {
    delete config.tabs[0].searchBar;
    delete config.tabs[1].searchBar;
  }
  if (!args.showButtons) {
    delete config.tabs[0].buttons;
    delete config.tabs[1].buttons;
  }
  if (!args.showPagination) {
    config.tabs[0].table.pagination = false;
    config.tabs[1].table.pagination = false;
  }
  if (!args.showTableSelection) {
    delete config.tabs[0].table.rowSelection;
    delete config.tabs[1].table.rowSelection;
  }

  return <TableCard {...config} />;
};

Default.args = {
  showTitle: true,
  showSearchBar: true,
  showButtons: true,
  showPagination: true,
  showTableSelection: true,
};

export { Default };
