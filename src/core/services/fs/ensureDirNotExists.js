import fs from "fs/promises";

export async function ensureDirNotExists(dir) {
  try {
    await fs.stat(dir);
    throw new Error(
      `Directory "${dir}" already exists. Please choose a different project name or target directory.`,
    );
  } catch (err) {
    if (err.code === "ENOENT") return true;
    throw err;
  }
}
