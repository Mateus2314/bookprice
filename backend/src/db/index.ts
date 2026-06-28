import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

interface DbEnv {
  NEON_DATABASE_URL?: string;
}

export function getDb(env?: DbEnv) {
  const url = env?.NEON_DATABASE_URL;
  if (!url) throw new Error("NEON_DATABASE_URL not set");
  const sql = neon(url);
  return drizzle(sql, { schema });
}
