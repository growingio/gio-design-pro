import React from 'react';
import { shallow, mount } from 'enzyme';
import NumberAttrSelect from '../NumberAttrSelect.tsx';

describe('<NumberAttrSelect />', () => {
  it('should throw error', () => {
    expect(() => shallow(<NumberAttrSelect />)).toThrowError();
  });

  it('attrSelect = "="', () => {
    let wrapper = shallow(<NumberAttrSelect values={[]} attrSelect="=" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper = shallow(<NumberAttrSelect values={['10']} attrSelect="=" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('attrSelect = "between"', () => {
    let wrapper = shallow(<NumberAttrSelect values={[]} attrSelect="between" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper = shallow(<NumberAttrSelect values={['30']} attrSelect="between" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper = shallow(<NumberAttrSelect values={['-30', '40']} attrSelect="between" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('attrSelect = "hasValue"', () => {
    const wrapper = shallow(<NumberAttrSelect values={[]} attrSelect="hasValue" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('attrSelect = "noValue"', () => {
    const wrapper = shallow(<NumberAttrSelect values={[]} attrSelect="noValue" attrChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('default change', async () => {
    let value = '';
    const wrapper = mount(
      <NumberAttrSelect
        values={[10]}
        attrSelect="="
        attrChange={(val) => {
          value = val;
        }}
      />
    );
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: '2' } });
    expect(value[0]).toBe(2);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(value[0]).toBe('0');
  });

  it('between change', () => {
    let value = [];
    const wrapper = mount(
      <NumberAttrSelect
        values={[]}
        attrSelect="between"
        attrChange={(val) => {
          value = val;
        }}
      />
    );
    wrapper.find('input').at(0).simulate('focus');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '-2' } });
    expect(value[0]).toBe(-2);

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '' } });
    expect(value[0]).toBe('0');

    wrapper.find('input').at(1).simulate('focus');
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '20' } });
    expect(value[1]).toBe(20);
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '' } });
    expect(value[1]).toBe('0');
  });
});
