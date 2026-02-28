const db = require("../db");

// Submit an application
exports.submitApplication = async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Validation
    if (!job_id || !name || !email || !resume_link) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Basic URL validation
    try {
      new URL(resume_link);
    } catch (_) {
      return res.status(400).json({ error: "Invalid resume link URL" });
    }

    // Check if job exists
    const jobCheck = await db.query("SELECT id FROM jobs WHERE id = $1", [
      job_id,
    ]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const result = await db.query(
      "INSERT INTO applications (job_id, name, email, resume_link, cover_note) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [job_id, name, email, resume_link, cover_note],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get applications for a job (Optional, good for Admin)
exports.getApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    const result = await db.query(
      "SELECT * FROM applications WHERE job_id = $1 ORDER BY created_at DESC",
      [jobId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all applications (Optional, good for Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT a.*, j.title as job_title, j.company as job_company 
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        ORDER BY a.created_at DESC
      `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
