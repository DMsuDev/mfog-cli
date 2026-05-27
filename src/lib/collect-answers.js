import { QUESTIONS } from "../cli/prompts.js"; // adjust path as needed
import { FRAMEWORK_CHOICES, LANGUAGE_CHOICES } from "../cli/config/choices.js";
import { error } from "../cli/config/log.js";

const CHOICES_MAP = {
  framework: FRAMEWORK_CHOICES,
  language: LANGUAGE_CHOICES,
  // future: extras: EXTRAS_CHOICES, etc.
};

/**
 * Collects user answers for all questions using inquirer-style prompts
 * @returns {Promise<Object>} Object containing the user's answers
 */
export async function collectAnswers() {
  const answers = {};

  for (const question of QUESTIONS) {
    // Skip question if 'when' condition exists and is not met
    if (question.when && !question.when(answers)) {
      continue;
    }

    let config;

    // Handle dynamic config (when config is a function)
    if (typeof question.config === "function") {
      const choices = CHOICES_MAP[question.key];

      // If choices are provided for this question, pass them to the config function
      if (choices && Array.isArray(choices)) {
        config = question.config(choices);
      } else {
        // Otherwise call function without arguments (e.g., confirm prompts)
        config = question.config();
      }
    } else {
      // Static questions (input, confirm, etc.) → safe copy
      config = { ...question.config };
    }

    // Basic config validation to prevent inquirer internal errors
    if (!config || typeof config !== "object" || !config.message) {
      throw new Error(`Invalid configuration for question "${question.key}"`);
    }

    // Execute the actual prompt
    try {
      answers[question.key] = await question.prompt(config);
    } catch (err) {
      const errorMsg = `Error while asking "${question.key}": ${error(
        err.message,
      )}`;
      console.error(errorMsg);
      throw err; // You could also decide to continue / ask again
    }
  }

  return answers;
}
