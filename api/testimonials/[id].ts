// Vercel serverless function for /api/testimonials/:id (PATCH) — admin moderation
// actions (approve / reject / reset to pending). See ../testimonials.ts for the
// list/create endpoint and the static-fallback rationale.
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers?.['x-admin-password'];
  if (!adminPassword) {
    return res.status(503).json({ error: 'Admin dashboard is not configured yet.' });
  }
  if (!provided || provided !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ error: "Testimonial storage isn't configured yet." });
  }

  const { status } = req.body || {};
  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  const numericId = parseInt(String(req.query?.id ?? ''), 10);
  if (!numericId || numericId <= 0) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const result = await getPool().query(
      `UPDATE testimonial_submissions
       SET status = $1, reviewed_at = NOW()
       WHERE id = $2 RETURNING *`,
      [status, numericId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found.' });
    }
    return res.status(200).json({ success: true, testimonial: result.rows[0] });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    return res.status(500).json({ error: 'Failed to update submission.' });
  }
}
