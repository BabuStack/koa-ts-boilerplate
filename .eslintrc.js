module.exports = {
  'root'          : true,
  'parser'        : '@typescript-eslint/parser',
  'plugins'       : ['@typescript-eslint'],
  'extends'       : ['plugin:@typescript-eslint/recommended'],
  'parserOptions' : {
    'ecmaVersion' : 2018,
    'sourceType'  : 'module',
  },
  'rules': {
    'semi'        : ['error', 'always'],
    'quotes'      : ['error', 'single'],
    'key-spacing' : [ 'error', {
      'singleLine': {
        'beforeColon' : false,
        'afterColon'  : true,
      },
      'align': {
        'beforeColon' : true,
        'afterColon'  : true,
        'on'          : 'colon',
      },
    }],
    'indent': [
      2,
      2,
    ],
    'comma-dangle': ['error', {
      'arrays'    : 'always-multiline',
      'objects'   : 'always-multiline',
      'imports'   : 'never',
      'exports'   : 'never',
      'functions' : 'never',
    }],
    'object-curly-newline': ['error', {
      'ObjectExpression' : 'always',
      'ObjectPattern'    : {
        'multiline': true, 
      },
    }],
    'object-property-newline'                           : 'error',
    'brace-style'                                       : 'error',
    '@typescript-eslint/explicit-module-boundary-types' : 'off',
    '@typescript-eslint/explicit-function-return-type'  : 'off',
    '@typescript-eslint/no-explicit-any'                : 1,
    '@typescript-eslint/no-inferrable-types'            : [
      'warn', {
        'ignoreParameters': true,
      },
    ],
    '@typescript-eslint/no-unused-vars' : 'warn',
    '@typescript-eslint/indent'         : [
      'error',
      2,
      {
        'ignoredNodes': [
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
      },
    ],
  },
};
