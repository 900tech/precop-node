// 🛡️ BITCOIN ROLLUP: CANONICAL DETERMINISM HELPER (v1810)
// Prevents Non-Deterministic JSON.stringify forks.

export function canonicalStringify(obj: any): string {
    if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
    if (Array.isArray(obj)) return "[" + obj.map(o => canonicalStringify(o)).join(",") + "]";
    
    // Alphabetical key sorting is MANDATORY for L2 Consensus
    const sortedKeys = Object.keys(obj).sort();
    return "{" + sortedKeys.map(k => `"${k}":${canonicalStringify(obj[k])}`).join(",") + "}";
}
