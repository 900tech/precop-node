import { parentPort, workerData } from "worker_threads";
import { BitcoinParser } from "./bitcoin-parser";

// 🛡️ BITCOIN ROLLUP: SOVEREIGN CONSENSUS & PROTOCOL FEES (v2910)
// The Queen's Seal Algorithm: SHA-256(5120e01937...e) = 6eb49dcd...

const { hex, height } = workerData;

const PROTOCOL_VAULTS: Record<string, string> = {
    // 🗡️ Universal DEX Fees (The Queen's Vault Seal) 
    "universal_dex": "6eb49dcd3ab136a260ab0f916847ea40d5fb996cf7429adb7bfc0d93290e2fef",
    
    // 🏺 CDP DAI Fees (Vault Address: bc1pf0j6p5e4uvs4ugzwke3a8fdthc89622uvf6upgflfkg9n5jpzv8sspjjuj)
    "cdp_dai": "f0j6p5e4uvs4ugzwke3a8fdthc89622uvf6upgflfkg9n5jpzv8sspjjuj" 
};

async function processBlock() {
    const parser = new BitcoinParser(hex);
    const rawEvents = parser.extractEvents();
    const validatedEvents = [];

    for (const ev of rawEvents) {
        const expectedVaultHash = PROTOCOL_VAULTS[ev.protocol || ""];
        
        if (expectedVaultHash) {
             // 🗡️ CONSENSUS ENFORCEMENT: Fees MUST go to the specific protocol vault.
             // On Bitcoin Mainnet, Output 2 (Vout Index 1) is the designated Treasury port.
             if (ev.vouts && ev.vouts[1] && (ev.vouts[1].spk_hash === expectedVaultHash || ev.vouts[1].address === expectedVaultHash)) {
                 validatedEvents.push(ev);
             } else {
                 console.warn(`🚨 CONSENSUS VIOLATION [${ev.protocol}]: Treasury Vout[1] mismatch! Expected: ${expectedVaultHash}`);
                 continue; // Expelled from the L2 stateHash
             }
        } else {
            // General protocols keep their default flow (Genesis, etc.)
            validatedEvents.push(ev);
        }
    }

    // Capture the Ordi Genesis Event (Initial State)
    if (height === 779832) {
        validatedEvents.push({ 
            txIndex: -1, 
            protocol: "BITCOIN", 
            op: "GENESIS", 
            tick: "ordi",
            description: "The Awakening of the First BRC-20"
        });
    }

    // Propagate the validated result to the Sequencer
    parentPort?.postMessage({ height, events: validatedEvents });
}

processBlock();
