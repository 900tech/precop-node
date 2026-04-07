import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = Fastify({ logger: true });

// 🛡️ SOVEREIGN WEB3 API: COCKPIT v2930

export async function startSovereignRPC(port: number) {
    // SECURITY HARDENING
    await server.register(helmet);
    await server.register(rateLimit, { max: 100, timeWindow: "1 minute" });
    await server.register(cors, { origin: "*" });

    // 📊 SYNC VELOCITY ENDPOINT
    server.get("/api/v1/sync", async () => {
        const lastBlock = await prisma.l2Block.findFirst({ orderBy: { height: "desc" } });
        return {
            height: lastBlock?.height || 0,
            stateHash: lastBlock?.stateHash || "none",
            isSynced: lastBlock && lastBlock.height > 840000 // Sample sync check
        };
    });

    // 🏛️ SOVEREIGN STATE ENDPOINT
    server.get("/api/v1/state", async () => {
        return await prisma.l2Block.findFirst({ orderBy: { height: "desc" } });
    });

    // 🗡️ ORDERBOOK SCANNER (Market Analysis)
    server.get("/api/v1/market/:ticker", async (request) => {
        const { ticker }: any = request.params;
        return await prisma.l2Transaction.findMany({
            where: { protocol: "TUSM", payload: { path: ["tick"], equals: ticker } },
            take: 50,
            orderBy: { createdAt: "desc" }
        });
    });

    try {
        await server.listen({ port, host: "0.0.0.0" });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
