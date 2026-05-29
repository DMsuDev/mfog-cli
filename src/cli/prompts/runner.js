import { input, select, confirm } from "@inquirer/prompts";

const PROMPT_MAP = {
  input,
  select,
  confirm,
};

export async function runQuestions(questions) {
  const answers = {};

  for (const question of questions) {
    // Skip question if 'when' condition exists and is not met
    if (question.when && !(await question.when(answers))) {
      continue;
    }

    const prompt = PROMPT_MAP[question.type];

    if (!prompt) {
      throw new Error(`Unsupported question type: ${question.type}`);
    }

    const config =
      typeof question.config === "function"
        ? await question.config(answers)
        : question.config;

    const result = await prompt(config);

    answers[question.key] = result;
  }

  return { ...answers };
}
