import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { callRPC } from "../rpc/floresta-rpc";

// 🏗️ HARDBOUND ENV LOADING (FORCE PRIORITY)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../");
dotenv.config({ path: path.join(PROJECT_ROOT, ".env"), override: true });

/**
 * 🛰️ STANDALONE SENTINEL BEACON (V38.22-ELITE)
 * Decoupled Radar Signal. Transmits node status with zero-failure identity extraction.
 */
// Sanitization: Remove potential quotes from env variables
const DASHBOARD_URL = (process.env.DASHBOARD_URL || "https://interproportional-tameika-isorhythmically.ngrok-free.dev").replace(/['"]+/g, '');
const NODE_ALIAS    = (process.env.NODE_ALIAS    || "RADAR-GHOST").replace(/['"]+/g, '');
const NODE_ID       = (process.env.NODE_ID       || "unknown-sentinel").replace(/['"]+/g, '');

async function startBeacon() {
    console.log(`📡 Démarrage du Beacon ELITE pour [${NODE_ALIAS}]...`);
    console.log(`🔗 Radar Target: ${DASHBOARD_URL}`);
    console.log(`🆔 Identity: ${NODE_ID}`);

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
                headers: { 
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true" // 🛡️ Bypass Ngrok interstitial
                },
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
