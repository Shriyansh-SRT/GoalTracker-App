const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes (we’ll add these next)
app.get("/", (req, res) => res.send("API is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Add to server.js
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // All auth routes start with /api/auth

const goalRoutes = require("./routes/goalRoutes");

// Add this line after authRoutes
app.use("/api/goals", goalRoutes);
