/**
 * Clears the console screen in a cross-platform way
 * If the terminal is not interactive, it logs a message instead
 */
export function clearConsole() {
  if (!process.stdout.isTTY) {
    console.log("[MFOG] Running in non-interactive mode...");
    return;
  }

  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
}
