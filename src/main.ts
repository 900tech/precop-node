import { StateManager } from "./l2/state/state-manager";
import { Orchestrator } from "./l1/orchestrator";
import { FastifyInstance } from "fastify";
import { SentinelWatcher } from "./network/sentinel-watcher";

// 🛡️ BITCOIN ROLLUP: PRECOP-NODE V1.0.0 (The Endgame-Sync)
// Sovereign L2 State Machine anchored to Block 779,832.

const BANNER = `
    ____  ____  __________  ____  ____     _   ______  ____  ______
   / __ \\/ __ \\/ ____/ __ \\/ __ \\/ __ \\   / | / / __ \\/ __ \\/ ____/
  / /_/ / /_/ / __/ / / / / / / / /_/ /  /  |/ / / / / / / / __/   
 / ____/ _, _/ /___/ /_/ / /_/ / ____/  / /|  / /_/ / /_/ / /___   
/_/   /_/ |_/_____/\\____/\\____/_/      /_/ |_/\\____/\\____/_____/   
          
   SOUVEREIGN BITCOIN ROLLUP — BY @LAZ1M0V — VIRES IN NUMERIS.
`;

async function main() {
    console.log(BANNER);
    
    // 🏹 THE SOUVEREIGN HANDSHAKE: Auto-Scan Mode
    if (process.argv.includes("--auto-scan")) {
        SentinelWatcher.start();
    }

    // 1. Initialize State Persistence
    const lastHash = await StateManager.getLastState();
    console.log(`🧠 STATE: Resuming from Hash ${lastHash}`);

    // 2. Start the Orchestrator (L1 Ingestion)
    const orchestrator = new Orchestrator();
    await orchestrator.start();

    console.log(`🚀 NODE: Sovereign Gateway is ALIVE.`);
}

main().catch(console.error);
