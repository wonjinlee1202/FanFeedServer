const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: String,
  preferences: {
    type: [String],
    default: ['NBA', 'NFL', 'MLB']
  }
});

module.exports = mongoose.model("User", userSchema);
