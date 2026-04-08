# PRECOP-NODE (v1.0.0)
## Sovereign Bitcoin Layer-2 Rollup & Simplicity Execution Environment
## Author: @laz1m0v

```text
    ____  ____  __________  ____  ____     _   ______  ____  ______
   / __ \/ __ \/ ____/ __ \/ __ \/ __ \   / | / / __ \/ __ \/ ____/
  / /_/ / /_/ / __/ / / / / / / / /_/ /  /  |/ / / / / / / / __/   
 / ____/ _, _/ /___/ /_/ / /_/ / ____/  / /|  / /_/ / /_/ / /___   
/_/   /_/ |_/_____/\____/\____/_/      /_/ |_/\____/_____/_____/   

          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⠟⠛⠉⠉⠉⠛⠻⢿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⣍⠻⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⣄⠛⢿⣶⣄⣠⡾⣧⡀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⣦⡉⠻⣫⣾⡽⣷⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⣀⣀⡀⠀⠀⠀⠀⣀⣀⡀⠀⠸⣿⠻⣿⣾⡿⠃⠹⣿⣷⡀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⣿⣇⠀⠉⠀⠀⠀⠈⠛⠛⠒⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠃⢀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⡀⠘⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⡿⠿⠟⠋⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠙⠛⠿⢿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⢀⣠⣴⣾⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣷⣦⣄⡀⠀⠀⠀⠀
          ⠀⣀⣴⣾⣿⣛⣁⣤⣤⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣠⣤⣌⣛⣿⣷⣦⣀⠀
          ⣼⡿⣿⣿⣿⣿⣿⣿⠋⠉⢹⡿⠻⣿⣿⡶⠒⠒⠲⣶⣶⣶⣶⣶⣶⡶⠖⠒⠲⢾⣿⣿⠟⢿⡏⠉⠙⣿⣿⣿⣿⣿⣿⢿⣷
          ⢹⣷⡙⢿⣿⣿⠾⠍⠁⠀⣾⠇⠀⢻⠀⢈⣻⣷⣶⣤⣤⡽⠟⢯⣤⣤⣴⣾⣿⡁⠀⡟⠀⠘⣷⠀⠈⠩⠷⣿⣿⡿⢋⣾⡟
          ⠀⠙⢿⣶⣭⣛⡿⠷⠤⣼⠏⢠⢶⣾⠀⠀⠙⠓⢦⣼⣿⡇⠀⢸⣿⣧⣴⠟⠋⠀⠀⣿⡄⡄⠹⣧⠤⠾⠿⣛⣭⣴⡿⠋⠀
          ⠀⠀⠀⠈⠛⠻⠿⣷⣶⠟⢰⡏⢸⣇⠀⠀⠀⠈⠉⢉⣹⠇⠀⠘⣏⡉⠉⠁⠀⠀⠀⢸⡇⢹⡆⠻⣶⣾⠿⠟⠛⠉⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⢠⡏⢠⡟⠀⣼⣿⣄⠀⠀⠀⡼⠋⠻⠀⠀⠀⠾⠉⢳⡀⠀⠀⣠⣿⣷⠀⢹⡄⢹⣆⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⢀⣟⣠⡿⢀⣼⡇⢹⣝⡷⣤⣼⣳⠴⠛⠳⠤⠔⠛⠦⣞⣷⣤⢴⣫⡟⠸⣷⡀⢿⣄⣻⡀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠸⢋⣿⠁⣼⢹⣆⠀⠉⠛⠛⠉⠁⠀⠀⣀⣿⣄⠀⠀⠀⠉⠛⠛⠉⠀⢠⡏⢧⠀⢿⡝⠇⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⣼⡇⣰⠃⠈⢿⣦⣄⣀⣀⣀⣤⡴⠞⠋⠉⠉⠳⢦⣤⣀⣀⣀⣠⣴⡿⠁⠘⣦⢸⣷⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⢿⣿⡏⢠⠄⢸⣧⠉⠉⢻⣀⣠⡶⠞⠛⠉⠛⠳⢶⣤⣀⡟⠉⠉⢸⡇⠀⡄⢹⡿⠟⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣡⡏⠀⡄⢿⡀⠀⠀⠛⠉⠀⠀⠀⠀⠀⠀⠀⠉⠛⠁⠀⢀⡿⢡⡀⢹⣬⡇⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠸⡿⣇⢸⣿⢸⣷⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣾⡇⣼⣧⣸⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⠹⣿⡏⡿⣧⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣾⣿⠻⣿⠏⢿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠁⠀⠻⣿⣦⣾⠀⠀⠀⠀⠀⣶⣤⡟⠟⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⢻⣧⡀⠀⠀⣼⡿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣦⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
+-----------------------------------------------------------------+
|  VIRES IN NUMERIS | ZERO-TRUST L2 | UTREEXO POWERED SENTINEL    |
+-----------------------------------------------------------------+
```

### I. ABSTRACT
Precop-Node is a deterministic Layer-2 state machine anchored to the Bitcoin timechain. It initiates its canonical state from the **Ordi Genesis (Block 779,832)**, extracting L1 events via a high-performance binary parser. By leveraging Utreexo proofs and Simplicity-based smart contracts (TUSM), Precop-Node ensures absolute mathematical consensus without reliance on centralized indexers or trusted third parties.

---

### II. ARCHITECTURAL HEMISPHERES

The system operates as a hybrid Rust/TypeScript stack, optimized for P2P resilience and execution safety.

1.  **H1: THE SENTINEL (L1 Defense)**
    A specialized fork of the Floresta Utreexo node. It operates as a hardened **Sovereign Pioneer**, peering with trusted participants to mitigate Sybil and Eclipse attacks.
2.  **H2: THE HARVESTER (Extraction)**
    A multi-threaded binary parser that ingests raw block hex. It enforces the **Queen's Seal**: any TUSM transaction failing to pay the protocol fee to the Taproot Vault (`bc1p...`) at `Vout[1]` is discarded from the L2 state.
3.  **H3: THE BITMACHINE (Execution)**
    The Simplicity VM environment. It executes `.simf` contracts validated against SHA-256 binary fingerprints. Determinism is guaranteed through alphabetical JSON key sorting and strictly ordered block sequencing.
4.  **H4: THE VOX (API & Metrics)**
    A hardened interface providing real-time sync telemetry, state-hash verification, and sub-10ms block processing latency monitoring.

---

### III. SOVEREIGN CONFIGURATION (V36 REAPER GRADING)

## 👸 Sovereign One-Click Ignition (Recommended)

This Bastion is engineered for **Absolute Autonomy**. It functions as a self-contained unit, detecting your architecture, downloading the necessary blade (binary), and securing the network with dynamic secrets.

### 📥 One-Click Installation
1.  **Clone the Bastion**:
    ```bash
    git clone https://github.com/BitcoinWorldTrustFoundation/precop-node.git
    cd precop-node
    ```

2.  **Ignite Everything**:
    ```bash
    chmod +x scripts/*.sh
    ./scripts/ignite_one_click.sh
    ```

*This single command will:*
*   **Identify HW** (Intel vs Apple Silicon vs Linux).
*   **Download Blade** (Pulls the latest compatible binaire from GitHub).
*   **Forge Bastion** (Generates 32-hex RPC secrets and Dual-Stack IPv6 config).
*   **Force Connectivity** (Binds to `[::]:8332` for global peer discovery).
*   **Launch Radar** (Ready to be detected by the "Crimson Eye" Dashboard).

---

## 🔱 The Reaper Engine (Deep Witness Indexing)

Precop-Node (v1.0.3+) includes the **Reaper V36** logic, specifically designed to bypass the limitations of standard indexers.
- **Deep Witness Scanning**: Correctly parses Ordinals envelopes (`6f7264`) spread across multiple witness stack items.
- **BRC-20/Runes Extraction**: Automated harvesting of legacy OP_RETURN and modern Runestone injections.
- **High-Velocity Parallelism**: Leverages multi-threaded workers to reach **3000+ blocks per minute** during historical indexing.

---

### IV. NETWORK ARCHITECTURE: THE SWARM

To become a **Frontline Sentinel**, ensure your firewall allows **Port 8333 (P2P)**.
- **Dual-Stack Default**: New nodes bind to `[::]` to handle both IPv4 and IPv6 traffic.
- **Peer Route Discovery**: Nodes with the `/Precop:1.0.0/` signature are automatically prioritized by the Dashboard's **Crimson Eye** for the sovereign handshake.

---

### V. API COCKPIT (THE VOX)

Monitor the ingestion from Block 779,832 in real-time:

* `GET /api/v1/sync`: Returns current L1 height, L2 height, lag, and processing velocity.
* `GET /api/v1/state`: Returns the current canonical `stateHash`.
* `GET /api/v1/market/:tick`: Retrieves deterministic transaction data.

---

### VI. DISCLAIMER

This software is experimental. It is provided "AS IS", without warranty of any kind. High risk of permanent L2 state loss or financial loss if misconfigured. The authors take no responsibility for the loss of Bitcoin or state corruption due to consensus failure or reorgs. 

**Vires in Numeris.** 🗽🛡️🏁

// EOF
