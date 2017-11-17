;`use strict`

module.exports = {
  extends: [`../.eslintrc.js`, `react:recommended`],
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  env: {
    commonjs: true,
    browser: true,
    node: false,
  },
  settings: {
    react: {
      pragma: `h`,
    },
  },
}
