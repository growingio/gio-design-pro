import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input } from '@gio-design-new/components';
import Docs from './useLocalStorage.mdx';
import useLocalStorage from './useLocalStorage';

export default {
  title: 'Docs/Hooks/useLocalStorage',
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

interface AppProps {
  /**
   * The default value for input
   */
  defaultValue: string;
}

function App({ defaultValue }: AppProps) {
  const [value, setValue] = useLocalStorage('value', defaultValue);
  return <Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
}

const Template: Story<AppProps> = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultValue: '',
};
