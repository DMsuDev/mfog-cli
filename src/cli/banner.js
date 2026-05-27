import figlet from "figlet";
import boxen from "boxen";
import { passion } from "gradient-string";
import chalk from "chalk";

import { BOXEN_CONFIG } from "./config/boxen.js";
import { waitTime, getTerminalSize } from "./console.js";

/**
 * Displays a large, colorful ASCII banner
 * @param {string} title - Banner text (default: "MFOG")
 */
export async function banner(title = "MFOG") {
  try {
    const { width } = getTerminalSize();

    const asciiText = await figlet.text(title, {
      font: "Standard", // You can try: 'Big', 'Slant', 'Doom', 'Graffiti', etc.
      width: width,
      whitespaceBreak: true,
    });

    // Nice gradient effect (you can change the theme: passion, retro, mind, etc.)
    console.log(passion(asciiText));
  } catch (err) {
    // Log the figlet error for diagnostics, then show a simple fallback
    console.debug?.(err);
    console.log(chalk.bold.cyan(`=== ${title.toUpperCase()} ===`));
  }
}

/**
 * Displays a nicely formatted boxed message
 * @param {string} message - The content to display inside the box
 */
export function contentBox(message) {
  const box = boxen(message, {
    ...BOXEN_CONFIG,
    // You can override specific options here if needed for different contexts
  });
  console.log(box);
}

/**
 * Shows success message with next steps / useful commands
 * @param {string} foldername - Name of the created project folder
 * @param {string} template - Template identifier (to decide npm start vs dev)
 */
export async function showSuccessInstructions(foldername, template) {
  if (!foldername || !template) return;

  // Some templates use 'npm start' instead of 'npm run dev'
  const useNpmStart = template.includes("next") || template.includes("angular");

  const commands = [
    {
      label: "Navigate to the project folder",
      cmd: `cd ${foldername}`,
    },
    {
      label: "Start the development server",
      cmd: useNpmStart ? "npm start" : "npm run dev",
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

  let output = chalk.bold("Next steps:\n");

  commands.forEach(({ label, cmd }) => {
    output += `\n  ${chalk.blueBright(label)}\n`;
    output += `  ${chalk.gray("→")} ${chalk.greenBright(cmd)}\n`;
  });

  // Small delay for better visual flow
  await waitTime(150);
  console.log(output);
}
