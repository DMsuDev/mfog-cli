import { FRAMEWORKS } from "../core/registry/index.js";

export function validateFramework(value) {
  const exists = FRAMEWORKS.some((f) => f.value === value);

  return exists || "Invalid framework";
}
