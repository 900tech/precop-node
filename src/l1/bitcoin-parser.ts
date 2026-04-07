import * as bitcoin from "bitcoinjs-lib";
import { Buffer } from "buffer";
import * as crypto from "crypto";

// 🛡️ BITCOIN ROLLUP: ULTIMATE HYBRID PARSER (v3400)
// Merging the Robustness of bitcoinjs-lib with the Agility of Live-Test Rune/JSON parsing.

export class BitcoinParser {
    private block: bitcoin.Block;

    constructor(hex: string) {
        this.block = bitcoin.Block.fromHex(hex);
    }

    /**
     * 🏹 EXFILTRATION: OP_RETURN (RUNES/JSON) & SEGWIT WITNESS (SIMPLICITY)
     */
    extractEvents(): any[] {
        const events: any[] = [];

        this.block.transactions?.forEach((tx, txIndex) => {
            const txid = tx.getId();

            // 1. Audit Vouts for Registry Check (The Queen's Seal)
            const vouts = tx.outs.map(o => ({
                spk_hash: crypto.createHash("sha256").update(o.script).digest("hex"),
                value: o.value
            }));

            // 2. Scan Outputs for OP_RETURN (Runestones & JSON)
            tx.outs.forEach((out) => {
                if (out.script[0] === bitcoin.opcodes.OP_RETURN) {
                    const payload = out.script.slice(1);
                    
                    // a. Try JSON (TUSM Payload)
                    const json = this.extractJSON(payload);
                    if (json) {
                        events.push({ txid, txIndex, protocol: "TUSM", payload: json, vouts });
                    }

                    // b. Try Runestone (LEB128 decoding)
                    const runes = this.parseRunestone(payload);
                    if (runes && runes.size > 0) {
                        events.push({ 
                            txid, txIndex, protocol: "RUNESTONE", 
                            fields: Object.fromEntries(runes), vouts 
                        });
                    }
                }
            });

            // 3. Scan Witnesses for Simplicity commitment
            tx.ins.forEach((input) => {
                if (input.witness && input.witness.length > 0) {
                    const witnessHex = input.witness.map(w => w.toString("hex")).join("");
                    if (witnessHex.includes("5455534d")) { // "TUSM" signature
                        events.push({ txid, txIndex, protocol: "TUSM", witness: witnessHex, vouts });
                    }
                }
            });
        });

        return events;
    }

    private extractJSON(script: Buffer): any {
        try {
            const start = script.indexOf(0x7b); if (start === -1) return null;
            const end = script.lastIndexOf(0x7d); if (end === -1 || end < start) return null;
            return JSON.parse(script.subarray(start, end + 1).toString("utf8"));
        } catch { return null; }
    }

    private parseRunestone(payload: Buffer): Map<string, string[]> {
        const fields = new Map<string, string[]>();
        let offset = 0;

        const readLEB128 = (): bigint => {
            let result = 0n; let shift = 0n;
            while (offset < payload.length) {
                const byte = payload[offset++];
                result |= BigInt(byte & 0x7f) << shift;
                if (!(byte & 0x80)) break;
                shift += 7n;
            }
            return result;
        };

        try {
            // First bytes are usually the protocol tag (R)
            while (offset < payload.length) {
                const tag = readLEB128().toString();
                const value = readLEB128().toString();
                if (!fields.has(tag)) fields.set(tag, []);
                fields.get(tag)!.push(value);
            }
        } catch { /* End of payload */ }
        
        return fields;
    }
}
