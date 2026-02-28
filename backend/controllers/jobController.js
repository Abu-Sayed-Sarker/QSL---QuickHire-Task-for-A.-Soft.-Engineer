const db = require("../db");

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { category, location, search } = req.query;
    let queryText = "SELECT * FROM jobs WHERE 1=1";
    const queryParams = [];

    if (category) {
      queryParams.push(category);
      queryText += ` AND category = $${queryParams.length}`;
    }

    if (location) {
      queryParams.push(location);
      queryText += ` AND location = $${queryParams.length}`;
    }

    if (search) {
      queryParams.push(`%${search}%`);
      queryText += ` AND (title ILIKE $${queryParams.length} OR company ILIKE $${queryParams.length})`;
    }

    queryText += " ORDER BY created_at DESC";

    const result = await db.query(queryText, queryParams);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get single job
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM jobs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a job (Admin)
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      category,
      type,
      description,
      logo,
      tags,
    } = req.body;

    // Simple validation
    if (!title || !company || !location || !category || !description) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const result = await db.query(
      "INSERT INTO jobs (title, company, location, category, type, description, logo, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        company,
        location,
        category,
        type || "Full Time",
        description,
        logo,
        tags || [],
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a job (Admin)
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
