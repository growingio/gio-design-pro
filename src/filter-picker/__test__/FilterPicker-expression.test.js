import React from 'react';
import { shallow } from 'enzyme';
import Expression from '../components/FilterList/Expression';

const exprs = [
  {
    op: '=',
    values: [],
    valueType: 'string',
    name: '',
    key: '',
  },
];

const filterItem = exprs[0];

const propertyOptions = [
  {
    id: 'd',
    name: '域名',
    groupId: 'normal',
    groupName: '常用维度',
    type: 'global',
    valueType: null,
    __typename: 'Dimension',
  },
];

const getExpression = () => <Expression propertyOptions={propertyOptions} exprs={exprs} filterItem={filterItem} />;

describe('expression test', () => {
  it('should match Expression snapshot.', () => {
    const wrapper = shallow(getExpression());
    expect(wrapper.render()).toMatchSnapshot();
  });
});
