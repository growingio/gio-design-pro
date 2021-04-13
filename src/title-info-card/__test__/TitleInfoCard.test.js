import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterOutlined } from '@gio-design/icons';
import { Button } from '@gio-design/components';
import TitleInfoCard from '../TitleInfoCard';

describe('TitleInfoCard', () => {
  it('test title info card with children', () => {
    const args = {
      children: <p>这是一段内容</p>,
      titleIcon: <FilterOutlined />,
      centerWidth: 400,
      title: '北区项目组',
      description: '这是一段很长很长的描述，这是一段很长很长的描述',
      operationContent: <Button>操作</Button>,
      footerContent: '底部的一堆东西',
    };

    render(<TitleInfoCard {...args} />);
    expect(screen.queryByText('这是一段内容')).toBeTruthy();
  });

  it('test title info card without children', () => {
    const args = {
      titleIcon: true,
      title: '南区项目组',
    };

    render(<TitleInfoCard {...args} />);
    expect(screen.queryByText('南区项目组')).toBeTruthy();
  });
});
