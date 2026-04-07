#!/bin/bash
# 🛠️ BUILD FROM SOURCE - LOCAL FORGE (v6940)
# This script is the ultimate fallback for local sovereignty.

# Determining root relative to the script location
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$PROJECT_ROOT/../precopscan/tmp_floresta-v0.9.0"

echo "🏗️  CHECKING FORGE TOOLS (RUST)..."
if ! command -v cargo &> /dev/null; then
    echo "📥 Installing Rust Environment..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
fi

if [ ! -d "$SOURCE_DIR" ]; then
    echo "🚨 ERROR: Source directory not found at $SOURCE_DIR"
    exit 1
fi

echo "🔥 STARTING COMPILATION (This may take a few minutes)..."
cd "$SOURCE_DIR"
cargo build --release

echo "🛡️  MIGRATING NEWLY FORGED BINARY..."
cp target/release/precopscan-node "$PROJECT_ROOT/bin/"
chmod +x "$PROJECT_ROOT/bin/precopscan-node"

echo "✅ LOCAL BASTION FORGED SUCCESSFULLY."
