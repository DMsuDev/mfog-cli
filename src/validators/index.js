export * from "./projectName.js";
export * from "./semver.js";
export * from "./framework.js";

export function composeValidators(...validators) {
  return async (value, answers) => {
    for (const validator of validators) {
      const result = await validator(value, answers);

      if (result !== true) {
        return result;
      }
    }

    return true;
  };
}
