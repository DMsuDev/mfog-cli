export function sleep(ms = 100) {
  if (process.stdout.isTTY) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return Promise.resolve();
}
