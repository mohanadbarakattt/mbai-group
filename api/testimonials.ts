// Vercel serverless function for /api/testimonials (GET, POST).
//
// Replaces the old server/index.js Express+Postgres server, which was only ever
// wired up for a Replit "autoscale" deployment target and was never reachable in
// production on Vercel — vercel.json's SPA catch-all rewrite meant every request
// to this path silently served index.html with a 200 instead.
//
// Works in two modes:
//   - DATABASE_URL set: real Postgres-backed storage (same schema as the old
//     Express server), so the public submission form and the /admin dashboard
//     both work for real.
//   - DATABASE_URL unset (the default in this demo-mode repo): a static-JSON
//     fallback that returns well-formed, honest responses — an empty
//     testimonials list for the admin dashboard (so it renders instead of
//     throwing on a non-JSON body), and a clear 503 for submissions instead of
//     silently discarding them while telling the user "Thank you."
import { Pool } from 'pg';

const ALLOWED_STATUSES = ['pending', 'approved', 'rejected'];

let pool: Pool | null = null;
function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
    });
  }
  return pool;
}

let schemaReady: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS testimonial_submissions (
          id           SERIAL PRIMARY KEY,
          headline     TEXT        NOT NULL,
          quote        TEXT        NOT NULL,
          name         TEXT        NOT NULL,
          role         TEXT        NOT NULL,
          company      TEXT        NOT NULL,
          status       TEXT        NOT NULL DEFAULT 'pending',
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          reviewed_at  TIMESTAMPTZ
        );
        CREATE INDEX IF NOT EXISTS idx_testimonial_status ON testimonial_submissions (status);`
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null; // allow retrying on the next request rather than caching a failure forever
        throw err;
      });
  }
  return schemaReady;
}

export default async function handler(req: any, res: any) {
  const hasDb = !!process.env.DATABASE_URL;

  if (req.method === 'POST') {
    const { headline, quote, name, role, company } = req.body || {};
    if (!headline || !quote || !name || !role || !company) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!hasDb) {
      return res.status(503).json({
        error:
          "Testimonial storage isn't configured yet — please email mohanad.barakat@mbai-group.com directly and we'll add your result manually.",
      });
    }
    try {
      await ensureSchema();
      const result = await getPool().query(
        `INSERT INTO testimonial_submissions (headline, quote, name, role, company)
         VALUES ($1, $2, $3, $4, $5) RETURNING id, submitted_at`,
        [String(headline).trim(), String(quote).trim(), String(name).trim(), String(role).trim(), String(company).trim()]
      );
      return res.status(201).json({ success: true, id: result.rows[0].id });
    } catch (err) {
      console.error('Error inserting testimonial:', err);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  }

  if (req.method === 'GET') {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const provided = req.headers?.['x-admin-password'];
    if (!adminPassword) {
      return res.status(503).json({ error: 'Admin dashboard is not configured yet.' });
    }
    if (!provided || provided !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!hasDb) {
      // Honest, well-formed fallback: no submissions exist yet because there's
      // nowhere to store them — the dashboard should render its normal empty
      // state, not crash trying to parse HTML as JSON.
      return res.status(200).json({ testimonials: [] });
    }
    try {
      await ensureSchema();
      const status = typeof req.query?.status === 'string' ? req.query.status : undefined;
      let query = 'SELECT * FROM testimonial_submissions ORDER BY submitted_at DESC';
      const params: string[] = [];
      if (status && ALLOWED_STATUSES.includes(status)) {
        query = 'SELECT * FROM testimonial_submissions WHERE status = $1 ORDER BY submitted_at DESC';
        params.push(status);
      }
      const result = await getPool().query(query, params);
      return res.status(200).json({ testimonials: result.rows });
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      return res.status(500).json({ error: 'Failed to fetch submissions.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed.' });
}
