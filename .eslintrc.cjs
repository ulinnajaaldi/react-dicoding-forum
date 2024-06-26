module.exports = {
  root: true,
  env: { browser: true, es2020: true, "cypress/global": true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "cypress",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-danger": "off",
    "react-refresh/only-export-components": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/heading-has-content": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
