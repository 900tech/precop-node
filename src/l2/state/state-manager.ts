import { PrismaClient } from "@prisma/client";
import * as ecc from "tiny-secp256k1";
import { TUSMDecoder } from "../vm/tusm-decoder";

const prisma = new PrismaClient();

// 🛡️ THE ASTROLABE SIGNATURE: P (Internal Key)
// Identity of the Agent on the Bitcoin L1.
const INTERNAL_PUBKEY = Buffer.from("f0367359eb30a6886e00e40f5a7066d03d32efaf8cb6898b9da886dc86ed0282", "hex");

// 🏛️ SOVEREIGN PROTOCOL REGISTRY (Mainnet Vaults)
const PROTOCOL_FEE_REGISTRY: Record<string, string> = {
    "universal_dex": "bc1ptekewrax5v9fqxnqpye42nsg07z0hmufvm836k6rrnfyhtrddxws4tm00n",
    "cdp_dai": "bc1pf0j6p5e4uvs4ugzwke3a8fdthc89622uvf6upgflfkg9n5jpzv8sspjjuj",
    "default": "bc1ptekewrax5v9fqxnqpye42nsg07z0hmufvm836k6rrnfyhtrddxws4tm00n"
};

export class StateManager {
    static async getLastState(): Promise<string> {
        const lastBlock = await prisma.l2Block.findFirst({ orderBy: { height: "desc" } });
        return lastBlock?.stateHash || "0".repeat(64);
    }

    /**
     * 🏹 THE ASTROLABE PATTERN: $Q = P + H(state) \cdot G$
     * Tweaks the internal identity key P with the stateHash T.
     */
    static deriveSovereignPubKey(stateHash: string): string {
        const tweak = Buffer.from(stateHash, "hex");
        
        // 🛡️ SECP256K1 BINDING: Q = P + HG
        const tweakedPoint = ecc.xOnlyPointAddTweak(INTERNAL_PUBKEY, tweak);
        
        if (!tweakedPoint || tweakedPoint.xOnlyPubkey === null) {
            throw new Error(`🚨 CRYPTOGRAPHIC HALT: Failed to compute Astrolabe Tweak for Hash ${stateHash}`);
        }

        // Return the resulting Taproot Pubkey Q as Hex
        return Buffer.from(tweakedPoint.xOnlyPubkey).toString("hex");
    }

    static async applyBlock(height: number, events: any[]) {
        const startTime = Date.now();
        const prevHash = await this.getLastState();
        
        // 1. Calculate the L2 stateHash (H)
        const newStateHash = TUSMDecoder.calculateStateHash(prevHash, events);
        
        // 2. 🏹 ASTROLABE: Derive the physical Taproot Identity (Q)
        const tweakedPubKey = this.deriveSovereignPubKey(newStateHash);

        const duration = Date.now() - startTime;
        console.log(`🧠 VM L2: Block ${height} | Hash: ${newStateHash} | Q: ${tweakedPubKey} | Time: ${duration}ms`);

        // 🔒 ATOMIC STATE TRANSITION: Bind State (H) to Identity (Q)
        await prisma.$transaction([
            prisma.l2Block.create({
                data: {
                    height,
                    stateHash: newStateHash,
                    tweakedPubKey: tweakedPubKey, // Physical L1 Signature
                    timestamp: new Date()
                }
            }),
            ...events.map((ev, i) => prisma.l2Transaction.create({
                data: {
                    id: `${height}-${i}`,
                    blockHeight: height,
                    txIndex: i,
                    protocol: ev.protocol,
                    payload: ev,
                    feeRecipient: PROTOCOL_FEE_REGISTRY[ev.protocol || "default"]
                }
            }))
        ]);
    }
}
