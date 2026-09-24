import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*']
  },
  firebaseRulesPlugin.configs['flat/recommended']
];
