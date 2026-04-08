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
        
        # 🛡️ SOVEREIGN DUAL-STACK (v38)
        # We replace the hardcoded 0.0.0.0 (IPv4-only) with :: (Dual Stack)
        sed -i '' 's/address = "0.0.0.0"/address = "::"/g' "$PROJECT_ROOT/node-config/floresta.toml" 2>/dev/null || \
        sed -i 's/address = "0.0.0.0"/address = "::"/g' "$PROJECT_ROOT/node-config/floresta.toml"

        # Injecting the secret into the TOML
        sed -i '' "s/{{RPC_PASSWORD}}/$RPC_PASSWORD/g" "$PROJECT_ROOT/node-config/floresta.toml" 2>/dev/null || \
        sed -i "s/{{RPC_PASSWORD}}/$RPC_PASSWORD/g" "$PROJECT_ROOT/node-config/floresta.toml"
        
        echo "✅ Dual-Stack P2P/RPC Configuration initialized (IPv4/IPv6 ready)."
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

# 🌍 4. SWARM BEACON DETECTION (v38)
echo ""
echo "🔍 DETECTING SOVEREIGN BEACON..."
PUBLIC_IPV6=$(curl -6 -s --connect-timeout 3 ifconfig.me || echo "NOT_FOUND")
if [ "$PUBLIC_IPV6" != "NOT_FOUND" ]; then
    echo "🛰️  Global IPv6 Found: $PUBLIC_IPV6"
else
    echo "⚠️  No Global IPv6 detected. You might be behind a legacy NAT."
fi

# 🛡️ 5. PORT PROBE
if [ -x "$(command -v nc)" ]; then
    echo "⚡ PROBING PORT 8333 (P2P)..."
    if nc -z -6 localhost 8333 2>/dev/null; then
        echo "✅ PORT 8333 is reachable on IPv6."
    else
        echo "💡 TIP: Port 8333 is closed. Open it in your router and bind to '::' to become a Sentinel."
    fi
fi

# 🌉 4. COCKPIT SYNCHRONIZATION
if [ -d "$DASHBOARD_DIR" ]; then
    cp "$PROJECT_ROOT/.env" "$DASHBOARD_DIR/.env"
    echo "✅ Dashboard synchronized with Sovereign Secrets."
else
    echo "⚠️  Dashboard folder not found at $DASHBOARD_DIR. Remember to copy .env manually."
fi

# 🚀 5. PERMISSIONS
# 🛡️ BINARY ALIGNMENT
if [ -f "$PROJECT_ROOT/bin/precop-node" ]; then
    chmod +x "$PROJECT_ROOT/bin/precop-node"
    # 🔍 ARCHITECTURE VALIDATION
    OS_TYPE=$(uname -s)
    if [[ "$OS_TYPE" == "Linux" ]] && file "$PROJECT_ROOT/bin/precop-node" | grep -q "Mach-O"; then
        echo "🚨 ERROR: Incompatible Mac binary found on Linux! Running 'rm bin/precop-node' and 'ignite_one_click.sh' is recommended."
        exit 1
    fi
    echo "✅ BINARY READY AND VALIDATED."
else
    echo "⚠️  Sentinel binary not found in ./bin/. Use scripts/ignite_one_click.sh to download it."
fi

chmod +x "$PROJECT_ROOT/scripts/"*.sh

echo "✨ SETUP COMPLETE. YOU ARE READY TO IGNITE."
