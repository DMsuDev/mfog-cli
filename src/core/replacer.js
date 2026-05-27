import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { error } from "../cli/config/log.js";

/**
 * Updates name and version in package.json and (if exists) package-lock.json
 * @param {string} projectDir
 * @param {string} newName - Project name in kebab-case
 * @param {string} newVersion - Default 0.1.0
 */
export async function updatePackageFiles(
  projectDir,
  newName,
  newVersion = "0.1.0",
) {
  const pkgPath = path.join(projectDir, "package.json");

  try {
    const pkgRaw = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(pkgRaw);

    pkg.name = newName;
    pkg.version = newVersion;

    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(
      chalk.green(
        `\n\nUpdated package.json → name: ${newName}, version: ${newVersion}`,
      ),
    );
  } catch (err) {
    console.error(error(`Failed to update package.json: ${err.message}`));
    throw err; // or don't throw if you want the process to continue
  }

  // Optional: update lockfile (npm only – yarn/pnpm would need extra logic)
  const lockPath = path.join(projectDir, "package-lock.json");
  const lockExists = await fs
    .access(lockPath)
    .then(() => true)
    .catch(() => false);

  if (lockExists) {
    try {
      const lockRaw = await fs.readFile(lockPath, "utf-8");
      const lock = JSON.parse(lockRaw);

      if (lock.name) lock.name = newName;
      if (lock.version) lock.version = newVersion;

      if (lock.packages?.[""]) {
        lock.packages[""].name = newName;
        lock.packages[""].version = newVersion;
      }

      await fs.writeFile(lockPath, JSON.stringify(lock, null, 2) + "\n");
      console.log(chalk.green("Updated package-lock.json"));
    } catch (err) {
      console.warn(
        chalk.yellow(
          `Warning: Could not update package-lock.json: ${err.message}`,
        ),
      );
    }
  }
}
