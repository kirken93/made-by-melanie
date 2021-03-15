module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    "linebreak-style": [1, "windows"],
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-danger": 0
  }
};
