import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import pg from "pg";

const { Pool } = pg;

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sql = readFileSync(path.resolve("seed.sql"), "utf-8");

  try {
    await pool.query(sql);
    console.log("✅ Données de test insérées avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion des données :", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
