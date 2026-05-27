import path from "path";
import fs from "fs/promises";
import chalk from "chalk";
import ora from "ora";
import { error } from "../cli/config/log.js";
import { extractTemplate } from "./extractor.js";
import { updatePackageFiles } from "./replacer.js";
import { paths } from "../cli/config/paths.js";
import { execSync } from "node:child_process";

/**
 * Main function that generates the complete project
 * @param {Object} answers - User answers (name, version, framework, language, etc.)
 */
export async function generateProject(answers) {
  const { name, version = "0.1.0", framework, language = "" } = answers;

  const projectName = name.trim();
  const targetDir = path.join(process.cwd(), projectName);

  const message = `Creating: ${chalk.dim(
    projectName,
  )} with framework ${chalk.dim(framework)}${chalk.dim(
    language ? ` (${language.slice(1)})` : "",
  )}`;

  const spinner = ora(message).start();

  try {
    // 1. Check if target directory already exists
    try {
      await fs.access(targetDir);

      console.log(
        chalk.red(`Error: Directory "${projectName}" already exists.`),
      );
      console.log(
        chalk.yellow(
          "Solution: choose a different name or delete the existing folder.",
        ),
      );
      process.exit(1);
    } catch (accessErr) {
      void accessErr; // Directory doesn't exist → proceed
    }

    // 2. Create target directory
    await fs.mkdir(targetDir, { recursive: true });

    // 3. Determine template archive name
    const templateName = `${framework}${language}`;
    const templatePath = path.join(paths.templatesDir, `${templateName}.7z`);

    // Verify template exists
    try {
      await fs.access(templatePath);
    } catch {
      throw new Error(
        `Template not found: ${templatePath}\n` +
          `Make sure the file exists in the /templates/ directory.`,
      );
    }

    // 4. Extract template into a temporary directory (atomic extraction)
    const extractedTemp = await extractTemplate(templatePath);

    // Copy extracted files to the target directory
    try {
      // Prefer fs.cp when available for recursive copy
      if (fs.cp) {
        await fs.cp(extractedTemp, targetDir, { recursive: true });
      } else {
        // Fallback: basic recursive copy using rename per-file (best-effort)
        // Create the target dir already exists; move contents instead
        const entries = await fs.readdir(extractedTemp);
        for (const entry of entries) {
          const src = path.join(extractedTemp, entry);
          const dest = path.join(targetDir, entry);
          await fs.rename(src, dest).catch(async () => {
            // If rename fails (cross-device), fallback to copy + rm
            const stat = await fs.stat(src);
            if (stat.isDirectory()) {
              await fs.mkdir(dest, { recursive: true });
              // naive recursive copy
              const sub = await fs.readdir(src);
              for (const s of sub) {
                (await fs.cp)
                  ? await fs.cp(path.join(src, s), path.join(dest, s), {
                      recursive: true,
                    })
                  : null;
              }
            } else {
              const data = await fs.readFile(src);
              await fs.writeFile(dest, data);
            }
          });
        }
      }
    } finally {
      // Cleanup extracted temp folder
      try {
        await fs.rm(extractedTemp, { recursive: true, force: true });
      } catch (cleanupErr) {
        console.debug?.(cleanupErr);
      }
    }

    await updatePackageFiles(targetDir, projectName, version);

    // Initialize git if requested by the user
    if (answers.initializeGit) {
      try {
        execSync("git init", { cwd: targetDir, stdio: "ignore" });
        execSync("git add .", { cwd: targetDir, stdio: "ignore" });
        execSync('git commit -m "Initial commit"', {
          cwd: targetDir,
          stdio: "ignore",
        });
        console.log(chalk.green("Initialized git repository.\n"));
      } catch (gitErr) {
        console.warn(
          chalk.yellow(`Warning: git initialization failed: ${gitErr.message}`),
        );
      }
    }

    spinner.succeed("Project created successfully!");
  } catch (err) {
    spinner.fail("Failed to create project");

    console.error(error("\nError during project generation:"));
    console.error(chalk.red(err.message));

    // Clean up partial project in case of error
    try {
      await fs.rm(targetDir, { recursive: true, force: true });
      console.log(
        chalk.dim(
          "Partially created folder was removed to avoid inconsistencies.",
        ),
      );
    } catch (cleanupErr) {
      void cleanupErr; // best-effort cleanup; nothing more to do
    }

    process.exit(1);
  }
}
