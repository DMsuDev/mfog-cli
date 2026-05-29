import {
  NEEDS_LANGUAGE,
  LANGUAGES,
  FRAMEWORKS,
} from "../../core/registry/index.js";
import * as v from "../../validators/index.js";

export const QUESTIONS = [
  {
    key: "name",
    type: "input",
    config: {
      message: " Project name:",
      default: "my-app",
      required: true,
      validate: v.validateProjectName,
    },
  },
  {
    key: "version",
    type: "input",
    config: {
      message: " Initial version:",
      default: "0.1.0",
      required: true,
      validate: v.validateSemver,
    },
  },
  {
    key: "framework",
    type: "select",

    config: {
      message: " Select a framework:",
      choices: FRAMEWORKS,
    },
  },
  {
    key: "language",
    type: "select",

    when: (answers) => NEEDS_LANGUAGE.has(answers.framework),

    config: {
      message: " Select a language:",
      choices: LANGUAGES,
    },
  },

  {
    key: "initializeGit",
    type: "confirm",
    config: {
      message: " Initialize a git repository?",
      default: true,
    },
  },
];
