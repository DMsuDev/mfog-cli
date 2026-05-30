# Changelog

## [1.0.0] - 2026-05-30

> Rebranded from `modular-framework-offline-generator` to `@dmsudev/mfog`.
> Previous release history is preserved below for reference.

### Changed

- Renamed package to `@dmsudev/mfog`
- Migrated repository to `DMsuDev/mfog-cli`

---

## Legacy — modular-framework-offline-generator

## [1.3.2] - 2026-05-29

Internal refactor into modular CLI/services/registry layers, improved error handling, pnpm + lint tooling for contributors, `7zip-min` v3, and README/SVG updates. CLI behavior for end users is unchanged.

### Added

- modular CLI layout under `src/cli/` (`layout/`, `prompts/`)
- `src/core/services/` for template extraction, `package.json` writing, git setup, and filesystem checks
- `src/core/registry/` for framework and language choices
- `src/validators/` for project name, semver, and framework validation
- centralized logging utilities in `src/utils/logger.js`
- dedicated CLI entry at `bin/cli.js` with a public `exports` field
- ESLint flat config (`eslint.config.js`)
- markdownlint and pre-commit configuration
- `.gitattributes` for line-ending normalization and npm export-ignore rules
- SVG branding assets under `assets/logo/`

### Changed

- refactor monolithic generator flow into `installTemplate` plus a streamlined `src/index.js` entry
- move legacy `choices.js` logic into registry modules
- replace `main` + `npm run` script with `bin.mfog`, `start`, and `dev` scripts
- set `engines.node` to `>=20` and add `preferGlobal` / `publishConfig` for npm publishing
- refine `package.json` keywords and project description
- switch local development from npm to pnpm; remove `package-lock.json` in favor of `pnpm-lock.yaml`
- expand `.gitignore` patterns (including `.venv`)
- update pre-commit hook revisions and exclusion rules
- remove README framework PNGs in favor of SVG logos

### Fixes

- improve error handling and logging across prompts, extraction, and install steps
- pre-commit: spell-check and YAML formatting exclusions

### Documentation

- update README content and structure
- correct copyright holder formatting in LICENSE

### Updates

- **deps:** bump `7zip-min` from `^2.1.0` to `^3.0.1`
- **deps:** add devDependencies `@eslint/js` `^10.0.1`, `eslint` `^10.0.0`, `globals` `^17.6.0`, `prettier` `^3.8.3`
- **deps:** keep runtime packages aligned (`@inquirer/prompts`, `boxen`, `chalk`, `figlet`, `gradient-string`, `ora`)
- **tooling:** pre-commit hooks updated to `pre-commit-hooks` v6.0.0
- **tooling:** refresh lockfile during 1.3.2 dependency pass

## [1.3.1] - 2026-01-20

### Added

- Git initialization support and a confirmation prompt for initializing a git repository.
- PACKAGE_MANAGER_CHOICES option for selecting package manager during project creation.

### Changed

- Refactored project generation flow to enhance template extraction and dynamic config handling.
- extractTemplate now uses a temporary directory for extraction and has improved error handling.
- collectAnswers updated to include package manager choices and better dynamic prompts.

### Fixed

- Resolved extraction-related crashes and improved robustness of async validation/error paths.

### Removed

- Removed unused inquirer dependency.

## [1.3.0] - 2026-01-17

### Added

- Input validators for name, version, and other prompt fields to ensure proper formatting and prevent invalid values.
- A directory‑existence validator to avoid overwriting an existing project folder.
- Error‑handling logic using try + catch blocks to gracefully capture and report failures during project generation.

### Changed

- Refactored the Inquirer prompt flow to use a new logic structure for collecting user responses.
- Improved the internal prompt sequence to make the question flow more consistent and modular.

### Removed

- Previous prompt-handling logic that relied on the old response‑collection approach.

## [1.2.0] - 2026-01-15

### Added

- Support for Angular, Vue.

### Changed

- SuccessMSG updated for support new Templates.

## [1.1.0] - 2025-01-08

- Initial version with support for React and NextJS.
