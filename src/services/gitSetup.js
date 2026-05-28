import { exec } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(exec);

/**
 * Initializes a git repository, adds all files, and makes the initial commit.
 * @param {string} targetDir - The directory where the git repository should be initialized.
 * @returns {Promise<void>}
 * @throws Will throw an error if git commands fail.
 */
export async function gitSetup(targetDir) {
  try {
    await run("git init", { cwd: targetDir });
    await run("git add .", { cwd: targetDir });
    await run('git commit -m "Initial commit"', {
      cwd: targetDir,
      stdio: "ignore",
    });
  } catch (err) {
    throw new Error("Git initialization failed", {
      cause: err,
    });
  }
}
