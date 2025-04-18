const express = require("express");
const router = express.Router();
const admin = require("../firebase-admin");
const User = require("../models/User");

// Auth middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).send("Missing token");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

// GET user preferences
router.get("/preferences", verifyToken, async (req, res) => {
  const user = await User.findOne({ firebaseUid: req.user.uid });
  if (!user) return res.status(404).send("User not found");

  res.json({ preferences: user.preferences });
});

// UPDATE user preferences
router.post("/preferences", verifyToken, async (req, res) => {
  const { preferences } = req.body;
  const user = await User.findOneAndUpdate(
    { firebaseUid: req.user.uid },
    { $set: { preferences: preferences } },
    { new: true, upsert: true }
  );
  res.json({ preferences: user.preferences });
});

module.exports = router;
