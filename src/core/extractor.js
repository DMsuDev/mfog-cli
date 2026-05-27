import sevenZip from "7zip-min"; // npm install 7zip-min
import path from "node:path";
import os from "node:os";
import fs from "fs/promises";

/**
 * Extracts a .7z archive (or other supported formats) to the target directory.
 * Returns a Promise that resolves when extraction is complete.
 *
 * @param {string} archivePath - Path to the archive file
 * @param {string} [targetDir = process.cwd()] - Destination folder (defaults to current working directory)
 * @returns {Promise<void>}
 * @throws {Error} If extraction fails
 */
export async function extractTemplate(archivePath) {
  // Extract into a temporary directory first (atomic extraction)
  const archiveFullPath = path.resolve(archivePath);

  const tmpBase = os.tmpdir();
  const tmpPrefix = path.join(tmpBase, "mfog-");
  const tmpDir = await fs.mkdtemp(tmpPrefix);

  try {
    // sevenZip.unpack supports a callback or returns a Promise
    await sevenZip.unpack(archiveFullPath, tmpDir);
    return tmpDir;
  } catch (err) {
    // Cleanup temp dir on failure
    try {
      await fs.rm(tmpDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.debug?.(cleanupErr);
    }

    console.error(err.message);
    throw new Error(
      `Failed to extract archive ${archivePath}:\n` +
        `→ ${err.message}\n\n` +
        `Possible causes:\n` +
        `• Corrupted or damaged archive file\n` +
        `• No write permissions in target folder\n` +
        `• Format not supported by 7za\n` +
        `• Internal issue with 7zip-min binary`,
      { cause: err },
    );
  }
}
