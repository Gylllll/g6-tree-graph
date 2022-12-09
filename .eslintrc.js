module.exports = {
  extends: ['@gem-mine/recommend'],
  rules: {
    'import/prefer-default-export': 'off',
    // 禁止不必要的尾逗号
    'comma-dangle': ['error', 'never'],
    // 行最大宽度
    'max-len': [
      'error',
      {
        tabWidth: 2,
        code: 256
      }
    ],
    'object-curly-newline': [
      'error',
      {
        // 对象字面量，非空对象时必须换行
        ObjectExpression: {
          minProperties: 1
        }
      }
    ],
    // 对象字面量属性必须换行编写
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false
      }
    ],
    // 允许使用 | & ~ 运算符
    'no-bitwise': 0
  }
}
