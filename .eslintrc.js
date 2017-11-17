;`use strict`

module.exports = {
  parser: `babel-eslint`,
  plugins: [`prettier`],
  env: {
    es6: true,
  },
  extends: [`eslint:recommended`, `prettier:recommended`],
}
