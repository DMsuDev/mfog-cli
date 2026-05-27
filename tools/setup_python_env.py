#!/usr/bin/env python3
"""Setup Python virtual environment and install dependencies.

Cross-platform support: Windows, Linux, macOS.
Automatic venv path resolution based on platform.
Validates Python version >= 3.8 before proceeding.
"""
import subprocess
import sys
from pathlib import Path

# === Version Check ===
if sys.version_info < (3, 8):
    print("Python 3.8 or newer is required. Current version: {}.{}".format(
        sys.version_info.major, sys.version_info.minor))
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
VENV_DIR = ROOT / ".venv"
REQUIREMENTS = ROOT / "requirements.txt"

# Platform detection: venv structure differs between Windows and Unix
IS_WINDOWS = sys.platform == "win32"
VENV_BIN = VENV_DIR / ("Scripts" if IS_WINDOWS else "bin")


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


def main():
    print("\n=== Python Environment Setup ===")
    print(f"Python: {sys.version_info.major}.{sys.version_info.minor} on {sys.platform}")
    print()

    # Create virtual environment if missing
    print("Creating Python virtual environment...")
    if not VENV_DIR.exists():
        run([sys.executable, "-m", "venv", str(VENV_DIR)])
        print(f"  Location: {VENV_DIR}")
    else:
        print(f"  Reusing: {VENV_DIR}")

    # Install dependencies from requirements.txt
    print("\nInstalling Python dependencies...")
    if REQUIREMENTS.exists():
        run([str(venv_exec("pip")), "install", "-r", str(REQUIREMENTS)])
    else:
        print(f"  Warning: {REQUIREMENTS} not found (optional)")

    # Install pre-commit package (required for hook installation)
    print("\nInstalling pre-commit...")
    run([str(venv_exec("pip")), "install", "pre-commit"])

    print("\nPython environment ready.\n")

if __name__ == "__main__":
    main()
