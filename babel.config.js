module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-modules-commonjs',
    '@babel/transform-runtime',
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
