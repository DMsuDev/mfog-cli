import chalk from "chalk";
import { Separator } from "@inquirer/prompts";

export const FRAMEWORK_CHOICES = [
  {
    name: `${chalk.cyan.bold("React")} + ${chalk.magenta.bold("Vite")}`,
    value: "react-vite",
    description:
      "React + Vite starter with TailwindCSS, React Router, TanStack Query, Framer Motion.\n\n" +
      "Includes advanced file-based routing, smart data-fetching & caching, smooth animations, " +
      "and a well-organized, accessible & customizable component system.",
  },
  {
    name: chalk.white("Next.js"),
    value: "nextjs",
    description: chalk.whiteBright(
      "Modern Next.js starter with React, TypeScript, TailwindCSS, and ESLint.\n\n" +
        "A clean, fast, and scalable foundation using the App Router and the latest React features.",
    ),
  },
  new Separator(),
  {
    name: chalk.greenBright("Vue.js"),
    value: "vue-vite",
    description: chalk.greenBright(
      "Lightweight Vue 3 + Vite starter template with Vue Router.\n\n" +
        "Ready for fast development with ESLint + Prettier," +
        "modern composition API patterns, and excellent Node 20+ compatibility.",
    ),
  },
  new Separator(),
  {
    name: chalk.redBright("Angular"),
    value: "angular",
    description: chalk.redBright(
      "Modern Angular starter generated with Angular CLI.\n\n" +
        "Pre-configured with best practices, lazy-loading support, " +
        "standalone components, signals & modern RxJS patterns — ready for " +
        "building large-scale, maintainable enterprise applications.",
    ),
  },
];

export const NEEDS_LANGUAGE = ["react-vite", "vue-vite"];

export const LANGUAGE_CHOICES = [
  { name: chalk.yellow.bold("JavaScript"), value: "-js" },
  { name: chalk.blue.bold("TypeScript"), value: "-ts" },
];
