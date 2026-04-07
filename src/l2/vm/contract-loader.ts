import * as fs from "fs";
import * as path from "path";

// 🛡️ BITCOIN ROLLUP: ROBUST CONTRACT LOADER (v3490)
// Manages Simplicity contract exfiltration for the BitMachine.

export class LocalContractLoader {
    private contractDir: string;
    public SOVEREIGN_TREASURY_HASH = "6eb49dcd3ab136a260ab0f916847ea40d5fb996cf7429adb7bfc0d93290e2fef";

    constructor(dir: string = "./contracts") {
        this.contractDir = dir;
    }

    /**
     * 🏹 THE SCRIBE API: getContract
     * Standardized method for the Sequencer and Genesis tests.
     */
    async getContract(name: string): Promise<string | null> {
        return this.loadContractSync(name);
    }

    loadContractSync(name: string): string | null {
        const filePath = path.join(this.contractDir, `${name}.simf`);
        if (!fs.existsSync(filePath)) {
            console.warn(`🚨 LOADER: Contract ${name} not found at ${filePath}`);
            return null;
        }
        return fs.readFileSync(filePath, "utf-8");
    }

    /**
     * ✅ STATIC LOADER (Legacy compatibility)
     */
    static load(name: string): string | null {
        try {
            const loader = new LocalContractLoader();
            return loader.loadContractSync(name);
        } catch { return null; }
    }
}
