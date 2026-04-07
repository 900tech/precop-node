import axios from "axios";

// 🛡️ PRECOP SENTINEL: AUTO-WHITELIST ENGINE (v3730)
// Automatically adopts and whitelists any node carrying the Sovereign Signature.

const PRECOP_AGENT = "/Precop:1.0.0/";
const RPC_URL = process.env.FLORESTA_RPC_URL || "http://127.0.0.1:8332";
const RPC_USER = process.env.FLORESTA_RPC_USER || "floresta";
const RPC_PASS = process.env.FLORESTA_RPC_PASS || "tonmotdepasseultrasecure123!";

export class SentinelWatcher {
    private static isScanning = false;

    static async scanAndWhitelist() {
        if (this.isScanning) return;
        this.isScanning = true;

        try {
            // 1. Audit incoming peer connections
            const response = await axios.post(RPC_URL, {
                jsonrpc: "1.0",
                id: "watcher",
                method: "getpeerinfo",
                params: []
            }, {
                auth: { username: RPC_USER, password: RPC_PASS }
            });

            const peers = response.data.result;

            for (const peer of peers) {
                // 🕵️ DETECTION: Look for the Sovereign Signature
                if (peer.subver === PRECOP_AGENT || peer.subver.includes("Precop")) {
                    console.log(`✨ SOUVEREIGN NODE DETECTED: IP ${peer.addr} | Agent: ${peer.subver}`);
                    
                    // 🏹 ADOPTION: Whitelist the peer automatically
                    // Note: Floresta uses 'addnode' or specific internal whitelisting
                    await axios.post(RPC_URL, {
                        jsonrpc: "1.0",
                        id: "whitelist",
                        method: "addnode",
                        params: [peer.addr.split(":")[0], "add"]
                    }, {
                        auth: { username: RPC_USER, password: RPC_PASS }
                    });

                    console.log(`🛡️ PEER ${peer.addr} ADOPTED BY THE FOUNDATION SWARM.`);
                }
            }
        } catch (error: any) {
            console.error(`🚨 WATCHER ERROR: ${error.message}`);
        } finally {
            this.isScanning = false;
        }
    }

    static start(intervalMs: number = 10000) {
        console.log(`🏹 SENTINEL WATCHER: Monitoring Peer Flow (Agent: ${PRECOP_AGENT})`);
        setInterval(() => this.scanAndWhitelist(), intervalMs);
    }
}
