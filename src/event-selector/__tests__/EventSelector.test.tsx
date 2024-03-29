import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventSelector, EventSelectorProps } from '../index';
// import { events } from './data';
const dataSource = [
  {
    id: 'JnG44mGz',
    name: '测试一组同类元素吧',
    type: 'simple',
    action: 'clck',
    elementId: 'JnG44mGz',
    valueType: '',
    platforms: ['iOS'],
    favorites: false,
    attributes: [],
    isComplexDistinct: false,
    __typename: 'Measurable',
  },
  {
    id: 'n1QVaDyR',
    name: 'testEvent',
    type: 'custom',
    action: '',
    elementId: '',
    valueType: 'counter',
    platforms: ['all'],
    favorites: false,
    attributes: [{ id: 'y9pm1pme', name: '范若若f', valueType: 'string', __typename: 'MeasurableAttribute' }],
    isComplexDistinct: false,
    __typename: 'Measurable',
  },
  {
    id: 'bVG2Ap68',
    name: '0319-test地方',
    type: 'complex',
    action: '',
    elementId: '',
    valueType: '',
    platforms: ['all'],
    favorites: false,
    attributes: [],
    isComplexDistinct: false,
    __typename: 'Measurable',
  },
];
const defaultTabs = [
  { label: '事件', value: 'event' },
  { label: '计算指标', value: 'measurement' },
];
const defaultProps: EventSelectorProps = {
  dataSource,
  showTabAll: true,
  multiple: false,
  tabs: defaultTabs,
};
// const defaultRender = <EventSelector {...defaultProps} />;
jest.useFakeTimers();
describe('<EventSelector/> test', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('can be selected', () => {
    const handleSelect = jest.fn();
    const handleChange = jest.fn();
    render(<EventSelector {...defaultProps} onSelect={handleSelect} onChange={handleChange} />);
    fireEvent.click(screen.getByText('请选择'));
    act(() => {
      fireEvent.click(screen.getByText(dataSource[0].name));
    });

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('请选择')).toBeNull();
    // expect(handleSelect).toHaveBeenCalledWith(tobeClickedNode);
  });
  it('click cancel button will do nothing', () => {
    const handleSelect = jest.fn();
    const handleChange = jest.fn();
    const handleCancel = jest.fn();
    render(
      <EventSelector
        {...defaultProps}
        multiple
        onSelect={handleSelect}
        onCancel={handleCancel}
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByText('请选择'));
    act(() => {
      fireEvent.click(screen.getByText(dataSource[0].name));
    });
    act(() => {
      fireEvent.click(screen.getByText('取 消'));
    });
    expect(handleSelect).toHaveBeenCalledTimes(0);
    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('请选择')).toBeTruthy();
    // expect(handleSelect).toHaveBeenCalledWith(tobeClickedNode);
  });
  it('can set placeholder', () => {
    render(<EventSelector {...defaultProps} placeholder="选择事件" />);
    expect(screen.queryByText('选择事件')).toBeTruthy();
  });
});
