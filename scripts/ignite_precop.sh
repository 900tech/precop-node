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

# 🚀 Ignition
chmod +x "$BINARY"
echo "🚀 Ignition globalisée via floresta.toml..."
# On force les adresses [::] via CLI pour garantir le mode Sentinel public (Dual-Stack).
# La redirection de port 8333 est activée - Note: Ce binaire utilise le mode Client-Only pour le P2P.
nohup "$BINARY" -c "$CONFIG" --data-dir "$DATA_DIR" --rpc-address "[::]:8332" --electrum-address "[::]:50001" -d > "$PROJECT_ROOT/node.log" 2>&1 &

echo "⏳ Awakening the Sentinel deep-state (30s cooldown)..."
sleep 5
if pgrep -f "precop-node" > /dev/null; then
    echo "✅ Sentinel is breathing. Initializing the Swarm handshake..."
    
    # 🛰️ SOVEREIGN SEED HANDSHAKE (V38-BEACON)
    # On connecte automatiquement le nœud local à la balise VPS (Sovereign Seed)
    SOVEREIGN_SEED="[2a0a:4cc0:0:21b1:400:e0ff:fe79:9797]:8333"
    RPC_USER="floresta"
    RPC_PASS=$(grep "password" "$CONFIG" | cut -d '"' -f 2)
    
    echo "📡 Connecting to Sovereign Seed (Persistent Mode): $SOVEREIGN_SEED..."
    curl --silent --user "$RPC_USER:$RPC_PASS" -d "{\"jsonrpc\":\"1.0\",\"id\":\"swarm\",\"method\":\"addnode\",\"params\":[\"$SOVEREIGN_SEED\", \"add\"]}" http://127.0.0.1:8332 > /dev/null
    
    # 📡 OTT SWARM BEACON IGNITION
    echo "📻 Awakening the Radar Beacon (OTT Swarm)..."
    INDEXER_DIR="$(cd "$PROJECT_ROOT/../precop-indexer" && pwd)"
    nohup npx ts-node "$INDEXER_DIR/src/sentinel-beacon.ts" > "$PROJECT_ROOT/beacon.log" 2>&1 &
    
    echo "✨ Logs available at $PROJECT_ROOT/node.log"
else
    echo "🚨 ERROR: Sentinel failed to ignite. Check $PROJECT_ROOT/node.log for details."
fi
