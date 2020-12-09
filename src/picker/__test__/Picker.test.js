import React from 'react';
import ReactDOM from 'react-dom';
// import { PlusOutlined } from '@gio-design/icons';
import { mount, render } from 'enzyme';
import Picker from '..';
import { nodes } from './data';

const onVisibleChange = jest.fn();
const defaultProps = {
  dataSource: [],
  onVisibleChange,
  inputValue: '',
};

describe('Picker', () => {
  it('can search in dropdown', () => {
    const onSearch = (query) => {
      expect(query).not.toBeNull();
      expect(query.length).toBeLessThanOrEqual(200);
    };
    const wrapper = mount(
      <Picker {...defaultProps} visible dataSource={nodes} onHoverPanelShow={jest.fn()} onSearch={onSearch} />
    );
    const search = wrapper.find('.gio-picker-dropdown .gio-input-content');
    search.simulate('change', { target: { value: 'x' } });

    search.simulate('change', { target: { value: 'x'.repeat(201) } });
    expect(wrapper.find('.gio-alert')).toHaveLength(1);
  });
});

describe('Picker snapshots', () => {
  beforeEach(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('will only show input', () => {
    expect(render(<Picker {...defaultProps} />)).toMatchSnapshot();
  });

  // it('will show input with empty dropdown', () => {
  //   expect(render(<Picker {...defaultProps} visible />)).toMatchSnapshot();
  // });

  // it('will show input with loading dropdown', () => {
  //   expect(render(<Picker {...defaultProps} visible loading />)).toMatchSnapshot();
  // });

  // it('will show input with dropdown', () => {
  //   const component = (
  //     <Picker
  //       {...defaultProps}
  //       visible
  //       dataSource={nodes}
  //       onHoverPanelShow={jest.fn()}
  //       tabNav={{ items: [{ key: 'all', label: 'All' }] }}
  //       actionButton={{ icon: <PlusOutlined />, onClick: jest.fn() }}
  //     />
  //   );
  //   expect(render(component)).toMatchSnapshot();
  // });
});
