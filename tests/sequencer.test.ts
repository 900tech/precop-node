import { describe, it, expect, vi } from "vitest";
import { RollupSequencer } from "../src/bridge/sequencer";

describe("🛡️ Rollup Sequencer: L'Épreuve du Chaos", () => {
    it("🧪 Should enforce chronological release (840000 -> 840001 -> 840002)", () => {
        const sequencer = new RollupSequencer(840000);
        const vmCallback = vi.fn();

        sequencer.pushBlock(840001, [{ txIndex: 0, protocol: "TUSM", payload: "TX-840001" }]);
        sequencer.releaseReadyBlocks(vmCallback);
        expect(vmCallback).not.toHaveBeenCalled();

        sequencer.pushBlock(840002, [{ txIndex: 0, protocol: "TUSM", payload: "TX-840002" }]);
        sequencer.releaseReadyBlocks(vmCallback);
        expect(vmCallback).not.toHaveBeenCalled();

        sequencer.pushBlock(840000, [{ txIndex: 0, protocol: "BITCOIN", op: "GENESIS" }]);
        sequencer.releaseReadyBlocks(vmCallback);

        expect(vmCallback).toHaveBeenCalledTimes(3);
        const calls = vmCallback.mock.calls;
        expect(calls[0][0]).toBe(840000);
        expect(calls[1][0]).toBe(840001);
        expect(calls[2][0]).toBe(840002);
    });
});
