module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/transform-runtime',
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
