import boxen from "boxen";

export const BOXEN_CONFIG = {
  padding: 1,
  margin: 1,
  borderStyle: "double",
  borderColor: "cyan",
  title: "MFOG",
  titleAlignment: "center",
  textAlignment: "center",
};

/**
 * Creates a styled content box in the console using boxen
 * @param {string} message - The message to display inside the box
 */
export function contentBox(message) {
  console.log(
    boxen(message, {
      ...BOXEN_CONFIG,
    }),
  );
}
