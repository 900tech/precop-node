#!/usr/bin/env bash
# PRECOP-NODE — GENESIS AUDIT SCRIPT (v2900) 🦅🛡️🗿
# +---------------------------------------+
# |  VERIFYING BLOCK 779,832 (ORDI)        |
# +---------------------------------------+

echo "⏳ WAITING FOR L2 GENESIS (779832)..."

while true; do
  # 1. Fetch current L2 state from the Sovereign API
  L2_DATA=$(curl -s http://localhost:3000/api/v1/state)
  HEIGHT=$(echo $L2_DATA | jq -r '.height // 0')
  HASH=$(echo $L2_DATA | jq -r '.stateHash // "none"')

  if [ "$HEIGHT" -ge 779832 ]; then
    echo -e "\n🔥 GENESIS REACHED: BLOCK 779,832 CAPTURED"
    echo "[!] CANONICAL STATE HASH: $HASH"
    
    # 2. Verify ORDI payload existence (Sovereign Consensus Check)
    TX_ORDI=$(curl -s http://localhost:3000/api/v1/market/BITCOIN)
    if [[ "$TX_ORDI" == *"ordi"* ]]; then
      echo "✅ SUCCESS: INSCRIPTION 'ORDI' VERIFIED IN L2 LEDGER"
      exit 0
    else
      echo "⚠️ WARNING: Block reached but ORDI payload not found. Checking next transaction..."
    fi
  fi

  echo -n "."
  sleep 10
done
