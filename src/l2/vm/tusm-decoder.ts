import * as crypto from "crypto";

// 🛡️ BITCOIN ROLLUP: TUSM DETERMINISTIC DECODER & INVARIANT GUARD (v3480)
// Ensure L2 StateHash consensus through Canonical JSON Serialization.

const QUEEN_SEAL_HASH = "6eb49dcd3ab136a260ab0f916847ea40d5fb996cf7429adb7bfc0d93290e2fef";

export class TUSMDecoder {
    /**
     * 🛡️ CANONICAL STABILIZATION: The Immutability Seal
     * Recursively sorts object keys alphabetically to ensure deterministic JSON strings.
     */
    static stabilize(obj: any): any {
        if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
            if (Array.isArray(obj)) return obj.map(this.stabilize.bind(this));
            return obj;
        }
        return Object.keys(obj).sort().reduce((acc: any, key) => {
            acc[key] = this.stabilize(obj[key]);
            return acc;
        }, {});
    }

    static validateInvariants(events: any[]): any[] {
        return events.filter(ev => {
            if (ev.protocol === "TUSM") {
                // 1. Enforce the Queen's Seal (Vout[1] Treasury Commitment)
                const hasQueenSeal = ev.vouts?.some((v: any, i: number) => i === 1 && v.spk_hash === QUEEN_SEAL_HASH);
                if (!hasQueenSeal) {
                    console.warn(`🚨 CONSENSUS HALT: Transaction ${ev.txid} missing Queen's Seal.`);
                    return false;
                }
                return true; 
            }
            return true;
        });
    }

    static calculateStateHash(prevHash: string, events: any[]): string {
        const validEvents = this.validateInvariants(events);
        const sortedEvents = validEvents.sort((a, b) => a.txIndex - b.txIndex);
        
        // 🛡️ CANONICAL BINDING: Sort all keys to prevent stateHash forks.
        const canonicalData = this.stabilize({
            prevHash,
            events: sortedEvents
        });

        const dataString = JSON.stringify(canonicalData);
        return crypto.createHash("sha256").update(dataString).digest("hex");
    }
}
