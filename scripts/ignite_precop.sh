#!/bin/bash
# 🛰️ UNIVERSAL IGNITION SCRIPT - PRECOP PIONEER RC (v6640)

# 🚀 CLEANING PREVIOUS INSTANCE (Exorcism)
echo "🛡️ Releasing database locks..."
# On tue uniquement le binaire exact, pas le script lui-même
pkill -x "precop-node" || true
pkill -9 "precop-node" || true
pkill -9 florestad || true
sleep 2

echo "🏹 AWAKENING SOVEREIGN SENTINEL (PORTABLE MODE)..."
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
echo "📡 DATA DIR: $DATA_DIR"

# 🏗️ AUTOMATED FULL-STACK SYNC (Sovereign Swarm Standalone)
# Note: In Standalone mode, we use the local .env as a single source of truth.
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo "📝 Generating fresh Sovereign .env..."
    
    echo "🏷️  NAMING YOUR SOVEREIGN SENTINEL..."
    read -p "Enter a unique name for this node (ex: ALPHA): " NODE_NAME
    NODE_NAME=${NODE_NAME:-"STATION-01"}
    NODE_ID="PRECOP-${NODE_NAME}-MAINNET"
    NODE_ALIAS="$NODE_ID"

    cat <<EOF > "$PROJECT_ROOT/.env"
RPC_URL="http://127.0.0.1:8332"
RPC_USER="floresta"
RPC_PASSWORD="8e5cde5295800d10b02b297085832da9"
DASHBOARD_URL="https://interproportional-tameika-isorhythmically.ngrok-free.dev"
NODE_ALIAS="$NODE_ALIAS"
NODE_ID="$NODE_ID"
EOF
else
    # 🕵️ Incremental hardening: ensure Swarm variables are present and up-to-date
    if grep -q "DASHBOARD_URL=\"http://localhost:3001\"" "$PROJECT_ROOT/.env"; then
        echo "📡 Redirecting Radar Signal to permanent Ngrok endpoint..."
        sed -i "s|DASHBOARD_URL=\"http://localhost:3001\"|DASHBOARD_URL=\"https://interproportional-tameika-isorhythmically.ngrok-free.dev\"|g" "$PROJECT_ROOT/.env"
    fi
    
    if ! grep -q "NODE_ID" "$PROJECT_ROOT/.env" || grep -q "NODE_ID=\"sentinel-" "$PROJECT_ROOT/.env"; then
        echo "🏷️  NAMING YOUR SOVEREIGN SENTINEL (Migration required)..."
        # On sauvegarde les autres variables si elles existent
        EXISTING_VARS=$(grep -E "RPC_URL|RPC_USER|RPC_PASSWORD|DATABASE_URL|DASHBOARD_URL" "$PROJECT_ROOT/.env" || true)
        
        read -p "Enter a unique name for this node (ex: ALPHA): " NODE_NAME
        NODE_NAME=${NODE_NAME:-"STATION-01"}
        NODE_ID="PRECOP-${NODE_NAME}-MAINNET"
        NODE_ALIAS="$NODE_ID"

        # On reconstruit le .env proprement
        echo "$EXISTING_VARS" > "$PROJECT_ROOT/.env"
        echo "NODE_ALIAS=\"$NODE_ALIAS\"" >> "$PROJECT_ROOT/.env"
        echo "NODE_ID=\"$NODE_ID\"" >> "$PROJECT_ROOT/.env"
        echo "✅ Identity Migrated to: $NODE_ID"
    fi
fi

# Load local environment
export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)

# 🚀 Ignition
chmod +x "$BINARY"
echo "🚀 Ignition globalisée via floresta.toml..."
# On force les adresses [::] via CLI pour garantir le mode Sentinel public (Dual-Stack).
nohup "$BINARY" -c "$CONFIG" --data-dir "$DATA_DIR" --rpc-address "[::]:8332" --electrum-address "[::]:50001" -d > "$PROJECT_ROOT/node.log" 2>&1 &

echo "⏳ Awakening the Sentinel deep-state (30s cooldown)..."
sleep 5
if pgrep -f "precop-node" > /dev/null; then
    echo "✅ Sentinel is breathing. Initializing the Swarm handshake..."
    
    # 🛰️ SOVEREIGN SEED HANDSHAKE (V38-BEACON)
    SOVEREIGN_SEED="[2a0a:4cc0:0:21b1:400:e0ff:fe79:9797]:8333"
    RPC_USER="floresta"
    RPC_PASS=$(grep "password" "$CONFIG" | cut -d '"' -f 2)
    
    echo "📡 Connecting to Sovereign Seed (Persistent Mode): $SOVEREIGN_SEED..."
    curl --silent --user "$RPC_USER:$RPC_PASS" -d "{\"jsonrpc\":\"1.0\",\"id\":\"swarm\",\"method\":\"addnode\",\"params\":[\"$SOVEREIGN_SEED\", \"add\"]}" http://127.0.0.1:8332 > /dev/null
    
    # 📡 STANDALONE SWARM BEACON IGNITION
    echo "📻 Awakening the Radar Beacon (Standalone OTT)..."
    # TSX is the modern, zero-config replacement for ts-node that handles ESM/CJS perfectly
    nohup npx --yes tsx "$PROJECT_ROOT/src/network/sentinel-beacon.ts" > "$PROJECT_ROOT/beacon.log" 2>&1 &
    
    echo "✨ Logs available at $PROJECT_ROOT/node.log"
else
    echo "🚨 ERROR: Sentinel failed to ignite. Check $PROJECT_ROOT/node.log for details."
fi
