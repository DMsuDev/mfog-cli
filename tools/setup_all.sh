#!/usr/bin/env bash
# Setup all development tools: Python env, pre-commit.
# Cross-platform (Linux/macOS). Verifies system dependencies before setup.
# Stops on first error (set -euo pipefail).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TOOLS_DIR="$ROOT_DIR/tools"

# === System Tool Verification ===
# Check for required build tools before proceeding
echo "Checking system dependencies..."
MISSING=()
for tool in cmake ninja gcc g++ curl zip unzip tar pkg-config git python3; do
    command -v "$tool" &>/dev/null || MISSING+=("$tool")
done

if [ ${#MISSING[@]} -ne 0 ]; then
    echo "Missing required tools: ${MISSING[*]}"
    echo ""
    echo "Install them on Debian/Ubuntu with:"
    echo "  sudo apt install -y build-essential cmake ninja-build curl \\"
    echo "    zip unzip tar pkg-config git python3 libxinerama-dev libxcursor-dev \\"
    echo "    xorg-dev libglu1-mesa-dev"
    echo ""
    exit 1
fi

echo "All system dependencies found."
echo ""

# === Python Environment ===
echo "Setting up Python environment..."
if ! python3 "$TOOLS_DIR/setup_python_env.py"; then
    echo "Python environment setup failed. Check the output above for details."
    exit 1
fi

# === Pre-commit Hooks ===
echo "Configuring pre-commit hooks..."
if ! python3 "$TOOLS_DIR/install_precommit.py"; then
    echo "Pre-commit setup failed. Check the output above for details."
    exit 1
fi

echo ""
echo "Setup complete. Run: cmake --preset release"
echo ""
