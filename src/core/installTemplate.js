import path from "node:path";
import fs from "fs/promises";
import chalk from "chalk";
import ora from "ora";

import { validateFramework } from "../validators/index.js";
import { extractTemplate } from "./services/extractTemplate.js";
import { gitSetup } from "./services/gitSetup.js";
import { writePackageJson } from "./services/writePackageJson.js";

import { ensureDirNotExists } from "./services/fs/ensureDirNotExists.js";

export async function validateProjectSetup({ framework, targetDir }) {
  const frameworkValidation = validateFramework(framework);
  if (frameworkValidation !== true) {
    throw new Error(frameworkValidation);
  }

  const fullPath = path.resolve(targetDir);
  await ensureDirNotExists(fullPath);

  return true;
}

/**
 * Moves a directory from source to destination. If the move operation fails due to cross-device issues, it falls back to copying and deleting the source.
 * @param {string} source - The path of the directory to move.
 * @param {string} destination - The path where the directory should be moved to.
 */
export async function moveDir(source, destination) {
  try {
    // Fast path: same filesystem
    await fs.rename(source, destination);
    return;
  } catch (err) {
    if (err.code !== "EXDEV") throw err;
  }

  // Cross-device fallback: MUST avoid rename entirely
  // Cross-device fallback: copy then remove source
  // Ensure destination is clean
  await fs.rm(destination, { recursive: true, force: true });

  // Direct copy to final destination (no intermediate rename)
  await fs.cp(source, destination, { recursive: true });

  // Remove source only after successful copy
  await fs.rm(source, { recursive: true, force: true });
}

/** Installs the selected template by validating the project setup, extracting the template archive, moving it to the target directory, configuring the project, and optionally initializing a git repository.
 * @param {Object} config - The configuration object containing project details and options.
 * @param {string} config.name - The name of the project.
 * @param {string} config.version - The version of the project.
 * @param {string} config.framework - The selected framework for the project.
 * @param {string} [config.language] - The selected language for the project (optional).
 * @param {boolean} config.gitInit - Whether to initialize a git repository.
 * @param {string} config.targetDir - The target directory where the project will be created.
 * @returns {Promise<Object>} - Returns an object containing the target directory and framework used for the project.
 */
export async function installTemplate(config) {
  const { name, version, framework, language, gitInit, targetDir } = config;

  const spinner = ora().start();

  try {
    await validateProjectSetup({ framework, targetDir });

    // Create target directory (if it doesn't exist)
    await fs.mkdir(targetDir, { recursive: true });

    const archive = `${framework}${language || ""}.7z`;

    const archivePath = path.join(process.cwd(), "templates", archive);

    spinner.text = `Extracting template ${chalk.cyan(archive)}...`;

    // Extract the template and move it to the target directory
    const extractedPath = await extractTemplate(archivePath);

    spinner.text = "Installing template to target directory...";

    await moveDir(extractedPath, targetDir);

    spinner.text = "Writing package.json...";

    await writePackageJson(targetDir, { name, version });

    if (gitInit) {
      spinner.text = "Initializing git...";
      await gitSetup(targetDir);
    }

    spinner.succeed(
      `Project setup complete! Your ${framework} project is ready at ${targetDir}.`,
    );
  } catch (err) {
    spinner.fail("Project creation failed.");

    throw err;
  }
}
