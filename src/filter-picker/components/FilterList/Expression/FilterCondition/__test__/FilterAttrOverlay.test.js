import React from 'react';
import { mount } from 'enzyme';
import FilterAttrOverlay from '../FilterAttrOverlay.tsx';

describe('<FilterAttrOverlay />', () => {
  it('should throw error', () => {
    expect(() => mount(<FilterAttrOverlay />)).toThrowError();
  });

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
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 320 });
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
    });

    afterEach(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    });

    it('when op is "="', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="=" values={[]} />);
      expect(wrapper.render()).toMatchSnapshot();
      wrapper.find('.gio-select').simulate('click');

      wrapper.find('.gio-select-dropdown .gio-select-option').at(1).simulate('click');
      expect(wrapper.find('.gio-select-item-text').text()).toBe('不等于');
    });

    it('when op is "<="', async () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="<=" values={[]} />);
      wrapper.find('.gio-checkbox-input').at(0).simulate('change');
      expect(wrapper.render()).toMatchSnapshot();
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
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="!=" values={[]} />);
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('when op is "relativeTime"', () => {
      const wrapper = mount(<FilterAttrOverlay valueType="date" op="relativeTime" values={['relativeTime:-2,0']} />);
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
