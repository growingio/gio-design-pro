import React from 'react';

import InnerPanel from './Panel';
import Table from './Table';
import TabPanel from './TabPanel';
import ToolBar from './ToolBar';
import BatchActions from './BatchActions';

import { PanelProps } from './interfaces';

interface CompoundedComponent extends React.ForwardRefExoticComponent<PanelProps & React.RefAttributes<HTMLElement>> {
  Table: typeof Table;
  TabPanel: typeof TabPanel;
  ToolBar: typeof ToolBar;
  BatchActions: typeof BatchActions;
}

const Panel = InnerPanel as CompoundedComponent;

Panel.BatchActions = BatchActions;
Panel.Table = Table;
Panel.ToolBar = ToolBar;
Panel.TabPanel = TabPanel;

export { PanelProps };
export { Table, TabPanel, ToolBar, BatchActions };
export default Panel;
