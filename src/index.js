import { banner, contentBox, showQuickStart } from "./cli/layout/index.js";
import { logger, clearConsole, sleep } from "./utils/index.js";
import { QUESTIONS } from "./cli/prompts/questions.js";
import { runQuestions } from "./cli/prompts/runner.js";
import { installTemplate } from "./core/installTemplate.js";
import { buildConfig } from "./core/config/buildConfig.js";

import chalk from "chalk";

let contentMsg = `Modular Framework Offline Generator\n\n Thank you for using MFOG, created by DMsuDev.`;

export async function run() {
  try {
    clearConsole();

    await banner("CREATE APP OFFLINE");
    contentBox(chalk.white.bold(contentMsg));

    await sleep(200);

    const answers = await runQuestions(QUESTIONS);

    const config = buildConfig(answers);

    await installTemplate(config);

    await sleep(250);

    clearConsole();

    contentBox(chalk.greenBright.bold("Project Created successfully"));

    await showQuickStart(
      answers.name,
      answers.framework + (answers.language || ""),
    );
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}
