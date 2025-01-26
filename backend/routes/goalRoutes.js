const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const auth = require("../middleware/auth"); // Auth middleware

// Create a goal (protected route)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const goal = new Goal({
      title,
      description,
      deadline,
      user: req.user.userId, // From auth middleware
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all goals for the logged-in user (protected)
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a goal (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId, // Ensure the goal belongs to the user
    });
    if (!goal) {
      return res.status(404).json({ error: "Goal not found!" });
    }
    res.json({ message: "Goal deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
