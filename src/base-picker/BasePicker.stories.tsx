import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import BasePicker from '.';
import { renderItems, renderGroups, footer, tabNavItems } from './__tests__/data';

import './style';

export default {
  title: 'Business Components/BasePicker',
  component: BasePicker,
} as Meta;

export const demos = () => (
  <>
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      <BasePicker />
      <BasePicker renderItems={renderItems} style={{ marginTop: 10 }} />
      <BasePicker style={{ marginTop: 10 }} renderItems={renderGroups} />
      <BasePicker
        style={{ marginTop: 10 }}
        tabNav={{
          items: tabNavItems,
        }}
        renderItems={renderGroups}
      />
    </div>
    <div style={{ display: 'inline-block', width: '50%' }}>
      <BasePicker searchBar={{ onSearch: () => {} }} renderItems={renderGroups} />
      <BasePicker
        style={{ marginTop: 10 }}
        searchBar={{ onSearch: () => {} }}
        tabNav={{
          items: tabNavItems,
        }}
        renderItems={renderGroups}
      />
      <BasePicker
        style={{ marginTop: 10 }}
        searchBar={{ onSearch: () => {} }}
        renderItems={renderGroups}
        footer={footer}
      />
    </div>
  </>
);
