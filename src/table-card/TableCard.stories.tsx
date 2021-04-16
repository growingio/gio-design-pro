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
  showDescription: boolean;
  showSearchBar: boolean;
  showButtons: boolean;
  showPagination: boolean;
  showTableSelection: boolean;
  showTabs: boolean;
}> = ({ showButtons, showPagination, showTitle, showTableSelection, showSearchBar, showDescription, showTabs }) => {
  const [selectedRowKeys1, setSelectedRowKeys1] = useState<string[]>([]);
  const [selectedRowKeys2, setSelectedRowKeys2] = useState<string[]>([]);

  const config = getTableCardConfig(selectedRowKeys1, setSelectedRowKeys1, selectedRowKeys2, setSelectedRowKeys2);

  if (!showTitle) {
    delete config.title;
  }

  if (!showDescription) {
    delete config.description;
  }

  if (!showSearchBar) {
    delete config.tabs[0].searchBar;
    delete config.tabs[1].searchBar;
  }
  if (!showButtons) {
    delete config.tabs[0].buttons;
    delete config.tabs[1].buttons;
  }
  if (!showPagination) {
    config.tabs[0].table.pagination = false;
    config.tabs[1].table.pagination = false;
  }
  if (!showTableSelection) {
    delete config.tabs[0].table.rowSelection;
    delete config.tabs[1].table.rowSelection;
  }

  return <TableCard {...config} showTabs={showTabs} />;
};

Default.args = {
  showTitle: true,
  showDescription: true,
  showSearchBar: true,
  showButtons: true,
  showPagination: true,
  showTableSelection: true,
  showTabs: true,
};

export { Default };
