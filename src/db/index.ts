import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: Number(process.env.DATABASE_PORT),
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
