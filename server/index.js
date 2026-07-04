import express from "express";
import pg from "pg";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.error(
    "ERROR: ADMIN_PASSWORD environment variable is not set. " +
    "Set it in Replit Secrets before starting the API server."
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : false,
});

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonial_submissions (
      id          SERIAL PRIMARY KEY,
      headline    TEXT        NOT NULL,
      quote       TEXT        NOT NULL,
      name        TEXT        NOT NULL,
      role        TEXT        NOT NULL,
      company     TEXT        NOT NULL,
      status      TEXT        NOT NULL DEFAULT 'pending',
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      reviewed_at  TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_testimonial_status
      ON testimonial_submissions (status);
  `);
  console.log("Database schema initialised.");
}

const app = express();
app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const auth = req.headers["x-admin-password"];
  if (!auth || auth !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.post("/api/testimonials", async (req, res) => {
  const { headline, quote, name, role, company } = req.body;
  if (!headline || !quote || !name || !role || !company) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const result = await pool.query(
      `INSERT INTO testimonial_submissions (headline, quote, name, role, company)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, submitted_at`,
      [headline.trim(), quote.trim(), name.trim(), role.trim(), company.trim()]
    );
    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("Error inserting testimonial:", err);
    res.status(500).json({ error: "Failed to save submission." });
  }
});

app.get("/api/testimonials", requireAdmin, async (req, res) => {
  const { status } = req.query;
  const allowedStatuses = ["pending", "approved", "rejected"];
  try {
    let query =
      "SELECT * FROM testimonial_submissions ORDER BY submitted_at DESC";
    const params = [];
    if (status && allowedStatuses.includes(status)) {
      query =
        "SELECT * FROM testimonial_submissions WHERE status = $1 ORDER BY submitted_at DESC";
      params.push(status);
    }
    const result = await pool.query(query, params);
    res.json({ testimonials: result.rows });
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
});

app.patch("/api/testimonials/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowedStatuses = ["pending", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }
  const numericId = parseInt(id, 10);
  if (!numericId || numericId <= 0) {
    return res.status(400).json({ error: "Invalid id." });
  }
  try {
    const result = await pool.query(
      `UPDATE testimonial_submissions
       SET status = $1, reviewed_at = NOW()
       WHERE id = $2 RETURNING *`,
      [status, numericId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Testimonial not found." });
    }
    res.json({ success: true, testimonial: result.rows[0] });
  } catch (err) {
    console.error("Error updating testimonial:", err);
    res.status(500).json({ error: "Failed to update submission." });
  }
});

const distDir = path.join(__dirname, "..", "dist");
app.use(express.static(distDir));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const PORT = process.env.PORT || process.env.API_PORT || 3001;
initSchema()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialise schema:", err);
    process.exit(1);
  });
