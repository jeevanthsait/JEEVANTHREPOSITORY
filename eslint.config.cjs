const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = {
  languageOptions: {
    parser: tsParser, // ← parser must be module, not string
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: 2020,
      sourceType: "module",
    },
    globals: {
      process: "readonly",
      module: "readonly",
      require: "readonly",
      console: "readonly",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  ignores: ["dist/", "node_modules/"],
};
