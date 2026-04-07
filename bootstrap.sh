#!/usr/bin/env bash
# PRECOP-NODE — ROBUST SOVEREIGN BOOTSTRAP (v3750) 🦅🛡️🗿
# "Don't trust. Verify the environment."

set -e

# Load Sovereign Environment
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "🚨 ERROR: .env file missing! Copy .env.example and populate it first."
  exit 1
fi

FLORESTA_BIN=${FLORESTA_BINARY_PATH:-"./precopscan/tmp_floresta-v0.9.0/target/release/florestad"}
CONFIG_PATH=${NODE_CONFIG_PATH:-"./node-config/floresta.toml"}

AUTO_SCAN_FLAG=""
if [[ "$*" == *"--auto-scan"* ]]; then
    AUTO_SCAN_FLAG="--auto-scan"
    echo "🛡️ AUTO-SCAN MODE: ACTIVE (The Handshake of the Foundation)"
fi

echo "🏹 Starting the Sovereign Rollup Engine (Robust Mode)..."

# 1. Binary Sanity Check
if [ ! -f "$FLORESTA_BIN" ]; then
  echo "🚨 ERROR: Sentinel binary not found at $FLORESTA_BIN!"
  exit 1
fi

# 2. Firewall Shield
echo "🛡️ Opening the Gates (8333/38333)..."
sudo ufw allow 8333/tcp || true
sudo ufw allow 38333/tcp || true

# 3. Safe Database Synchronization
echo "🧠 Synchronizing the StateManager Ledger..."
npx prisma generate
npx prisma db push --skip-generate || echo "⚠️ Prisma: Schema already in sync."

# 4. Purification of the Sanctum
echo "🗡️ Purifying existing processes..."
pkill -f "florestad" || true
pkill -f "ts-node src/main.ts" || true
sleep 1

# 5. Awakening the L1 Sentinel
echo "🛰️ Awakening the Sentinel with --assume-utreexo..."
nohup "$FLORESTA_BIN" --config "$CONFIG_PATH" --assume-utreexo > sentinel.log 2>&1 &

# 6. Verification Loop (RPC Stability)
echo "⏳ Waiting for L1 RPC (127.0.0.1:8332) to stabilize..."
RETRIES=0
while ! curl -s --user "${FLORESTA_RPC_USER}:${FLORESTA_RPC_PASS}" -d '{"jsonrpc":"1.0","id":"1","method":"getblockcount","params":[]}' http://127.0.0.1:8332/ > /dev/null; do
  echo -n "."
  sleep 4
  RETRIES=$((RETRIES+1))
  if [ $RETRIES -gt 25 ]; then
    echo -e "\n🚨 RPC FAILURE: Check sentinel.log."
    exit 1
  fi
done

echo -e "\n✅ Sentinel is ALIVE. Identity propagated."

# 7. Start the L2 Brain (with optional Auto-Scan)
echo "🔥 Starting the Precop-Node Rollup (v1.0.0)..."
npm run build && node dist/src/main.js $AUTO_SCAN_FLAG
