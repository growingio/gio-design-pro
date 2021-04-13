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
      render(
        <div data-testid="t_PropertyCard_warp">
          <PropertyCard nodeData={nodeData} fetchData={fetchData} />
        </div>
      );

      jest.runAllTimers();
    });
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('t_PropertyCard_warp')).toMatchSnapshot();
    // expect(screen.queryByTestId('value_type_meta')).toBeInTheDocument();
    // expect(screen.queryByText('usr_sex002')).toBeTruthy();
  });

  it('valueType is null will not render valueType card meta', async () => {
    const data = {
      groupId: 'user',
      groupName: '用户属性',
      key: 'usr_sex002_key',
      id: 'usr_sex002',
      name: 'sex002 用户属性',
      // type: 'usr',
      // valueType: 'string',
      description: '性名称用户属性性名称用户属性',
    };
    const fetchData = jest.fn(async (node) => node);
    await act(async () => {
      render(
        <div data-testid="t_PropertyCard_wrap_2">
          <PropertyCard nodeData={data} fetchData={fetchData} />
        </div>
      );

      jest.runAllTimers();
    });
    expect(screen.queryByText('usr_sex002_key')).toBeTruthy();
    expect(screen.getByTestId('t_PropertyCard_wrap_2').querySelector('gio-property-picker-card__footer')).toBeNull();
    expect(screen.getByTestId('t_PropertyCard_wrap_2')).toMatchSnapshot();
  });
  it('will render special valueType ', async () => {
    const datas = [
      {
        groupId: 'user',
        groupName: '用户属性',
        id: 'usr_1',
        key: 'usr_1',
        name: ' 用户属性1',
        valueType: 'string',
      },
      {
        groupId: 'user',
        groupName: '用户属性',
        id: '2',
        key: 'usr_2',
        name: ' 用户属性2',
        valueType: 'int',
      },
      {
        groupId: 'user',
        groupName: '用户属性',
        id: '3',
        key: 'usr_3',
        name: ' 用户属性3',
        valueType: 'double',
      },
      {
        groupId: 'user',
        groupName: '用户属性',
        id: '4',
        key: 'usr_4',
        name: ' 用户属性4',
        valueType: 'date',
      },
      {
        groupId: 'user',
        groupName: '用户属性',
        id: '5',
        key: 'usr_5',
        name: ' 用户属性5',
        valueType: 'boolean',
      },
      {
        groupId: 'user',
        groupName: '用户属性',
        id: '6',
        key: 'usr_5',
        name: ' 用户属性5',
        valueType: 'List',
      },
    ];
    const fetchData = jest.fn(async (node) => node);
    await act(async () => {
      render(
        <div data-testid="valuetype_list">
          {datas.map((data, i) => (
            <div data-testid={`wrap_${i}`}>
              <PropertyCard nodeData={data} fetchData={fetchData} />
            </div>
          ))}
        </div>
      );

      jest.runAllTimers();
    });

    expect(screen.getByTestId('valuetype_list')).toMatchSnapshot();
  });
});
