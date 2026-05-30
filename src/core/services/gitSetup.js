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
  const gitAvailable = await run("git --version", { stdio: "ignore" })
    .then(() => true)
    .catch(() => false);

  if (!gitAvailable) return;

  try {
    await run("git init", { cwd: targetDir });
    await run("git add .", { cwd: targetDir });
    await run('git commit -m "Initial commit"', {
      cwd: targetDir,
      stdio: "ignore",
    });
  } catch (err) {
    const message = err?.message?.toLowerCase() ?? "";

    if (message.includes("permission denied") || message.includes("eperm")) {
      throw new Error(`Permission denied in directory: ${targetDir}`, {
        cause: err,
      });
    }

    if (message.includes("already exists")) {
      throw new Error(
        `Directory already contains a Git repository: ${targetDir}`,
        { cause: err },
      );
    }

    throw new Error(
      `Git initialization failed in ${targetDir}: ${err?.message ?? "unknown error"}`,
      { cause: err },
    );
  }

  return true;
}
