// This regex is based on the npm package name validation rules:
//
// - The name must be less than or equal to 214 characters.
// - The name must consist of lowercase letters, numbers, and hyphens.
// - The name must not start or end with a hyphen.
// - The name must not contain consecutive hyphens.
//
// See https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name for more details.

const PROJECT_NAME_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateProjectName(value) {
  const name = value.trim();

  if (!name) {
    return "Project name is required";
  }

  if (name.length > 214) {
    return "Project name is too long";
  }

  if (!PROJECT_NAME_REGEX.test(name)) {
    return "Use lowercase letters, numbers, and hyphens only";
  }

  return true;
}
