const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({
  stock: String,
  quantity: Number,
  boughtAt: Number
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000 },
  picks: [pickSchema]
});

// ✅ FIX: prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);