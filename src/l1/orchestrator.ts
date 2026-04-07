import http from "http";
import path from "path";
import { Worker } from "worker_threads";
import { RollupSequencer } from "../bridge/sequencer";

// 🛡️ BITCOIN ROLLUP: SOVEREIGN L1 ORCHESTRATOR (v3070)
// Coordinates parallel workers and ensures chronological release to the VM.

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8332";
const GENESIS_HEIGHT = 779832;

const sequencer = new RollupSequencer(GENESIS_HEIGHT); 

const HARVEST_BANNER = `
    ____  ____  __________  ____  ____     _   ______  ____  ______
   / __ \/ __ \/ ____/ __ \/ __ \/ __ \   / | / / __ \/ __ \/ ____/
  / /_/ / /_/ / __/ / / / / / / / /_/ /  /  |/ / / / / / / / __/   
 / ____/ _, _/ /___/ /_/ / /_/ / ____/  / /|  / /_/ / /_/ / /___   
/_/   /_/ |_/_____/\____/\____/_/      /_/ |_/\____/_____/_____/   
+-----------------------------------------------------------------+
|  VIRES IN NUMERIS | HARVESTING THE TIMECHAIN | ORDI GENESIS     |
+-----------------------------------------------------------------+
`;

async function callRPC(method: string, params: any[] = []): Promise<any> {
    const body = JSON.stringify({ jsonrpc: "1.0", id: "roll", method, params });
    const auth = Buffer.from("floresta:tonmotdepasseultrasecure123!").toString("base64");
    return new Promise((resolve) => {
        const req = http.request(RPC_URL, {
            method: "POST", headers: { "Authorization": `Basic ${auth}` }
        }, (res) => {
            let data = ""; res.on("data", (chunk) => data += chunk);
            res.on("end", () => { try { resolve(JSON.parse(data)); } catch { resolve({}); } });
        });
        req.write(body); req.end();
    });
}

export async function startRollupOrchestrator(vmCallback: (height: number, events: any[]) => void) {
    console.log(HARVEST_BANNER);
    let currentHeight = GENESIS_HEIGHT;
    console.log(`🛰️ Orchestrator: Starting the historical sweep from block ${GENESIS_HEIGHT}...`);

    while (true) {
        const tipRes = await callRPC("getblockcount");
        const tip = tipRes.result;
        if (!tip) { await new Promise(r => setTimeout(r, 5000)); continue; }

        while (currentHeight <= tip) {
            const hRes = await callRPC("getblockhash", [currentHeight]);
            const bRes = await callRPC("getblock", [hRes.result, 0]); 
            const rawBlockHex = bRes.result;

            if (!rawBlockHex) break;

            const worker = new Worker(path.join(__dirname, "harvester-worker.js"), {
                workerData: { hex: rawBlockHex, height: currentHeight }
            });

            worker.on("message", (msg) => {
                sequencer.pushBlock(msg.height, msg.events);
                sequencer.releaseReadyBlocks(vmCallback);
            });
            
            currentHeight++;
            if (currentHeight % 10 === 0) await new Promise(r => setTimeout(r, 100));
        }

        await new Promise(r => setTimeout(r, 10000));
    }
}
