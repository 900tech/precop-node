import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { callRPC } from "../rpc/floresta-rpc";

// 🏗️ STANDALONE ENV LOADING (V38.4)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

/**
 * 🛰️ STANDALONE SENTINEL BEACON (V38-STANDALONE)
 * Decoupled Radar Signal. Transmits node status independently.
 */
// Sanitization: Remove potential quotes from env variables (common in shell exports)
const DASHBOARD_URL = (process.env.DASHBOARD_URL || "http://localhost:3001").replace(/['"]+/g, '');
const NODE_ALIAS    = (process.env.NODE_ALIAS    || "SOVEREIGN-SENTINEL").replace(/['"]+/g, '');
const NODE_ID       = (process.env.NODE_ID       || "unknown-sentinel").replace(/['"]+/g, '');

async function startBeacon() {
    console.log(`📡 Démarrage du Beacon Standalone pour [${NODE_ALIAS}]...`);
    console.log(`🔗 Radar Target: ${DASHBOARD_URL}`);

    setInterval(async () => {
        try {
            // 1. On demande à Floresta où il en est (L1 Consensus)
            const info = await callRPC("getblockchaininfo");
            
            if (info.error) {
                console.error("⚠️ Beacon: Cannot reach Floresta L1.");
                return;
            }

            const currentHeight = info.result.blocks;

            // 2. On envoie le signal à la Tour de Contrôle (Dashboard)
            // Note: Uses native fetch (Node 20+)
            const resp = await fetch(`${DASHBOARD_URL}/api/network/heartbeat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: NODE_ID,
                    alias: NODE_ALIAS,
                    version: "V38-STANDALONE",
                    blockHeight: currentHeight
                })
            });

            if (resp.ok) {
              process.stdout.write("💓 ");
            } else {
              process.stdout.write("💔 ");
            }
            
        } catch (e: any) {
            // Silencieux pour ne pas spammer les logs
            // process.stdout.write("❌ "); 
        }
    }, 10000); // Pulse every 10 seconds
}

startBeacon().catch(console.error);
