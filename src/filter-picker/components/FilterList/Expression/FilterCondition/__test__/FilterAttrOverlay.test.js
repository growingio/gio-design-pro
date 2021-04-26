import React from 'react';
import { mount } from 'enzyme';
import FilterAttrOverlay from '../FilterAttrOverlay.tsx';
import { FilterPickerContext } from '../../../../../FilterPicker';

const defaultOperationsOption = {
  string: ['=', '!=', 'in', 'not in', 'like', 'not like', 'hasValue', 'noValue'],
  int: ['=', '!=', '>', '>=', '<', '<=', 'between', 'not between', 'hasValue', 'noValue'],
  date: ['=', '!=', '>', '<', 'relativeBetween', 'relativeCurrent', 'between', 'not between', 'hasValue', 'noValue'],
  STRING: ['=', '!=', 'in', 'not in', 'like', 'not like'],
};

describe('<FilterAttrOverlay />', () => {
  it('onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FilterAttrOverlay onSubmit={onSubmit} valueType="int" op="=" values={[]} />);
    wrapper.find('.filter-contidion-footer').find('button').at(1).simulate('click');
    expect(onSubmit).toBeCalledTimes(1);
  });

  it('onCancel', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<FilterAttrOverlay onCancel={onCancel} valueType="int" op="=" values={[]} />);
    wrapper.find('.filter-contidion-footer').find('button').at(0).simulate('click');
    expect(onCancel).toBeCalledTimes(1);
  });

  it('not defined type', () => {
    const wrapper = mount(<FilterAttrOverlay valueType="notDefined" op="not" values={[]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('number type', () => {
    it('render', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="int" op="=" values={[' ']} />);
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe('date type', () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    beforeEach(() => {
      // For <List /> use <AutoSizer />.
      // <AutoSizer /> uses offsetWidth and offsetHeight.
      // Jest runs in JSDom which doesn't support measurements APIs.
      // @see https://github.com/testing-library/react-testing-library/issues/353#issuecomment-510046921
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 320,
      });
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: 160,
      });

      jest.spyOn(Date, 'now').mockImplementation(() => new Date('2020-2-16').getTime());
    });

    afterEach(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
      jest.spyOn(Date, 'now').mockReset();
    });

    it('when op is "="', () => {
      const wrapper = mount(
        <FilterPickerContext.Provider value={{ operationsOption: defaultOperationsOption }}>
          <FilterAttrOverlay valueType="date" op="=" values={[]} />
        </FilterPickerContext.Provider>
      );
      expect(wrapper.render()).toMatchSnapshot();
      wrapper.find('.gio-select-selector').simulate('click');
      wrapper.find('.gio-select-dropdown .gio-select-list-option').at(1).simulate('click');
      expect(wrapper.find('.gio-select-item-text').text()).toBe('不等于');
    });

    it('when op is "<="', async () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="<=" values={[]} onSubmit={() => {}} />);
      wrapper.find('.gio-checkbox-input').at(0).simulate('change');
      expect(wrapper.render()).toMatchSnapshot();
      wrapper.find('.filter-contidion-footer').find('button').at(1).simulate('click');
    });

    it('when op is ">="', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op=">=" values={[]} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "<"', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="<" values={[]} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is ">"', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op=">" values={[]} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "!="', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="!=" values={[' ']} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "hasValue"', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="hasValue" values={[]} onSubmit={() => {}} />);
      wrapper.find('.filter-contidion-footer').find('button').at(1).simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "noValue"', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="noValue" values={[]} onSubmit={() => {}} />);
      wrapper.find('.filter-contidion-footer').find('button').at(1).simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "relativeTime"', () => {
      let wrapper = mount(<FilterAttrOverlay valueType="date" op="relativeTime" values={['relativeTime:-2,0']} />);
      expect(wrapper.render()).toMatchSnapshot();
      wrapper = mount(
        <FilterAttrOverlay valueType="date" op="relativeTime" values={['relativeTime:5,1']} onSubmit={() => {}} />
      );
      expect(wrapper.render()).toMatchSnapshot();
      wrapper.find('.filter-contidion-footer').find('button').at(1).simulate('click');
    });
  });

  describe('string type', () => {
    it('render', () => {
      const wrapper = mount(
        <FilterPickerContext.Provider value={{ operationsOption: defaultOperationsOption }}>
          <FilterAttrOverlay
            valueType="string"
            op="="
            values={[]}
            recentlyStorePrefix="currentUserId"
            dimensionValueRequest={() =>
              new Promise((resolve) => {
                resolve(['www.GrowingIO.com']);
              })
            }
          />
        </FilterPickerContext.Provider>
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
