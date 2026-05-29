import figlet from "figlet";
import { passion } from "gradient-string";
import chalk from "chalk";

import { getTerminalSize } from "../../utils/index.js";

/**
 * Displays a stylized banner in the terminal using ASCII art and gradient colors. If figlet fails, it falls back to a simple text banner.
 * @param {string} title - The text to display in the banner (default: "TITLE").
 */
export async function banner(title = "TITLE") {
  // Fallback if figlet returns empty string
  const fallbackText = chalk.bold.cyan(`=== ${title.toUpperCase()} ===`);

  try {
    const { width } = getTerminalSize();

    const asciiText = await figlet.text(title, {
      font: "Standard",
      width: Math.min(width, 80),
      whitespaceBreak: true,
    });

    if (asciiText) {
      console.log(passion(asciiText));
    } else {
      console.log(fallbackText);
    }
  } catch (err) {
    console.debug?.(err);
    console.log(fallbackText);
  }
}
