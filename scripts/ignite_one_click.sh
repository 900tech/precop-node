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
        BINARY_NAME="precop-node-linux-x86_64"
        [[ "$HW_TYPE" == "aarch64" ]] && BINARY_NAME="precop-node-linux-arm64"
        LOCAL_BINARY="$BIN_DIR/precop-node"
        ;;
    Darwin)
        echo "🍎 MacOS detected ($HW_TYPE). Fetching Apple Sentinel..."
        BINARY_NAME="precop-node-macos-x86_64"
        [[ "$HW_TYPE" == "arm64" ]] && BINARY_NAME="precop-node-macos-arm64"
        LOCAL_BINARY="$BIN_DIR/precop-node"
        ;;
    MINGW*|CYGWIN*|MSYS*)
        echo "🪟 Windows detected. Fetching Windows Sentinel..."
        BINARY_NAME="precop-node-windows.exe"
        LOCAL_BINARY="$BIN_DIR/precop-node.exe"
        ;;
    *)
        echo "🚨 Unsupported OS: $OS_TYPE"
        exit 1
        ;;
esac

if [ ! -f "$LOCAL_BINARY" ]; then
    DOWNLOAD_URL="$REPO_URL/releases/download/$RELEASE_TAG/$BINARY_NAME"
    echo "📥 Downloading binary from $DOWNLOAD_URL..."
    curl -L "$DOWNLOAD_URL" -o "$LOCAL_BINARY"
    chmod +x "$LOCAL_BINARY"
else
    echo "✅ Binary already present in $LOCAL_BINARY."
fi

# 🏗️ 3. FORGE THE FULL-STACK (L2 & Dashboard)
echo "🏗️  FORGING FULL-STACK REAPER ENGINE..."

# --- 🟢 NODE.JS & NPM CHECK ---
if ! command -v npm &> /dev/null; then
    echo "⚠️  WARNING: Node.js/NPM not found. Skip L2/Dashboard setup."
else
    echo "✅ Node.js detected. Synchronizing modules..."
    
    # 1. PRECOP-INDEXER
    if [ -d "$PROJECT_ROOT/../precop-indexer" ]; then
        echo "📦 Preparing Indexer..."
        (cd "$PROJECT_ROOT/../precop-indexer" && npm install --silent && npx prisma db push --accept-data-loss --silent && npx prisma generate --silent)
        echo "✅ Indexer Alchemy Complete."
    fi

    # 2. PRECOP-DASHBOARD
    if [ -d "$PROJECT_ROOT/../precop-dashboard" ]; then
        echo "📦 Preparing Dashboard..."
        (cd "$PROJECT_ROOT/../precop-dashboard" && npm install --silent && npx prisma generate --silent)
        echo "✅ Dashboard Alchemy Complete."
    fi
fi

# --- 🔵 DATABASE CHECK & FORGE ---
if ! command -v psql &> /dev/null; then
    echo "🏗️  PostgreSQL not found. Attempting Sovereign Installation..."
    case "$OS_TYPE" in
        Linux)
            sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib
            sudo service postgresql start
            ;;
        Darwin)
            brew install postgresql@14
            brew services start postgresql@14
            ;;
        *)
            echo "⚠️  Please install PostgreSQL manually for your OS."
            ;;
    esac
fi

if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL detected. Verifying Vault..."
    # 🕵️ Check if the database exists, create if not
    DB_EXISTS=$(psql -lqt | cut -d \| -f 1 | grep -qw precopscan_vault && echo "yes" || echo "no")
    if [ "$DB_EXISTS" == "no" ]; then
        echo "🏺 Creating the Sovereign Vault: precopscan_vault..."
        createdb precopscan_vault || sudo -u postgres createdb precopscan_vault || echo "🚨 Failed to create DB. Please create 'precopscan_vault' manually."
    else
        echo "✅ Sovereign Vault detected."
    fi
fi

# 🏗️ 4. BASTION SETUP (Sentinel Logic)
echo "🏗️  Running Sentinel setup..."
bash "$PROJECT_ROOT/scripts/setup_bastion.sh"

# 🚀 5. FINAL IGNITION (L1)
echo "🚀 Igniting Precop Sentinel..."
bash "$PROJECT_ROOT/scripts/ignite_precop.sh"

# 🛰️ 6. TELEMETRY HEALTH CHECK
echo "🔍 Performing Telemetry Handshake..."
RPC_PASS=$(grep "password" "$PROJECT_ROOT/node-config/floresta.toml" | cut -d '"' -f 2)
HEALTH_CHECK=$(curl --silent --user "floresta:$RPC_PASS" -d '{"jsonrpc":"1.0","id":"probe","method":"getblockchaininfo","params":[]}' http://127.0.0.1:8332 | grep "blocks")

if [ -n "$HEALTH_CHECK" ]; then
    echo "✅ API CORE RESPONDING (JSON-RPC :8332)."
    echo "✨ FULL-STACK SUCCESSFUL. MISSION ACCOMPLISHED."
else
    echo "⚠️  WARNING: Sentinel ignited but API is slow to respond. Check node.log."
fi

echo "📜 Watch logs with: tail -f node.log"
