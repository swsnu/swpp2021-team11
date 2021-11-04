module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier', 'react'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/prop-types': [0],
        'prettier/prettier': 'error',
    },
};
