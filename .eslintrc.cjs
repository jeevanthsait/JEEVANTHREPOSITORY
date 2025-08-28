module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // for TS
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json", // important for type-aware linting
  },
  env: {
    node: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  ignorePatterns: ["dist/", "node_modules/"], // replaces .eslintignore
};
