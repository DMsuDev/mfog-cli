import fs from "node:fs/promises";
import path from "node:path";

/**
 * Reads and parses a JSON file.
 *
 * @param {string} filePath
 * @returns {Promise<any>}
 */
export async function readJson(filePath) {
  const content = await fs.readFile(filePath, "utf-8");

  return JSON.parse(content);
}

/**
 * Writes data to a JSON file with formatting.
 *
 * @param {string} filePath
 * @param {any} data
 * @returns {Promise<void>}
 */
export async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
}

/**
 * Checks if a file exists.
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Updates package.json fields.
 *
 * @param {string} projectDir
 * @param {{ name?: string, version?: string }} updates
 * @returns {Promise<void>}
 */
export async function updatePackageJson(projectDir, updates) {
  const pkgPath = path.join(projectDir, "package.json");

  const pkg = await readJson(pkgPath);

  Object.assign(pkg, updates);

  await writeJson(pkgPath, pkg);
}

/**
 * Updates package-lock.json fields if it exists.
 *
 * @param {string} projectDir
 * @param {{ name?: string, version?: string }} updates
 * @returns {Promise<boolean>} true if updated
 */
export async function updatePackageLockJson(projectDir, updates) {
  const lockPath = path.join(projectDir, "package-lock.json");

  const exists = await fileExists(lockPath);

  if (!exists) {
    return false;
  }

  const lock = await readJson(lockPath);

  if (updates.name && lock.name) {
    lock.name = updates.name;
  }

  if (updates.version && lock.version) {
    lock.version = updates.version;
  }

  if (lock.packages?.[""]) {
    if (updates.name) {
      lock.packages[""].name = updates.name;
    }

    if (updates.version) {
      lock.packages[""].version = updates.version;
    }
  }

  await writeJson(lockPath, lock);

  return true;
}

/**
 * Writes package.json and package-lock.json (if exists) with new name and version.
 *
 * @param {string} projectDir
 * @param {{
 *   name?: string,
 *   version?: string
 * }} options
 * @returns {Promise<void>}
 */
export async function writePackageJson(projectDir, options) {
  await updatePackageJson(projectDir, options);

  await updatePackageLockJson(projectDir, options);
}
