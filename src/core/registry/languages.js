import chalk from "chalk";

export const NEEDS_LANGUAGE = Object.freeze(
  new Set(["react-vite", "vue-vite"]),
);

export const LANGUAGES = Object.freeze([
  {
    name: chalk.yellow.bold("JavaScript"),
    value: "-js",
  },
  {
    name: chalk.blue.bold("TypeScript"),
    value: "-ts",
  },
]);
