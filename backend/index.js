const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4200;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Test Route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});
const host = "0.0.0.0";

app.listen(PORT, host, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is running on host ${host}`);
});
