# Setup all development tools: Python env, pre-commit.
# Windows (PowerShell). Verifies system dependencies before setup.
# Stops on first error (ErrorActionPreference = Stop).

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Tools = Join-Path $Root "tools"

# === System Tool Verification ===
Write-Host "Checking system dependencies..."
$RequiredTools = @("cmake", "ninja", "git", "python")
$Missing = @()

foreach ($tool in $RequiredTools) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        $Missing += $tool
    }
}

if ($Missing.Count -gt 0) {
    Write-Host "Missing required tools: $($Missing -join ', ')"
    Write-Host "Install them and make sure they are on your PATH."
    exit 1
}

Write-Host "All system dependencies found."
Write-Host ""

# === Python Environment ===
Write-Host "Setting up Python environment..."
try {
    python "$Tools/setup_python_env.py"
} catch {
    Write-Host "Python environment setup failed. Check the output above for details."
    exit 1
}

# === Pre-commit Hooks ===
Write-Host "Configuring pre-commit hooks..."
try {
    python "$Tools/install_precommit.py"
} catch {
    Write-Host "Pre-commit setup failed. Check the output above for details."
    exit 1
}

Write-Host ""
Write-Host "Setup complete. Initialize the .venv in your terminal to start using the development environment."
Write-Host ""
