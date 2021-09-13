import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Table } from '@gio-design/components';
import Docs from './InfoCard.mdx';
import InfoCard, { InfoCardProps, InfoCardMeta, InfoCardMetaProps } from './index';
import './style';

export default {
  title: 'Business Components/InfoCard',
  component: InfoCard,
  subcomponents: { InfoCardMeta },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DefaultTemplate: Story<InfoCardProps> = (args) => (
  <InfoCard {...args} extra={<Button>Button</Button>}>
    <InfoCard.Meta label="Name" value="gio-design" />
    <Table />
    <InfoCard.Meta label="Name" value="gio-design" />
    <InfoCard.Meta label="Name" value="gio-design" />
    <InfoCard.Meta label="Name" value="gio-design" />
  </InfoCard>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: 'InfoCard',
};

const MetaTemplate: Story<InfoCardMetaProps> = (args) => <InfoCard.Meta {...args}>Meta Children</InfoCard.Meta>;
export const DefaultMeta = MetaTemplate.bind({});
DefaultMeta.args = {
  label: 'Label',
};
