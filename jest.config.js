module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/interfaces.ts?(x)',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/**/__test?(s)__/*',
  ],

  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },

  preset: 'ts-jest',

  setupFiles: ['./__mocks__/setupJestMock.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup'],

  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/build/', '/dist/'],

  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['node_modules/@storybook/(?!(addon-docs)/)'],
};
