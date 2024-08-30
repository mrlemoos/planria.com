import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../../.env" });

export default defineConfig({
  schema: "./src/datasource.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
