const SEMVER_REGEX = /^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/;

export function validateSemver(value) {
  const version = value.trim();

  if (!version) {
    return "Version is required";
  }

  if (!SEMVER_REGEX.test(version)) {
    return "Invalid semver format (example: 1.0.0 or 1.0.0-beta)";
  }

  return true;
}
