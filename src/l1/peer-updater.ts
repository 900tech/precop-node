import http from "http";

// 🛡️ BITCOIN ROLLUP: DYNAMIC PEER UPDATER (v2980)
// Security: Orchestrates the Sovereign Swarm through the RPC layer.

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8332";

// 🗡️ THE TWENTY-ONE WARRIORS: Sovereign Peer registry
const SOVEREIGN_PEERS = [
  "189.44.63.101:8333", "195.26.240.213:8333", "1.228.21.110:8333", 
  "194.163.132.180:8333", "161.97.178.61:8333", "153.126.143.201:38333", 
  "95.217.198.121:38333", "135.181.182.162:38333", "141.94.143.203:38333", 
  "172.105.179.233:38333", "178.128.107.160:38333", "178.63.87.163:38333", 
  "147.182.229.68:38333", "136.144.237.250:38333", "37.27.45.224:38333", 
  "188.34.165.181:38333", "51.210.144.135:38333", "176.9.29.51:38333", 
  "175.110.114.74:38333", "[2a0a:4cc0:0:21b1:400:e0ff:fe79:9797]:8333"
];

async function callRPC(method: string, params: any[] = []): Promise<any> {
    const body = JSON.stringify({ jsonrpc: "1.0", id: "peer-update", method, params });
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

export async function updateSovereignPeers() {
    console.log(`📡 Sentinel: Injecting the ${SOVEREIGN_PEERS.length} Warriors into the Swarm...`);
    for (const addr of SOVEREIGN_PEERS) {
        // Mode 'add' to bind to the binary swarm without disconnecting from the public network
        await callRPC("addnode", [addr, "add"]).catch(e => console.warn(`⚠️ Peer failed: ${addr}`, e.message));
        console.log(`📡 Warrior Injected: ${addr}`);
    }
}
