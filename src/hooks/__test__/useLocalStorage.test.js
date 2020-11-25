import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  function App({ initialValue }) {
    const [value, setValue] = useLocalStorage('value', initialValue);
    return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
  }

  function CustomApp({ changeValue }) {
    const [value, setValue] = useLocalStorage('value', 'initial');
    return (
      <>
        <div>{value}</div>
        <button
          type="button"
          onClick={() => {
            setValue(changeValue);
          }}
        >
          Click
        </button>
      </>
    );
  }

  it('should call getItem on render', () => {
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should call setItem on text change', () => {
    const { getByRole } = render(<App initialValue="" />);
    fireEvent.change(getByRole('textbox'), { target: { value: 'query' } });
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('value', '"query"');
  });

  it('should get value from local storage', () => {
    window.localStorage.getItem = jest.fn(() => '"initial"');
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    window.localStorage.getItem = jest.fn(() => null);
  });

  it('should set value with function', async () => {
    const { getByRole } = render(<CustomApp changeValue={() => 'function'} />);
    fireEvent.click(getByRole('button'));
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('value', '"function"');
  });

  it('should catch JSON parse error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    window.localStorage.getItem = jest.fn(() => 'initial');
    render(<App />);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    window.localStorage.getItem = jest.fn(() => null);
    errorSpy.mockRestore();
  });

  it('should catch JSON stringfy error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByRole } = render(<CustomApp changeValue={9007199254740991n} />);
    fireEvent.click(getByRole('button'));
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });
});
