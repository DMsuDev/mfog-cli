import chalk from "chalk";
import { sleep } from "../../utils/index.js";

const START_COMMANDS = {
  nextjs: "npm start",
  angular: "npm start",
};

function getStartCommand(template) {
  return START_COMMANDS[template] ?? "npm run dev";
}

export async function showQuickStart(foldername, template) {
  if (!foldername || !template) return;

  const startCmd = getStartCommand(template);

  const commands = [
    {
      label: "Navigate to the project folder",
      cmd: `cd ${foldername}`,
    },
    {
      label: "Start the development server",
      cmd: startCmd,
    },
    {
      label: "Run tests in watch mode",
      cmd: "npm test",
    },
    {
      label: "Build for production",
      cmd: "npm run build",
    },
  ];

  const output =
    chalk.bold("\nNext steps:\n") +
    commands
      .map(
        ({ label, cmd }) =>
          `\n\n  ${chalk.blueBright(label)}\n` +
          `  ${chalk.gray("→")} ${chalk.greenBright(cmd)}`,
      )
      .join("");

  await sleep(150);

  console.log(output);
}
