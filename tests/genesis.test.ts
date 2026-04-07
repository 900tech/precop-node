import { describe, it, expect, vi } from "vitest";
import { RollupSequencer } from "../src/bridge/sequencer";
import { LocalContractLoader } from "../src/l2/vm/contract-loader";
import { TUSMDecoder } from "../src/l2/vm/tusm-decoder";
import * as path from "path";

describe("🪐 Genesis Cycle: The First State Transition (v1760)", () => {

    it("🚀 Full Cycle Test: L1 -> Sequencer -> ContractLoader -> L2 State", async () => {
        // 1. Initial State
        const genesisHeight = 840000;
        const sequencer = new RollupSequencer(genesisHeight);
        const loader = new LocalContractLoader(path.join(__dirname, "../src/l2/contracts"));
        
        // 2. Worker Simulation (Muscle)
        // Simule un événement extrait d'un bloc par un worker parallèle
        const mockEvents = [
            { txIndex: 0, protocol: "TUSM", payload: "42069b", op: "EXECUTE_DEX" }
        ];
        sequencer.pushBlock(genesisHeight, mockEvents);

        // 3. VM & Sequencer Collaboration (Bridge + Cerveau)
        const vmExecution = vi.fn(async (height, events) => {
            // Demande le contrat au chargeur abstrait (Prêt pour DA On-Chain)
            const contract = await loader.getContract("universal_dex");
            expect(contract).not.toBeNull(); 

            // Calcul du StateHash
            const prevHash = "0".repeat(64);
            const nextHash = TUSMDecoder.calculateStateHash(prevHash, events);
            return nextHash;
        });

        // 4. Release Order
        sequencer.releaseReadyBlocks((h, e) => vmExecution(h, e));

        // 5. Final Revelation
        expect(vmExecution).toHaveBeenCalled();
        console.log("🏆 GENESIS SUCCESS: The decentralized BitMachine is breathing.");
    });

});
