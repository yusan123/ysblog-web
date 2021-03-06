// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 0,
    'quotes': [1, 'single'], //引号类型 
    'semi': ["error", "always"],
    // allow debugger during development
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
