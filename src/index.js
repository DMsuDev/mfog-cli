#!/usr/bin/env node

import { clearConsole, waitTime } from "./cli/console.js";
import { banner, contentBox, showSuccessInstructions } from "./cli/banner.js";
import { error, highlight, success } from "./cli/config/log.js";
import { collectAnswers } from "./lib/collect-answers.js";
import { generateProject } from "./core/generator.js";

let contentMsg = `Modular Framework Offline Generator\n\n Thank you for using MFOG, created by DMsuDev.`;

async function main() {
  clearConsole();

  await banner("CREATE APP OFFLINE");
  contentBox(highlight(contentMsg));

  await waitTime(200);

  const answers = await collectAnswers();

  await generateProject(answers);

  await waitTime(250);

  clearConsole();

  contentBox(success("Project Created successfully", true));

  await showSuccessInstructions(
    answers.name,
    answers.framework + (answers.language || ""),
  );
}

main().catch((err) => {
  console.error("Error:", error(err.message));
  process.exit(1);
});
