#!/bin/bash
# 👸 SOVEREIGN ONE-CLICK IGNITION v1.1.0
# The ultimate entry point for the Precop Sentinel.

# 🏹 1. IDENTIFY THE WORLD
OS_TYPE=$(uname -s)
HW_TYPE=$(uname -m)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BIN_DIR="$PROJECT_ROOT/bin"
REPO_URL="https://github.com/BitcoinWorldTrustFoundation/precop-node"
RELEASE_TAG="v1.0.3"

mkdir -p "$BIN_DIR"

echo "🏹 AWAKENING SOVEREIGN SENTINEL (ONE-CLICK MODE)..."

# 🛰️ 2. FETCH THE BLADE (Download binary)
case "$OS_TYPE" in
    Linux)
        echo "🐧 Linux detected ($HW_TYPE). Fetching Universal Linux Sentinel..."
        BINARY_PATH="precop-node-linux"
        ;;
    Darwin)
        echo "🍎 MacOS detected ($HW_TYPE). Fetching Apple Sentinel..."
        BINARY_PATH="precop-node-macos"
        ;;
    *)
        echo "🚨 Unsupported OS: $OS_TYPE."
        exit 1
        ;;
esac

DOWNLOAD_URL="$REPO_URL/releases/download/$RELEASE_TAG/$BINARY_PATH"

if [ ! -f "$BIN_DIR/precop-node" ]; then
    echo "📡 Downloading $BINARY_PATH from $RELEASE_TAG..."
    curl -L "$DOWNLOAD_URL" -o "$BIN_DIR/precop-node"
    chmod +x "$BIN_DIR/precop-node"
else
    echo "✅ Binary already present in ./bin/precop-node."
fi

# 🛡️ 3. FORGE THE BASTION
echo "🏗️  Running setup..."
bash "$PROJECT_ROOT/scripts/setup_bastion.sh"

# 🏹 4. IGNITE THE SENTINEL
echo "🚀 Igniting Precop..."
bash "$PROJECT_ROOT/scripts/ignite_precop.sh"

echo "✨ ONE-CLICK SUCCESSFUL. MISSION ACCOMPLISHED."
echo "📜 Watch logs with: tail -f node.log"
