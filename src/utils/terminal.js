import { stdout } from "node:process";

/**
 * Gets the current terminal size (columns and rows).
 * If the terminal size cannot be determined, it defaults to 80 columns and 24 rows.
 * @returns {Object} An object containing the number of columns and rows of the terminal.
 */
export function getTerminalSize() {
  return {
    columns: stdout.columns || 80,
    rows: stdout.rows || 24,
  };
}
