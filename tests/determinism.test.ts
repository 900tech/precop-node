import { describe, it, expect } from "vitest";
import { canonicalStringify } from "../src/l2/vm/canonical-json";
import { TUSMDecoder } from "../src/l2/vm/tusm-decoder";

describe("🛡️ Determinism Audit: Key Order Proof (v1830)", () => {

    it("🧪 Should produce identical hashes for different key orders", () => {
        const obj1 = { a: 1, b: 2, c: { x: "y", z: "w" } };
        const obj2 = { c: { z: "w", x: "y" }, b: 2, a: 1 }; // Reordered keys

        // VERDICT 1: Canonical Strings must match
        const str1 = canonicalStringify(obj1);
        const str2 = canonicalStringify(obj2);
        expect(str1).toBe(str2);

        // VERDICT 2: StateHash must be identical
        const hash1 = TUSMDecoder.calculateStateHash("0".repeat(64), [obj1]);
        const hash2 = TUSMDecoder.calculateStateHash("0".repeat(64), [obj2]);
        expect(hash1).toBe(hash2);

        console.log("✅ DETERMINISM PROVEN: Key reordering is neutral.");
    });

});
