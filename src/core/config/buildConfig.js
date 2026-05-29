export function buildConfig(input) {
  return {
    name: input.name,
    version: input.version || "0.1.0",

    framework: input.framework,
    language: input.language ?? "js",

    gitInit: input.gitInit ?? true,

    targetDir: `./${input.name}`,
  };
}
