// backednd/server.js

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// middleware
app.use(cors()); // allows frontend requests
app.use(express.json()); // Parse JSON data

// Test route
app.get("/", (req, res) => {
  res.send("GoalTracker API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add to server.js
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));
