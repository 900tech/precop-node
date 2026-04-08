#!/bin/bash
# 🕳️ WORMHOLE SETUP - OTT SWARM (v37)
# Creates a secure tunnel for the Dashboard so remote Sentinels can pulse their status.

echo "🕳️  Opening the Wormhole..."

# 1. Check for Ngrok
if ! command -v ngrok &> /dev/null; then
    echo "🚨 ERROR: Ngrok not found."
    echo "💡 Install it with: brew install ngrok"
    exit 1
fi

# 2. Expose the Dashboard Port (default 3001)
echo "🚀 Exposing Dashboard on port 3001..."
echo "🛡️  COPY THE URL BELOW AND PASTE IT INTO YOUR VPS .env (DASHBOARD_URL)"
echo "------------------------------------------------------------------"
ngrok http 3001
