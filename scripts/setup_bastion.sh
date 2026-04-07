#!/bin/bash
# 🛠️ SETUP BASTION - HARDENED INITIALIZER (v6800)
# This script prepares the repository for a fresh start with dynamic secrets.

# Determining project root dynamically
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DASHBOARD_DIR="$PROJECT_ROOT/../precop-dashboard"

echo "🏗️  FORGING DIRECTORY STRUCTURE..."
mkdir -p "$PROJECT_ROOT/bin"
mkdir -p "$PROJECT_ROOT/scripts"
mkdir -p "$PROJECT_ROOT/node-config"
mkdir -p "$PROJECT_ROOT/data"

# 🔐 1. GENERATE SOVEREIGN SECRET (32 Hex Chars)
RPC_PASSWORD=$(openssl rand -hex 16)
echo "✅ SOVEREIGN SECRET GENERATED."

# 📄 2. INITIALIZE CONFIG FROM TEMPLATE
if [ ! -f "$PROJECT_ROOT/node-config/floresta.toml" ]; then
    if [ -f "$PROJECT_ROOT/node-config/floresta.toml.example" ]; then
        cp "$PROJECT_ROOT/node-config/floresta.toml.example" "$PROJECT_ROOT/node-config/floresta.toml"
        # Injecting the secret into the TOML
        # Note: using a temporary file for cross-platform 'sed' compatibility if needed
        sed "s/{{RPC_PASSWORD}}/$RPC_PASSWORD/g" "$PROJECT_ROOT/node-config/floresta.toml" > "$PROJECT_ROOT/node-config/floresta.toml.tmp"
        mv "$PROJECT_ROOT/node-config/floresta.toml.tmp" "$PROJECT_ROOT/node-config/floresta.toml"
        echo "✅ RPC Configuration initialized with dynamic secret."
    else
        echo "🚨 ERROR: floresta.toml.example not found. Please ensure the template exists."
    fi
fi

# 🔑 3. GENERATE .env FOR DASHBOARD SYNC
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo "RPC_USER=floresta" > "$PROJECT_ROOT/.env"
    echo "RPC_PASS=$RPC_PASSWORD" >> "$PROJECT_ROOT/.env"
    echo "RPC_HOST=127.0.0.1" >> "$PROJECT_ROOT/.env"
    echo "RPC_PORT=8332" >> "$PROJECT_ROOT/.env"
    echo "✅ Local .env generated for the Bastion."
fi

# 🌉 4. COCKPIT SYNCHRONIZATION
if [ -d "$DASHBOARD_DIR" ]; then
    cp "$PROJECT_ROOT/.env" "$DASHBOARD_DIR/.env"
    echo "✅ Dashboard synchronized with Sovereign Secrets."
else
    echo "⚠️  Dashboard folder not found at $DASHBOARD_DIR. Remember to copy .env manually."
fi

# 🚀 5. PERMISSIONS
if [ -f "$PROJECT_ROOT/bin/precopscan-node" ]; then
    chmod +x "$PROJECT_ROOT/bin/precopscan-node"
    echo "✅ BINARY READY IN ./bin/"
fi
chmod +x "$PROJECT_ROOT/scripts/"*.sh

echo "✨ SETUP COMPLETE. YOU ARE READY TO IGNITE."
