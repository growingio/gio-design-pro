import React from 'react';
import { mount, shallow, render } from 'enzyme';
import EmptyPrompt from '..';

describe('EmptyPrompt', () => {
  it('render with default props', () => {
    const wrapper = mount(<EmptyPrompt />);
    expect(wrapper.find('.gio-empty-prompt > svg')).toBeDefined();
    expect(wrapper.find('.gio-empty-prompt__description').text()).toBe('No data');

    expect(render(wrapper)).toMatchSnapshot();
  });

  it('render with description', () => {
    const desc = 'Not found';
    const wrapper = shallow(<EmptyPrompt description={desc} />);
    expect(wrapper.find('.gio-empty-prompt__description').text()).toBe(desc);
  });

  it('render with children', () => {
    const child = <button type="button">Create</button>;
    const wrapper = shallow(<EmptyPrompt>{child}</EmptyPrompt>);
    expect(wrapper.find('.gio-empty-prompt__footer')).toBeDefined();
    expect(wrapper.find('.gio-empty-prompt__footer > button').html()).toBe(shallow(child).html());
  });
});
