import { input, select, confirm } from "@inquirer/prompts";
import { NEEDS_LANGUAGE } from "../registry/index.js";
import * as v from "./validators.js";

export const QUESTIONS = [
  {
    key: "name",
    prompt: input,
    config: {
      message: " Project name:",
      default: "my-app",
      validate: v.folderName,
    },
  },
  {
    key: "version",
    prompt: input,
    config: {
      message: " Initial version:",
      default: "0.1.0",
      validate: v.semver,
    },
  },
  {
    key: "framework",
    prompt: select,
    config: (choices) => ({
      message: " Select a framework:",
      choices,
    }),
  },
  {
    key: "language",
    prompt: select,
    config: (choices) => ({
      message: " Select a language:",
      choices,
    }),
    when: (answers) => NEEDS_LANGUAGE.has(answers.framework),
  },

  {
    key: "initializeGit",
    prompt: confirm,
    config: () => ({
      message: " Initialize a git repository?",
      default: true,
    }),
  },

  // Additional questions added above: initializeGit
];
