import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./datasource";

const databaseURL = process.env.DATABASE_URL!;

export * from "drizzle-orm";
export { schema };
const sql = neon(databaseURL);
export const db = drizzle(sql, { schema });
