#!/usr/bin/env python3
"""Install pre-commit hooks if running in a Git repository.

Cross-platform support: Windows, Linux, macOS.
Skips hook installation gracefully if not in a Git repo.
Requires: Python 3.8+, Git command available, .git directory present.
"""
import subprocess
import sys
from pathlib import Path
import shutil

# === Version Check ===
if sys.version_info < (3, 8):
    print("Python 3.8 or newer is required. Current version: {}.{}".format(
        sys.version_info.major, sys.version_info.minor))
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
VENV = ROOT / ".venv"

# Platform detection
IS_WINDOWS = sys.platform == "win32"
VENV_BIN = VENV / ("Scripts" if IS_WINDOWS else "bin")


def venv_exec(name: str) -> Path:
    """Get path to executable in venv (auto-adds .exe on Windows)."""
    return VENV_BIN / (name + (".exe" if IS_WINDOWS else ""))


def run(cmd):
    """Execute command, exit on failure."""
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError:
        print(f"Command failed: {' '.join(str(c) for c in cmd)}")
        sys.exit(1)


def is_git_available() -> bool:
    """Check if git command is available on PATH."""
    return shutil.which("git") is not None


def is_git_repo() -> bool:
    """Check if .git directory exists in project root."""
    return (ROOT / ".git").exists()


def main():
    print("\n=== Pre-commit Hook Installation ===")

    # Install pre-commit package from venv
    print("Installing pre-commit package...")
    run([str(venv_exec("pip")), "install", "pre-commit"])

    # Verify git is available and repo is initialized
    if not is_git_available():
        print("\nGit not found on PATH. Hooks require Git to be installed.")
        print("Run 'pre-commit install' manually once Git is available.\n")
        return

    if not is_git_repo():
        print("\nNo .git directory found. Hooks are only installed inside a Git repository.")
        print("Run 'pre-commit install' after initializing the repository with 'git init'.\n")
        return

    # Install hooks into .git/hooks
    print("\nInstalling git hooks...")
    run([str(venv_exec("pre-commit")), "install"])

    print("\nPre-commit hooks installed.")


if __name__ == "__main__":
    main()
