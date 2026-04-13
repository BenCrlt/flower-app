import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

async function resetDb() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sql = `
    DROP SCHEMA IF EXISTS drizzle CASCADE;
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO admin;
    GRANT ALL ON SCHEMA public TO public;
  `;

  try {
    await pool.query(sql);
    console.log("✅ Base réinitialisée (schema public recréé)");
  } catch (error) {
    console.error("❌ Erreur pendant le reset DB :", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

void resetDb();
