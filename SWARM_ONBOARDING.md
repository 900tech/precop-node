# 🛡️ Sovereign Sentinel Onboarding (The Swarm)

Welcome to the **Sovereign Swarm**. By running a Precop Node, you are anchoring the future of Bitcoin's L1 assets. This guide ensures you are visible to the network and the Command Dashboard.

## 🏹 1. Network Ignition (Dual-Stack)

The Precop protocol is designed for **IPv6 first**. This ensures peer-to-peer sovereignty without the limitations of IPv4 NAT.

### Requirements:
- A Global IPv6 address (run `curl -6 ifconfig.me` to verify).
- Port **8333 (TCP)** must be open in your router and firewall.

## 🛰️ 2. Becoming Visible (The Beacon)

If you have performed a `git clone`, follow these steps to ignite your sentinel:

```bash
# 1. Initialize your bastion (generates secrets and Dual-Stack config)
./scripts/setup_bastion.sh

# 2. Open your ports
# Linux (UFW):
sudo ufw allow 8333/tcp
# macOS: 
# Go to System Settings -> Network -> Firewall -> Options -> Add 'precop-node'

# 3. Ignite the Sentinel
./scripts/ignite_precop.sh
```

## 📡 3. The Radar Handshake

Once your node is running, it will attempt to discover siblings automatically. If you want to announce yourself manually to a lead Dashboard:

1. Copy your public IPv6 (from the `./scripts/setup_bastion.sh` output).
2. Share it with the Swarm Master.
3. They will use the **INVOKE_HANDSHAKE** button in the Dashboard's **Crimson Eye** radar.

## 🏛️ Troubleshooting (The Silent Sentinel)

If your node does not appear on the radar:
- **Binding**: Check `node-config/floresta.toml`. Ensure `address = "::"` is set.
- **Firewall**: Use an external probe (like [IPv6 Scanner](https://ipv6scanner.com/)) to verify port 8333 is open.
- **Utreexo**: Wait for the first few blocks to sync; Floresta only starts peer exchange after initial handshake.

**Vires in Numeris.** 🏁🏎️🔥✨🏅🏅🏅
