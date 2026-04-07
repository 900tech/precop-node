// 🛡️ SEQUENCER (The Bridge)
// Ensures Deterministic Order: Height -> TxIndex -> Vout
export class RollupSequencer {
    private buffer: Map<number, any[]> = new Map();
    private nextHeight: number;

    constructor(startHeight: number) { this.nextHeight = startHeight; }

    pushBlock(height: number, events: any[]) {
        const sorted = events.sort((a, b) => {
            if (a.txIndex !== b.txIndex) return a.txIndex - b.txIndex;
            return (a.vout || 0) - (b.vout || 0);
        });
        this.buffer.set(height, sorted);
    }

    releaseReadyBlocks(callback: (height: number, events: any[]) => void) {
        while (this.buffer.has(this.nextHeight)) {
            const events = this.buffer.get(this.nextHeight)!;
            callback(this.nextHeight, events);
            this.buffer.delete(this.nextHeight);
            this.nextHeight++;
        }
    }
}
