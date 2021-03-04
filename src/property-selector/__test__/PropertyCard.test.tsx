import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PropertyCard from '../PropertyCard';

const nodeData = {
  groupId: 'user',
  groupName: '用户属性',
  id: 'usr_sex002',
  name: 'sex002 用户属性',
  type: 'usr',
  valueType: 'string',
  description: '性名称用户属性性名称用户属性',
};
jest.useFakeTimers();

describe('PropertyCard', () => {
  it('can render the string valueType', async () => {
    const fetchData = jest.fn(async (node) => node);
    await act(async () => {
      render(<PropertyCard nodeData={nodeData} fetchData={fetchData} />);

      jest.runAllTimers();
    });
    expect(fetchData).toHaveBeenCalledTimes(1);
    // screen.debug(document);
    expect(screen.queryByText('字符串类型')).toBeTruthy();
    expect(screen.queryByText('usr_sex002')).toBeTruthy();
  });
});
