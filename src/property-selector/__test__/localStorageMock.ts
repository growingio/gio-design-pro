const localStorageMock = () => {
  let store: { [key: string]: any } = {};
  return {
    getItem(key: string | number) {
      return store[key];
    },
    setItem(key: string | number, value: { toString: () => any }) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string | number) {
      delete store[key];
    },
  };
};
export default localStorageMock;
