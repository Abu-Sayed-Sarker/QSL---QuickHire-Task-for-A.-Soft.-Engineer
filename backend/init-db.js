const fs = require("fs");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcryptjs");

async function initializeDatabase() {
  try {
    const schemaPath = path.join(__dirname, "db", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Initializing database schema...");
    await db.query(schema);
    console.log("Database schema created/verified.");

    // Seed Admin User
    const adminEmail = "abusayed@gmail.com";
    const adminPass = "Pa$$w0rd!";

    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      adminEmail,
    ]);

    if (userExists.rows.length === 0) {
      console.log("Seeding admin user...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);

      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'admin')",
        ["Admin Sayed", adminEmail, hashedPassword],
      );
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }

    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
}

initializeDatabase();
