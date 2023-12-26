const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId: { type: String },
  userName: { type: String },
  notes: [{ title: String, content: String }],
});

module.exports = mongoose.model("User", userSchema);
