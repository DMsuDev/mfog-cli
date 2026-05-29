import chalk from "chalk";

/**
 * =========================================================
 * FLAGS
 * =========================================================
 */

function getFlag(name) {
  const flag = process.argv.find((arg) => arg === `--${name}`);
  return Boolean(flag);
}

const isDebug = getFlag("debug");
const isVerbose = getFlag("verbose");
const isQuiet = getFlag("quiet");

/**
 * =========================================================
 * LOG LEVEL RULES
 * =========================================================
 * quiet   → solo error
 * normal  → info, success, warn, error
 * verbose → todo excepto debug
 * debug   → todo + debug
 */
const shouldLog = {
  error: true,
  success: !isQuiet,
  warn: !isQuiet,
  info: !isQuiet,
  verbose: isVerbose && !isQuiet,
  debug: isDebug && !isQuiet,
};

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */
function time() {
  return chalk.gray(`[${new Date().toISOString()}]`);
}

function format(level, color, label, msg) {
  return `${time()} ${color.bold(label)} ${msg}`;
}

/**
 * =========================================================
 * LOGGER
 * =========================================================
 */
export const logger = {
  error(msg) {
    if (!shouldLog.error) return;

    const output =
      msg instanceof Error ? msg.stack || msg.message : String(msg);

    console.error(`${chalk.red.bold("ERROR")} ${output}`);
  },

  success(msg) {
    if (!shouldLog.success) return;
    console.log(format("success", chalk.green, "SUCCESS", msg));
  },

  warn(msg) {
    if (!shouldLog.warn) return;
    console.log(format("warn", chalk.yellow, "WARN", msg));
  },

  info(msg) {
    if (!shouldLog.info) return;
    console.log(format("info", chalk.cyan, "INFO", msg));
  },

  verbose(msg) {
    if (!shouldLog.verbose) return;
    console.log(format("verbose", chalk.gray, "VERBOSE", msg));
  },

  debug(msg) {
    if (!shouldLog.debug) return;
    console.log(format("debug", chalk.magenta, "DEBUG", msg));
  },
};
