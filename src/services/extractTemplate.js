import sevenZip from "7zip-min";
import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";

const TMP_PREFIX = "mfog-template-";

async function validateArchive(archivePath) {
  const archiveFullPath = path.resolve(archivePath);

  try {
    const stat = await fs.stat(archiveFullPath);

    if (!stat.isFile()) {
      throw new Error(`Archive path is not a file: ${archiveFullPath}`);
    }

    return archiveFullPath;
  } catch (err) {
    throw createArchiveAccessError(archivePath, err);
  }
}

async function createTempDir() {
  return fs.mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
}

async function unpackArchive(archivePath, targetDir) {
  return new Promise((resolve, reject) => {
    sevenZip.unpack(archivePath, targetDir, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

async function cleanupDirectory(dir) {
  await fs
    .rm(dir, {
      recursive: true,
      force: true,
    })
    .catch(() => {});
}

function getErrorMessage(err) {
  return err instanceof Error ? err.message : String(err);
}

function createArchiveAccessError(archivePath, err) {
  return new Error(
    `Failed to access archive "${archivePath}":\n` +
      `→ ${getErrorMessage(err)}\n\n` +
      `Possible causes:\n` +
      `• File does not exist at the specified path\n` +
      `• Path points to a directory instead of a file\n` +
      `• No read permissions for the file\n` +
      `• Invalid path format`,
    { cause: err },
  );
}

function createArchiveExtractionError(archivePath, err) {
  return new Error(
    `Failed to extract archive "${archivePath}":\n` +
      `→ ${getErrorMessage(err)}\n\n` +
      `Possible causes:\n` +
      `• Corrupted or damaged archive file\n` +
      `• No write permissions in target folder\n` +
      `• Format not supported by 7za\n` +
      `• Internal issue with 7zip-min binary`,
    { cause: err },
  );
}

/**
 * Extracts an archive into a temporary directory.
 *
 * @param {string} archivePath - Path to the archive file
 * @returns {Promise<string>} Path to extracted temp directory
 */
export async function extractTemplate(archivePath) {
  const archiveFullPath = await validateArchive(archivePath);

  const tmpDir = await createTempDir();

  try {
    await unpackArchive(archiveFullPath, tmpDir);

    return tmpDir;
  } catch (err) {
    await cleanupDirectory(tmpDir);

    throw createArchiveExtractionError(archivePath, err);
  }
}
