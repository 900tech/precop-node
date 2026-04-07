#!/bin/bash
# 🛰️ UNIVERSAL IGNITION SCRIPT - PRECOP PIONEER RC (v6640)

# Determining project root dynamically
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Standardized Relative Paths
BINARY="$PROJECT_ROOT/bin/precop-node"
CONFIG="$PROJECT_ROOT/node-config/floresta.toml"
DATA_DIR="$PROJECT_ROOT/data"

# Check if binary exists
if [ ! -f "$BINARY" ]; then
    echo "🚨 ERROR: Binary not found in $PROJECT_ROOT/bin/"
    echo "💡 Please place the 'precop-node' binary in the bin/ folder."
    exit 1
fi

# 🗡️ Cleanup
pkill -9 florestad || true
pkill -9 precop-node || true

echo "🏹 AWAKENING SOVEREIGN SENTINEL (PORTABLE MODE)..."
echo "🛡️ PROJECT ROOT: $PROJECT_ROOT"
echo "📡 DATA DIR: $DATA_DIR"

# 🚀 Ignition
chmod +x "$BINARY"
nohup "$BINARY" --config-file "$CONFIG" --data-dir "$DATA_DIR" -d > "$PROJECT_ROOT/node.log" 2>&1 &

echo "✨ Sentinel ignited in background. Logs available at $PROJECT_ROOT/node.log"
