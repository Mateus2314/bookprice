import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

interface DbEnv {
  NEON_DATABASE_URL?: string;
}

const clients = new Map<string, ReturnType<typeof drizzle>>();

export function getDb(env?: DbEnv) {
  const url = env?.NEON_DATABASE_URL;
  if (!url) throw new Error("NEON_DATABASE_URL not set");
  if (clients.has(url)) return clients.get(url)!;
  const client = postgres(url, { prepare: false });
  const db = drizzle(client, { schema });
  clients.set(url, db);
  return db;
}
